'use strict';

const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const jsReport = require('jsreport');
const url = require('url');
const cors = require('cors');
const renderExport = require('./exports');
let app = express();
const expressWs = require('express-ws')(app);
const mongoDB = require('./api/connectors/mongoDB');
const logger = require('./api/connectors/logger').app;

process.on('uncaughtException', (err) => {
  logger.error({ fs: 'app.js', func: 'uncaughtException', error: err, stack: err.stack }, 'uncaught exception');
});

process.on('unhandledRejection', function (err) {
  logger.error({ fs: 'app.js', func: 'unhandledRejection', error: err, stack: err.stack }, 'unhandled Rejection');
});

global.appDir = __dirname;
mongoDB.connection(config.get('mongodb.url'));
app = expressWs.app;

let appServer;
appServer = app.listen(config.get('reportingService.Port'), function () {
  console.log('server running at http://%s:%s\n', appServer.address().address, appServer.address().port);
});

app.options('*', cors());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('exports'));
app.use('/reporting', express());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

jsReport({
  express: { app: app, server: appServer },
  appPath: '/reporting'
}).init()
  .catch(function (e) {
    logger.error(e, 'JS report error');
  });

// /////////////////////////////////////////////////////////////////////////////
// /////////////////////// REST ENDPOINTS START HERE ///////////////////////////
// //////////////////////////////////

const generateReports = require('./reports');
app.get('/export/:channel', function (req, res) {
  const urlParts = url.parse(req.url, true);
  const type = urlParts.query.type;
  let gridType = urlParts.query.gridType;
  let query = urlParts.query.searchCriteria || '';
  try {
    query = query ? JSON.parse(new Buffer(query, 'base64')) : {};
  }
  catch (e) {
    res.send(e);
    res.end();
  }
  renderExport(type, gridType, query, jsReport, res);
});

app.get('/reports/:channel/:action', function (req, res) {
  console.log("GOT REQUEST")
  const urlParts = url.parse(req.url, true);
  const type = urlParts.query.type;
  let language = urlParts.query.language;
  let query = urlParts.query.searchCriteria || '';
  let id = urlParts.query.id;
  query = query ? JSON.parse(new Buffer(query, 'base64')) : {};
  language = language ? JSON.parse(new Buffer(language, 'base64')) : {};
  const payload = {
    filters: query,
    reportsCriteriaId: id,
    nationalization: language
  };
  console.log(JSON.stringify(payload))
  try {
    generateReports(jsReport, payload, res, type);
  }
  catch (e) {
    console.log(e)
    res.send(e);
    return res.end();
  }
});


import React from 'react';
import {baseUrl} from '../constants/Communication.js';
import * as utils from '../common/utils.js';
import * as Loaders from '../common/loaders.jsx';
//import Pagination from '../components/paginator.jsx';
import TableCell from './TableCell.jsx';
import Pagination from "react-js-pagination";
import config from '../../config.js';


let _ = require('lodash');

let lastPage = 1;

class Datatable extends React.Component {

  constructor(props) {
    super(props);


    this.state = {
      exampleItems: [],
      pageOfItems: [],
      isLoading: false,
      downloading: false,
      activePage:
      this.props.activePage || 1
    }
    ;

    this.handlePageChange = this.handlePageChange.bind(this);

  }

  componentWillMount() {
    let exampleItems = _.range(1, this.props.totalRecords);
    this.setState({exampleItems: exampleItems});

  }

  componentWillReceiveProps(nextProps) {
    if (this.props.gridData !== nextProps.gridData) {
      this.setState({isLoading: false});
    }
    this.setState({activePage: this.props.activePage});
  }

  getExportOptions(exportForDetail, enableXMLExport) {
    if (exportForDetail && exportForDetail === true) {
      return (
        <ul className="dropdown-menu pull-right">

          <li>
            <a href={this.openDownloadWindow("xlsx")} onClick={() => {

              _this.setState({downloading: true});
              setTimeout(() => {
                _this.setState({downloading: false});
              }, 4000);

            }} download>
              <i className="fa fa-file-excel-o"/>{"Excel"} </a>
          </li>
          {enableXMLExport && enableXMLExport === true &&
          < li>
            <a href={this.openDownloadWindow("XML")} download>
              <i className="fa fa-file-code-o"/>XML </a>
          </li>
          }
        </ul>
      )
    }
    else {
      return (
        <ul className="dropdown-menu pull-right">
          <li>
            <a href={this.openDownloadWindow("pdf")} onClick={() => {

              _this.setState({downloading: true});
              setTimeout(() => {
                _this.setState({downloading: false});
              }, 4000);

            }} download>
              <i className="fa fa-file-pdf-o"/> {"PDF"} </a>
          </li>
          <li>
            <a href={this.openDownloadWindow("excel")} onClick={() => {

              _this.setState({downloading: true});
              setTimeout(() => {
                _this.setState({downloading: false});
              }, 4000);

            }} download>
              <i className="fa fa-file-excel-o"/>Excel </a>
          </li>
          {this.props.enableXMLExport && this.props.enableXMLExport === true &&
          < li>
            <a href={this.openDownloadWindow("XML")} download>
              <i className="fa fa-file-code-o"/>XML </a>
          </li>
          }
        </ul>
      )

    }

  }

  getExport(exportFlag) {
    let _this = this;
    if (exportFlag && exportFlag === true)
      return (
        <div className="btn-group pull-right">
          <a disabled={this.state.downloading} className="btn red btn-outline btn-circle" href="javascript:"
             data-toggle="dropdown" aria-expanded="false"
             style={{marginTop: "3px"}}> <i className="fa fa-share"/> <span
            className="hidden-xs">{this.state.downloading ? utils.getLabelByID("Downloading") : utils.getLabelByID("export")} </span>
            <i className="fa fa-angle-down"/> </a>
          {!this.state.downloading &&

          this.getExportOptions(this.props.exportForDetail, this.props.enableXMLExport)

          }
        </div>
      );


  }

  openDownloadWindow(type) {
    let _this = this;
    let gridType = type === 'XML' ? _this.props.gridTypeForXML : _this.props.gridType;
    let searchCriteria = "";
    if (_this.props.searchCriteria) {
      searchCriteria = JSON.stringify(_this.props.searchCriteria);
      searchCriteria = b64EncodeUnicode(searchCriteria);
    }
    //return baseUrl + '/exportFile?searchCriteria=' + searchCriteria + '&gridType=' + gridType + '&type=' + type + '&JWT=' + sessionStorage.token;
    let url = baseUrl + '/export/Export?searchCriteria=' + searchCriteria + '&gridType=' + gridType + '&type=' + type + '&JWT=' + sessionStorage.token;
    url = url.replace('amp', '');
    return url;
    // window.open(url, 'targetWindow',
    //     "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=900,height=500");

    function b64EncodeUnicode(str) {
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
          return String.fromCharCode('0x' + p1);
        }));
    }
  }

  getPagination(paginationFlag, offSet) {
    if (paginationFlag && paginationFlag === true) {
      let items = _.range(1, this.props.totalRecords);
      let limitRecordCount = this.props.limitRecordCount || false;

      return (
        <div>
          {this.props.totalRecords > 0 &&
          <div className="pull-left" style={{paddingTop: "4px"}}>
            <div className="dataTables_info" id="sample_1_2_info" role="status"
                 aria-live="polite">{utils.getLabelByID("Showing") + offSet + utils.getLabelByID("to") + ((offSet + this.props.pageSize - 1) > this.props.totalRecords ? this.props.totalRecords : (offSet + this.props.pageSize - 1)) + utils.getLabelByID("of") + (limitRecordCount ? config.transactionCount + "+ " : +this.props.totalRecords) + utils.getLabelByID("records")}</div>
          </div>
          }

          <div className="pull-right">


            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={this.props.pageSize}
              totalItemsCount={this.props.totalRecords}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
            />
          </div>
        </div>

      );
    }


  }

  handleHeaderClick(sortData) {
    if (this.props.headerClick) {
      this.props.headerClick(sortData);
      this.setState({isLoading: true});
    }
  }

  handlePageChange(pageNumber) {
    //alert(`active page is ${pageNumber}`);
    this.setState({
      activePage: pageNumber,
      isLoading: true
    });
    this.props.pageChanged(pageNumber);
  }

  getHeader(colData, index, gridData) {
    switch (colData.type) {
      case "cb":
        return (<th key={index.toString()}>
          <a href="javascript:" onClick={() => {
            $("input:checkbox").prop('checked', true);
          }}>Select</a>/
          <a href="javascript:" onClick={() => {
            $("input:checkbox").prop('checked', false);
          }}>Un-select</a>
        </th>);
      case "hiddenID":
        return null;
      default:
        let sortData = {};
        let isSortedColumn = false;
        let className;
        if (this.props.sortData && Object.keys(this.props.sortData)[0] === colData.key) {
          isSortedColumn = true;
          sortData[colData.key] = this.props.sortData[colData.key] === 1 ? -1 : 1;
          className = sortData[colData.key] === 1 ? "fa fa-sort-desc" : "fa fa-sort-up";
        }
        else {
          sortData[colData.key] = 1;
        }
        return (
          <th
            key={index.toString()}
            onClick={() => {
              if (colData.type !== "action") {
                this.handleHeaderClick(sortData);
              }
            }}
            style={{verticalAlign: "middle", padding: "3px 9px"}}
            className="text-center">{utils.getLabelByID(colData.alias)}
            {isSortedColumn && <i className={className} style={{marginLeft: "10px"}}/>}
          </th>);
    }
  }

  renderPopupBody(dataID) {
    this.props.renderPopupBody(dataID)
  }

  getCheckedItems(ID, checked) {

    this.props.getCheckedItems(ID, checked)
  }

  componentDidMount() {
    $('table.gridTable').tableSearch({
      searchText: '',
      searchPlaceHolder: 'Search',
      searchObj: $('#searchINP')
    })
  }


  render() {
    if (this.props.forbiddenColumns) {
      for (let rowCount = 0; rowCount < this.props.gridColumns.length; rowCount++) {
        for (let j = 0; j < this.props.forbiddenColumns.length; j++) {
          if (this.props.gridColumns[rowCount] && this.props.forbiddenColumns[j] == this.props.gridColumns[rowCount].key) {
            delete this.props.gridColumns[rowCount];
            break;
          }
        }
      }

    }
    let offSet = parseInt((parseInt(this.props.activePage) - 1)) * this.props.pageSize + 1;
    return (<div className="row">
      <div className="col-md-12">
        {this.state.isLoading && Loaders.dotted()}
        <div className={this.props.TableClass || ""}>
          <div className="portlet-title">
            <div className={"caption " + this.props.fontclass}>

              <span className="caption-subject ">{this.props.title}</span>
            </div>
            <div className="tools sdg_clps">
              <a href="javascript:;" className="collapse" data-original-title="" title=""> </a>

            </div>
            {/*{this.getSearch(this.props.search)}*/}
            {this.getExport(this.props.export)}
            <div className="actions">
              <div className="btn-group btn-group-devided" data-toggle="buttons">

              </div>
            </div>
          </div>
          <div className="portlet-body flip-scroll">
            <div className="row">
              <div className="col-md-12 ">
                <table id={this.props.id ? this.props.id : ""} style={{marginTop: "10px"}}
                       className="table table-bordered table-striped table-condensed flip-content gridTable sdg_tbl">
                  <thead className="flip-content">
                  <tr>
                    {this.props.gridColumns.map((sd, index) => (
                      this.getHeader(sd, index, this.props.gridData)
                    ))}
                  </tr>
                  </thead>
                  <tbody>
                  {
                    this.props.gridData.length > 0 &&
                    this.props.gridData.map((rowData, index) => {
                      let recordID = this.props.gridColumns.filter(column => column.type === "hiddenID")[0];
                      recordID = recordID ? recordID.key : undefined;

                      let footerRow = (this.props.footerRow && this.props.footerRow == true && this.props.gridData.length - 1 == index) ? true : false;

                      return (
                        <tr key={index.toString()}>
                          {

                            this.props.gridColumns.map((colData, index2) => (
                              <TableCell key={index2.toString()}
                                         recordID={recordID}
                                         rowData={rowData}
                                         cellData={colData.type === "object" ? (rowData[colData.key] !== null ? rowData[colData.key][colData.property] : "") : rowData[colData.key]}
                                         type={colData.type}
                                         rowIndex={index}
                                         componentFunction={this.props.componentFunction}
                                         renderPopupBody={this.renderPopupBody.bind(this)}
                                         getCheckedItems={this.getCheckedItems.bind(this)}
                                         columnWidth={colData.width ? colData.width : ""}
                                         searialNo={offSet + parseInt(index)}
                                         url={colData.url || ''} footerRow={footerRow}
                              />
                            ))
                          }
                        </tr>
                      );
                    })
                  }
                  {
                    this.props.gridData.length <= 0 &&
                    <tr>
                      <td className="text-center" colSpan={this.props.gridColumns.length}
                          style={{verticalAlign: "middle", padding: "3px 9px"}}><span
                        style={{
                          fontSize: "13px!important",
                          color: "#777777"
                        }}>{utils.getLabelByID("NoRecordsFound")}</span></td>
                    </tr>
                  }

                  </tbody>
                </table>
              </div>
            </div>
            <div className="row">

              <div className="col-md-12">
                {this.getPagination(this.props.pagination, offSet)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
}

export default Datatable;
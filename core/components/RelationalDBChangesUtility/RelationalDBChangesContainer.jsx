import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import Portlet from '../../common/Portlet.jsx';
import Table from '../../common/Datatable.jsx';
import ModalBox from '../../common/ModalBox.jsx';
import * as utils from '../../common/utils.js';
import Label from '../../common/Lable.jsx';
import * as gen from '../../common/generalActionHandler'

class RelationalDBChangesContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loadingSchemaChanges: false,
            schemaChangesList: [],
            filterCriteria: undefined,
            groupList: undefined,
            isLoading: false,
            pageNo: 1,
            actions: [{
                "value": "1002",
                "type": "pageAction",
                "label": "ADD",
                "labelName": "COM_AB_Add",
                "actionType": "PORTLET_LINK",
                "iconName": "fa fa-plus",
                "URI": "/groupSetup",
                "children": []
            }],
            allDB:'',
            dbType:[],
            allData:[],
            SelectDBs:[],
            show:false,
            script:'',
            sourceUrl:'',
            destinationUrl:'',
            destinationName:''
        };
        this.generalHandler = gen.generalHandler.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.SourceDB = this.SourceDB.bind(this);
        this.DestinationDB = this.DestinationDB.bind(this);
        this.SubmitChanges = this.SubmitChanges.bind(this);
        this.SubmitChanges2 = this.SubmitChanges2.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.ApplyScript = this.ApplyScript.bind(this);

    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.backListener();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.getEndpointListView) {
            let allDB = nextProps.getEndpointListView.map((profile) => {
                let dbType2 = this.state.dbType
                if (profile.dbType) {
                  dbType2.push(profile)
                  this.setState({
                    dbType:dbType2
                  })
                }
            })
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.actions.generalProcess(constants.getEndpointListView);
    }

    formSubmit(event) {
      let Source = document.getElementById('SourceDB').value
      let Destination = document.getElementById('DestinationDB').value
      let body = {
        "body": {
          "Destination": `${Destination}`,
          "Source": `${Source}`
        }
      }
      this.props.actions.generalAjxProcess(this.state.DBName=='mssql~orm'?constants.CompareDBSql:constants.CompareDBPostgre, body)
        .then(result => {
          this.setState({
            allData:result.response.data.tables
          })
        })
        .catch(err => {
          console.log(err);
        });
    }
    SubmitChanges(event) {
      this.setState({
        show:true
      })
      let Destination = document.getElementById('DestinationDB').value
      let body = {
        "body": {
          tables:this.state.allData,
          Destination:this.state.destinationName
        }
      }
      this.props.actions.generalAjxProcess(this.state.DBName=='mssql~orm'?constants.WriteScriptSQL:constants.WriteScriptPostgreSql, body)
        .then(result => {
          this.setState({
            script:result.response.data
          })
        })
        .catch(err => {
          console.log(err);
        });
    }
    SubmitChanges2(event) {
    }
    SourceDB = (event) => {
      let val =event.target.value
  let body = {"id":val}
  this.props.actions.generalAjxProcess(constants.findEndpointDefinationById, body)
  .then(result => {
    this.setState({
      sourceUrl:result.findEndpointDefinationById.data.address
    })
  })
  .catch(err => {
    console.log(err);
  });
    }
    DestinationDB = (event) => {
      let val =event.target.value
  let body = {"id":val}
  this.props.actions.generalAjxProcess(constants.findEndpointDefinationById, body)
  .then(result => {
    this.setState({
      destinationUrl:result.findEndpointDefinationById.data.address,
      destinationName:result.findEndpointDefinationById.data.name
    })
  })
  .catch(err => {
    console.log(err);
  });
    }
    SelectDB = (event) => {
      this.setState({
        DBName: event.target.value
      });
      let val=[]
        this.state.dbType.map((x)=>{
          if (x.dbType==event.target.value) {
         val.push({text:x.text,value:x.value})
     }   
     this.setState({
      SelectDBs: val
    });  
  })
}
closePopup() {
  this.setState({
      show: false
  })
}
ApplyScript(){
  this.setState({
    show:false
  })
  let Destination = document.getElementById('DestinationDB').value
  let body = {
    "body": {
      script:this.state.script,
      Destination:Destination
    }
  }
  this.props.actions.generalAjxProcess(this.state.DBName=='mssql~orm'?constants.ApplyScriptSQL:constants.ApplyScriptPostgreSql, body)
    .then(result => {
      this.setState({
        script:result.response.data
      })
    })
    .catch(err => {
      console.log(err);
    });
}
    render() {
        if (!this.state.isLoading)
            return (
                <div>
                   <ModalBox isOpen={this.state.show}>
                    <Portlet title={"Script"}>
                            <textarea type="text"  className="form-control" id="description"
                               value={this.state.script.mainQuery} rows="4"
                              style={{resize: "none", width: "100%"}}/>
                            <div className="btn-toolbar">
                                <button type="submit" onClick={this.closePopup} className="pull-right btn green">
                                    {utils.getLabelByID("Close")}
                                </button>
                                <button type="submit" onClick={this.ApplyScript} className="pull-right btn green">
                                    {utils.getLabelByID("Apply")}
                                </button>
                            </div>

                    </Portlet>
                  </ModalBox>
                    <Portlet title={"SQL Utility"}>
                    <div>

                    <div className="row">
                <div className="col-md-7">
                <Label text="Select DB" columns='3' divStyle={{ width: '20%', paddingTop: '20px' }} />
                <div className="col-md-9">
                              <select onChange={this.SelectDB} style={{
                                width: '100%', height: '35px'
                              }} id="SelectDB" name="SelectDB">
                                <option value="mssql~orm">MSSQL</option>
                                <option value="postgres~orm">PostgreSQL</option>
                              </select>
                    </div>
                  </div>
                  </div>
            <div className="row">
                <div className="col-md-7">
                <Label text="Source DB" columns='3' divStyle={{ width: '20%', paddingTop: '20px' }} />
                <div className="col-md-9">
                <select onChange={this.SourceDB} style={{ width: '100%', height: '35px' }} id="SourceDB" name="SourceDB">
                                {this.state.SelectDBs ? this.state.SelectDBs.map((x) => {
                                  return (
                                    <option value={x.value}>{x.text}</option>
                                   )
                                 }) : ''}
                              </select>
                    </div>
                  </div>
                  </div>
                  <div className="row">
                <div className="col-md-7">
                <Label text="Destination DB" columns='3' divStyle={{ width: '20%', paddingTop: '20px' }} />
                <div className="col-md-9">
                          <select onChange={this.DestinationDB}  style={{ width: '100%', height: '35px' }} id="DestinationDB" name="DestinationDB">
                          {this.state.SelectDBs ? this.state.SelectDBs.map((x) => {
                                  return (
                                    <option value={x.value}>{x.text}</option>
                                   )
                                 }) : ''}
                              </select>
                    </div>
                  </div>
                  <div className="row clearfix pull-right">
                <div className="col-md-6">
                    <div className="col-md-3"></div>
                    <div className="col-md-9">
                        <button type="submit" onClick={() => this.formSubmit()} className="btn green" disabled={false}>
                            Identify Changes
                        </button>
                    </div>
                </div>
            </div>
                  </div>
                  </div>
                        <Portlet title={"Identified Changes"} isPermissioned={true}>
                            {this.state.loadingSchemaChanges ? <div className="loader" > Loading...</div> : <Table
                                pagination={false}
                                export={false}
                                search={false}
                                gridColumns={utils.getGridColumnByName("SqlDBChangesGrid")}
                                gridData={this.state.allData}
                                componentFunction={this.ActionHandlers}
                            />}
                        <div style={{display:'flex',justifyContent:'flex-end'}}>
                        <button type="submit" onClick={() => this.SubmitChanges()} className="btn green" disabled={false}>
                        Synchronize
                        </button></div>
                        </Portlet>
                    </Portlet>
                </div >
            );
        else
            return (<div className="loader" > Loading...</div>)
    }
}

function mapStateToProps(state, ownProps) {
    return {
        isLoading: false,
        getEndpointListView:_.get(state.app,"getEndpointListView.data",null)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

RelationalDBChangesContainer.displayName = "SQL Utility";

export default connect(mapStateToProps, mapDispatchToProps)(RelationalDBChangesContainer)
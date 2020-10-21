import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../actions/generalAction'
import * as constants from '../../constants/Communication.js'
import * as requestCreator from '../../common/request.js'
import Input from '../../common/Input.jsx'
import Select from '../../common/Select.jsx'
import Lable from '../../common/Lable.jsx'
import Row from '../../common/Row.jsx'
import Col from '../../common/Col.jsx'
import * as gen from '../../common/generalActionHandler'
import Portlet from '../../common/Portlet.jsx'
import Table from '../../common/Datatable.jsx'
import * as utils from '../../common/utils.js'
import Combobox from '../../../core/common/Select.jsx'
import XLSX from 'xlsx'

const toaster = require('../../common/toaster.js')
import _, { isUndefined } from 'lodash'

class PickupListSearchContainer extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.generalActionHandler = gen.generalHandler.bind(this)
    this.sync = this.sync.bind(this)
    this.pageChanged = this.pageChanged.bind(this)
    this.export = this.export.bind(this)

    this.state = {
      searchCriteria: { typeName: 'core' },
      activePage: 1,
      pageSize: 10,
      typeDataList: [],
      pickupList: [],
      searchForm: {},
      pageData: {},
      isLoading: true,
      typeList: [],
      isOwner: false,
      typeData: undefined
    }
  }
  pageChanged = pageNo => {
    let page = this.state.page
    page.currentPageNo = pageNo
    page.pageSize = pageNo
    this.setState({ page: page })
    this.props.actions.generalProcess(
      constants.getPickupListByType,
      requestCreator.createPickupListRequest(
        {
          currentPageNo: pageNo,
          pageSize: 10
        },
        { type: this.state.searchCriteria.typeName }
      )
    )
  }
  componentDidMount () {
    this.props.actions.generalProcess(
      constants.getTypeData,
      requestCreator.createTypeDataRequest(['USE_CASE'])
    )
    this.props.actions.generalProcess(constants.getTypeSyncOut, {})
    this.props.actions.generalProcess(
      constants.getPickupListByType,
      requestCreator.createPickupListRequest(
        {
          currentPageNo: 1,
          pageSize: 10
        },
        { type: 'core' }
      )
    )
  }
  sync = e => {
    this.props.actions.generalProcess(constants.pushTypeData, {
      body: { typeList: JSON.stringify(this.state.typeList) }
    })
    toaster.showToast('Sync Call Sent successfully', 'OK')
  }

  export = e => {
    let arrayData = []
    let useCase = document.getElementById('useCase').value
    for (let i = 0; i < this.state.typeDataList.length; i++) {
      if (useCase == this.state.typeDataList[i].type) {
        arrayData.push({
          typename: this.state.typeDataList[i].typeName,
          data: this.state.typeDataList[i].data[
            Object.keys(this.state.typeDataList[i].data)[0]
          ]
        })
      }
    }
    let data = []
    for (let i = 0; i < arrayData.length; i++) {
      data.push({ typename: arrayData[i].typename, data: arrayData[i].data })
    }

    let sheetData = { Sheets: {}, SheetNames: [] }
    for (let i = 0; i < data.length; i++) {
      let typeData
      if (data[i].data && data[i].typename) {
        typeData = XLSX.utils.json_to_sheet(data[i].data)
        sheetData = {
          Sheets: { ...sheetData.Sheets, [data[i].typename]: typeData },
          SheetNames: [...sheetData.SheetNames, data[i].typename]
        }
      }
    }
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const excelBuffer = XLSX.write(sheetData, {
      bookType: 'xlsx',
      type: 'array'
    })
    const dataBytes = new Blob([excelBuffer], { type: fileType })
    const url = window.URL.createObjectURL(dataBytes)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', useCase + '.xlsx' || 'file.xlsx')
    document.body.appendChild(link)
    link.click()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.typeDataList && nextProps.typeListForSync) {
      let val = ''
      nextProps.typeDataList.searchResult.map(x => {
        val = x.typeName
      })
      this.setState({
        typeDataList: nextProps.typeDataList.searchResult,
        pageData: nextProps.typeDataList.pageData,
        isOwner: nextProps.typeDataList.isOwner,
        typeList: nextProps.typeListForSync,
        isLoading: false,
        isExport:false,
        val
      })
    }

    if (nextProps.typeData) {
      this.setState({
        typeData: nextProps.typeData
      })
    }

    if (
      nextProps.pickupList &&
      nextProps.pickupList.data &&
      nextProps.pickupList.data.searchResult[0]
    ) {
      let data = _.get(nextProps.pickupList, `data.searchResult`, [])
      let typeName = _.get(data, `typeName`, '')
      let obj = _.get(data, 'data', [])
      this.setState({
        pickupList: data
      })
    } else {
      this.setState({
        pickupList: []
      })
    }
  }

  searchTypes = () => {
    let typeName =
      document.getElementById('typeName') == null
        ? undefined
        : document.getElementById('typeName').value
    let useCase =
      document.getElementById('useCase') == null
        ? undefined
        : document.getElementById('useCase').value
    this.props.actions.generalProcess(
      constants.getPickupListByType,
      requestCreator.createPickupListRequest(
        {
          currentPageNo: 1,
          pageSize: 10
        },
        { type: useCase || 'core', typeName: typeName }
      )
    )
  }

  reset = () => {
    this.setState({
      searchForm: {},
      isExport: true
    })
  }

  addNew = () => {
    this.props.history.push(`/pickupListSetup/edit/newType`)
  }

  render () {
    console.log('statatatataa', this.state.typeDataList)
    if (!this.state.isLoading && this.state.typeDataList)
      return (
        <Row>
          <Col>
            <Portlet title={utils.getLabelByID('List Of Values Search')}>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='form-group col-md-4'>
                    <label className='control-label'>
                      {utils.getLabelByID('Type Name')}
                    </label>
                  </div>
                  <div className='form-group col-md-8'>
                    <input
                      type='text'
                      className='form-control'
                      name='typeName'
                      id='typeName'
                    />
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='form-group col-md-4'>
                    <label className='control-label'>
                      {utils.getLabelByID('MAU_useCase')}
                    </label>
                  </div>
                  <div className='form-group col-md-8'>
                    <select
                      name='useCase'
                      id='useCase'
                      className='form-control'
                    >
                      <option key='-1' value=''>
                        {utils.getLabelByID('RA_Select')}{' '}
                      </option>
                      {this.state.typeData &&
                        this.state.typeData.USE_CASE &&
                        this.state.typeData.USE_CASE.map((option, index) => {
                          return (
                            <option key={index} value={option.value}>
                              {option.label}
                            </option>
                          )
                        })}
                    </select>
                  </div>
                </div>
              </div>
              <br />
              <Row>
                <Col>
                  <Col>
                    <div className='btn-toolbar pull-right'>
                      <button
                        type='submit'
                        className='btn green'
                        disabled={this.state.isExport}
                        onClick={this.export}
                      >
                        {utils.getLabelByID('Export')}
                      </button>
                      {this.state.isOwner && (
                        <button
                          type='submit'
                          className='btn green'
                          onClick={this.sync}
                        >
                          {utils.getLabelByID('Sync to Network')}
                        </button>
                      )}{' '}
                      <button
                        type='submit'
                        className='btn green'
                        onClick={this.searchTypes}
                      >
                        {utils.getLabelByID('Search')}
                      </button>{' '}
                      <button
                        type='button'
                        className='btn btn-default'
                        onClick={this.addNew}
                      >
                        <i className='fa fa-plus'></i>
                        {utils.getLabelByID('Add')}
                      </button>
                    </div>
                  </Col>
                </Col>
              </Row>
            </Portlet>
            <Portlet
              title={utils.getLabelByID('Search Result')}
              isPermissioned={true}
            >
              <Table
                pagination={false}
                export={false}
                search={false}
                pageChanged={this.pageChanged}
                gridColumns={utils.getGridColumnByName('pickupList')}
                gridData={this.state.typeDataList}
                totalRecords={this.state.pageData.totalRecords}
                activePage={this.state.pageData.currentPageNo}
                pageSize={this.state.pageData.pageSize}
              />
            </Portlet>
          </Col>
        </Row>
      )
    else return <div className='loader'>{utils.getLabelByID('Loading')}</div>
  }
}

function mapStateToProps (state, ownProps) {
  return {
    typeDataList: _.get(state.app, 'typeDataListByType.data', undefined),
    typeListForSync: _.get(state.app, 'typeListForSync.data', undefined),
    pickupList: _.get(state.app, 'typeDataListForType', []),
    typeData: state.app.typeData.data
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

PickupListSearchContainer.displayName = 'List Of Values'

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PickupListSearchContainer)

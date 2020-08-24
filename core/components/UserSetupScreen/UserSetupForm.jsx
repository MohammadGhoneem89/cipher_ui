import React from 'react'

import * as constants from '../../constants/Communication.js';

import _ from 'lodash';

import Label from '../../common/Lable.jsx';
import ActionButton from '../../common/ActionButtonNew.jsx';
import Combobox from '../../common/Select.jsx';
import CheckBox from '../../common/CheckBox.jsx';

import Row from '../../common/Row.jsx';
import Col from '../../common/Col.jsx';
import Input from '../../common/Input.jsx';
import { TextArea } from '../../common/FormControls.jsx';


export default function UserSetupForm(props) {

  const {
    onError,
    generalHandler,
    containerState,
    customHandler,
    typeData,
    comboBoxHandler,
    inputHandler,
    userTypeHandler,
    onChangeHandler,
    onSubmit,
    performActionApproval,
    imgDiv,
    performAction,
    disabled
  } = props

  console.log("containerState", containerState);
  let resetAction = {
    value: "4055"
  }
  let unblockAction = {
    value: "4056"
  }
  let activateAction = {
    value: "4056"
  }
  let groupIndex = -1;
  return (
    <form autoComplete="off" role="form" onSubmit={onSubmit}>

      <Row>
        <div className="col-md-6">
          <Row>
            <div className="control-label col-md-5">
              <Label text="User Type" columns='4' style={{ textAlign: 'right' }}
                divStyle={{ width: 'auto', paddingRight: '0px', paddingLeft: '30%' }} />
              <Label text="*" columns='1' style={{ color: 'red', marginLeft: '-10px' }} />
            </div>
            <Combobox
              status={(containerState.errors && containerState.errors.userType) ? "ERROR" : undefined}
              errorIconStyle={{
                left: '365px',
                top: '10px',
                position: 'absolute',
                color: 'darkgrey'
              }}
              fieldname='userType'
              formname='userDetail'
              columns='7'
              placeholder='Select'
              style={{}}
              state={containerState}
              typeName="callerTypes"
              dataSource={typeData}
              multiple={false}
              actionHandler={userTypeHandler}
              className="form-control"
              disabled={disabled}
              isDDL={true}
            />
          </Row>

          <Row>
            <div className="control-label col-md-5">
              <Label text="Auth Type" columns='4' divStyle={{ width: 'auto', paddingRight: '0px', paddingLeft: '30%' }} />
              <Label text={_.get(containerState, 'userDetail.userType', '') === 'Human' ? "*" : ""}
                style={{ color: 'red', marginLeft: '-10px' }} columns='1' />
            </div>
            <Combobox
              status={(containerState.errors && containerState.errors.authType) ? "ERROR" : undefined}
              errorIconStyle={{
                left: '365px',
                top: '10px',
                position: 'absolute',
                color: 'darkgrey'
              }}
              fieldname='authType'
              formname='userDetail'
              columns='7'
              placeholder='Select'
              style={{}}
              state={containerState}
              typeName="authenticationType"
              dataSource={typeData}
              multiple={false}
              actionHandler={comboBoxHandler}
              className="form-control"
              disabled={disabled}
              isDDL={true}
            />
          </Row>

          <Row>

            <div className="control-label col-md-5">
              <Label text="Organization Type" columns='6'
                divStyle={{ width: 'auto', paddingRight: '0px', paddingLeft: '30%' }} />
              <Label text="*" style={{ color: 'red', marginLeft: '-10px' }} columns='1' />
            </div>
            <Combobox
              status={(containerState.errors && containerState.errors.orgType) ? "ERROR" : undefined}
              errorIconStyle={{
                left: '365px',
                top: '10px',
                position: 'absolute',
                color: 'darkgrey'
              }}
              fieldname='orgType'
              formname='userDetail'
              columns='7'
              placeholder='Select'
              style={{}}
              state={containerState}
              typeName="orgTypes"
              dataSource={typeData}
              multiple={false}
              actionHandler={customHandler}
              className="form-control"
              disabled={disabled}
              isDDL={true}
            />

          </Row>

          <Row>
            <div className="control-label col-md-5">
              <Label text="Organization Name" columns='6'
                divStyle={{ width: 'auto', paddingRight: '0px', paddingLeft: '30%' }} />
              <Label text="*" style={{ color: 'red', marginLeft: '-10px' }} columns='1' />
            </div>
            <Combobox
              status={(containerState.errors && containerState.errors.orgCode) ? "ERROR" : undefined}
              errorIconStyle={{
                left: '365px',
                top: '10px',
                position: 'absolute',
                color: 'darkgrey'
              }}
              fieldname='orgCode'
              formname='userDetail'
              columns='7'
              placeholder='Select'
              style={{}}
              state={containerState}
              typeName={"entityNamesFiltered"}
              dataSource={typeData}
              multiple={false}
              actionHandler={comboBoxHandler}
              className="form-control"
              disabled={disabled}
              isDDL={true}
            />
          </Row>

        </div>
        <div className="col-md-6">
          {imgDiv()}

        </div>
      </Row>
      <br />
      <Row>
        <div className="col-md-6">
          <Row>
            <div className="control-label  col-md-5">
              <Label text="User ID" columns='8' divStyle={{ width: 'auto', paddingRight: '0px', paddingLeft: '30%' }} />
              <Label text="*" style={{ color: 'red', marginLeft: '-10px' }} columns='1' />
            </div>
            <Input
              status={(containerState.errors && containerState.errors.userID) ? "ERROR" : undefined}
              errorIconStyle={{
                left: '365px',
                top: '10px',
                position: 'absolute',
                color: 'darkgrey'
              }}
              fieldname='userID'
              formname='userDetail'
              columns='7'
              placeholder='john.doe'
              state={containerState}
              actionHandler={inputHandler}
              className="form-control"
              disabled={containerState.id ? true : false} />
          </Row>

        </div>
        <div className="col-md-6">
          {(!containerState.id || containerState.editPassword) && <Row>
            <div className="control-label col-md-5" style={{ width: '23%' }}>
              <Label text="Password" columns='8' divStyle={{ width: 'auto', paddingRight: '0px' }} />
              <Label text="*" style={{ color: 'red', marginLeft: '-10px' }} columns='1' />

            </div>

            <Input
              status={(containerState.errors && containerState.errors.password) ? "ERROR" : undefined}
              errorIconStyle={{
                left: '365px',
                top: '10px',
                position: 'absolute',
                color: 'darkgrey'
              }}
              fieldname='password'
              formname='userDetail'
              columns='7'
              placeholder='Secret Key'
              state={containerState}
              type='password'
              actionHandler={inputHandler}
              className="form-control pwd-input"
              disabled={disabled} />


          </Row>}


        </div>

      </Row>


      <br />
      <Row>
        <div className="col-md-6">
          <Row>
            <div className="control-label col-md-5">
              <Label text="First Name" columns='4' divStyle={{ width: 'auto', paddingRight: '0px', paddingLeft: '30%' }} />
              <Label text={_.get(containerState, 'userDetail.userType', '') === 'Human' ? "*" : ""}
                style={{ color: 'red', marginLeft: '-10px' }} columns='1' />
            </div>
            <Input
              status={(containerState.errors && containerState.errors.firstName) ? "ERROR" : undefined}
              errorIconStyle={{
                left: '365px',
                top: '10px',
                position: 'absolute',
                color: 'darkgrey'
              }}
              fieldname='firstName'
              formname='userDetail'
              columns='7'
              placeholder='John'
              state={containerState}
              actionHandler={inputHandler}
              className="form-control"
              disabled={disabled} />
          </Row>
        </div>
        <div className="col-md-6">
          <Row>
            <div className="control-label col-md-5" style={{ width: '23%' }}>
              <Label text="Last Name" columns='8' divStyle={{ width: 'auto', paddingRight: '0px' }} />
              <Label text="" columns='1' />
            </div>
            <Input
              status={(containerState.errors && containerState.errors.lastName) ? "ERROR" : undefined}
              errorIconStyle={{
                left: '365px',
                top: '10px',
                position: 'absolute',
                color: 'darkgrey'
              }}
              fieldname='lastName'
              formname='userDetail'
              columns='7'
              placeholder='Doe'
              state={containerState}
              actionHandler={inputHandler}
              className="form-control"
              disabled={disabled} />
          </Row>
        </div>


      </Row>


      <Row>
        <div className="col-md-6">
          <Row>
            <div className="control-label col-md-5">
              <Label text="Email" columns='4' divStyle={{ width: 'auto', paddingRight: '0px', paddingLeft: '30%' }} />
              <Label text={"*"} style={{ color: 'red', marginLeft: '-10px' }} columns='1' />

            </div>
            <Input
              status={((containerState.errors && containerState.errors.email) || (containerState.errors && containerState.errors.errors && containerState.errors.errors.email)) ? "ERROR" : undefined}
              errorIconStyle={{
                left: '365px',
                top: '10px',
                position: 'absolute',
                color: 'darkgrey'
              }}
              fieldname='email'
              formname='userDetail'
              columns='7'
              placeholder='sample@org.com'
              state={containerState}
              actionHandler={inputHandler}
              className="form-control"
              disabled={disabled} />
          </Row>
        </div>
        <div className="col-md-6">
          <Row>
            <div className="control-label col-md-5" style={{ width: '23%' }}>
              <Label text="Allowed IP" columns='8' divStyle={{ width: 'auto', paddingRight: '0px' }} />
              <Label text={"*"} style={{ color: 'red', marginLeft: '-10px' }} columns='1' />
            </div>
            <Input
              status={(containerState.errors && containerState.errors.allowedIPRange) ? "ERROR" : undefined}
              errorIconStyle={{
                left: '365px',
                top: '10px',
                position: 'absolute',
                color: 'darkgrey'
              }}
              fieldname='allowedIPRange'
              formname='userDetail'
              columns='7'
              placeholder='xxx.xxx.xxx.xx'
              state={containerState}
              actionHandler={inputHandler}
              className="form-control"
              disabled={disabled} />
          </Row>
        </div>


      </Row>

      <Row>
        <div className="col-md-6">
          <Row>
            <div className="control-label col-md-5">
              <Label text="Landing Page" columns='4'
                divStyle={{ width: 'auto', paddingRight: '0px', paddingLeft: '30%' }} />
              <Label text={_.get(containerState, 'userDetail.userType', '') === 'Human' ? "*" : ""} columns='1'
                style={{ color: 'red', marginLeft: '-10px' }} />
            </div>
            <Combobox
              status={(containerState.errors && containerState.errors.firstScreen) ? "ERROR" : undefined}
              errorIconStyle={{
                left: '365px',
                top: '10px',
                position: 'absolute',
                color: 'darkgrey'
              }}
              fieldname='firstScreen'
              formname='userDetail'
              columns='7'
              placeholder='Select'
              style={{}}
              state={containerState}
              typeName="firstScreens"
              dataSource={typeData}
              multiple={false}
              actionHandler={comboBoxHandler}
              className="form-control"
              disabled={disabled}
              isDDL={true}
            />

          </Row>
        </div>
        <div className="control-label col-md-6">
          <Label text="Is Active" columns='8' divStyle={{ width: 'auto', paddingRight: '0px' }}
            style={{ paddingLeft: '2px' }} />
          <CheckBox
            fieldname='isActive'
            formname='userDetail'
            value={_.get(containerState, 'userDetail.isActive', false)}
            columns='1'
            style={{}}
            actionHandler={generalHandler}
            disabled={disabled}
          />
        </div>


      </Row>


      <hr></hr>

      <Row>
        <Col col='6'>


          <div>

            <div className="table100 ver1 m-b-110">
              <div className="table100-head orderdetails-table" style={{ paddingBottom: '3px' }}>
                <h4 className="caption" style={{ fontWeight: 'bold', textAlign: 'center', color: 'black' }}>User
                  Groups</h4>
              </div>
              <div className="">
                <div className="col-md-12">
                  <div className="col-md-12 text-center">
                    <div className="custom-control custom-checkbox" style={{ padding: '26px', textAlign: 'left' }}>

                      {
                        containerState.userDetail.userType == 'Human' &&
                        containerState.groupUI.map((item, index) => {
                          console.log(JSON.stringify(item));
                          return (<div key={index} style={{ padding: '10px' }}>
                            <label key={1} className="mt-checkbox mt-checkbox-outline"
                              style={{ marginBottom: "0px", marginTop: "0px" }}>
                              <input type="checkbox" className="form-control"
                                name={index}
                                checked={item.isAssigned ? true : false}
                                // checked={item.isAssigned}
                                disabled={disabled}
                                onChange={onChangeHandler}
                              />
                              <span></span>
                              {item.name}
                            </label>
                          </div>
                          )
                        })
                      }
                      {
                        (containerState.userDetail.userType == 'API') &&
                        containerState.groupAPI.map((item, index) => {
                          console.log(JSON.stringify(item));
                          return (<div key={index} style={{ padding: '10px' }}>
                            <label key={1} className="mt-checkbox mt-checkbox-outline"
                              style={{ marginBottom: "0px", marginTop: "0px" }}>
                              <input type="checkbox" className="form-control"
                                name={index}
                                checked={item.isAssigned ? true : false}
                                onChange={onChangeHandler}
                                disabled={disabled}
                              // checked={item.isAssigned}
                              />
                              <span></span>
                              {item.name}
                            </label>
                          </div>
                          )
                        })
                      }
                      {(containerState.userDetail.userType != 'API' && containerState.userDetail.userType != 'Human') &&
                        <div>
                          <b><i>Note: Please select usertype to get Group List</i></b>
                        </div>
                      }

                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>


        </Col>
        <Col col='6'>
          <div className="table100 ver1 m-b-110">
            <div className="table100-head orderdetails-table" style={{ paddingBottom: '3px' }}>
              <h4 className="caption" style={{ fontWeight: 'bold', textAlign: 'center', color: 'black' }}>User Association
                - Blockchain</h4>
            </div>
            <br></br>
            <br></br>
            <div className='row' style={{ paddingLeft: '22px', paddingRight: '22px' }}>


              <div className="control-label  col-md-5">
                <Label text="User Association Hyperledger" columns='5' divStyle={{ width: 'auto', paddingRight: '0px' }} />
                <Label text={""} columns='1' style={{ color: 'red', marginLeft: '-10px' }} />
              </div>

              <Combobox
                fieldname='hypUser'
                formname='userDetail'
                columns='7'
                placeholder='Select'
                style={{}}
                state={containerState}
                typeName="hyperledgerData"
                dataSource={
                  {
                    'hyperledgerData': (() => {
                      if (containerState.userDetail.orgType) {
                        return typeData.hyperledgerData.filter((item) => {
                          return item.orgType === containerState.userDetail.orgType;
                        });
                      } else {
                        return [];
                      }
                    })()
                  }
                }
                multiple={false}
                actionHandler={comboBoxHandler}
                className="form-control"
                disabled={disabled}
              />

            </div>
            <div className='row' style={{ paddingLeft: '22px', paddingRight: '22px' }}>
              <div className="control-label col-md-5">
                <Label text="User Association Quorrum" columns='5' divStyle={{ width: 'auto', paddingRight: '0px' }} />
                <Label text={""} columns='1' style={{ color: 'red', marginLeft: '-10px' }} />
              </div>
              <Combobox
                fieldname='quorrumUser'
                formname='userDetail'
                columns='7'
                placeholder='Select'
                style={{}}
                state={containerState}
                typeName={"quorrumData"}
                dataSource={typeData}
                multiple={false}
                actionHandler={comboBoxHandler}
                className="form-control"
                disabled={disabled}
              />
            </div>
          </div>
        </Col>
      </Row>
      {containerState.userDetail.status != 'APPROVED' &&
        <Row>
          <Col style={{ marginLeft: "20px" }}>
            <div className='row' style={{ paddingLeft: '22px', paddingRight: '22px' }}>
              <div className="control-label col-md-12" >
                <Label text="Rejection Reason" columns='5' divStyle={{ width: 'auto', paddingRight: '0px' }} />
                <Label text={""} columns='1' style={{ color: 'red', marginLeft: '-10px' }} />
              </div>
              <div className="col-md-12">
                <div className="col-md-12">
                  <textarea id="rejectionReason" className="form-control" disabled={!(containerState.userDetail.status == 'PENDING')} name="rejectionReason"
                    rows="4" >{_.get(containerState, 'userDetail.rejectionReason', '')}</textarea>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      }
      <br></br>
      <div className="clearfix" style={{ padding: "30px" }}>


        &nbsp;
        &nbsp;
        &nbsp;
        &nbsp;
        {/* <div className="col-md-8"></div> */}
        {/* <div className="col-md-4"> */}
        <div className={"btn-toolbar pull-left"} style={{ marginLeft: "15px" }}>
          <button
            type="button"
            className="btn green"
            style={{ cursor: "pointer", padding: '7px', fontSize: '12px', borderRadius: '0' }}
            onClick={() => {
              performAction(resetAction)

            }}
          >
            {"Reset Password"}
          </button>
          <button
            type="button"
            className="btn green"
            style={{ cursor: "pointer", padding: '7px', fontSize: '12px', borderRadius: '0' }}
            onClick={() => {
              performAction(unblockAction)

            }}
          >
            {"Unblock"}
          </button>
        </div>
        &nbsp;&nbsp;

        {/*{_.get(containerState, 'userDetail.isActive', true) === false ? rejectionReason */}
        {/*  <button*/}
        {/*    type="button"*/}
        {/*    className="btn green"*/}
        {/*    style={{cursor: "pointer", padding: '7px', fontSize: '12px', borderRadius: '0', alignItems: 'right'}}*/}
        {/*    onClick={() => {*/}
        {/*      performAction(activateAction)*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    {"Unlock user"}*/}
        {/*  </button>*/}
        {/*  : null}*/}
        {/*/!* </div> *!/*/}

        {containerState.view &&
          <div className="btn-toolbar pull-right">

            <button
              type="button"
              className="btn green"
              style={{ cursor: "pointer", padding: '7px', fontSize: '12px', borderRadius: '0' }}
              disabled={!(containerState.userDetail.status == "PENDING")}
              onClick={() => {
                performActionApproval("Approve")
              }}
            >
              {"Approve"}
            </button>
            <button
              type="button"
              className="btn green"
              style={{ cursor: "pointer", padding: '7px', fontSize: '12px', borderRadius: '0' }}
              onClick={() => {
                performActionApproval("Reject")
              }}
            >
              {"Reject"}
            </button>
          </div>}
        {!containerState.view &&
          <div>
            <ActionButton actionList={containerState.actions} />
          </div>}



      </div>


    </form>
  )

}

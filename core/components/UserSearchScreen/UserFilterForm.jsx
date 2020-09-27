import React from 'react';
import Combobox from '../../common/Select.jsx';

const UserFilterForm = props => {
  const { handleSubmit, resetform ,state, updateState} = props;

  let userType = sessionStorage.orgType
  let orgType = [
    { value: "Settlement", label: "Settlement" },
    { value: "Entity", label: "Entity" },
    { value: "Acquirer", label: "Acquirer" },
    { value: "DSG", label: "SDG" }
  ];
  let callerType = [
    { value: "Human", label: "Human" },
    { value: "API", label: "API" }
  ];

  let status = [
    { value: "APPROVED", label: "APPROVED" },
    { value: "REJECTED", label: "REJECTED" },
    { value: "PENDING", label: "PENDING" }
  ];

  return (
    <form id="usersetuplist" role="form" >
      <div className="row">
        <div className="col-md-6">
          <div className="form-group col-md-4">
            <label className='control-label'>User ID</label>
          </div>
          <div className="form-group  col-md-8">
            {/* <TextInput
              name="userID"
              id="userID"
              type="text"
            /> */}
            <input className="form-control" id="userID"></input>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group col-md-4">
            <label className='control-label'>First Name</label>
          </div>
          <div className="form-group col-md-8">
            {/* <TextInput
              name="firstName"
              id="firstName"
              type="text"
            /> */}
            <input className="form-control" id="firstName"></input>
          </div>

        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group col-md-4">
            <label className='control-label'>User Type</label>
          </div>
          <div className="form-group ">
            {/* <DropdownInput name="userType" id="userType" options={callerType}

            /> */}
            <Combobox
              errorIconStyle={{
                left: '365px',
                top: '10px',
                position: 'absolute',
                color: 'darkgrey'
              }}
              fieldname='userType'
              formname='search'
              columns='8'
              placeholder='Select'
              style={{}}
              state={state}
              typeName="callerType"
              dataSource={{ callerType: callerType }}
              multiple={false}
              actionHandler={updateState}
              className="form-control"
              isDDL={true}
            />
          </div>

        </div>
        <div className="col-md-6">
          <div className="form-group col-md-4">
            <label className='control-label'>Status</label>
          </div>
          <div className="form-group ">
            {/* <DropdownInput name="status" name="id" options={status}
            /> */}
              <Combobox
              errorIconStyle={{
                left: '365px',
                top: '10px',
                position: 'absolute',
                color: 'darkgrey'
              }}
              fieldname='status'
              formname='search'
              columns='8'
              placeholder='Select'
              style={{}}
              state={state}
              typeName="status"
              dataSource={{ status: status }}
              multiple={false}
              actionHandler={updateState}
              className="form-control"
              isDDL={true}
            />
          </div>

        </div>
      </div>
      <div className="form-actions right">
        <div className="form-group col-md-12">
          <div className="btn-toolbar pull-right">
            <a href="javascript:;" className="btn green" onClick={handleSubmit}>Search</a>
            <a href="javascript:;" className="btn default" onClick={resetform}>Clear</a>
          </div>
        </div>
      </div>
    </form>
  );
};


export default UserFilterForm;
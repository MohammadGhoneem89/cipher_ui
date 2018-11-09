import React from 'react';
import * as utils from "../../../../core/common/utils";

const UpdateBlockForm = ({submit}) => {
  let formRef;

  function reset() {
    formRef.reset();
  }

  return <form onSubmit={submit} ref={el => formRef = el}>
    <div className="row">
      <div className="col-md-6 ">
        <input name="accountName" type="text" placeholder="Please Enter Account Name" className="form-control" required/>
      </div>
      <div className="col-md-6 ">
        <input name="amount" type="number" placeholder="Please Enter Amount" min="0" className="form-control" required/>
      </div>
    </div>
    <br/>
    <div className="row">
      <div className="col-md-12">
        <div className="btn-toolbar pull-right">
          <button type="submit" className="btn green"><i
            className="fa fa-paper-plane"/>{' '}{utils.getLabelByID("Submit")}
          </button>
          <button type="button" className="btn default" onClick={reset}>
            {utils.getLabelByID("Clear")}
          </button>
        </div>
      </div>
    </div>
  </form>
};

export default UpdateBlockForm;
import React, { Component } from 'react';
class Form extends Component {
    state = {  }
    render() { 
        return ( <form  >
            <div className="row">
            
            <div className="col-md-6 ">
              <label>Choose Options</label>
              <select>
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="opel">Opel</option>
  <option value="audi">Audi</option>
</select>
              </div>
              <div className="col-md-6 ">
               
              </div>
             
            </div>
            
            <div className="row">
              <div className="col-md-12">
                <div className="btn-toolbar pull-right">
                  {/* <button type="submit" className="btn green">
                  </button> */}
                  <br/><br/>
                  <button type="button" className="btn default" >
                   Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
         );
    }
}
 
export default Form;
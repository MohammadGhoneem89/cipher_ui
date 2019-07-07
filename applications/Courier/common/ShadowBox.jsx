/*standard imports*/
import React, {PropTypes} from 'react';

const ShadowBox: React.StatelessComponent<{}> = props => {
  return <div className="col-md-12">
    <div className="shadowBox squarebox">
      <div className="portletheading">
        <div className="caption"><span className="caption-subject">{props.title}</span></div>
        <div className="titleicon shipto"><img src={props.icon}/></div>
      </div>
      <div className="boxBody">
        <div className="form-group">
          {props.children}
        </div>
      </div>

    </div>
  </div>
};

export default ShadowBox;
import React from 'react';

class Checklist extends React.Component {

    prepareList = (listObject) => {
        let options = [];
        for (let [index, list] of listObject.entries()) {
            {alert(_.get(this.props.state, `${this.props.formname}.${this.props.fieldname}`))}
            options.push(
                <label key={index} className="mt-checkbox mt-checkbox-outline" style={{ marginBottom: "15px", marginTop: "0px", marginRight: '30px', paddingBottom: '10px' }}>
                    <label className="bold">{list.label}</label>
                    <input type="checkbox" className="PostCSS" name={`${this.props.fieldname}-${index}`} value={list.value}
                        id={`${this.props.fieldname}-${index}`}
                        
                        checked={_.get(this.props.state, `${this.props.formname}.${this.props.fieldname}`, []).indexOf(list.value) > -1 ? true : false}
                        onChange={this.props.actionHandler.bind(this, this.props.formname, this.props.fieldname, 'checklist')} />
                    <span></span>
                </label>
            )

        }
        return options;
    };

    render() {
        return (
            <div className={`et-chckbox col-md-${this.props.columns}`}>
                <div className="checkbox-wrapper">
                    {this.prepareList(_.get(this.props.dataSource, this.props.typeName, []))}
                </div>
            </div>
        );
    }
}

export default Checklist;


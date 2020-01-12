export function generalHandler(formname, fieldname, type, e) {
    // console.log('type', type, e);
    if (type == "textbox" || type == "radiolist" || type == "combobox" || type == "textarea") {
        let value = e.target.value;
        let formdata = _.get(this.state, formname, {});
        _.set(formdata, e.target.name, value);
        this.setState({
            [formname]: formdata
        }, () => {
            // console.log('DATA-->', JSON.stringify(this.state[formname]));
        });

        
    } else if (type == "checklist") {
        let value = e.target.value;
        let checked = e.target.checked;
        let prevState = _.get(this.state, `${formname}.${fieldname}`, [])
        if (checked && prevState.indexOf(value) === -1) {
            prevState.push(value)
        } else {
            prevState.splice(prevState.indexOf(value), 1);
        }
        let formdata = _.get(this.state, formname, {});
        _.set(formdata, fieldname, prevState);


        this.setState({
            [formname]: formdata
        })

        console.log('formnam11e', (this.state[formname]));
        // });
    } else if (type == "checkbox") {
        let value = e.target.checked;
        let formdata = _.get(this.state, formname, {});

        _.set(formdata, e.target.name, value);
        this.setState({
            [formname]: formdata
        }, () => {
            console.log('formname', JSON.stringify(this.state[formname]));
        });
    }
}

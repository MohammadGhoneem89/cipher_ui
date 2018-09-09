import React from 'react';
import {Field} from 'redux-form';
import * as utils from './utils.js';

const {DOM: {textarea}} = React;

export const renderTextInput = ({input, id, className, type, disabled, isRequired, label, placeholder, style, meta: {touched, error, warning}}) => (
    <div className={error && touched ? "form-group has-error has-feedback" : ""}>
        <label className="control-label">
            {label}
            {touched && error && <span className="control-label"> ({error})
        </span>}
        </label>
        <input id={id} {...input} type={type} className={className || "form-control"} style={{...style}}
               placeholder={placeholder}
               required={isRequired}
               disabled={disabled}/>
    </div>
);

export const renderInput = ({input, id, className, type, disabled, isRequired, label, placeholder, style, meta: {touched, error, warning}}) => (
  <div className={error && touched ? "form-group has-error has-feedback" : ""}>
    <input id={id} {...input} type={type} className={className || "form-control"} style={{...style}}
           placeholder={placeholder}
           required={isRequired}
           disabled={disabled}/>
    <label className="control-label">
      {touched && error && <span className="control-label"> ({error})
        </span>}
    </label>
  </div>
);


export const renderTextArea = ({input, id, className, type, disabled, isRequired, label, style, meta: {touched, error, warning}}) => (
    <div className={error && touched ? "form-group has-error has-feedback" : ""}>
        <label className="control-label">
            {label}
            {touched && error && <span className="control-label"> ({error})
        </span>}
        </label>
        <textarea id={id} {...input} type={type} className={className || "form-control"} style={{...style}}
                  required={isRequired}
                  disabled={disabled}/>
    </div>
);


export const renderDataList = ({input, list, className, type, disabled, isRequired, label, style, meta: {touched, error, warning}, children}) => (
    <div className={error && touched ? "form-group has-error has-feedback" : ""}>
        <label className="control-label">{label}</label>
        <input {...input} list={list} type={type} className={className || "form-control"} style={{...style}}
               required={isRequired}
               disabled={disabled}/>
        <datalist id={list}>
            {children}
        </datalist>
        {touched &&
        error &&
        <span className="control-label">
          {error}
        </span>}
    </div>
);

export const renderCheckBox = ({input, id, className, type, disabled, isRequired, style, meta: {touched, error, warning}}) => (
    <input {...input} type={type} className={className || "form-control"} style={{...style}} disabled={disabled}
           required={isRequired}/>

);
export const renderDropdown = ({input, id, className, type, label, disabled, isRequired, style, meta: {touched, error, warning}, children}) => (
    <div className={error && touched ? "form-group has-error has-feedback" : ""}>
        <label>{label}</label>
        <select {...input} type={type} className={className || "form-control"} style={{...style}} disabled={disabled}
                required={isRequired}>
            {children}
        </select>
        {touched &&
        error &&
        <span className="control-label">
          {error}
        </span>}
    </div>
);


export const DateInput = ({name, label, type, disabled, isRequired, style}) => (
    <div className="">
        <label>{label}</label>
        <div className="input-group input-medium date date-picker" data-date-format="dd-mm-yyyy"
             data-date-start-date="+0d" style={{zIndex: 0}}>
            <Field
                name={name}
                type={type}
                component={renderTextInput}
                disabled={disabled}
                isRequired={isRequired}
                style={style}
            />
            <span className="input-group-btn">
            <button className="btn default" type="button">
                <i className="fa fa-calendar"/>
            </button>
        </span>
        </div>
    </div>
);

export const DropdownInput = (props) => (

    <Field
        {...props}
        component={renderDropdown}>
        <option value={""}>{utils.getLabelByID("RA_Select")}</option>
        {props.options.map((option, index) => {
            return (
                <option key={index} value={option.value}>{option.label}</option>
            );
        })}
    </Field>
);
// export const DropdownInputWithoutSelect = (props) => (
//
//         <Field
//             {...props}
//             component={renderDropdown}>
//             {props.options.map((option, index) => {
//                 return (
//                     <option key={index} value={option.value}>{option.label}</option>
//                 );
//             })}
//         </Field>
//     );


// export const DropdownInput = ({name, label, disabled, onChange, isRequired, style, options}) => (
//     <div className="form-group">
//         <label>{label}</label>
//         <Field
//             {...props}
//             component={renderDropdown}
//         >
//         <Field
//             name={name}
//             onChange={onChange}
//             component={renderDropdown}
//             disabled={disabled}
//             isRequired={isRequired}
//             style={style}>
//             <option value={undefined}>SELECT</option>
//             {options.map((option, index) => {
//                 return (
//                     <option key={index} value={option.value}>{option.label}</option>
//                 );
//             })}
//
//         </Field>
//     </div>
// );

export const DataList = (props) => (
    <Field
        {...props}
        component={renderDataList}
    >
        {props.options.map((option, index) => {
            return (
                <option key={index}>{option.label}</option>
            );
        })}
    </Field>
);

export const TextInput = (props) => (
    <Field
        {...props}
        component={renderTextInput}
    />
);

export const Input = (props) => (
  <Field
    {...props}
    component={renderInput}
  />
);



export const CheckboxInput = ({name, label, disabled, type, style}) => {
    return (<label className="mt-checkbox mt-checkbox-outline" style={{marginBottom: "0", marginTop: "20px"}}>
        <label>{label}</label>
        <Field
            name={name}
            type={type}
            component={renderCheckBox}
            style={style}
            disabled={disabled}
        />
        <span/>
    </label>);
};

export const CheckboxList = ({children}) => {
    return (<div className="form-group">
        <div className="icheck-list">
            {children}
        </div>
    </div>)
};

export const TextArea = (props) => {
    return (<div>
        <Field {...props} component={renderTextArea}/>
    </div>);
};
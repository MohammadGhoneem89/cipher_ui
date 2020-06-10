const validate = values => {
    const errors = {};
    if (!values.templateName) {
        errors.templateName = 'Required';
    }

    if(!values.fileType || values.fileType === "SELECT"){
        errors.fileType = 'Required';
    }

    // if(!values.externalField){
    //     errors.externalField = 'Required';
    // }
    //
    // if(!values.internalField){
    //     errors.internalField = 'Required';
    // }
    return errors
};

export default validate;
const validate = values => {
    const errors = {};
   
    if(!values.name){
        errors.name = 'Required';
    }    
    if(!values.type){
        errors.type = 'Required';
    }
    return errors
};

export default validate;
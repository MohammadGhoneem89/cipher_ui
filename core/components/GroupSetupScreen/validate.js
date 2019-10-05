const validate = values => {
    const errors = {};
   
    if(!values.name){
        errors.name = 'Required';
    }    
    if(!values.type){
        errors.type = 'Required';
    }
    if(!values.usecase){
        errors.usecase = 'Required';
    }
    return errors
};

export default validate;
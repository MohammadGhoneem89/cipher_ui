    const validate = values => {
    const errors = {};
   
    if(!values.userID){
        errors.userID = 'Required';
    }
    if(!values.userID){
        errors.userID = 'Required';
    }    
   return errors
};

export default validate; 
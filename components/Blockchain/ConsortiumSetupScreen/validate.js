const validate = values => {
    const errors = {};
    if (!values.entityName) {
        errors.entityName = 'Required';
    }
    if(!values.arabicName){
        errors.arabicName = 'Required';
    }

    if(values.services){
        errors.services = [];
        values.services.map((item, index) =>{
            errors.services[index] = {serviceName: undefined, serviceCode: undefined};
            if(!item.serviceName){
                errors.services[index].serviceName = "Required";
            }
            if(!item.serviceCode){
                errors.services[index].serviceCode = "Required";
            }
        });
    }

    if(!values.shortCode){
        errors.shortCode = 'Required';
    }
    if(!values.legacyCode){
        errors.legacyCode = 'Required';
    }

    if(values.recon && values.recon.integrationType==="File"){
        // errors.recon.integrationType = "Error";
    }
    return errors
};

export default validate;
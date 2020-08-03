const validate = values => {

  const errors = {};
  if (!values.entityName) {
    errors.entityName = 'Required';
  }
  if (!values.arabicName) {
    errors.arabicName = 'Required';
  }
  if (!values.orgType) {
    errors.orgType = 'Required';
  }
  if (!values.spCode) {
    errors.spCode = 'Required';
  }
  if (values.services) {
    errors.services = [];
    values.services.map((item, index) => {
      errors.services[index] = {serviceName: undefined, serviceCode: undefined};
      if (!item.serviceName) {
        errors.services[index].serviceName = "Required";
      }
      if (!item.serviceCode) {
        errors.services[index].serviceCode = "Required";
      }
    });
  }

  if (!values.shortCode) {
    errors.shortCode = 'Required';
  }
  if (!values.legacyCode) {
    errors.legacyCode = 'Required';
  }

  if (values.recon && values.recon.integrationType === "File") {
    // errors.recon.integrationType = "Error";
  }
  //For Contact Form
  if(values.contacts){
    //const pattern = ;
    errors.contacts = [];
    values.contacts.map((item, index) => {
      errors.contacts[index] = {contactName: undefined, mobile: undefined, email: undefined};
      if (!item.email) {
        errors.contacts[index].email = "Required";
      }
      if (!/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(item.email)) {
        errors.contacts[index].email = "Email is not valid";
      }
      if (!item.mobile) {
        errors.contacts[index].mobile = "Required";
      }
      if (!item.contactName) {
        errors.contacts[index].contactName = "Required";
      }
    });
  }
  return errors
};

export default validate;
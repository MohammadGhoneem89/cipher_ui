import SampleAppENResources from '../SampleApp/constants/appENResources';
import WaslAppENResources from '../WASL/constants/appENResources';
import StartaAppENResources from '../starta/constants/appARResources';
import SmilesAppENResources from '../etisalat_smiles_project/constants/appENResources'
let langResources = {
  ...SampleAppENResources,
  ...WaslAppENResources,
  ...StartaAppENResources,
  ...SmilesAppENResources
};

module.exports = langResources;

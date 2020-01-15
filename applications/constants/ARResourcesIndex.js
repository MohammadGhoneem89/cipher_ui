import SampleAppARResources from '../SampleApp/constants/appARResources';
import WaslARResources from '../WASL/constants/appARResources';
import StartaAppARResources from '../starta/constants/appARResources';
import SmilesARResources from '../etisalat_smiles_project/constants/appARResources'
let langResources = {
  ...SampleAppARResources,
  ...WaslARResources,
  ...StartaAppARResources,
  ...SmilesARResources,
};

module.exports = langResources;
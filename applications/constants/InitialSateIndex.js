import sampleAppInitialState from '../SampleApp/constants/appInitialState';
import WaslInitialState from '../WASL/constants/appInitialState';
import StrataInitialState from '../starta/constants/appInitialState';
import SmilesInitialState from '../etisalat_smiles_project/constants/appInitialState';
export default {
  ...sampleAppInitialState,
  ...WaslInitialState,
  ...StrataInitialState,
  ...SmilesInitialState
}
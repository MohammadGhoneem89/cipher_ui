import sampleAppInitialState from '../SampleApp/constants/appInitialState';
import WaslInitialState from '../WASL/constants/appInitialState';
import StrataInitialState from '../starta/constants/appInitialState';

export default {
  ...sampleAppInitialState,
  ...WaslInitialState,
  ...StrataInitialState
}
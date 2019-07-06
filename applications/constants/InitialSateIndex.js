import sampleAppInitialState from '../SampleApp/constants/appInitialState';
import WaslInitialState from '../WASL/constants/appInitialState';
import CourierInitialState from '../Courier/constants/appInitialState';

export default {
  ...sampleAppInitialState,
  ...WaslInitialState,
  ...CourierInitialState
}
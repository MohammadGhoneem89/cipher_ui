import SampleAppCommunication from '../SampleApp/constants/appCommunication';
import WaslAppCommunication from '../WASL/constants/appCommunication';
import CourierAppCommunication from '../Courier/constants/appCommunication';
module.exports = {
  ...SampleAppCommunication,
  ...WaslAppCommunication,
  ...CourierAppCommunication
};

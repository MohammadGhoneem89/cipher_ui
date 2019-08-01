import SampleAppCommunication from '../SampleApp/constants/appCommunication';
import WaslAppCommunication from '../WASL/constants/appCommunication';
import StartaAppCommunication from '../starta/constants/appCommunication';
module.exports = {
  ...SampleAppCommunication,
  ...WaslAppCommunication,
  ...StartaAppCommunication
};

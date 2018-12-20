import SampleAppENResources from '../SampleApp/constants/appENResources';
import WaslAppENResources from '../WASL/constants/appENResources';

let langResources = {
  ...SampleAppENResources,
  ...WaslAppENResources,
};

module.exports = langResources;

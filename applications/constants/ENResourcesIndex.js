import SampleAppENResources from '../SampleApp/constants/appENResources';
import WaslAppENResources from '../WASL/constants/appENResources';
import StartaAppENResources from '../starta/constants/appARResources';

let langResources = {
  ...SampleAppENResources,
  ...WaslAppENResources,
  ...StartaAppENResources
};

module.exports = langResources;

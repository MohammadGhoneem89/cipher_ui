import SampleAppARResources from '../SampleApp/constants/appARResources';
import WaslARResources from '../WASL/constants/appARResources';
import StartaAppARResources from '../starta/constants/appARResources';

let langResources = {
  ...SampleAppARResources,
  ...WaslARResources,
  ...StartaAppARResources
};

module.exports = langResources;
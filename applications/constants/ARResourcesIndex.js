import SampleAppARResources from '../SampleApp/constants/appARResources'
import WaslARResources from '../WASL/constants/appARResources'

let langResources = {
  ...SampleAppARResources,
  ...WaslARResources
};

module.exports = langResources;
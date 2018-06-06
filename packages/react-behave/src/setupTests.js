import { configure } from 'enzyme';
// Until the release of the new version of enzyme-adapter-react-16
// TODO: Remove this file from the coverage exclude list in _package.json_.
// https://github.com/airbnb/enzyme/issues/1509
// https://github.com/airbnb/enzyme/pull/1592
import Adapter from './ReactSixteenAdapter';

configure({ adapter: new Adapter() });

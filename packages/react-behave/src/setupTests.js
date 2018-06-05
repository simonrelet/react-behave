import { configure } from 'enzyme';
// Until the release of the new version of enzyme-adapter-react-16
// https://github.com/airbnb/enzyme/issues/1509
import Adapter from './ReactSixteenAdapter';

configure({ adapter: new Adapter() });

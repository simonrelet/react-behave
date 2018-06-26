import { getDisplayName } from 'react-behave';
import DropDownIcon from './DropDownIcon';
import SearchIcon from './SearchIcon';
import BaselineCheckIcon from './BaselineCheckIcon';

export default [
  { name: getDisplayName(BaselineCheckIcon), component: BaselineCheckIcon },
  { name: getDisplayName(DropDownIcon), component: DropDownIcon },
  { name: getDisplayName(SearchIcon), component: SearchIcon },
];

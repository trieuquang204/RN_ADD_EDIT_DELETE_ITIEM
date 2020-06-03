/**
 * @format
 */

import {AppRegistry} from 'react-native';
console.disableYellowBox = true;
// import App from './App';
import BasicFlatList from './components/BasicFlatList';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => BasicFlatList);

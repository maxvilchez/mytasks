import {AppRegistry, YellowBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

YellowBox.ignoreWarnings(['Unable']);

AppRegistry.registerComponent(appName, () => App);

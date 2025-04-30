/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import { TodoApp } from './src/TodoApp';

AppRegistry.registerComponent(appName, () => TodoApp);

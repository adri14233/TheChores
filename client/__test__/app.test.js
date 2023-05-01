import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import App from '../App.js';
import LoginScreen from '../components/LoginScreen.js';
import { Provider } from 'react-redux';
import { legacy_createStore } from 'redux';

import loginReducer from '../reducer';
let store = legacy_createStore(loginReducer);

describe('Testing App', () => {
  test('page contains login & register buttons', async () => {
    const component = (
      <Provider store={store}>
        <NavigationContainer>
          <LoginScreen></LoginScreen>
        </NavigationContainer>
      </Provider>
    )
    const loginScreen = render(component).toJSON();
    
    expect(loginScreen.children.length).toBe(4);
  })
})
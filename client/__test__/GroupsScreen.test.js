import React from "react";
import { render, screen } from "@testing-library/react-native";
import GroupsScreen from "../components/GroupsScreen";
import { Provider } from 'react-redux';
import { legacy_createStore } from 'redux';
import loginReducer from '../reducer';
import { NavigationContainer } from "@react-navigation/native";

let store = legacy_createStore(loginReducer);

describe('Groups Screen Tests', () => {
  const component = (
    <Provider store={store}>
      <NavigationContainer>
        <GroupsScreen></GroupsScreen>
      </NavigationContainer>
    </Provider>
  )
  test('renders properly', async () => {
    const groupsScreen = render(component).toJSON();
    expect(groupsScreen.length).toBe(2);
    expect(groupsScreen[1].children.length).toBe(2);
  }),
  test('has CREATE GROUP button', async () => {
    const groupsScreen = render(component).toJSON();
    const createGroup = screen.getByText('CREATE GROUP').children;
    expect(createGroup.includes('CREATE GROUP')).toBe(true);
  }),
  test('has JOIN GROUP button', async () => {
    const groupsScreen = render(component).toJSON();
    const joinGroup = screen.getByText('JOIN GROUP').children;
    expect(joinGroup.includes('JOIN GROUP')).toBe(true);
  })
})
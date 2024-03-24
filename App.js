import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  HomePage from './HomePage';
import  ProfitScreen from './ProfitScreen';
import  LoginPage from './LoginPage';
import { GlobalProvider } from './GlobalContext';


const Stack = createStackNavigator();


const App = ()  => {

  return (
    <GlobalProvider>
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Profit" component={ProfitScreen} />
      <Stack.Screen name="Login" component={LoginPage} />
    </Stack.Navigator>
  </NavigationContainer>
  </GlobalProvider>
  );
}

export default App;
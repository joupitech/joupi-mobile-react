import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../services/AuthContext';

// Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import SplashScreen from '../screens/SplashScreen';

// Tipos de navegação
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AppStackParamList = {
  Home: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();
const AppStack = createStackNavigator<AppStackParamList>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
};

const AppNavigator = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <>
      {user ? (
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
          <AppStack.Screen name="Home" component={HomeScreen} />
        </AppStack.Navigator>
      ) : (
        <AuthNavigator />
      )}
    </>
  );
};

export default AppNavigator; 
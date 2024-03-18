import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, Touchable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'
import Home from './screens/home';
import LoginScreen from './screens/loginScreen';
import SignupScreen from './screens/signupScreen';
import Dashboard from './screens/dashboard';
const Stack = createNativeStackNavigator()

export default function App() {
 

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
       <Stack.Screen name='Home' component={Home} options={({ navigation }) => ({ navigation })}/>
       <Stack.Screen name='Login' component={LoginScreen} options={({ navigation }) => ({ navigation })} />
       <Stack.Screen name='Signup' component={SignupScreen} options={({ navigation }) => ({ navigation })} />
       <Stack.Screen name="Dashboard" component={Dashboard} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React from "react";
import Header from "../componenets/header";
import About from '../componenets/about';
import Login from '../componenets/login';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, Touchable, TouchableWithoutFeedback, Keyboard } from 'react-native';


function Home({navigation}){
    return(
        <TouchableWithoutFeedback onPress={()=>{
            Keyboard.dismiss();
          }}>
            <View style={styles.container}>
              <Header/>
              <View style={styles.content}>
                <About />
                <View style={styles.login}>
                  <Login navigation={navigation} />
                </View>
  
              </View>
            </View>
          </TouchableWithoutFeedback>    
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 0,
      paddingHorizontal: 0
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    content: {
      padding: 40,
  
    },
    login: {
      marginTop: 20
    }
  });
  
export default Home
import React from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import Header from "../componenets/header";

function LoginScreen(){

    return(
        <View style={styles.container}>
            <Header />
                <View style={styles.content}>
                    <Text style={styles.text}>Enter Email</Text>
                    <TextInput style={styles.input} placeholder="ex@gmail.com"></TextInput>
                    <Text style={styles.text}>Enter Password</Text>
                    <TextInput style={styles.input} placeholder="password"></TextInput>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.login}>Log In!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </View>
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
        flex: 1,
      padding: 40,
      alignItems: 'center'
    },
    text: {
        fontSize: 35,
        textAlign: 'center',
        paddingBottom: 20,
        paddingTop: 0
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        width: 200,
        height: 55,
        fontSize: 10,
    },
    buttonContainer: {
        paddingTop: 30,
        flex: 1
    },
    button: {
        borderWidth: 3, 
        borderColor: '#8A9A5B',
        borderRadius: 15,
        width: 200,
        height: 50,
        justifyContent: 'flex-end',
    },
    login: {
      textAlign: 'center',
      fontSize: 20
    }
  });

export default LoginScreen
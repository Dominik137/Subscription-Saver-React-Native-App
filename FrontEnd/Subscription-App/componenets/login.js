import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";


function Login({ navigation }){

    return(
        <View style={styles.container}>
            <TouchableOpacity  style={styles.buttons} onPress={()=>navigation.navigate('Signup')}>
                <Text style={styles.text}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons} onPress={()=>navigation.navigate('Login')}>
                <Text style={styles.text}>Log In</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flexDirection: 'row', // Arrange items horizontally
        justifyContent: 'space-between', // Evenly space items horizontally
        paddingHorizontal: 0, // Add padding to the sides
    },
    buttons:{
        borderWidth: 3, 
        borderColor: '#8A9A5B',
        borderRadius: 15
    },
    text: {
        fontWeight: 'bold',
        padding: 10,
        fontSize: 25
    }
})

export default Login;

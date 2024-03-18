import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import Header from "../componenets/header";

function SignUpScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const signUp = () => {
        const data = { username: username, password: password };
    
        fetch('http://192.168.86.40:5555/create_user', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // Parse the response body as JSON
            } else {
                throw new Error("Signup failed");
            }
        })
        .then(data => {
            console.log("User created successfully");
            console.log(data); // Now 'data' contains the parsed response body
            // Optionally, you can navigate to another screen after successful signup
            navigation.navigate('Dashboard', { user_id: data.id })
        })
        .catch(error => console.error("Error:", error));
    };

    return (
    <TouchableWithoutFeedback onPress={()=>{
            Keyboard.dismiss();
          }}>
        <View style={styles.container}>
            <Header />
            <View style={styles.content}>
                <Text style={styles.text}>Enter Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="ex@gmail.com"
                    value={username}
                    onChangeText={text => setUsername(text)}
                />
                <Text style={styles.text}>Enter Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={true}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={signUp}>
                        <Text style={styles.login}>Sign Up!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 0,
        paddingHorizontal: 0
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

export default SignUpScreen;

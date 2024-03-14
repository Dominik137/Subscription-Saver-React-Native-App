import React from "react";
import { View, StyleSheet, Text } from "react-native";

function About(){

    return(
        <View>
            <Text style={styles.about}>
                Welcome to Subscription Saver! An all in one app to track any subscription you may have. 
                <Text> With Simplicity and ease of use as our forfront we want to bring you the best experince a tracking your subscritptions</Text>
            </Text>

        </View>

    )
}

const styles = StyleSheet.create({
    about: {
        fontSize: 20,
        textAlign: 'center'
    }
})

export default About
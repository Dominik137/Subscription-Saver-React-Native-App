import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

function AddSubHeader(){
    return(
   
        <View style={styles.header}>
            <Text style={styles.title}>Add A Subscription!</Text>
        </View>

    )
}

const styles = StyleSheet.create({
    header: {
        height: 130,
        // width: 0,
        paddingTop: 68,
        backgroundColor: '#8A9A5B'
    },
    title: {
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 20
    }
})




export default AddSubHeader
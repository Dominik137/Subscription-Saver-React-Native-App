import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

function Header(){
    return(
        <View style={styles.header}>
            <Text style={styles.title}>Subscription Saver</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 110,
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




export default Header
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

function SubScreenHeader({subscription}){

    return (
        <View style={styles.header}>
            <Text style={styles.title}>{subscription.service_name}</Text>
        </View>
    )

    }
const styles = StyleSheet.create({
    header: {
        height: 110,
        paddingTop: 68,
        backgroundColor: '#8A9A5B',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        color: '#ffffff',
        fontSize: 20,
        textAlign: 'center'
    },
    logoutButton: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
    }
})

export default SubScreenHeader


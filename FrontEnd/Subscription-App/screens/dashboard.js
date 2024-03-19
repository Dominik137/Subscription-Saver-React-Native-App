import React from "react";
import { StyleSheet, Text, View, ScrollView } from 'react-native'; // Import ScrollView
import DashboardHeader from "../componenets/dashboardHeader";
import DashboardSubs from "../componenets/dashboardSubs";

function Dashboard({navigation}) {
    return (
        <View style={styles.container}>
            <DashboardHeader navigation={navigation} />
            <ScrollView style={styles.scrollContainer}> 
                <View style={styles.content}>
                    <Text style={styles.text}>Your Subscriptions</Text>
                    <DashboardSubs navigation={navigation}/>
                </View>
            </ScrollView>
        </View>
    );
}

Dashboard.navigationOptions = {
    gestureEnabled: false // Disable swipe back gesture
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    content: {
        marginTop: 20,
    },
    text: {
        fontSize: 25,
        marginTop: 20,
        textAlign: 'center',
    }
});

export default Dashboard;

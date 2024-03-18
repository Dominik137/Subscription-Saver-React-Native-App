import React from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, Touchable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import DashboardHeader from "../componenets/dashboardHeader";

function Dashboard({navigation}) {
    return (
        <TouchableWithoutFeedback onPress={()=>{
            Keyboard.dismiss();
          }}>
            <View style={styles.container}>
             <DashboardHeader />
              <View style={styles.content}>
                <Text>Yours Subs</Text>
                <View style={styles.content2}>
                  <Text>Something else, need logout button!</Text>
                </View>
  
              </View>
            </View>
          </TouchableWithoutFeedback>    
    );
}

Dashboard.navigationOptions = {
    gestureEnabled: false // Disable swipe back gesture
};


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
    content2: {
      marginTop: 20
    }
  });

export default Dashboard;
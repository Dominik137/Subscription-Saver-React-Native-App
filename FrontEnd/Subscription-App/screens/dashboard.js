import React from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, Touchable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import DashboardHeader from "../componenets/dashboardHeader";
import DashboardSubs from "../componenets/dashboardSubs";

function Dashboard({navigation}) {
    return (
        <TouchableWithoutFeedback onPress={()=>{
            Keyboard.dismiss();
          }}>
            <View style={styles.container}>
             <DashboardHeader navigation={navigation} />
              <View style={styles.content}>
                <Text style={styles.text}>Yours Subs</Text>
                
                <View style={styles.content2}>
                  <DashboardSubs />
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
      paddingHorizontal: 0,
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    content: {
      padding: 40,
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
  
    },
    content2: {
      marginTop: 20
    },
    text: {
      fontSize: 25
    }

  });

export default Dashboard;
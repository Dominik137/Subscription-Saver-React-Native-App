import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { useRoute } from '@react-navigation/native';

function DashboardSubs(){

    const [subscriptions, setSubscriptions] = useState([])
    const route = useRoute();
    const { user_id } = route.params;

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const response = await fetch(`http://192.168.86.40:5555/subscriptions/${user_id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user subscriptions');
                }
                const data = await response.json();
                setSubscriptions(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchSubscriptions(); // Replace <user_id> with the actual user ID
    }, []); 

    const renderItem = ({ item }) => (
        <Text style={styles.item}>{`${item.service_name}: 
Cost: ${item.cost}
Link: ${item.website_link} 
Payment Due: ${item.due_date}`}</Text>
    );

    return (
        <View style={styles.container}>
           {subscriptions.length > 0 ? (
             <FlatList
               
               data={subscriptions}
               renderItem={renderItem}
               keyExtractor={item => item.id.toString()}
               contentContainerStyle={styles.listContainer}
             />
           ) : (
             <Text>No data present!</Text>
           )}
        </View>
       );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
        paddingHorizontal: 20, 
    },
    item: {
        marginVertical: 10,
        fontSize: 18
    },
    listContainer: {
        flexGrow: 1,
    }
});

export default DashboardSubs;

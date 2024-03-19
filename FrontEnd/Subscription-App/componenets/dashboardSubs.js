import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";
import { useRoute } from '@react-navigation/native';

function DashboardSubs({navigation}){

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

        fetchSubscriptions(); 
    }, []); 

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.item}>{`${item.service_name}: 
Cost: ${item.cost}
Link: ${item.website_link} 
Payment Due: ${item.due_date}`}</Text>
        </View>
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
             <Text>No Subscriptions!</Text>
           )}
           <TouchableOpacity onPress={()=> navigation.navigate('AddSub')} style={styles.addSubButton}><Text style={styles.text}>Add A Subscription!</Text></TouchableOpacity>
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
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        elevation: 2, // For Android shadow
        shadowColor: '#000000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    item: {
        fontSize: 18,
    },
    listContainer: {
        flexGrow: 1,
    },
    text:{
        fontSize: 20,
        textAlign: 'center',
        padding: 20,
        
    },
    addSubButton: {
        backgroundColor: 'transparent',
        borderWidth: 1, 
        borderColor: 'black', 
        borderRadius: 5, 
        paddingVertical: 10, 
        paddingHorizontal: 20, 
        marginBottom: 40
    },
});

export default DashboardSubs;

import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import dayjs from 'dayjs';

function DashboardSubs({ navigation }) {

    const [subscriptions, setSubscriptions] = useState([])
    const route = useRoute();
    const { user_id } = route.params;

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

    useEffect(() => {
        fetchSubscriptions();
    }, []); // Fetch subscriptions on component mount

    // Add a dependency on subscriptions so that useEffect is called whenever subscriptions change
    useEffect(() => {
        // Define a function to fetch subscriptions again when a new subscription is created
        const handleNewSubscription = () => {
            fetchSubscriptions();
        };

        // Listen for navigation focus events to refetch subscriptions
        const unsubscribe = navigation.addListener('focus', handleNewSubscription);

        // Clean up the subscription when the component unmounts
        return unsubscribe;
    }, [navigation, subscriptions]); // Dependency on navigation and subscriptions


    
const deleteSub = async (id) => {
    Alert.alert(
        'Delete Subscription',
        'Are you sure you want to delete this subscription?',
        [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Delete',
                onPress: async () => {
                    try {
                        const response = await fetch(`http://192.168.86.40:5555/handle_subscription/${id}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        });

                        if (!response.ok) {
                            throw new Error('Failed to delete subscription');
                        }

                        // Filter out the deleted subscription from the subscriptions state
                        setSubscriptions((prevSubscriptions) =>
                            prevSubscriptions.filter((subscription) => subscription.id !== id)
                        );
                    } catch (error) {
                        console.error('Error deleting subscription:', error);
                    }
                }
            }
        ],
        { cancelable: false }
    );
};


    const renderItem = ({ item }) => {
        
        const formattedDueDate = dayjs(item.due_date).format('DD');
        
        return (
            <View style={styles.card}>
                <Text style={styles.item}>{`${item.service_name}: 
Cost: ${item.cost}$
Link: ${item.website_link} 
Payment Due: ${formattedDueDate}
Frequency: ${item.frequency}`}</Text>
                <TouchableOpacity onPress={() => deleteSub(item.id)}><AntDesign name="delete" size={24} color="black" /></TouchableOpacity>
            </View>
        );
    };

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
            <TouchableOpacity onPress={() => navigation.navigate('AddSub', { user_id: user_id })} style={styles.addSubButton}><Text style={styles.text}>Add A Subscription!</Text></TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
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
    text: {
        fontSize: 20,
        textAlign: 'center',
        padding: 20,

    },
    addSubButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 20,
        marginBottom: 40
    },
});

export default DashboardSubs;

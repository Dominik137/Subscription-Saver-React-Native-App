import React, {useState, useEffect} from "react";
import { View, TextInput, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, ScrollView, TouchableOpacity  } from "react-native";
import { useRoute } from '@react-navigation/native';
import SubScreenHeader from "../componenets/subScreenHeader";


function SubScreen(){
    const route = useRoute();
    const { item_id } = route.params;
    const [subscription, setSubscription] = useState('')

    const fetchSubscription = async () => {
        try {
            const response = await fetch(`http://192.168.86.40:5555/handle_subscription/${item_id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user subscriptions');
            }
            const data = await response.json();
            setSubscription(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchSubscription();
    }, []); 
    
    const getNextDueDates = () => {
        if (!subscription || !subscription.due_date || !subscription.frequency) {
            return [];
        }

        const currentDate = new Date();
        const dueDate = new Date(subscription.due_date);
        let nextDueDates = [];

        const frequency = subscription.frequency.toLowerCase(); // Convert frequency to lowercase for comparison

        // Calculate next due dates based on frequency
        switch (frequency) {
            case "daily":
                for (let i = 0; i < 3; i++) {
                    let nextDueDate = new Date(dueDate);
                    while (nextDueDate <= currentDate) {
                        nextDueDate.setDate(nextDueDate.getDate() + 1);
                    }
                    nextDueDates.push(nextDueDate);
                    dueDate.setDate(dueDate.getDate() + 1);
                }
                break;
            case "weekly":
                for (let i = 0; i < 3; i++) {
                    let nextDueDate = new Date(dueDate);
                    while (nextDueDate <= currentDate) {
                        nextDueDate.setDate(nextDueDate.getDate() + 7);
                    }
                    nextDueDates.push(nextDueDate);
                    dueDate.setDate(dueDate.getDate() + 7);
                }
                break;
            case "monthly":
                for (let i = 0; i < 3; i++) {
                    let nextDueDate = new Date(dueDate);
                    while (nextDueDate <= currentDate) {
                        nextDueDate.setMonth(nextDueDate.getMonth() + 1);
                    }
                    nextDueDates.push(nextDueDate);
                    dueDate.setMonth(dueDate.getMonth() + 1);
                }
                break;
            case "yearly":
                for (let i = 0; i < 3; i++) {
                    let nextDueDate = new Date(dueDate);
                    while (nextDueDate <= currentDate) {
                        nextDueDate.setFullYear(nextDueDate.getFullYear() + 1);
                    }
                    nextDueDates.push(nextDueDate);
                    dueDate.setFullYear(dueDate.getFullYear() + 1);
                }
                break;
            default:
                return [];
        }

        // Format next due dates
        const formattedNextDueDates = nextDueDates.map(date => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
        return formattedNextDueDates;
    };

    return(
        <View >
            <SubScreenHeader subscription={subscription}/>
            <View style={styles.container}>
                <View >
                    <Text style={styles.cost}>Cost: {subscription.cost}</Text>
                    <Text style={styles.nextDue}>Next 3 Payments: {getNextDueDates().join(', ')}</Text>
                </View>
            </View>
        </View>
    )
    }
    const styles = StyleSheet.create({
        container: {
            // flex: 1,
            // backgroundColor: '#ffffff',
            paddingTop: 40,
            paddingHorizontal: 20,
        },
       cost: {
        textAlign: 'left',
        fontSize: 20,
        textAlign: 'center'
       },
       nextDue: {
        textAlign: 'left',
        fontSize: 16,
        marginTop: 10,
    }
    })


export default SubScreen
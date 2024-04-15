import React, {useState} from "react";
import { View, TextInput, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, ScrollView, TouchableOpacity  } from "react-native";
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import AddSubHeader from "../componenets/addSubHeader";
import { useRoute } from '@react-navigation/native';

function AddSub({navigation}){
    const route = useRoute();
    const { user_id } = route.params;

    const [date, setDate] = useState(dayjs());
    const [subName, setSubName] = useState('No Name Given')
    const [website, setWebsite] = useState('No Website Given')
    const [cost, setCost] = useState(0)
    const [frequency, setFrequency] = useState('No Frequency Selected')
    
    const saveSub = async () => {
        try {
            const response = await fetch('http://192.168.86.40:5555/save_subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user_id,
                    service_name: subName,
                    website_link: website,
                    cost: parseFloat(cost), // Convert cost to float
                    due_date: date.toISOString(), // Convert date to ISO string
                    frequency: frequency
                })
            });
            
            // Check if the request was successful
            if (response.ok) {
                // Reset input fields if successful
                setSubName('No Name Given');
                setWebsite('No Website Given');
                setCost(0);
                setDate(dayjs());
                // Navigate to another screen or perform any other action
                navigation.navigate('Dashboard', { user_id: user_id });
            } else {
                // Handle error response
                console.error('Failed to save subscription:', response.statusText);
            }
        } catch (error) {
            // Handle network errors
            console.error('Network error:', error);
        }
    }

    return(
<ScrollView>
    <TouchableWithoutFeedback onPress={()=>{
            Keyboard.dismiss();
        }}>
        <View style={styles.container}>
            <AddSubHeader />
            <View style={styles.content}>
            <Text style={styles.text}>Subscription Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Subscription Name"
                    onChangeText={text => setSubName(text)}
                />
            <Text style={styles.text}>Website Link</Text>
                <TextInput
                    style={styles.input}
                    placeholder="www."
                    onChangeText={text => setWebsite(text)}
                />
            <Text style={styles.text}>Frequency</Text>
                <Picker
            style={styles.input}
            selectedValue={frequency}
            onValueChange={(itemValue, itemIndex) => setFrequency(itemValue)}
        >
            <Picker.Item label="Daily" value="daily" />
            <Picker.Item label="Weekly" value="weekly" />
            <Picker.Item label="Monthly" value="monthly" />
            <Picker.Item label="Yearly" value="yearly" />
        </Picker>
            <Text style={styles.text}>Bill Date</Text>
            <View style={styles.calander}>
            <DateTimePicker
                mode="single"
                date={date}
                onChange={(params) => setDate(params.date)}
                height={200}
                
            />
            </View>
            <Text style={styles.text}>Cost</Text>
            <TextInput
                style={styles.input}
                placeholder="$$$"
                onChangeText={text => {
                    // Replace non-numeric characters and prevent multiple dots
                    const formattedText = text.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
                    // Update the state with the formatted text
                    setCost(formattedText);
                }}
                value={cost.toString()} // Convert cost to string
                keyboardType="numeric" // Show numeric keyboard
            />
            <TouchableOpacity style={styles.addSubButton} onPress={saveSub}><Text style={styles.text}>Save</Text></TouchableOpacity>
        </View>
        </View>
    </TouchableWithoutFeedback>
</ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
         
    },
    content: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        marginTop: 30
    },
    input: {
        borderWidth: 1, // black border
        borderColor: 'black', // black border color
        borderRadius: 5, // border radius
        padding: 10, // padding
        fontSize: 18, // bigger font size
        width: '80%', // adjust width as needed
        marginBottom: 10
    },
    text:{
        fontSize: 20,
        paddingBottom: 10,
        paddingTop: 10,
        textAlign: 'center'
    },
    calander: {
        paddingRight: 25,
        paddingLeft: 25
    },
    addSubButton: {
        backgroundColor: 'transparent',
        borderWidth: 1, 
        borderColor: 'black', 
        borderRadius: 5, 
        paddingVertical: 10, 
        paddingHorizontal: 20, 
        marginBottom: 40,
        width: '80%'
    },
});

export default AddSub;

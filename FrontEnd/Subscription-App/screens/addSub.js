import React, {useState} from "react";
import { View, TextInput, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, DatePickerIOS  } from "react-native";
import AddSubHeader from "../componenets/addSubHeader";

function AddSub({navigation}){

    const [chosenDate, setChosenDate] = useState(new Date());

    const handleDateChange = (newDate) => {
        setChosenDate(newDate);
      };

    return(
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
                />
            <Text style={styles.text}>Website Link</Text>
                <TextInput
                    style={styles.input}
                    placeholder="www."
                />
            <Text style={styles.text}>Bill Date</Text>
             <DatePickerIOS
                date={chosenDate}
                onDateChange={handleDateChange}
                mode="date"
            />
            </View>
        </View>
    </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        paddingTop: 10
    }
});

export default AddSub;

import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';

function DashboardHeader({navigation}) {
    const [username, setUsername] = useState('')
    
    const route = useRoute();
    const { user_id } = route.params;

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await fetch(`http://192.168.86.40:5555/user/${user_id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setUsername(data.username);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUsername(); // Replace <user_id> with the actual user ID
    }, []); 
    return (
        <View style={styles.header}>
            <Text style={styles.title}>Welcome Back {username}!</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 110,
        paddingTop: 68,
        backgroundColor: '#8A9A5B',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        color: '#ffffff',
        fontSize: 20
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

export default DashboardHeader;

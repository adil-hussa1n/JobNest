import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
    const navigation = useNavigation();

    const jobs = [
        { id: '1', title: 'Software Developer', location: 'Sylhet, AuthLab', type: 'Full-time' },
        { id: '2', title: 'Project Manager', location: 'Dhaka, ABCD', type: 'Part-Time' },
        { id: '3', title: 'Software Developer', location: 'Sylhet, AuthLab', type: 'Full-time' },
        { id: '4', title: 'Project Manager', location: 'Dhaka, ABCD', type: 'Part-Time' },
        { id: '5', title: 'Software Developer', location: 'Sylhet, AuthLab', type: 'Full-time' },
        { id: '6', title: 'Project Manager', location: 'Dhaka, ABCD', type: 'Part-Time' },
        { id: '7', title: 'Software Developer', location: 'Sylhet, AuthLab', type: 'Full-time' },
        { id: '8', title: 'Project Manager', location: 'Dhaka, ABCD', type: 'Part-Time' },
        { id: '9', title: 'Software Developer', location: 'Sylhet, AuthLab', type: 'Full-time' },
        { id: '10', title: 'Project Manager', location: 'Dhaka, ABCD', type: 'Part-Time' },
        { id: '11', title: 'Software Developer', location: 'Sylhet, AuthLab', type: 'Full-time' },
        { id: '12', title: 'Project Manager', location: 'Dhaka, ABCD', type: 'Part-Time' },

    ];

    const renderJobItem = ({ item }) => (
        <View style={styles.jobItem}>
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text style={styles.jobDetails}>{item.location} - {item.type}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('JobDetails', { jobId: item.id })}>
                <Text style={styles.jobLink}>View Details</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>JobNest</Text>
                <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
                    <Text style={styles.profileButtonText}>Profile</Text>
                </TouchableOpacity>
            </View>
            <TextInput style={styles.searchBar} placeholder="Search jobs..." />
            <FlatList
                data={jobs}
                renderItem={renderJobItem}
                keyExtractor={item => item.id}
                style={styles.jobList}
            />
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    searchBar: {
        padding: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
    },
    profileButton: {
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    profileButtonText: {
        color: '#fff',
    },
    jobList: {
        flex: 1,
    },
    jobItem: {
        padding: 15,
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
    jobTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    jobDetails: {
        fontSize: 14,
        color: '#666',
    },
    jobLink: {
        color: '#007bff',
        marginTop: 5,
    },
});

export default HomePage;

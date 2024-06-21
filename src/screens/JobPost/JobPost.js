import { Button, StyleSheet, View, SafeAreaView, FlatList, TouchableOpacity, Linking } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Appbar, SegmentedButtons, Text } from 'react-native-paper';
import { Icon, MD3Colors } from 'react-native-paper';
import React from 'react';

export const JobPost = () => {
  const navigation = useNavigation();
  const [jobs, setJobs] = React.useState('all');
  const jobList = [
    {
      id: '1',
      jobType: 'full',
      payment: '$60,000 per year',
      jobDescription: 'Senior Web Developer',
      workHours: '5 years',
      link: 'https://chat.openai.com/c/cbd4089e-23cb-46af-82d9-7c4161e77825'
    },
    {
      id: '2',
      jobType: 'part',
      payment: '$20 per hour',
      workHours: '6 hours',
      jobDescription: 'Social Media Manager',
      link: 'https://chat.openai.com/c/cbd4089e-23cb-46af-82d9-7c4161e77825'
    },
    {
      id: '3',
      jobType: 'full',
      payment: '$70,000 per year',
      workHours: '10 years',
      jobDescription: 'Data Scientist',
      link: 'https://chat.openai.com/c/cbd4089e-23cb-46af-82d9-7c4161e77825'
    },
    {
      id: '4',
      jobType: 'full',
      payment: '$60,000 per year',
      jobDescription: 'Senior Web Developer',
      workHours: '5 years',
      link: 'https://chat.openai.com/c/cbd4089e-23cb-46af-82d9-7c4161e77825'
    },
    {
      id: '5',
      jobType: 'part',
      payment: '$20 per hour',
      workHours: '6 hours',
      jobDescription: 'Social Media Manager',
      link: 'https://chat.openai.com/c/cbd4089e-23cb-46af-82d9-7c4161e77825'
    },
    {
      id: '6',
      jobType: 'full',
      payment: '$70,000 per year',
      workHours: '10 years',
      jobDescription: 'Data Scientist',
      link: 'https://chat.openai.com/c/cbd4089e-23cb-46af-82d9-7c4161e77825'
    },
    {
      id: '7',
      jobType: 'full',
      payment: '$60,000 per year',
      jobDescription: 'Senior Web Developer',
      workHours: '5 years',
      link: 'https://chat.openai.com/c/cbd4089e-23cb-46af-82d9-7c4161e77825'
    },
    {
      id: '8',
      jobType: 'part',
      payment: '$20 per hour',
      workHours: '6 hours',
      jobDescription: 'Social Media Manager',
      link: 'https://chat.openai.com/c/cbd4089e-23cb-46af-82d9-7c4161e77825'
    },
    {
      id: '9',
      jobType: 'full',
      payment: '$70,000 per year',
      workHours: '10 years',
      jobDescription: 'Data Scientist',
      link: 'https://chat.openai.com/c/cbd4089e-23cb-46af-82d9-7c4161e77825'
    },
    {
      id: '10',
      jobType: 'part',
      payment: '$60,000 per year',
      jobDescription: 'Senior Web Developer',
      workHours: '5 years',
      link: 'https://chat.openai.com/c/cbd4089e-23cb-46af-82d9-7c4161e77825'
    },
    {
      id: '11',
      jobType: 'full',
      payment: '$60,000 per year',
      jobDescription: 'Senior Web Developer',
      workHours: '5 years',
      link: 'https://chat.openai.com/c/cbd4089e-23cb-46af-82d9-7c4161e77825'
    },
    {
      id: '12',
      jobType: 'part',
      payment: '$20 per hour',
      workHours: '6 hours',
      jobDescription: 'Social Media Manager',
      link: 'https://chat.openai.com/c/cbd4089e-23cb-46af-82d9-7c4161e77825'
    },
    {
      id: '13',
      jobType: 'full',
      payment: '$70,000 per year',
      workHours: '10 years',
      jobDescription: 'Data Scientist',
      link: 'https://chat.openai.com/c/cbd4089e-23cb-46af-82d9-7c4161e77825'
    },
  ];

  const filteredJobs = jobs === 'all' ? jobList : jobList.filter(job => job.jobType === jobs);

  const handleValueChange = (value) => {
    setJobs(value);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title="Job Posts" />
      </Appbar.Header>

      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.headerText}>Find Your Best Job</Text>
      </View>

      <SafeAreaView style={styles.segmentedButtonsContainer}>
        <SegmentedButtons
          value={jobs}
          onValueChange={handleValueChange}
          buttons={[
            { value: 'all', label: 'All Jobs' },
            { value: 'part', label: 'Part Time' },
            { value: 'full', label: 'Full Time' },
          ]}
        />
      </SafeAreaView>

      <FlatList
        contentContainerStyle={styles.list}
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.jobCard}>
            <Text style={styles.jobTitle}>{item.jobDescription}</Text>
            <Text style={styles.jobDetail}>Salary: {item.payment}</Text>
            <Text style={styles.jobDetail}>Experience: {item.workHours}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
              <Text style={styles.learnMore}>Learn more</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default JobPost;

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  appbar: {
    marginTop: -15,
    marginBottom: -15,
  },

  header: {
    
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    
  },
  headerText: {
    
    fontWeight: 'bold',
    fontSize: 24,
  },
  segmentedButtonsContainer: {
    marginHorizontal: 15,
    marginBottom: 20,
  },
  list: {
    paddingHorizontal: 15,
  },
  jobCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  jobDetail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  learnMore: {
    color: '#6200ea',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

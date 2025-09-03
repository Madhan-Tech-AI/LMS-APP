import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, User, Send, Eye } from 'lucide-react-native';
import { sampleStudents } from '@/data/facultyData';

export default function ManageStudentsPage() {
  const handleViewProfile = (studentId: string) => {
    router.push(`/faculty/student-detail/${studentId}`);
  };

  const handleSendNotification = (studentName: string) => {
    Alert.alert('Send Notification', `Send notification to ${studentName}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Send', onPress: () => Alert.alert('Success', 'Notification sent successfully!') },
    ]);
  };

  const renderStudentCard = ({ item }: { item: any }) => (
    <View style={styles.studentCard}>
      <View style={styles.studentIcon}>
        <User size={24} color="#02462D" />
      </View>
      
      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>{item.name}</Text>
        <Text style={styles.studentReg}>Reg No: {item.regNo}</Text>
        <Text style={styles.studentSemester}>Semester {item.semester}</Text>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleViewProfile(item.id)}
        >
          <Eye size={16} color="#02462D" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleSendNotification(item.name)}
        >
          <Send size={16} color="#02462D" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#02462D" />
        </TouchableOpacity>
        <Text style={styles.title}>Manage Students</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>All Students</Text>
        <Text style={styles.subtitle}>{sampleStudents.length} students enrolled</Text>
        
        <FlatList
          data={sampleStudents}
          renderItem={renderStudentCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.studentsList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#02462D',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFC702',
    borderBottomWidth: 1,
    borderBottomColor: '#02462D',
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#02462D',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFC702',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#FFC702',
    marginBottom: 20,
  },
  studentsList: {
    paddingBottom: 20,
  },
  studentCard: {
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  studentIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#FFC702',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  studentReg: {
    fontSize: 14,
    color: '#FFC702',
    marginBottom: 2,
  },
  studentSemester: {
    fontSize: 12,
    color: '#FFC702',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    backgroundColor: '#FFC702',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Search, Filter, Send, Eye, TrendingUp, Calendar, Mail } from 'lucide-react-native';
import { sampleStudents } from '@/data/facultyData';

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('all');

  const filteredStudents = sampleStudents.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.regNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewProfile = (studentId: string) => {
    router.push(`/faculty/student-detail/${studentId}`);
  };

  const handleSendMessage = (studentName: string) => {
    Alert.alert('Send Message', `Send message to ${studentName}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Send', onPress: () => Alert.alert('Success', 'Message sent successfully!') },
    ]);
  };

  const renderStudentCard = ({ item }: { item: any }) => (
    <View style={styles.studentCard}>
      <View style={styles.studentHeader}>
        <View style={styles.studentAvatar}>
          <User size={24} color="#ffffff" strokeWidth={2.5} />
        </View>
        <View style={styles.studentInfo}>
          <Text style={styles.studentName}>{item.name}</Text>
          <Text style={styles.studentReg}>{item.regNo}</Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.viewButton]}
            onPress={() => handleViewProfile(item.id)}
          >
            <Eye size={16} color="#3B82F6" strokeWidth={2.5} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.messageButton]}
            onPress={() => handleSendMessage(item.name)}
          >
            <Send size={16} color="#10B981" strokeWidth={2.5} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.studentStats}>
        <View style={styles.statItem}>
          <TrendingUp size={14} color="#10B981" strokeWidth={2} />
          <Text style={styles.statText}>CGPA: {item.cgpa}</Text>
        </View>
        <View style={styles.statItem}>
          <Calendar size={14} color="#F59E0B" strokeWidth={2} />
          <Text style={styles.statText}>Attendance: {item.attendance}%</Text>
        </View>
        <View style={styles.statItem}>
          <Mail size={14} color="#8B5CF6" strokeWidth={2} />
          <Text style={styles.statText}>Sem {item.semester}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Students</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#A8A8AA" strokeWidth={2.5} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Search size={20} color="#A8A8AA" strokeWidth={2} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search students..."
            placeholderTextColor="#A8A8AA"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.resultsText}>{filteredStudents.length} students found</Text>
        
        <FlatList
          data={filteredStudents}
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
    backgroundColor: '#0F0F0F',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#5A1A32',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  filterButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
    backgroundColor: '#5A1A32',
    paddingBottom: 24,
  },
  searchBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  resultsText: {
    fontSize: 14,
    color: '#A8A8AA',
    marginBottom: 16,
  },
  studentsList: {
    paddingBottom: 24,
  },
  studentCard: {
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  studentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  studentAvatar: {
    width: 48,
    height: 48,
    backgroundColor: '#5A1A32',
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
    color: '#A8A8AA',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewButton: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
  },
  messageButton: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },
  studentStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: '#A8A8AA',
    fontWeight: '500',
  },
});
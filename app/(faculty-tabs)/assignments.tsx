import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, TextInput, Modal, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { Plus, Users, Calendar, X, Search, ChartBar as BarChart3, Clock, CircleCheck as CheckCircle } from 'lucide-react-native';
import { sampleFacultySubjects, sampleFacultyAssignments } from '@/data/facultyData';

export default function FacultyAssignmentsPage() {
  const [selectedSubject, setSelectedSubject] = useState(sampleFacultySubjects[0].id);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    dueDate: '',
    maxMarks: '',
  });
  
  const filteredAssignments = sampleFacultyAssignments.filter(
    assignment => assignment.subjectId === selectedSubject &&
    assignment.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateAssignment = () => {
    if (!newAssignment.title || !newAssignment.description || !newAssignment.dueDate) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    Alert.alert('Success', 'Assignment created and published to students!');
    setShowCreateModal(false);
    setNewAssignment({ title: '', description: '', dueDate: '', maxMarks: '' });
  };

  const handleViewSubmissions = (assignmentId: string) => {
    Alert.alert('View Submissions', 'Opening submissions dashboard...');
  };

  const handleViewAnalytics = (assignmentId: string) => {
    Alert.alert('Assignment Analytics', 'Viewing performance analytics...');
  };

  const renderAssignmentCard = ({ item }: { item: any }) => {
    const submissionRate = (item.submissions / item.totalStudents) * 100;
    
    return (
      <View style={styles.assignmentCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.assignmentTitle}>{item.title}</Text>
          <View style={styles.submissionBadge}>
            <Text style={styles.submissionText}>{item.submissions}/{item.totalStudents}</Text>
          </View>
        </View>
        
        <Text style={styles.assignmentDescription}>{item.description}</Text>
        
        <View style={styles.progressContainer}>
          <Text style={styles.progressLabel}>Submission Progress</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${submissionRate}%` }]} />
          </View>
          <Text style={styles.progressText}>{Math.round(submissionRate)}% submitted</Text>
        </View>
        
        <View style={styles.assignmentMeta}>
          <View style={styles.metaItem}>
            <Calendar size={14} color="#A8A8AA" strokeWidth={2} />
            <Text style={styles.metaText}>Due: {item.dueDate}</Text>
          </View>
          <View style={styles.metaItem}>
            <Users size={14} color="#A8A8AA" strokeWidth={2} />
            <Text style={styles.metaText}>{item.totalStudents} students</Text>
          </View>
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.viewButton}
            onPress={() => handleViewSubmissions(item.id)}
          >
            <CheckCircle size={16} color="#ffffff" strokeWidth={2.5} />
            <Text style={styles.buttonText}>View Submissions</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.analyticsButton}
            onPress={() => handleViewAnalytics(item.id)}
          >
            <BarChart3 size={16} color="#8B5CF6" strokeWidth={2.5} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Assignments</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowCreateModal(true)}
        >
          <Plus size={20} color="#ffffff" strokeWidth={2.5} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Search size={20} color="#A8A8AA" strokeWidth={2} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search assignments..."
            placeholderTextColor="#A8A8AA"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      
      <View style={styles.subjectSelector}>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedSubject}
            onValueChange={(itemValue) => setSelectedSubject(itemValue)}
            style={styles.picker}
            dropdownIconColor="#A8A8AA"
          >
            {sampleFacultySubjects.map((subject) => (
              <Picker.Item key={subject.id} label={subject.name} value={subject.id} color="#ffffff" />
            ))}
          </Picker>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.resultsText}>{filteredAssignments.length} assignments found</Text>
        
        <FlatList
          data={filteredAssignments}
          renderItem={renderAssignmentCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.assignmentsList}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <Modal
        visible={showCreateModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Create Assignment</Text>
            <TouchableOpacity onPress={() => setShowCreateModal(false)}>
              <X size={24} color="#ffffff" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Assignment Title *</Text>
              <TextInput
                style={styles.input}
                value={newAssignment.title}
                onChangeText={(text) => setNewAssignment({...newAssignment, title: text})}
                placeholder="Enter assignment title"
                placeholderTextColor="#A8A8AA"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={newAssignment.description}
                onChangeText={(text) => setNewAssignment({...newAssignment, description: text})}
                placeholder="Enter detailed assignment description"
                placeholderTextColor="#A8A8AA"
                multiline
                numberOfLines={4}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Due Date *</Text>
              <TextInput
                style={styles.input}
                value={newAssignment.dueDate}
                onChangeText={(text) => setNewAssignment({...newAssignment, dueDate: text})}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#A8A8AA"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Maximum Marks</Text>
              <TextInput
                style={styles.input}
                value={newAssignment.maxMarks}
                onChangeText={(text) => setNewAssignment({...newAssignment, maxMarks: text})}
                placeholder="Enter maximum marks (optional)"
                placeholderTextColor="#A8A8AA"
                keyboardType="numeric"
              />
            </View>
            
            <TouchableOpacity style={styles.createButton} onPress={handleCreateAssignment}>
              <Text style={styles.createButtonText}>Create & Publish Assignment</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>
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
  addButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  searchContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
    backgroundColor: '#5A1A32',
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
  subjectSelector: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: '#5A1A32',
  },
  pickerWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
  },
  picker: {
    height: 45,
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
  assignmentsList: {
    paddingBottom: 24,
  },
  assignmentCard: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  assignmentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
    marginRight: 12,
  },
  submissionBadge: {
    backgroundColor: 'rgba(90, 26, 50, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  submissionText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
  },
  assignmentDescription: {
    fontSize: 14,
    color: '#A8A8AA',
    lineHeight: 20,
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressLabel: {
    fontSize: 12,
    color: '#A8A8AA',
    marginBottom: 8,
    fontWeight: '500',
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(168, 168, 170, 0.2)',
    borderRadius: 3,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 11,
    color: '#10B981',
    fontWeight: '500',
  },
  assignmentMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    color: '#A8A8AA',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  viewButton: {
    flex: 1,
    backgroundColor: '#5A1A32',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  analyticsButton: {
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#5A1A32',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#ffffff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  createButton: {
    backgroundColor: '#5A1A32',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
    shadowColor: '#5A1A32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
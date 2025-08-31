import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { Upload, Calendar, Clock, Search, Filter, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react-native';
import { sampleSubjects, sampleAssignments } from '@/data/sampleData';

export default function AssignmentsPage() {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const filteredAssignments = sampleAssignments.filter(assignment => {
    const matchesSubject = selectedSubject === 'all' || assignment.subjectId === selectedSubject;
    const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || assignment.status === filterStatus;
    return matchesSubject && matchesSearch && matchesStatus;
  });

  const handleUpload = (assignmentId: string) => {
    Alert.alert(
      'Upload Assignment',
      'Choose file type to upload:',
      [
        { text: 'PDF Document', onPress: () => uploadFile('PDF', assignmentId) },
        { text: 'Word Document', onPress: () => uploadFile('DOC', assignmentId) },
        { text: 'PowerPoint', onPress: () => uploadFile('PPT', assignmentId) },
        { text: 'Image/Photo', onPress: () => uploadFile('Image', assignmentId) },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const uploadFile = (fileType: string, assignmentId: string) => {
    Alert.alert('Success', `${fileType} file uploaded successfully!`);
  };

  const renderAssignmentCard = ({ item }: { item: any }) => (
    <View style={styles.assignmentCard}>
      <View style={styles.cardHeader}>
        <View style={styles.priorityIndicator}>
          {item.daysLeft <= 3 ? (
            <AlertCircle size={20} color="#EF4444" strokeWidth={2.5} />
          ) : (
            <Clock size={20} color="#F59E0B" strokeWidth={2.5} />
          )}
        </View>
        <View style={[styles.statusBadge, item.status === 'submitted' ? styles.submittedBadge : styles.pendingBadge]}>
          {item.status === 'submitted' ? (
            <CheckCircle size={12} color="#10B981" strokeWidth={2.5} />
          ) : (
            <Clock size={12} color="#F59E0B" strokeWidth={2.5} />
          )}
          <Text style={[styles.statusText, item.status === 'submitted' ? styles.submittedText : styles.pendingText]}>
            {item.status === 'submitted' ? 'Submitted' : 'Pending'}
          </Text>
        </View>
      </View>
      
      <Text style={styles.assignmentTitle}>{item.title}</Text>
      <Text style={styles.assignmentDescription}>{item.description}</Text>
      
      <View style={styles.assignmentMeta}>
        <View style={styles.metaItem}>
          <Calendar size={14} color="#A8A8AA" strokeWidth={2} />
          <Text style={styles.metaText}>Due: {item.dueDate}</Text>
        </View>
        <View style={styles.metaItem}>
          <Clock size={14} color={item.daysLeft <= 3 ? "#EF4444" : "#A8A8AA"} strokeWidth={2} />
          <Text style={[styles.metaText, { color: item.daysLeft <= 3 ? "#EF4444" : "#A8A8AA" }]}>
            {item.daysLeft} days left
          </Text>
        </View>
      </View>
      
      {item.status !== 'submitted' && (
        <TouchableOpacity 
          style={styles.uploadButton}
          onPress={() => handleUpload(item.id)}
        >
          <Upload size={16} color="#ffffff" strokeWidth={2.5} />
          <Text style={styles.uploadButtonText}>Submit Assignment</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Assignments</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#A8A8AA" strokeWidth={2.5} />
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
      
      <View style={styles.filtersContainer}>
        <View style={styles.filterRow}>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedSubject}
              onValueChange={(itemValue) => setSelectedSubject(itemValue)}
              style={styles.picker}
              dropdownIconColor="#A8A8AA"
            >
              <Picker.Item label="All Subjects" value="all" color="#ffffff" />
              {sampleSubjects.map((subject) => (
                <Picker.Item key={subject.id} label={subject.name} value={subject.id} color="#ffffff" />
              ))}
            </Picker>
          </View>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={filterStatus}
              onValueChange={(itemValue) => setFilterStatus(itemValue)}
              style={styles.picker}
              dropdownIconColor="#A8A8AA"
            >
              <Picker.Item label="All Status" value="all" color="#ffffff" />
              <Picker.Item label="Pending" value="pending" color="#ffffff" />
              <Picker.Item label="Submitted" value="submitted" color="#ffffff" />
            </Picker>
          </View>
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
  filtersContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: '#5A1A32',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 12,
  },
  pickerWrapper: {
    flex: 1,
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
  priorityIndicator: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  submittedBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },
  pendingBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  submittedText: {
    color: '#10B981',
  },
  pendingText: {
    color: '#F59E0B',
  },
  assignmentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
    lineHeight: 24,
  },
  assignmentDescription: {
    fontSize: 14,
    color: '#A8A8AA',
    lineHeight: 20,
    marginBottom: 16,
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
  uploadButton: {
    backgroundColor: '#5A1A32',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#5A1A32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  uploadButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});
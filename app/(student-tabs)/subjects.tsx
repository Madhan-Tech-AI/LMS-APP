import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, Search, Filter, Star } from 'lucide-react-native';
import { sampleSubjects } from '@/data/sampleData';

export default function SubjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('all');

  const filteredSubjects = sampleSubjects.filter(subject => 
    subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderSubjectCard = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.subjectCard}
      onPress={() => router.push(`/subject/${item.id}`)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.subjectIcon}>
          <BookOpen size={24} color="#ffffff" strokeWidth={2.5} />
        </View>
        <TouchableOpacity style={styles.favoriteButton}>
          <Star size={16} color="#A8A8AA" strokeWidth={2} />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.subjectName}>{item.name}</Text>
      <Text style={styles.subjectCode}>{item.code}</Text>
      
      <View style={styles.cardFooter}>
        <View style={styles.creditsBadge}>
          <Text style={styles.creditsText}>{item.credits} Credits</Text>
        </View>
        <Text style={styles.progressText}>85% Complete</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Subjects</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#A8A8AA" strokeWidth={2.5} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Search size={20} color="#A8A8AA" strokeWidth={2} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search subjects..."
            placeholderTextColor="#A8A8AA"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.resultsText}>{filteredSubjects.length} subjects found</Text>
        
        <FlatList
          data={filteredSubjects}
          renderItem={renderSubjectCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.subjectsList}
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
  subjectsList: {
    paddingBottom: 24,
  },
  row: {
    justifyContent: 'space-between',
  },
  subjectCard: {
    backgroundColor: '#1A1A1A',
    width: '47%',
    padding: 16,
    borderRadius: 20,
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
  subjectIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#5A1A32',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    padding: 4,
  },
  subjectName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
    lineHeight: 18,
  },
  subjectCode: {
    fontSize: 12,
    color: '#A8A8AA',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  creditsBadge: {
    backgroundColor: 'rgba(90, 26, 50, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  creditsText: {
    fontSize: 10,
    color: '#A8A8AA',
    fontWeight: '500',
  },
  progressText: {
    fontSize: 10,
    color: '#10B981',
    fontWeight: '500',
  },
});
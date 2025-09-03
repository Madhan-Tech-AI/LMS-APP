import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal, ScrollView } from 'react-native';
import { theme } from '@/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Award, Calendar, Clock, Search, Filter, CircleCheck as CheckCircle, BookOpen, TrendingUp, X } from 'lucide-react-native';

export default function CAResultsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSemester, setFilterSemester] = useState('all');

  // Sample CA Results data
  const sampleCAResults = [
    {
      id: '1',
      subject: 'Data Structures',
      subjectCode: 'CS301',
      ca1: 85,
      ca2: 78,
      ca3: 92,
      average: 85,
      grade: 'A',
      semester: '5th',
      date: '2024-01-15'
    },
    {
      id: '2',
      subject: 'Database Management',
      subjectCode: 'CS302',
      ca1: 88,
      ca2: 85,
      ca3: 90,
      average: 87.7,
      grade: 'A',
      semester: '5th',
      date: '2024-01-15'
    },
    {
      id: '3',
      subject: 'Computer Networks',
      subjectCode: 'CS303',
      ca1: 75,
      ca2: 82,
      ca3: 78,
      average: 78.3,
      grade: 'B+',
      semester: '5th',
      date: '2024-01-15'
    },
    {
      id: '4',
      subject: 'Software Engineering',
      subjectCode: 'CS304',
      ca1: 90,
      ca2: 88,
      ca3: 85,
      average: 87.7,
      grade: 'A',
      semester: '5th',
      date: '2024-01-15'
    }
  ];

  const filteredResults = sampleCAResults.filter(result => {
    const matchesSearch = result.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         result.subjectCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSemester = filterSemester === 'all' || result.semester === filterSemester;
    return matchesSearch && matchesSemester;
  });

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A':
        return '#10B981';
      case 'B+':
        return '#F59E0B';
      case 'B':
        return '#EF4444';
      default:
        return theme.colors.accent;
    }
  };

  const renderResultCard = ({ item }: { item: any }) => (
    <View style={styles.resultCard}>
      <View style={styles.cardHeader}>
        <View style={styles.subjectInfo}>
          <Text style={styles.subjectName}>{item.subject}</Text>
          <Text style={styles.subjectCode}>{item.subjectCode}</Text>
        </View>
        <View style={[styles.gradeBadge, { backgroundColor: `${getGradeColor(item.grade)}20` }]}>
          <Text style={[styles.gradeText, { color: getGradeColor(item.grade) }]}>{item.grade}</Text>
        </View>
      </View>
      
      <View style={styles.caScores}>
        <View style={styles.caScore}>
          <Text style={styles.caLabel}>CA 1</Text>
          <Text style={styles.caValue}>{item.ca1}%</Text>
        </View>
        <View style={styles.caScore}>
          <Text style={styles.caLabel}>CA 2</Text>
          <Text style={styles.caValue}>{item.ca2}%</Text>
        </View>
        <View style={styles.caScore}>
          <Text style={styles.caLabel}>CA 3</Text>
          <Text style={styles.caValue}>{item.ca3}%</Text>
        </View>
      </View>
      
      <View style={styles.averageSection}>
        <View style={styles.averageInfo}>
          <Text style={styles.averageLabel}>Average</Text>
          <Text style={styles.averageValue}>{item.average}%</Text>
        </View>
        <View style={styles.semesterBadge}>
          <Text style={styles.semesterText}>{item.semester} Semester</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>CA Results</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={theme.colors.primary} strokeWidth={2.5} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Search size={20} color={theme.colors.primary} strokeWidth={2} />
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
        <Text style={styles.resultsText}>{filteredResults.length} results found</Text>
        
        <FlatList
          data={filteredResults}
          renderItem={renderResultCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.resultsList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: theme.colors.accent,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  filterButton: {
    backgroundColor: 'rgba(36, 70, 45, 0.15)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
    backgroundColor: theme.colors.accent,
    paddingBottom: 24,
  },
  searchBox: {
    backgroundColor: 'rgba(36, 70, 45, 0.15)',
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
    color: theme.colors.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  resultsText: {
    fontSize: 14,
    color: theme.colors.accent,
    marginBottom: 16,
  },
  resultsList: {
    paddingBottom: 24,
  },
  resultCard: {
    backgroundColor: theme.colors.surface,
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  subjectCode: {
    fontSize: 14,
    color: theme.colors.accent,
  },
  gradeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 199, 2, 0.3)',
  },
  gradeText: {
    fontSize: 16,
    fontWeight: '700',
  },
  caScores: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 199, 2, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  caScore: {
    alignItems: 'center',
    flex: 1,
  },
  caLabel: {
    fontSize: 12,
    color: theme.colors.accent,
    marginBottom: 4,
    fontWeight: '500',
  },
  caValue: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  averageSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 199, 2, 0.2)',
  },
  averageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  averageLabel: {
    fontSize: 14,
    color: theme.colors.accent,
    fontWeight: '600',
  },
  averageValue: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  semesterBadge: {
    backgroundColor: 'rgba(255, 199, 2, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  semesterText: {
    fontSize: 12,
    color: theme.colors.accent,
    fontWeight: '500',
  },
});

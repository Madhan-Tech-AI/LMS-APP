import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, BookOpen, Clock, TrendingUp, Calendar, Award, Target, ChartBar as BarChart3, FileText } from 'lucide-react-native';
import { sampleSubjects, sampleAssignments } from '@/data/sampleData';



export default function StudentHomePage() {
  const upcomingAssignments = sampleAssignments.filter(a => a.status === 'pending').slice(0, 3);
  
  const stats = [
    { label: 'CGPA', value: '8.7', icon: TrendingUp, color: '#10B981' },
    { label: 'Attendance', value: '92%', icon: Calendar, color: '#3B82F6' },
    { label: 'Completed', value: '15', icon: Award, color: '#F59E0B' },
    { label: 'Pending', value: '3', icon: Target, color: '#EF4444' },
  ];

  const renderSubjectCard = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.subjectCard}
      onPress={() => router.push(`/subject/${item.id}`)}
    >
      <View style={styles.subjectGradient}>
        <BookOpen size={28} color="#ffffff" strokeWidth={2.5} />
      </View>
      <View style={styles.subjectInfo}>
        <Text style={styles.subjectName}>{item.name}</Text>
        <Text style={styles.subjectCode}>{item.code}</Text>
        <View style={styles.creditsBadge}>
          <Text style={styles.creditsText}>{item.credits} Credits</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderStatCard = (stat: any, index: number) => (
    <View key={index} style={[styles.statCard, { borderLeftColor: stat.color }]}>
      <View style={[styles.statIcon, { backgroundColor: `${stat.color}15` }]}>
        <stat.icon size={20} color={stat.color} strokeWidth={2.5} />
      </View>
      <View style={styles.statInfo}>
        <Text style={styles.statValue}>{stat.value}</Text>
        <Text style={styles.statLabel}>{stat.label}</Text>
      </View>
    </View>
  );

  const renderUpcomingAssignment = ({ item }: { item: any }) => (
    <View style={styles.assignmentPreview}>
      <View style={styles.assignmentDot} />
      <View style={styles.assignmentContent}>
        <Text style={styles.assignmentTitle}>{item.title}</Text>
        <View style={styles.assignmentMeta}>
          <Clock size={12} color="#A8A8AA" />
          <Text style={styles.assignmentDue}>{item.daysLeft} days left</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.studentName}>John Doe</Text>
            <Text style={styles.semesterInfo}>Semester 5 • Computer Science</Text>
          </View>
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => router.push('/(student-tabs)/notifications')}
          >
            <Bell size={24} color="#ffffff" strokeWidth={2.5} />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Academic Overview</Text>
          <View style={styles.statsGrid}>
            {stats.map(renderStatCard)}
          </View>
        </View>

        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickAction} onPress={() => router.push('/(student-tabs)/assignments')}>
              <FileText size={24} color="#5A1A32" strokeWidth={2.5} />
              <Text style={styles.quickActionText}>View Tasks</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction} onPress={() => router.push('/(student-tabs)/subjects')}>
              <BookOpen size={24} color="#5A1A32" strokeWidth={2.5} />
              <Text style={styles.quickActionText}>Browse Subjects</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <BarChart3 size={24} color="#5A1A32" strokeWidth={2.5} />
              <Text style={styles.quickActionText}>Analytics</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <Calendar size={24} color="#5A1A32" strokeWidth={2.5} />
              <Text style={styles.quickActionText}>Schedule</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.upcomingSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Deadlines</Text>
            <TouchableOpacity onPress={() => router.push('/(student-tabs)/assignments')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={upcomingAssignments}
            renderItem={renderUpcomingAssignment}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

        <View style={styles.subjectsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Subjects</Text>
            <TouchableOpacity onPress={() => router.push('/(student-tabs)/subjects')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={sampleSubjects.slice(0, 3)}
            renderItem={renderSubjectCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
    backgroundColor: '#5A1A32',
  },
  welcomeSection: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: '#A8A8AA',
    marginBottom: 4,
  },
  studentName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  semesterInfo: {
    fontSize: 14,
    color: '#A8A8AA',
  },
  notificationButton: {
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#EF4444',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#5A1A32',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  statsContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: '#1A1A1A',
    width: '47%',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statInfo: {
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#A8A8AA',
    fontWeight: '500',
  },
  quickActionsContainer: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickAction: {
    backgroundColor: '#A8A8AA',
    width: '47%',
    aspectRatio: 1.2,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5A1A32',
    marginTop: 8,
    textAlign: 'center',
  },
  upcomingSection: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: '#A8A8AA',
    fontWeight: '500',
  },
  assignmentPreview: {
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  assignmentDot: {
    width: 8,
    height: 8,
    backgroundColor: '#5A1A32',
    borderRadius: 4,
    marginRight: 12,
  },
  assignmentContent: {
    flex: 1,
  },
  assignmentTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  assignmentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  assignmentDue: {
    fontSize: 12,
    color: '#A8A8AA',
  },
  subjectsSection: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
  },
  subjectCard: {
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  subjectGradient: {
    width: 56,
    height: 56,
    backgroundColor: '#5A1A32',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#5A1A32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
    lineHeight: 22,
  },
  subjectCode: {
    fontSize: 14,
    color: '#A8A8AA',
    marginBottom: 8,
  },
  creditsBadge: {
    backgroundColor: 'rgba(168, 168, 170, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  creditsText: {
    fontSize: 12,
    color: '#A8A8AA',
    fontWeight: '500',
  },
});
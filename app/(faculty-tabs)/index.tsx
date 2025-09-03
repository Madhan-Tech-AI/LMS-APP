import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Users, BookOpen, FileText, User, ChartBar as BarChart3, Calendar, TrendingUp, Award } from 'lucide-react-native';
import { theme } from '@/theme';

export default function FacultyDashboardTab() {
  const stats = [
    { label: 'Total Students', value: '156', icon: Users, color: theme.colors.accent },
    { label: 'Active Subjects', value: '4', icon: BookOpen, color: theme.colors.accent },
    { label: 'Assignments', value: '12', icon: FileText, color: theme.colors.accent },
    { label: 'Submissions', value: '89%', icon: TrendingUp, color: theme.colors.accent },
  ];

  const quickActions = [
    {
      id: '1',
      title: 'Manage Students',
      subtitle: 'View & manage enrolled students',
      icon: Users,
      color: '#3B82F6',
      route: '/faculty/manage-students',
    },
    
    {
      id: '3',
      title: 'Assignments',
      subtitle: 'Create & track assignments',
      icon: FileText,
      color: '#F59E0B',
      route: '/(faculty-tabs)/assignments',
    },
    {
      id: '4',
      title: 'Analytics',
      subtitle: 'Student performance insights',
      icon: BarChart3,
      color: '#8B5CF6',
      route: '/(faculty-tabs)/analytics',
    },
  ];

  const recentActivity = [
    { id: '1', action: 'New assignment submitted', student: 'John Doe', time: '2 hours ago' },
    { id: '2', action: 'Student enrolled', student: 'Jane Smith', time: '4 hours ago' },
    { id: '3', action: 'Assignment graded', student: 'Jane Smith', time: '1 day ago' },
  ];

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

  const renderQuickAction = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.actionCard}
      onPress={() => router.push(item.route)}
    >
      <View style={[styles.actionIcon, { backgroundColor: `${item.color}15` }]}>
        <item.icon size={28} color={item.color} strokeWidth={2.5} />
      </View>
      <Text style={styles.actionTitle}>{item.title}</Text>
      <Text style={styles.actionSubtitle}>{item.subtitle}</Text>
    </TouchableOpacity>
  );

  const renderActivityItem = ({ item }: { item: any }) => (
    <View style={styles.activityItem}>
      <View style={styles.activityDot} />
      <View style={styles.activityContent}>
        <Text style={styles.activityAction}>{item.action}</Text>
        <Text style={styles.activityStudent}>{item.student}</Text>
        <Text style={styles.activityTime}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>Good morning,</Text>
            <Text style={styles.facultyName}>Dr. Smith Johnson</Text>
            <Text style={styles.departmentInfo}>Computer Science Department</Text>
          </View>
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => router.push('/(faculty-tabs)/notifications')}
          >
            <Bell size={24} color={theme.colors.primary} strokeWidth={2.5} />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>5</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsGrid}>
            {stats.map(renderStatCard)}
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <FlatList
            data={quickActions}
            renderItem={renderQuickAction}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.actionRow}
            scrollEnabled={false}
          />
        </View>

        <View style={styles.activityContainer}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <FlatList
            data={recentActivity}
            renderItem={renderActivityItem}
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
    backgroundColor: '#02462D',
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
    backgroundColor: '#FFC702',
  },
  welcomeSection: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: '#02462D',
    marginBottom: 4,
  },
  facultyName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#02462D',
    marginBottom: 4,
  },
  departmentInfo: {
    fontSize: 14,
    color: '#02462D',
  },
  notificationButton: {
    position: 'relative',
    backgroundColor: 'rgba(36, 70, 45, 0.1)',
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
    borderColor: '#FFC702',
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
    color: '#FFC702',
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
    color: '#FFC702',
    fontWeight: '500',
  },
  actionsContainer: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  actionRow: {
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: '#1A1A1A',
    width: '47%',
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#FFC702',
    lineHeight: 16,
  },
  activityContainer: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
  },
  activityItem: {
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityDot: {
    width: 8,
    height: 8,
    backgroundColor: '#FFC702',
    borderRadius: 4,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityAction: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  activityStudent: {
    fontSize: 12,
    color: '#FFC702',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 11,
    color: '#FFC702',
  },
});
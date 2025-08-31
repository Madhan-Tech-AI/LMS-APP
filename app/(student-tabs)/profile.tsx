import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Camera, CreditCard as Edit3, LogOut, Mail, GraduationCap, TrendingUp, Calendar, Award, Settings, Download } from 'lucide-react-native';

export default function ProfilePage() {
  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing feature coming soon!');
  };

  const handleChangePicture = () => {
    Alert.alert(
      'Change Profile Picture',
      'Choose an option:',
      [
        { text: 'Camera', onPress: () => Alert.alert('Camera', 'Camera feature coming soon!') },
        { text: 'Gallery', onPress: () => Alert.alert('Gallery', 'Gallery feature coming soon!') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => Alert.alert('Logged out', 'You have been logged out successfully!') },
      ]
    );
  };

  const achievements = [
    { title: 'Perfect Attendance', description: '100% attendance this month', icon: Calendar, color: '#10B981' },
    { title: 'Top Performer', description: 'Highest CGPA in class', icon: Award, color: '#F59E0B' },
    { title: 'Early Submitter', description: 'All assignments on time', icon: TrendingUp, color: '#8B5CF6' },
  ];

  const quickActions = [
    { title: 'Download Transcript', icon: Download, color: '#3B82F6' },
    { title: 'Academic Calendar', icon: Calendar, color: '#10B981' },
    { title: 'Settings', icon: Settings, color: '#A8A8AA' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity onPress={handleEditProfile} style={styles.editButton}>
          <Edit3 size={20} color="#ffffff" strokeWidth={2.5} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.profilePictureContainer}>
            <View style={styles.profilePicture}>
              <User size={48} color="#ffffff" strokeWidth={2.5} />
            </View>
            <TouchableOpacity style={styles.cameraButton} onPress={handleChangePicture}>
              <Camera size={16} color="#ffffff" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.studentName}>John Doe</Text>
          <Text style={styles.studentId}>REG12345678</Text>
          <Text style={styles.studentProgram}>B.Tech Computer Science</Text>
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Academic Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <TrendingUp size={24} color="#10B981" strokeWidth={2.5} />
              <Text style={styles.statValue}>8.7</Text>
              <Text style={styles.statLabel}>CGPA</Text>
            </View>
            <View style={styles.statCard}>
              <Calendar size={24} color="#3B82F6" strokeWidth={2.5} />
              <Text style={styles.statValue}>92%</Text>
              <Text style={styles.statLabel}>Attendance</Text>
            </View>
            <View style={styles.statCard}>
              <Award size={24} color="#F59E0B" strokeWidth={2.5} />
              <Text style={styles.statValue}>15</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
          </View>
        </View>

        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          {achievements.map((achievement, index) => (
            <View key={index} style={styles.achievementCard}>
              <View style={[styles.achievementIcon, { backgroundColor: `${achievement.color}15` }]}>
                <achievement.icon size={20} color={achievement.color} strokeWidth={2.5} />
              </View>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDescription}>{achievement.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity key={index} style={styles.quickActionCard}>
                <action.icon size={20} color={action.color} strokeWidth={2.5} />
                <Text style={styles.quickActionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <Mail size={20} color="#5A1A32" strokeWidth={2.5} />
              <Text style={styles.infoLabel}>Email</Text>
            </View>
            <Text style={styles.infoValue}>john.doe@student.gojan.ac.in</Text>
          </View>
          
          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <GraduationCap size={20} color="#5A1A32" strokeWidth={2.5} />
              <Text style={styles.infoLabel}>Current Semester</Text>
            </View>
            <Text style={styles.infoValue}>Semester 5</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#EF4444" strokeWidth={2.5} />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
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
  editButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  profilePictureContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    backgroundColor: '#5A1A32',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#5A1A32',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  cameraButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 36,
    height: 36,
    backgroundColor: '#A8A8AA',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#0F0F0F',
  },
  studentName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  studentId: {
    fontSize: 16,
    color: '#A8A8AA',
    marginBottom: 4,
  },
  studentProgram: {
    fontSize: 14,
    color: '#A8A8AA',
  },
  statsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#A8A8AA',
    fontWeight: '500',
  },
  achievementsSection: {
    marginBottom: 32,
  },
  achievementCard: {
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 12,
    color: '#A8A8AA',
  },
  quickActionsSection: {
    marginBottom: 32,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: '#A8A8AA',
    fontWeight: '500',
    textAlign: 'center',
  },
  infoSection: {
    gap: 12,
    marginBottom: 32,
  },
  infoCard: {
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#A8A8AA',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    lineHeight: 22,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EF4444',
    gap: 8,
    marginBottom: 32,
  },
  logoutButtonText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '600',
  },
});
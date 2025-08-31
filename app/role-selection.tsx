import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GraduationCap, Users, ChevronRight } from 'lucide-react-native';

export default function RoleSelectionPage() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>Choose Your Portal</Text>
          <Text style={styles.subtitle}>Select your role to access the Learning Management System</Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.roleButton, styles.studentButton]} 
            onPress={() => router.push('/student-login')}
          >
            <View style={styles.buttonContent}>
              <View style={styles.iconContainer}>
                <GraduationCap size={48} color="#ffffff" strokeWidth={2.5} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.roleButtonText}>Student Portal</Text>
                <Text style={styles.roleButtonSubtext}>Access your courses, assignments, and academic progress</Text>
              </View>
              <ChevronRight size={24} color="rgba(255, 255, 255, 0.7)" strokeWidth={2.5} />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.roleButton, styles.facultyButton]} 
            onPress={() => router.push('/faculty-login')}
          >
            <View style={styles.buttonContent}>
              <View style={styles.iconContainer}>
                <Users size={48} color="#ffffff" strokeWidth={2.5} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.roleButtonText}>Faculty Portal</Text>
                <Text style={styles.roleButtonSubtext}>Manage courses, students, and academic content</Text>
              </View>
              <ChevronRight size={24} color="rgba(255, 255, 255, 0.7)" strokeWidth={2.5} />
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.footerSection}>
          <Text style={styles.footerText}>Gojan School of Business and Technology</Text>
          <Text style={styles.footerSubtext}>Empowering Education Through Technology</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#A8A8AA',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    gap: 20,
    marginBottom: 60,
  },
  roleButton: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  studentButton: {
    backgroundColor: '#5A1A32',
  },
  facultyButton: {
    backgroundColor: '#A8A8AA',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  roleButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 6,
  },
  roleButtonSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
  },
  footerSection: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#A8A8AA',
    marginBottom: 4,
    textAlign: 'center',
  },
  footerSubtext: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
});
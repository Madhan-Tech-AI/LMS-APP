import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, User, Mail, GraduationCap, TrendingUp, Calendar } from 'lucide-react-native';
import { sampleStudents } from '@/data/facultyData';

export default function StudentDetailPage() {
  const { id } = useLocalSearchParams();
  const student = sampleStudents.find(s => s.id === id);

  if (!student) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Student not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1e293b" />
        </TouchableOpacity>
        <Text style={styles.title}>Student Profile</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.profilePicture}>
            <User size={48} color="#64748b" />
          </View>
          
          <Text style={styles.studentName}>{student.name}</Text>
          <Text style={styles.studentReg}>{student.regNo}</Text>
        </View>
        
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <Mail size={20} color="#1E40AF" />
              <Text style={styles.infoLabel}>Email</Text>
            </View>
            <Text style={styles.infoValue}>{student.email}</Text>
          </View>
          
          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <GraduationCap size={20} color="#1E40AF" />
              <Text style={styles.infoLabel}>Current Semester</Text>
            </View>
            <Text style={styles.infoValue}>Semester {student.semester}</Text>
          </View>
          
          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <TrendingUp size={20} color="#1E40AF" />
              <Text style={styles.infoLabel}>CGPA</Text>
            </View>
            <Text style={styles.infoValue}>{student.cgpa}</Text>
          </View>
          
          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <Calendar size={20} color="#1E40AF" />
              <Text style={styles.infoLabel}>Attendance</Text>
            </View>
            <Text style={styles.infoValue}>{student.attendance}%</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  profilePicture: {
    width: 96,
    height: 96,
    backgroundColor: '#e2e8f0',
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  studentName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  studentReg: {
    fontSize: 16,
    color: '#64748b',
  },
  infoSection: {
    gap: 12,
    marginBottom: 32,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    lineHeight: 22,
  },
});
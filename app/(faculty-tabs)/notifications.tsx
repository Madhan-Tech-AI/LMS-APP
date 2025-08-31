import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, TextInput, Modal, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { Plus, Send, X, Bell, Search, Users, Calendar } from 'lucide-react-native';
import { sampleFacultyNotifications } from '@/data/facultyData';

export default function FacultyNotificationsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [notifications, setNotifications] = useState(sampleFacultyNotifications);
  const [searchQuery, setSearchQuery] = useState('');
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    audience: 'all',
    priority: 'normal',
  });

  const handleSendNotification = () => {
    if (!newNotification.title || !newNotification.message) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    const notification = {
      id: Date.now().toString(),
      title: newNotification.title,
      message: newNotification.message,
      date: new Date().toLocaleString(),
      sentTo: newNotification.audience === 'all' ? 'All Students' : 'Selected Group',
    };
    
    setNotifications([notification, ...notifications]);
    Alert.alert('Success', 'Notification sent successfully to all recipients!');
    setShowCreateModal(false);
    setNewNotification({ title: '', message: '', audience: 'all', priority: 'normal' });
  };

  const filteredNotifications = notifications.filter(notification =>
    notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notification.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderNotificationCard = ({ item }: { item: any }) => (
    <View style={styles.notificationCard}>
      <View style={styles.cardHeader}>
        <View style={styles.notificationIcon}>
          <Bell size={20} color="#ffffff" strokeWidth={2.5} />
        </View>
        <View style={styles.audienceBadge}>
          <Users size={12} color="#A8A8AA" strokeWidth={2} />
          <Text style={styles.audienceText}>{item.sentTo}</Text>
        </View>
      </View>
      
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationMessage}>{item.message}</Text>
      
      <View style={styles.notificationFooter}>
        <View style={styles.timeContainer}>
          <Calendar size={12} color="#A8A8AA" strokeWidth={2} />
          <Text style={styles.notificationDate}>{item.date}</Text>
        </View>
        <TouchableOpacity style={styles.viewStatsButton}>
          <Text style={styles.viewStatsText}>View Stats</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
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
            placeholder="Search notifications..."
            placeholderTextColor="#A8A8AA"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.resultsText}>{filteredNotifications.length} notifications sent</Text>
        
        <FlatList
          data={filteredNotifications}
          renderItem={renderNotificationCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.notificationsList}
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
            <Text style={styles.modalTitle}>Send Notification</Text>
            <TouchableOpacity onPress={() => setShowCreateModal(false)}>
              <X size={24} color="#ffffff" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Title *</Text>
              <TextInput
                style={styles.input}
                value={newNotification.title}
                onChangeText={(text) => setNewNotification({...newNotification, title: text})}
                placeholder="Enter notification title"
                placeholderTextColor="#A8A8AA"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Message *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={newNotification.message}
                onChangeText={(text) => setNewNotification({...newNotification, message: text})}
                placeholder="Enter notification message"
                placeholderTextColor="#A8A8AA"
                multiline
                numberOfLines={6}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Send To</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={newNotification.audience}
                  onValueChange={(itemValue) => setNewNotification({...newNotification, audience: itemValue})}
                  style={styles.picker}
                  dropdownIconColor="#A8A8AA"
                >
                  <Picker.Item label="All Students" value="all" color="#ffffff" />
                  <Picker.Item label="Semester 5 Only" value="sem5" color="#ffffff" />
                  <Picker.Item label="Semester 6 Only" value="sem6" color="#ffffff" />
                  <Picker.Item label="Selected Students" value="selected" color="#ffffff" />
                </Picker>
              </View>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Priority Level</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={newNotification.priority}
                  onValueChange={(itemValue) => setNewNotification({...newNotification, priority: itemValue})}
                  style={styles.picker}
                  dropdownIconColor="#A8A8AA"
                >
                  <Picker.Item label="Normal" value="normal" color="#ffffff" />
                  <Picker.Item label="High" value="high" color="#ffffff" />
                  <Picker.Item label="Urgent" value="urgent" color="#ffffff" />
                </Picker>
              </View>
            </View>
            
            <TouchableOpacity style={styles.sendButton} onPress={handleSendNotification}>
              <Send size={16} color="#ffffff" strokeWidth={2.5} />
              <Text style={styles.sendButtonText}>Send Notification</Text>
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
  notificationsList: {
    paddingBottom: 24,
  },
  notificationCard: {
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
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
  notificationIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#5A1A32',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  audienceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(168, 168, 170, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  audienceText: {
    fontSize: 11,
    color: '#A8A8AA',
    fontWeight: '500',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#A8A8AA',
    lineHeight: 20,
    marginBottom: 16,
  },
  notificationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  notificationDate: {
    fontSize: 12,
    color: '#A8A8AA',
  },
  viewStatsButton: {
    backgroundColor: 'rgba(90, 26, 50, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  viewStatsText: {
    fontSize: 11,
    color: '#ffffff',
    fontWeight: '500',
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
    height: 120,
    textAlignVertical: 'top',
  },
  pickerWrapper: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 12,
  },
  picker: {
    height: 50,
    color: '#ffffff',
  },
  sendButton: {
    backgroundColor: '#5A1A32',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 12,
    gap: 8,
    marginTop: 20,
    marginBottom: 40,
    shadowColor: '#5A1A32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
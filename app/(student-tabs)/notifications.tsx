import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Calendar, CircleAlert as AlertCircle, Search, Filter, CircleCheck as CheckCircle, Clock, BookOpen } from 'lucide-react-native';
import { sampleNotifications } from '@/data/sampleData';

export default function NotificationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredNotifications = sampleNotifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || notification.type === filterType;
    return matchesSearch && matchesType;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'assignment':
        return { icon: AlertCircle, color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.15)' };
      case 'announcement':
        return { icon: Bell, color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.15)' };
      case 'event':
        return { icon: Calendar, color: '#10B981', bg: 'rgba(16, 185, 129, 0.15)' };
      default:
        return { icon: Bell, color: '#A8A8AA', bg: 'rgba(168, 168, 170, 0.15)' };
    }
  };

  const renderNotificationCard = ({ item }: { item: any }) => {
    const iconConfig = getNotificationIcon(item.type);
    const IconComponent = iconConfig.icon;
    
    return (
      <TouchableOpacity style={styles.notificationCard}>
        <View style={[styles.notificationIcon, { backgroundColor: iconConfig.bg }]}>
          <IconComponent size={20} color={iconConfig.color} strokeWidth={2.5} />
        </View>
        
        <View style={styles.notificationContent}>
          <View style={styles.notificationHeader}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <View style={styles.typeBadge}>
              <Text style={styles.typeText}>{item.type}</Text>
            </View>
          </View>
          <Text style={styles.notificationMessage}>{item.message}</Text>
          <View style={styles.notificationFooter}>
            <View style={styles.timeContainer}>
              <Clock size={12} color="#A8A8AA" strokeWidth={2} />
              <Text style={styles.notificationDate}>{item.date}</Text>
            </View>
            <TouchableOpacity style={styles.markReadButton}>
              <CheckCircle size={12} color="#10B981" strokeWidth={2} />
              <Text style={styles.markReadText}>Mark as read</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#A8A8AA" strokeWidth={2.5} />
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
        <Text style={styles.resultsText}>{filteredNotifications.length} notifications</Text>
        
        <FlatList
          data={filteredNotifications}
          renderItem={renderNotificationCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.notificationsList}
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
  notificationsList: {
    paddingBottom: 24,
  },
  notificationCard: {
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  notificationIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
    marginRight: 12,
  },
  typeBadge: {
    backgroundColor: 'rgba(90, 26, 50, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 10,
    color: '#A8A8AA',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#A8A8AA',
    lineHeight: 20,
    marginBottom: 12,
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
  markReadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  markReadText: {
    fontSize: 11,
    color: '#10B981',
    fontWeight: '500',
  },
});
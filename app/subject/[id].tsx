import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, FileText, Play, Search, Star, Clock, Eye } from 'lucide-react-native';
import { sampleSubjects, sampleNotes, sampleVideos } from '@/data/sampleData';
import { theme } from '@/theme';

export default function SubjectPage() {
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState<'notes' | 'videos'>('notes');
  const [searchQuery, setSearchQuery] = useState('');
  
  const subject = sampleSubjects.find(s => s.id === id);
  const notes = sampleNotes.filter(note => note.subjectId === id);
  const videos = sampleVideos.filter(video => video.subjectId === id);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.unit.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.unit.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderNoteItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.itemCard}>
      <View style={styles.itemHeader}>
        <View style={styles.itemIcon}>
          <FileText size={20} color={theme.colors.primary} strokeWidth={2.5} />
        </View>
        <TouchableOpacity style={styles.favoriteButton}>
          <Star size={14} color={theme.colors.textMuted} strokeWidth={2} />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemUnit}>{item.unit}</Text>
      
      <View style={styles.itemFooter}>
        <View style={styles.viewsContainer}>
          <Eye size={12} color={theme.colors.textMuted} strokeWidth={2} />
          <Text style={styles.viewsText}>245 views</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderVideoItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.itemCard}>
      <View style={styles.itemHeader}>
        <View style={[styles.itemIcon, { backgroundColor: '#EF4444' }]}>
          <Play size={20} color="#ffffff" strokeWidth={2.5} />
        </View>
        <TouchableOpacity style={styles.favoriteButton}>
          <Star size={14} color={theme.colors.textMuted} strokeWidth={2} />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.itemTitle}>{item.title}</Text>
      <View style={styles.videoMeta}>
        <Text style={styles.itemUnit}>{item.unit}</Text>
        <View style={styles.durationContainer}>
          <Clock size={12} color={theme.colors.textMuted} strokeWidth={2} />
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
      </View>
      
      <View style={styles.itemFooter}>
        <View style={styles.viewsContainer}>
          <Eye size={12} color={theme.colors.textMuted} strokeWidth={2} />
          <Text style={styles.viewsText}>189 views</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (!subject) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Subject not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.primary} strokeWidth={2.5} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.subjectName}>{subject.name}</Text>
          <Text style={styles.subjectCode}>{subject.code}</Text>
        </View>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Search size={20} color={theme.colors.primary} strokeWidth={2} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search content..."
            placeholderTextColor={theme.colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'notes' && styles.activeTab]}
          onPress={() => setActiveTab('notes')}
        >
          <FileText size={18} color={activeTab === 'notes' ? theme.colors.primary : theme.colors.textMuted} strokeWidth={2.5} />
          <Text style={[styles.tabText, activeTab === 'notes' && styles.activeTabText]}>
            Notes ({filteredNotes.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'videos' && styles.activeTab]}
          onPress={() => setActiveTab('videos')}
        >
          <Play size={18} color={activeTab === 'videos' ? theme.colors.primary : theme.colors.textMuted} strokeWidth={2.5} />
          <Text style={[styles.tabText, activeTab === 'videos' && styles.activeTabText]}>
            Videos ({filteredVideos.length})
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        {activeTab === 'notes' ? (
          <FlatList
            data={filteredNotes}
            renderItem={renderNoteItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <FlatList
            data={filteredVideos}
            renderItem={renderVideoItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
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
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: theme.colors.accent,
  },
  backButton: {
    backgroundColor: 'rgba(36, 70, 45, 0.15)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 2,
  },
  subjectCode: {
    fontSize: 14,
    color: theme.colors.primary,
    opacity: 0.7,
  },
  searchContainer: {
    paddingHorizontal: 24,
    paddingTop: 0,
    backgroundColor: theme.colors.accent,
    paddingBottom: 20,
    alignItems: 'center',
  },
  searchBox: {
    backgroundColor: 'rgba(36, 70, 45, 0.15)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    gap: 12,
    width: '100%',
    maxWidth: 400,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.primary,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 4,
    marginTop: 24,
    marginBottom: 24,
  },
  tab: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 22,
    borderRadius: 12,
    gap: 14,
  },
  activeTab: {
    backgroundColor: theme.colors.accent,
    shadowColor: theme.colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textMuted,
  },
  activeTabText: {
    color: theme.colors.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  listContainer: {
    paddingBottom: 12,
  },
  row: {
    justifyContent: 'space-between',
  },
  itemCard: {
    backgroundColor: theme.colors.surface,
    width: '47%',
    padding: 14,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemIcon: {
    width: 36,
    height: 36,
    backgroundColor: theme.colors.accent,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    padding: 4,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: 6,
    lineHeight: 18,
  },
  itemUnit: {
    fontSize: 12,
    color: theme.colors.textMuted,
    marginBottom: 12,
  },
  videoMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  durationText: {
    fontSize: 11,
    color: theme.colors.textMuted,
    fontWeight: '500',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewsText: {
    fontSize: 11,
    color: theme.colors.textMuted,
  },

  errorText: {
    fontSize: 18,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginTop: 50,
  },
});
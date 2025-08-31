import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, FileText, Play, Download, Search, Star, Clock, Eye } from 'lucide-react-native';
import { sampleSubjects, sampleNotes, sampleVideos } from '@/data/sampleData';

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
          <FileText size={20} color="#ffffff" strokeWidth={2.5} />
        </View>
        <TouchableOpacity style={styles.favoriteButton}>
          <Star size={14} color="#A8A8AA" strokeWidth={2} />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemUnit}>{item.unit}</Text>
      
      <View style={styles.itemFooter}>
        <View style={styles.viewsContainer}>
          <Eye size={12} color="#A8A8AA" strokeWidth={2} />
          <Text style={styles.viewsText}>245 views</Text>
        </View>
        <TouchableOpacity style={styles.downloadButton}>
          <Download size={14} color="#5A1A32" strokeWidth={2.5} />
          <Text style={styles.downloadText}>Download</Text>
        </TouchableOpacity>
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
          <Star size={14} color="#A8A8AA" strokeWidth={2} />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.itemTitle}>{item.title}</Text>
      <View style={styles.videoMeta}>
        <Text style={styles.itemUnit}>{item.unit}</Text>
        <View style={styles.durationContainer}>
          <Clock size={12} color="#A8A8AA" strokeWidth={2} />
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
      </View>
      
      <View style={styles.itemFooter}>
        <View style={styles.viewsContainer}>
          <Eye size={12} color="#A8A8AA" strokeWidth={2} />
          <Text style={styles.viewsText}>189 views</Text>
        </View>
        <TouchableOpacity style={styles.playButton}>
          <Play size={14} color="#ffffff" strokeWidth={2.5} />
          <Text style={styles.playText}>Watch</Text>
        </TouchableOpacity>
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
          <ArrowLeft size={24} color="#ffffff" strokeWidth={2.5} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.subjectName}>{subject.name}</Text>
          <Text style={styles.subjectCode}>{subject.code}</Text>
        </View>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Search size={20} color="#A8A8AA" strokeWidth={2} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search content..."
            placeholderTextColor="#A8A8AA"
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
          <FileText size={18} color={activeTab === 'notes' ? '#ffffff' : '#A8A8AA'} strokeWidth={2.5} />
          <Text style={[styles.tabText, activeTab === 'notes' && styles.activeTabText]}>
            Notes ({filteredNotes.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'videos' && styles.activeTab]}
          onPress={() => setActiveTab('videos')}
        >
          <Play size={18} color={activeTab === 'videos' ? '#ffffff' : '#A8A8AA'} strokeWidth={2.5} />
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
    backgroundColor: '#0F0F0F',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#5A1A32',
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
    color: '#ffffff',
    marginBottom: 2,
  },
  subjectCode: {
    fontSize: 14,
    color: '#A8A8AA',
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#5A1A32',
    shadowColor: '#5A1A32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A8A8AA',
  },
  activeTabText: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  listContainer: {
    paddingBottom: 24,
  },
  row: {
    justifyContent: 'space-between',
  },
  itemCard: {
    backgroundColor: '#1A1A1A',
    width: '47%',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
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
    backgroundColor: '#5A1A32',
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
    color: '#ffffff',
    marginBottom: 6,
    lineHeight: 18,
  },
  itemUnit: {
    fontSize: 12,
    color: '#A8A8AA',
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
    color: '#A8A8AA',
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
    color: '#A8A8AA',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A8A8AA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  downloadText: {
    fontSize: 11,
    color: '#5A1A32',
    fontWeight: '600',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5A1A32',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  playText: {
    fontSize: 11,
    color: '#ffffff',
    fontWeight: '600',
  },
  errorText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 50,
  },
});
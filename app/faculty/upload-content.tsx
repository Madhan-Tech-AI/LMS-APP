import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { ArrowLeft, Upload, FileText, Play, Calendar } from 'lucide-react-native';
import { sampleFacultySubjects, sampleUploadedFiles } from '@/data/facultyData';

export default function UploadContentPage() {
  const [selectedSubject, setSelectedSubject] = useState(sampleFacultySubjects[0].id);
  const [uploadedFiles, setUploadedFiles] = useState(sampleUploadedFiles);
  
  const filteredFiles = uploadedFiles.filter(file => file.subjectId === selectedSubject);

  const handleUploadNotes = () => {
    Alert.alert(
      'Upload Notes',
      'Choose file type:',
      [
        { text: 'PDF', onPress: () => uploadFile('PDF', 'note') },
        { text: 'DOC', onPress: () => uploadFile('DOC', 'note') },
        { text: 'PPT', onPress: () => uploadFile('PPT', 'note') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleUploadVideo = () => {
    Alert.alert(
      'Upload Video',
      'Choose upload method:',
      [
        { text: 'Video File', onPress: () => uploadFile('MP4', 'video') },
        { text: 'Video Link', onPress: () => Alert.alert('Video Link', 'Video link upload feature coming soon!') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const uploadFile = (fileType: string, type: 'note' | 'video') => {
    const newFile = {
      id: Date.now().toString(),
      subjectId: selectedSubject,
      type,
      title: `New ${type === 'note' ? 'Note' : 'Video'} - ${fileType}`,
      fileName: `file_${Date.now()}.${fileType.toLowerCase()}`,
      uploadDate: new Date().toISOString().split('T')[0],
    };
    
    setUploadedFiles([newFile, ...uploadedFiles]);
    Alert.alert('Success', `${fileType} file uploaded successfully!`);
  };

  const renderUploadedFile = ({ item }: { item: any }) => (
    <View style={styles.fileCard}>
      <View style={styles.fileIcon}>
        {item.type === 'note' ? (
          <FileText size={20} color="#1E40AF" />
        ) : (
          <Play size={20} color="#ef4444" />
        )}
      </View>
      
      <View style={styles.fileInfo}>
        <Text style={styles.fileTitle}>{item.title}</Text>
        <Text style={styles.fileName}>{item.fileName}</Text>
        <View style={styles.fileDate}>
          <Calendar size={12} color="#64748b" />
          <Text style={styles.fileDateText}>Uploaded: {item.uploadDate}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1e293b" />
        </TouchableOpacity>
        <Text style={styles.title}>Upload Content</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.subjectSelector}>
          <Text style={styles.selectorLabel}>Select Subject:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedSubject}
              onValueChange={(itemValue) => setSelectedSubject(itemValue)}
              style={styles.picker}
            >
              {sampleFacultySubjects.map((subject) => (
                <Picker.Item key={subject.id} label={subject.name} value={subject.id} />
              ))}
            </Picker>
          </View>
        </View>
        
        <View style={styles.uploadSection}>
          <Text style={styles.sectionTitle}>Upload New Content</Text>
          
          <View style={styles.uploadButtons}>
            <TouchableOpacity style={styles.uploadButton} onPress={handleUploadNotes}>
              <FileText size={24} color="#ffffff" />
              <Text style={styles.uploadButtonText}>Upload Notes</Text>
              <Text style={styles.uploadButtonSubtext}>PDF, DOC, PPT</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.uploadButton} onPress={handleUploadVideo}>
              <Play size={24} color="#ffffff" />
              <Text style={styles.uploadButtonText}>Upload Videos</Text>
              <Text style={styles.uploadButtonSubtext}>MP4, Link</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.filesSection}>
          <Text style={styles.sectionTitle}>Uploaded Files</Text>
          <Text style={styles.subtitle}>{filteredFiles.length} files uploaded</Text>
          
          <FlatList
            data={filteredFiles}
            renderItem={renderUploadedFile}
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
    paddingTop: 20,
  },
  subjectSelector: {
    marginBottom: 24,
  },
  selectorLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  pickerContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  picker: {
    height: 50,
  },
  uploadSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  uploadButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  uploadButton: {
    flex: 1,
    backgroundColor: '#059669',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  uploadButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  uploadButtonSubtext: {
    color: '#ffffff',
    fontSize: 12,
    opacity: 0.8,
    marginTop: 4,
  },
  filesSection: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
  },
  fileCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  fileIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  fileInfo: {
    flex: 1,
  },
  fileTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  fileName: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  fileDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  fileDateText: {
    fontSize: 12,
    color: '#64748b',
  },
});
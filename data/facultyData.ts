export const sampleFacultySubjects = [
  {
    id: '1',
    name: 'Data Structures and Algorithms',
    code: 'CS301',
    credits: 4,
    semester: 5,
  },
  {
    id: '2',
    name: 'Database Management Systems',
    code: 'CS302',
    credits: 3,
    semester: 5,
  },
  {
    id: '3',
    name: 'Operating Systems',
    code: 'CS303',
    credits: 4,
    semester: 6,
  },
  {
    id: '4',
    name: 'Software Engineering',
    code: 'CS304',
    credits: 3,
    semester: 6,
  },
];

export const sampleStudents = [
  {
    id: '1',
    name: 'John Doe',
    regNo: 'REG12345678',
    semester: 5,
    email: 'john.doe@student.gojan.ac.in',
    cgpa: 8.7,
    attendance: 92,
  },
  {
    id: '2',
    name: 'Jane Smith',
    regNo: 'REG12345679',
    semester: 5,
    email: 'jane.smith@student.gojan.ac.in',
    cgpa: 9.1,
    attendance: 95,
  },
  {
    id: '3',
    name: 'Mike Johnson',
    regNo: 'REG12345680',
    semester: 6,
    email: 'mike.johnson@student.gojan.ac.in',
    cgpa: 8.3,
    attendance: 88,
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    regNo: 'REG12345681',
    semester: 6,
    email: 'sarah.wilson@student.gojan.ac.in',
    cgpa: 9.4,
    attendance: 97,
  },
];

export const sampleFacultyAssignments = [
  {
    id: '1',
    subjectId: '1',
    title: 'Binary Trees Implementation',
    description: 'Implement binary tree operations including insertion, deletion, and traversal algorithms.',
    dueDate: '2025-03-15',
    submissions: 12,
    totalStudents: 15,
  },
  {
    id: '2',
    subjectId: '1',
    title: 'Sorting Algorithms Analysis',
    description: 'Compare the performance of different sorting algorithms with time complexity analysis.',
    dueDate: '2025-03-08',
    submissions: 15,
    totalStudents: 15,
  },
  {
    id: '3',
    subjectId: '2',
    title: 'Database Design Project',
    description: 'Design a complete database schema for an e-commerce application.',
    dueDate: '2025-03-20',
    submissions: 8,
    totalStudents: 15,
  },
];

export const sampleFacultyNotifications = [
  {
    id: '1',
    title: 'Assignment Reminder',
    message: 'Data Structures assignment deadline is approaching. Please remind students.',
    date: '2025-03-03 10:30 AM',
    sentTo: 'All Students',
  },
  {
    id: '2',
    title: 'New Course Material',
    message: 'Unit 3 notes for Database Management Systems have been uploaded.',
    date: '2025-03-02 2:15 PM',
    sentTo: 'Semester 5 Students',
  },
];

export const sampleUploadedFiles = [
  {
    id: '1',
    subjectId: '1',
    type: 'note',
    title: 'Introduction to Data Structures',
    fileName: 'unit1_intro.pdf',
    uploadDate: '2025-02-28',
  },
  {
    id: '2',
    subjectId: '1',
    type: 'video',
    title: 'Array Operations Tutorial',
    fileName: 'array_operations.mp4',
    uploadDate: '2025-03-01',
  },
  {
    id: '3',
    subjectId: '2',
    type: 'note',
    title: 'SQL Fundamentals',
    fileName: 'sql_basics.pdf',
    uploadDate: '2025-02-25',
  },
];
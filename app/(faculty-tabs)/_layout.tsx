import { View } from 'react-native';
import { Tabs } from 'expo-router';
import { LayoutDashboard, FileText, Bell, User, Users } from 'lucide-react-native';

export default function FacultyTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#5A1A32',
          borderTopWidth: 0,
          paddingBottom: 12,
          paddingTop: 12,
          height: 85,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#A8A8AA',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ size, color, focused }) => (
            <View style={{
              backgroundColor: focused ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              borderRadius: 12,
              padding: 8,
            }}>
              <LayoutDashboard size={size} color={color} strokeWidth={focused ? 2.5 : 2} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="students"
        options={{
          title: 'Students',
          tabBarIcon: ({ size, color, focused }) => (
            <View style={{
              backgroundColor: focused ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              borderRadius: 12,
              padding: 8,
            }}>
              <Users size={size} color={color} strokeWidth={focused ? 2.5 : 2} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="assignments"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ size, color, focused }) => (
            <View style={{
              backgroundColor: focused ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              borderRadius: 12,
              padding: 8,
            }}>
              <FileText size={size} color={color} strokeWidth={focused ? 2.5 : 2} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Updates',
          tabBarIcon: ({ size, color, focused }) => (
            <View style={{
              backgroundColor: focused ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              borderRadius: 12,
              padding: 8,
            }}>
              <Bell size={size} color={color} strokeWidth={focused ? 2.5 : 2} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color, focused }) => (
            <View style={{
              backgroundColor: focused ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              borderRadius: 12,
              padding: 8,
            }}>
              <User size={size} color={color} strokeWidth={focused ? 2.5 : 2} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
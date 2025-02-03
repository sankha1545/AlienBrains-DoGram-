import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedPage from './FeedPage';  
import ReelsPage from './reelspage'; 
import FriendsPage from './FriendsPage'; 
import NotificationsPage from './notificationspage'; 
import ProfilePage from './profilepage'; 
import { MaterialIcons, FontAwesome5, Ionicons, Feather } from "@expo/vector-icons";
import VerticalScrollbar from '../../components/Scrollbar';


 // Import the slider
const Tab = createBottomTabNavigator();

const HomePage = () => {
  return (
    
    <Tab.Navigator 
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
       

        if (route.name === "Feed") {
          return <MaterialIcons name="home" size={size} color={color} />;
        } else if (route.name === "Reels") {
          return <FontAwesome5 name="youtube" size={size} color={color} />;
        }  else if (route.name === "Notifications") {
          return <Feather name="bell" size={size} color={color} />;
        } else if (route.name === "Profile") {
          return <MaterialIcons name="person" size={size} color={color} />;
        }
      },
      tabBarActiveTintColor: "#0a78fb", 
      tabBarInactiveTintColor: "#000",
      tabBarStyle: { backgroundColor: "#9fdffb", height: 60, paddingBottom: 10 },
    })}
>
      <Tab.Screen name="Feed" component={FeedPage} />
      <Tab.Screen name="Reels" component={ReelsPage} />
      
      <Tab.Screen name="Notifications" component={NotificationsPage} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
    
  );
};
<View style={{ flex: 1 }}>
      <VerticalScrollbar />
    </View>
export default HomePage;

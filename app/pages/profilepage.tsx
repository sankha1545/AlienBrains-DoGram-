import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  Button
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    name: "John Doe",
    username: "@johndoe",
    bio: "This is my bio!",
    profilePicture: require("../../assets/images/profilepic1.webp.jpg"),
  });
  
  const [posts, setPosts] = useState([
    { id: 1, image: require("../../assets/images/profile_sec (1).jpg"), caption: "Having a great day!" },
    { id: 2, image: require("../../assets/images/profile_sec (2).jpg"), caption: "Just finished a new project!" },
    { id: 3, image: require("../../assets/images/profile_sec (3).jpg"), caption: "Weekend vibes!" },
  ]);

  const [newPostCaption, setNewPostCaption] = useState("");

  // Handle new post creation
  const handleNewPost = () => {
    if (newPostCaption.trim() === "") {
      Alert.alert("Error", "Post caption cannot be empty!");
      return;
    }
    const newPost = {
      id: posts.length + 1,
      image: require("../../assets/images/post4.jpg"), // Default post image
      caption: newPostCaption,
    };
    setPosts([newPost, ...posts]);
    setNewPostCaption("");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image source={userData.profilePicture} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{userData.name}</Text>
          <Text style={styles.profileUsername}>{userData.username}</Text>
          <Text style={styles.profileBio}>{userData.bio}</Text>
        </View>
      </View>

      {/* Edit Profile */}
      <TouchableOpacity style={styles.editButton}>
        <Ionicons name="pencil" size={20} color="white" />
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* New Post */}
      <View style={styles.newPostContainer}>
        <TextInput
          style={styles.newPostInput}
          placeholder="What's on your mind?"
          value={newPostCaption}
          onChangeText={setNewPostCaption}
        />
        <TouchableOpacity style={styles.newPostButton} onPress={handleNewPost}>
          <Text style={styles.newPostButtonText}>Post</Text>
        </TouchableOpacity>
      </View>

      {/* User's Posts */}
      <View style={styles.postsContainer}>
        {posts.map((post) => (
          <View key={post.id} style={styles.post}>
            <Image source={post.image} style={styles.postImage} />
            <Text style={styles.postCaption}>{post.caption}</Text>
          </View>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 20,
    paddingBottom: 20,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  profileInfo: {
    flexDirection: "column",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileUsername: {
    fontSize: 14,
    color: "#888",
  },
  profileBio: {
    fontSize: 16,
    color: "#555",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#09b1fa",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: "40%",
    alignSelf: "center",
  },
  editButtonText: {
    fontSize: 16,
    color: "white",
    marginLeft: 5,
  },
  newPostContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  newPostInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  newPostButton: {
    backgroundColor: "#09b1fa",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  newPostButtonText: {
    color: "white",
    fontSize: 16,
  },
  postsContainer: {
    paddingHorizontal: 20,
  },
  post: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: "cover",
  },
  postCaption: {
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#ff6347",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 18,
  },
});

export default ProfilePage;

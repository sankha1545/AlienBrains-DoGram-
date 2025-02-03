import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Modal,
  Alert,
  Share,
  Animated,
  PanResponder,
} from "react-native";
import { FontAwesome, Ionicons, Entypo, MaterialIcons } from "@expo/vector-icons";

// Reactions data
const reactions = [
  { name: "Like", emoji: "👍", color: "blue" },
  { name: "Love", emoji: "❤️", color: "red" },
  { name: "Haha", emoji: "😂", color: "orange" },
  { name: "Wow", emoji: "😮", color: "gold" },
  { name: "Sad", emoji: "😢", color: "blue" },
  { name: "Angry", emoji: "😡", color: "red" },
];

// Sample images for posts
const postImages = [
  require("../../assets/images/post6.jpg"),
  require("../../assets/images/post2.webp.jpg"),
  require("../../assets/images/post3.webp.jpg"),
  require("../../assets/images/post4.jpg"),
  require("../../assets/images/post5.jpg"),
];

// Sample profile pictures
const profilePictures = [
  require("../../assets/images/profilepic1.webp.jpg"),
  require("../../assets/images/profilepic2.jpg"),
  require("../../assets/images/profilepic3.jpg"),
  require("../../assets/images/profilepic4.jpg"),
  require("../../assets/images/profilepic5.jpg"),
];

// Sample stories
const storyImages = [
  require("../../assets/images/profilepic1.webp.jpg"),
  require("../../assets/images/profilepic2.jpg"),
  require("../../assets/images/profilepic3.jpg"),
  require("../../assets/images/profilepic4.jpg"),
  require("../../assets/images/profilepic5.jpg"),
];

const captions = [
  "Clubs or galaxies? Because we're all stars tonight 🌌⭐",
  "Love you today. Love you tomorrow. Love you forever.",
  "Hello, world! Introducing our bundle of joy Akash.",
  "Savouring the sunset glow 🌅",
  "Caution: Wet and wild! It’s going to be a soaking good time💧",
];

const usernames = ["Alice", "Bob", "Charlie", "David", "Eve"];

const FeedPage = () => {
  const [selectedReactions, setSelectedReactions] = useState(Array(5).fill(null));
  const [showReactions, setShowReactions] = useState(Array(5).fill(false));
  const [showCommentBox, setShowCommentBox] = useState(Array(5).fill(false));
  const [comments, setComments] = useState(Array(5).fill([]));
  const [newComments, setNewComments] = useState(Array(5).fill(""));
  const [selectedStory, setSelectedStory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Story progress animation
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Swipe gesture for story
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < -50) {
          nextStory();
        }
      },
    })
  ).current;

  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  // Handle reaction
  const handleReaction = (index, reaction) => {
    const newReactions = [...selectedReactions];
    if (newReactions[index]?.name === reaction.name) {
      newReactions[index] = null;
    } else {
      newReactions[index] = reaction;
    }
    setSelectedReactions(newReactions);
    setShowReactions(Array(5).fill(false)); // Close reaction menu
  };

  // Toggle reaction menu
  const toggleReactionMenu = (index) => {
    const newShowReactions = [...showReactions];
    newShowReactions[index] = !newShowReactions[index];
    setShowReactions(newShowReactions);
  };

  // Toggle comment box
  const toggleCommentBox = (index) => {
    const newShowCommentBox = [...showCommentBox];
    newShowCommentBox[index] = !newShowCommentBox[index];
    setShowCommentBox(newShowCommentBox);
  };

  const handleCommentChange = (index, text) => {
    const newNewComments = [...newComments];
    newNewComments[index] = text;
    setNewComments(newNewComments);
  };

  const postComment = (index) => {
    if (newComments[index].trim() === "") {
      Alert.alert("Error", "Comment cannot be empty!");
      return;
    }

    const updatedComments = [...comments];
    updatedComments[index] = [...updatedComments[index], newComments[index]];
    setComments(updatedComments);

    const newNewComments = [...newComments];
    newNewComments[index] = "";
    setNewComments(newNewComments);
  };

  const deleteComment = (postIndex, commentIndex) => {
    const updatedComments = [...comments];
    updatedComments[postIndex].splice(commentIndex, 1);
    setComments(updatedComments);
  };

  // Share post
  const handleShare = async () => {
    try {
      await Share.share({
        message: "Check out this amazing post on Do Gram! 🚀",
      });
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };

  // Open story
  const openStory = (story) => {
    setSelectedStory(story);
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 5000);

    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 20000,
      useNativeDriver: false,
    }).start(() => {
      nextStory();
    });

    setTimeout(() => {
      nextStory();
    }, 20000);
  };

  // Go to next story
  const nextStory = () => {
    if (currentStoryIndex + 1 >= storyImages.length) {
      setModalVisible(false);
    } else {
      setCurrentStoryIndex(currentStoryIndex + 1);
      progressAnim.setValue(0);
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: false,
      }).start();
    }
  };

  // Close story
  const closeStory = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Story Section */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storyContainer}>
        {storyImages.map((story, index) => (
          <View key={index} style={styles.storyWrapper}>
            <TouchableOpacity onPress={() => openStory(story)}>
              <Image source={story} style={styles.storyImage} />
            </TouchableOpacity>
            <Text style={styles.storyUsername}>{usernames[index]}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Story Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeStory}>
            <Ionicons name="close" size={35} color="white" />
          </TouchableOpacity>

          <View {...panResponder.panHandlers}>
            <Animated.View style={[styles.progressBar]}>
              <Animated.View
                style={[
                  styles.progressFill,
                  {
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0%", "100%"],
                    }),
                  },
                ]}
              />
            </Animated.View>

            <Image source={storyImages[currentStoryIndex]} style={styles.modalImage} />
          </View>

          <TouchableOpacity style={styles.nextButton} onPress={nextStory}>
            <Ionicons name="arrow-forward" size={35} color="white" />
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Feed Posts */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {[...Array(5)].map((_, index) => (
          <View key={index} style={styles.postContainer}>
            {/* Profile Picture */}
            <View style={styles.profileContainer}>
              <Image source={profilePictures[index]} style={styles.profileImage} />
              <Text style={styles.profileName}>{usernames[index]}</Text>
            </View>

            {/* Image */}
            <Text style={styles.caption}>{captions[index]}</Text>
            <Image style={styles.image} source={postImages[index]} />

            {/* Reaction Options */}
            {showReactions[index] && (
              <View style={styles.reactionContainer}>
                {reactions.map((reaction, i) => (
                  <TouchableOpacity key={i} onPress={() => handleReaction(index, reaction)}>
                    <Text style={{ fontSize: 20 }}>{reaction.emoji}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Like, Comment, Share */}
            <View style={styles.actions}>
              <TouchableOpacity style={styles.button} onPress={() => toggleReactionMenu(index)}>
                <Text style={{ fontSize: 18, color: selectedReactions[index]?.color || "grey" }}>
                  {selectedReactions[index] ? selectedReactions[index].emoji : "👍"}
                </Text>
                <Text style={[styles.buttonText, { color: selectedReactions[index]?.color || "grey" }]}>
                  {selectedReactions[index] ? selectedReactions[index].name : "Like"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => toggleCommentBox(index)}>
                <Ionicons name="chatbubble-outline" size={20} color="black" />
                <Text style={styles.buttonText}>Comment</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleShare}>
                <Entypo name="share" size={20} color="black" />
                <Text style={styles.buttonText}>Share</Text>
              </TouchableOpacity>
            </View>

            {/* Comment Section */}
            {showCommentBox[index] && (
              <View style={styles.commentSection}>
                {/* Input Field */}
                <TextInput
                  style={styles.commentInput}
                  placeholder="Write a comment..."
                  value={newComments[index]}
                  onChangeText={(text) => handleCommentChange(index, text)}
                />

                {/* Post Comment Button */}
                <TouchableOpacity style={styles.postCommentButton} onPress={() => postComment(index)}>
                  <Text style={styles.postCommentText}>Post</Text>
                </TouchableOpacity>

                {/* Display Comments */}
                {comments[index].map((comment, i) => (
                  <View key={i} style={styles.commentItem}>
                    <Text style={styles.commentText}>{comment}</Text>

                    {/* Delete Button */}
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => deleteComment(index, i)}
                    >
                      <MaterialIcons name="delete" size={20} color="red" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  storyContainer: {
    flexDirection: "row",
    padding: 40,
    marginTop:-30,
    marginLeft:-20
  },
  storyWrapper: {
    alignItems: "center",
    marginRight: 20,
  },
  storyImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth:2,
    borderColor:"#f5b041"
  },
  storyUsername: {
    marginTop: 5,
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  progressBar: {
    width: "80%",
    height: 5,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    position: "absolute",
    top: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "white",
  },
  modalImage: {
    width: 250,
    height: 400,
    borderRadius: 10,
  },
  nextButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  postContainer: {
    backgroundColor: "white",
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileName: {
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  caption: {
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    
  },
  reactionContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    marginLeft: 5,
    fontSize: 14,
    color: "black",
  },
  commentSection: {
    marginTop: 10,
  },
  commentInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingLeft: 10,
    marginBottom: 10,
  },
  postCommentButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
  },
  postCommentText: {
    color: "white",
    fontSize: 16,
  },
  commentItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
    color: "#333",
  },
  deleteButton: {
    marginLeft: 10,
  },
});

export default FeedPage;

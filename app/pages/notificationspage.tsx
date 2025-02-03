import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NotificationsPage = () => {
  // Sample notifications data
  const notificationsData = [
    { id: "1", title: "New comment on your post", message: "Alice commented: 'Great post!'", time: "2 mins ago" },
    { id: "2", title: "New friend request", message: "Bob sent you a friend request", time: "10 mins ago" },
    { id: "3", title: "Event reminder", message: "Don't forget about your meeting tomorrow", time: "1 hour ago" },
    { id: "4", title: "New like on your post", message: "Charlie liked your post", time: "3 hours ago" },
    { id: "5", title: "New message", message: "David sent you a message", time: "5 hours ago" },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setModalVisible(true);
  };

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleNotificationClick(item)} style={styles.notificationItem}>
      <Ionicons name="notifications" size={24} color="blue" />
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
      </View>
      <Text style={styles.notificationTime}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Notifications</Text>

      {/* Notification List */}
      <FlatList
        data={notificationsData}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
      />

      {/* Modal to show detailed notification */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={35} color="white" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{selectedNotification?.title}</Text>
            <Text style={styles.modalMessage}>{selectedNotification?.message}</Text>
            <Text style={styles.modalTime}>{selectedNotification?.time}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  notificationItem: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  notificationContent: {
    flex: 1,
    marginLeft: 10,
  },
  notificationTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  notificationMessage: {
    fontSize: 14,
    color: "#555",
  },
  notificationTime: {
    fontSize: 12,
    color: "#888",
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 10,
  },
  modalTime: {
    fontSize: 14,
    color: "#888",
  },
});

export default NotificationsPage;

import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';

const { width } = Dimensions.get('window');

// Main Component
function TabContent() {
  // State to keep track of active tab
  const [activeTab, setActiveTab] = useState('Challenges');

  // Dummy Data for Tabs
  const challengesData = (
    <View style={styles.emptyStateContainer}>
      <Text style={styles.emptyStateText}>No Challenges</Text>
    </View>
  );

  const kitabData = (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>1EQ Reasoning Complete Revision</Text>
      <Text style={styles.cardPrice}>₹ 200</Text>
      <Text style={styles.cardButton}>Buy Now</Text>
    </View>
  );

  const foundationData = (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>1EQ Scholarship</Text>
      <Text style={styles.cardDescription}>
        The Scholarship is being offered on need-basis to provide multimedia SSC Exam study kits to the selected aspirants from SC communities.
      </Text>
      <Text style={styles.cardButton}>Apply</Text>
    </View>
  );

  // Function to render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'Challenges':
        return challengesData;
      case '1Kitab':
        return kitabData;
      case '1EQ Foundation':
        return foundationData;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Custom Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Challenges' && styles.activeTabButton]}
          onPress={() => setActiveTab('Challenges')}
        >
          <Text style={[styles.tabText, activeTab === 'Challenges' && styles.activeTabText]}>Challenges</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === '1Kitab' && styles.activeTabButton]}
          onPress={() => setActiveTab('1Kitab')}
        >
          <Text style={[styles.tabText, activeTab === '1Kitab' && styles.activeTabText]}>1Kitab</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === '1EQ Foundation' && styles.activeTabButton]}
          onPress={() => setActiveTab('1EQ Foundation')}
        >
          <Text style={[styles.tabText, activeTab === '1EQ Foundation' && styles.activeTabText]}>1EQ Foundation</Text>
        </TouchableOpacity>
      </View>

      {/* Content Based on Selected Tab */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {renderContent()}
      </ScrollView>
    </View>
  );
}

export default TabContent;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
  },
  tabText: {
    fontSize: 14,
    color: 'black',
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderColor: '#29387b',
  },
  activeTabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyStateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#666',
  },
  cardContainer: {
    width: width * 0.9,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  cardPrice: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  cardButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
});

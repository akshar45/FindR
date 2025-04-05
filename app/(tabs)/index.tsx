import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FEATURED_EVENTS = [
  {
    id: '1',
    title: 'Summer Music Festival',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
    date: 'June 15-17',
    location: 'Central Park',
  },
  {
    id: '2',
    title: 'Food & Wine Festival',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1',
    date: 'July 20-22',
    location: 'Downtown District',
  },
];

const CATEGORIES = [
  'Music', 'Food', 'Arts', 'Sports', 'Technology', 'Wellness'
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>FindR</Text>
          <Text style={styles.headerSubtitle}>Discover amazing events</Text>
        </View>

        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured Events</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {FEATURED_EVENTS.map((event) => (
              <TouchableOpacity key={event.id} style={styles.eventCard}>
                <Image source={{ uri: event.image }} style={styles.eventImage} />
                <View style={styles.eventInfo}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventDetails}>{event.date}</Text>
                  <Text style={styles.eventLocation}>{event.location}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {CATEGORIES.map((category) => (
              <TouchableOpacity key={category} style={styles.categoryButton}>
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666666',
    marginTop: 4,
  },
  featuredSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 20,
    marginBottom: 15,
  },
  eventCard: {
    width: 280,
    marginLeft: 20,
    marginRight: 10,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: 160,
  },
  eventInfo: {
    padding: 15,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  eventDetails: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  eventLocation: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  categoriesSection: {
    marginTop: 30,
    paddingBottom: 30,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
  categoryButton: {
    width: '45%',
    margin: '2.5%',
    padding: 20,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
});
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
const FEATURED_EVENTS = [
  {
    id: '1',
    title: 'Food Fest',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/77/GBBF_full.jpg',
    date: 'June 15-17',
    location: 'Central Park',
  },
  {
    id: '2',
    title: 'Hot Dog Fest',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Hot_Dog_Day_2007_1.jpg',
    date: 'October 18-19',
    location: 'JLN',
  },
  {
    id: '3',
    title: 'Mushroom Mardi',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/MushroomMardiGrasFestival.jpg',
    date: 'August 5-7',
    location: 'New Delhi',
  },
  {
    id: '4',
    title: 'Jamaican Seafood Festival',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Jamaican_seafood_and_festival.jpg',
    date: 'September 10-12',
    location: 'Pitampura Vips',
  },
];


export default function HomeScreen() {
    const router = useRouter()
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>FindR</Text>
          <Text style={styles.headerSubtitle}>Discover amazing events</Text>
        </View>

        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured Events</Text>
          <ScrollView vertical showsVerticalScrollIndicator={false}>
            {FEATURED_EVENTS.map((event) => (
              <TouchableOpacity key={event.id} style={styles.eventCard} onPress={() => router.push({pathname: './eventView', params: { id: event.id, photo: event.image, title: event.title, date: event.date, location: event.location }})}>
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
    width: '100%',
    marginBottom: 20,
    marginLeft: 5,
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
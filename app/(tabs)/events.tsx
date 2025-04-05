import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';
import { MapPin, Clock, Coffee } from 'lucide-react-native';

const REGISTERED_EVENT = {
  id: 'moksha2024',
  title: 'MOKSHA 2024',
  date: 'March 15, 2024',
  time: '6:00 PM',
  venue: 'Thunderdome Arena',
  ticketId: 'MKSH-2024-1234-5678',
  ticketType: 'VIP Access',
  price: '$150',
  stalls: [
    { id: 1, name: "Spice Paradise", cuisine: "Indian", rating: 4.5, specialty: "Butter Chicken" },
    { id: 2, name: "Sushi Master", cuisine: "Japanese", rating: 4.8, specialty: "Dragon Roll" },
    { id: 3, name: "Taco Fiesta", cuisine: "Mexican", rating: 4.3, specialty: "Street Tacos" },
    { id: 4, name: "Pizza Haven", cuisine: "Italian", rating: 4.6, specialty: "Wood-fired Pizza" },
    { id: 5, name: "BBQ Kings", cuisine: "American", rating: 4.7, specialty: "Smoked Brisket" },
    { id: 6, name: "Sweet Tooth", cuisine: "Desserts", rating: 4.4, specialty: "Belgian Waffles" },
    { id: 7, name: "Green Bowl", cuisine: "Vegan", rating: 4.2, specialty: "Buddha Bowl" },
    { id: 8, name: "Noodle House", cuisine: "Asian Fusion", rating: 4.5, specialty: "Ramen" },
    { id: 9, name: "Mediterranean Delights", cuisine: "Mediterranean", rating: 4.6, specialty: "Shawarma" },
    { id: 10, name: "Coffee Culture", cuisine: "Beverages", rating: 4.8, specialty: "Artisanal Coffee" }
  ]
};

export default function EventsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Events</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.eventCard}>
          <View style={styles.eventHeader}>
            <Text style={styles.eventName}>{REGISTERED_EVENT.title}</Text>
            <Text style={styles.ticketType}>{REGISTERED_EVENT.ticketType}</Text>
          </View>
          
          <View style={styles.eventInfo}>
            <View style={styles.infoRow}>
              <Clock size={16} color="#666666" />
              <Text style={styles.infoText}>
                {REGISTERED_EVENT.date} at {REGISTERED_EVENT.time}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <MapPin size={16} color="#666666" />
              <Text style={styles.infoText}>{REGISTERED_EVENT.venue}</Text>
            </View>
          </View>

          <View style={styles.qrContainer}>
            <QRCode
              value={REGISTERED_EVENT.ticketId}
              size={200}
              color="white"
              backgroundColor="transparent"
            />
            <Text style={styles.ticketId}>
              Ticket ID: {REGISTERED_EVENT.ticketId}
            </Text>
          </View>

          <View style={styles.stallsSection}>
            <Text style={styles.stallsTitle}>Available Food Stalls</Text>
            {REGISTERED_EVENT.stalls.map((stall) => (
              <View key={stall.id} style={styles.stallCard}>
                <View style={styles.stallHeader}>
                  <Coffee size={20} color="#ffffff" />
                  <Text style={styles.stallName}>{stall.name}</Text>
                </View>
                <View style={styles.stallDetails}>
                  <Text style={styles.stallCuisine}>{stall.cuisine}</Text>
                  <View style={styles.stallRating}>
                    <Text style={styles.ratingText}>★ {stall.rating}</Text>
                  </View>
                </View>
                <Text style={styles.stallSpecialty}>Must try: {stall.specialty}</Text>
              </View>
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
  header: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  content: {
    flex: 1,
  },
  eventCard: {
    backgroundColor: '#1a1a1a',
    margin: 20,
    borderRadius: 15,
    padding: 20,
  },
  eventHeader: {
    marginBottom: 15,
  },
  eventName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  ticketType: {
    fontSize: 16,
    color: '#00ff00',
    fontWeight: '500',
  },
  eventInfo: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    color: '#666666',
    marginLeft: 10,
    fontSize: 14,
  },
  qrContainer: {
    alignItems: 'center',
    marginVertical: 20,
    padding: 20,
    backgroundColor: '#000000',
    borderRadius: 10,
  },
  ticketId: {
    color: '#666666',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
  stallsSection: {
    marginTop: 30,
  },
  stallsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  stallCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  stallHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stallName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 10,
  },
  stallDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  stallCuisine: {
    color: '#666666',
    fontSize: 14,
  },
  stallRating: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    color: '#ffdd00',
    fontSize: 14,
    fontWeight: '500',
  },
  stallSpecialty: {
    color: '#00ff00',
    fontSize: 14,
    marginTop: 5,
  },
});
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router'

export default function FindR() {
      const router = useRouter()
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>FindR</Text>
          <Text style={styles.headerSubtitle}>Discover amazing events</Text>
        </View>

        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Find Your People</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={()=> router.push({pathname:'../findrLocator/finding', params:{uuID:'722618c9-e315-4cc4-990c-359f7b72323b'} })}>
                <View style={{
                    backgroundColor: '#E03FD8',
                    height: 200,
                    marginLeft: 20,
                    borderRadius:15,
                    width: 280,
                    padding:10
                }}>
                    <Text style={
                        styles.cardText
                    }>
                        {"Akshar's FindR\nBracelet"}
                    </Text>
                    <Image source={require('../../assets/images/akshar.png')} style={{
                      maxHeight: 100,
                      maxWidth: 100,
                      borderRadius: 100,
                      marginTop: 10,
                    }}></Image>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> router.push({pathname:'../findrLocator/finding', params:{uuID:'4411906a-c655-47ab-8b4d-a8-d665f3ecbd'} })}>
                <View style={{
                    backgroundColor: '#E03FD8',
                    height: 200,
                    marginLeft: 20,
                    borderRadius:15,
                    width: 280,
                    padding:10
                }}>
                    <Text style={
                        styles.cardText
                    }>
                        {"Kirty's FindR\nBracelet"}
                    </Text>
                    <Image source={require('../../assets/images/kirty.png')} style={{
                      maxHeight: 100,
                      maxWidth: 100,
                      borderRadius: 100,
                      marginTop: 10,
                    }}></Image>
                </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Add More People</Text>
          <View style={styles.categoriesGrid}>
          </View>
          <View>
            <Text>Scan QR</Text>
          </View>
          <View style={
            {
              flexDirection: 'row',
              paddingLeft:20,
              paddingRight:20,
              justifyContent: 'space-between',
            }
          }>
          <View style={{
          backgroundColor: '#1B56FD',
          padding:20,
          borderRadius: 15,
          width: 150,
          justifyContent:'center',
          alignItems:'center',
          }}>
            <Text style={styles.eventTitle}>Add QR</Text>
          </View>
           <View style={{
            backgroundColor: '#1B56FD',
          padding:20,
          borderRadius: 15,
          width: 150,
          justifyContent:'center',
          alignItems:'center',
           }}>
            <Text style={styles.eventTitle}>Add SID</Text>
          </View>
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
  cardText:{
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ffffff',
  }
});
import { StyleSheet, Text, View, Image, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import {useRouter, useLocalSearchParams} from 'expo-router'

export default function Eventview() {
    const {photo, title, date, location} = useLocalSearchParams()
  return (
    <View style={{
        backgroundColor: '#000000',
        height: '100%',
    }}>
        <Image source={{ uri: photo }} style={{ width: 500, height: 250 }} />
        <Text style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: '#ffffff',
            marginTop: 10,
            marginLeft: 10,
        }}>{title}</Text>
        <Text style={{
            fontSize: 20,
            color: '#ffffff',
            marginTop: 4,
            marginLeft: 10,
            fontWeight: 'bold',
        }}>{date}</Text>
        <Text style={{
            color: '#ffffff',
            marginTop: 4,
            marginLeft: 10,
            fontSize: 16,
            fontWeight: 'bold',
        }}>{location}</Text>
        <View style={{
            padding:10
        }}>
        <Text style={{
            color: '#ffffff',
            marginTop: 20,
            marginLeft: 10,
            fontSize: 16,
            fontWeight: 'bold',
            textAlign:'justify',
        }}>An event is a significant occurrence or happening that draws attention or marks a particular moment in time. It can refer to anything from a planned gathering, such as a wedding, concert, or conference, to an unexpected incident like a natural disaster or a historic milestone. Events play an important role in both personal and public life, often bringing people together and creating memorable experiences. In technology and programming, an event refers to an action or trigger—like a mouse click or a key press—that a system or application responds to. Whether in everyday life or digital systems, events are moments of change, interaction, or importance.</Text>
        </View>

        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
        }}>
        <TouchableOpacity style={{
            backgroundColor: '#FF5733',
            padding: 10,

            width: "100%",
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Text style={{
                color: '#ffffff',
                fontSize: 15,
            }}>Book Now</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({})
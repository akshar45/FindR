import { View, Text, FlatList, StyleSheet, Platform, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BleManager } from 'react-native-ble-plx';
import { PermissionsAndroid } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router'
// UUID Service - MUST be the same as the beacon's advertised service UUID
const SERVICE_UUID = '722618c9-e315-4cc4-990c-359f7b72323b';

const bleManager = new BleManager();

export default function Ble() {
  const [isBleReady, setIsBleReady] = useState(false);
  const [hasAllPermissions, setHasAllPermissions] = useState(false);
  const [scannedDevices, setScannedDevices] = useState([]);
  const [scanning, setScanning] = useState(false);
  // State to track the most recent distance for display
  const [currentDistance, setCurrentDistance] = useState(null);
  const {uuID} = useLocalSearchParams();
  const SERVICE_UUID = uuID;  
  console.log(SERVICE_UUID);
  
  // Function to format distance for display
  const formatDistanceForDisplay = (distance) => {
    if (distance === null) return "Scanning...";
    if (distance < 0.1) return "Reached!";
    if (distance < 1) return distance.toFixed(1) + "m";
    return Math.round(distance) + "m";
  };

  // Function to request Bluetooth and Location permissions on Android
  const requestBluetoothPermissions = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 31) {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);

        const hasBluetoothScanPermission = granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] === PermissionsAndroid.RESULTS.GRANTED;
        const hasBluetoothConnectPermission = granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] === PermissionsAndroid.RESULTS.GRANTED;
        const hasBluetoothAdvertisePermission = granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE] === PermissionsAndroid.RESULTS.GRANTED;
        const hasLocationPermission = granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] === PermissionsAndroid.RESULTS.GRANTED;

        if (hasBluetoothScanPermission && hasBluetoothConnectPermission && hasBluetoothAdvertisePermission && hasLocationPermission) {
          console.log('All Bluetooth and Location permissions granted');
          return true;
        } else {
          console.log('Some Bluetooth or Location permissions denied');
          return false;
        }
      } catch (err) {
        console.warn('Error requesting permissions:', err);
        return false;
      }
    } else if (Platform.OS === 'android') {
      // Location permission is still needed on older Android versions
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission Required',
            message: 'Bluetooth Low Energy requires Location to scan for devices.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
          return true;
        } else {
          console.log('Location permission denied');
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true; // On iOS, these permissions are handled differently
    }
  };

  useEffect(() => {
    // Initialize BLE and request permissions
    const initBle = async () => {
      const hasPermissions = await requestBluetoothPermissions();
      setHasAllPermissions(hasPermissions);

      if (hasPermissions) {
        const subscription = bleManager.onStateChange((state) => {
          console.log('BLE State:', state);
          if (state === 'PoweredOn') {
            setIsBleReady(true);
            console.log('Bluetooth is ready');
            subscription.remove();
          } else {
            setIsBleReady(false);
          }
        }, true);

        return () => {
          subscription.remove();
          bleManager.destroy();
        };
      } else {
        Alert.alert(
          'Permissions Required',
          'This app needs Bluetooth and Location permissions to work correctly.',
          [{ text: 'OK' }]
        );
      }
    };

    initBle();
  }, []);

  // Improved function to calculate distance with better accuracy
  const calculateDistance = (rssi, txPower) => {
    if (rssi === 0) {
        return -1.0; // invalid RSSI
    }
    
    // Use a 10-second moving average for more stable readings
    const ratio = rssi * 1.0 / txPower;
    if (ratio < 1.0) {
        return Math.pow(ratio, 10);
    } else {
        const accuracy = (0.89976) * Math.pow(ratio, 7.7095) + 0.111;
        return accuracy;
    }
  };

  // Keep track of recent RSSI values for smoothing
  const rssiReadings = React.useRef([]);
  const MAX_READINGS = 5; // Number of readings to average

  const getSmoothedDistance = (rssi, txPower) => {
    // Add new reading
    rssiReadings.current.push(rssi);
    
    // Keep only the last MAX_READINGS values
    if (rssiReadings.current.length > MAX_READINGS) {
      rssiReadings.current.shift();
    }
    
    // Calculate average RSSI
    const avgRssi = rssiReadings.current.reduce((sum, val) => sum + val, 0) / rssiReadings.current.length;
    
    // Calculate distance using the averaged RSSI
    return calculateDistance(avgRssi, txPower);
  };

  // Function to start scanning for BLE devices with our specific SERVICE_UUID
  const startScan = () => {
    if (!isBleReady || !hasAllPermissions) {
      Alert.alert('Cannot Scan', 'Bluetooth is not ready or permissions not granted');
      return;
    }

    setScanning(true);

    console.log('Starting scan for virtual beacon...');

    // Scan only for devices with our specific SERVICE_UUID
    bleManager.startDeviceScan(
      [SERVICE_UUID], // Filter by our service UUID
      { allowDuplicates: true }, // Allow duplicates for frequent updates
      (error, device) => {
        if (error) {
          console.error('Scan error:', error);
          setScanning(false);
          return;
        }

        if (device) {
            const deviceName = device.name || 'Beacon';
            const rssi = device.rssi;
            const txPower = -59; // This may not be set by your bluetooth device
            
            // Get smoothed distance for more stable readings
            const distance = getSmoothedDistance(rssi, txPower);
            
            console.log(`Found virtual beacon: ${deviceName} (${device.id}), RSSI: ${rssi} dBm Distance: ${distance}`);

            // Update current distance for big display
            setCurrentDistance(distance);

            setScannedDevices((prevDevices) => {
              const existingDeviceIndex = prevDevices.findIndex((d) => d.id === device.id);

              if (existingDeviceIndex > -1) {
                // Update existing device with new RSSI
                const updatedDevices = [...prevDevices];
                updatedDevices[existingDeviceIndex] = { 
                  ...updatedDevices[existingDeviceIndex], 
                  rssi: rssi.toFixed(2), 
                  distance: distance
                };
                return updatedDevices;
              } else {
                // Add new device
                return [...prevDevices, { 
                  ...device, 
                  rssi: rssi.toFixed(2), 
                  distance: distance
                }];
              }
            });
        }
      }
    );

    // Stop scanning after 5 seconds to conserve battery
    setTimeout(() => {
      bleManager.stopDeviceScan();
      setScanning(false);
      console.log('Scan stopped');
    }, 5000);
  };

  // Scan continuously but with intervals to save battery
  useEffect(() => {
    let intervalId;
    if (isBleReady && hasAllPermissions) {
      intervalId = setInterval(startScan, 2000); // Scan every 2 seconds
    }
    return () => {
      clearInterval(intervalId);
      bleManager.stopDeviceScan();
    };
  }, [isBleReady, hasAllPermissions]);

  // Get the color based on distance
  const getDistanceColor = (distance) => {
    if (distance === null) return '#666'; // Gray for scanning
    if (distance < 0.1) return '#00C853'; // Green for "reached"
    if (distance < 1) return '#2196F3';   // Blue for close
    if (distance < 5) return '#FFC107';   // Yellow for medium
    return '#FF5722';                     // Orange/red for far
  };

  // Render the UI with a big distance display
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BLE Beacon Finder</Text>

      {/* Status indicators */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>BLE Ready: {isBleReady ? '' : ''}</Text>
        <Text style={styles.statusText}>Permissions: {hasAllPermissions ? '' : ''}</Text>
      </View>

      {/* Big distance display */}
      <View style={styles.distanceContainer}>
        <Text 
          style={[
            styles.distanceText, 
            { color: getDistanceColor(currentDistance) }
          ]}
        >
          {formatDistanceForDisplay(currentDistance)}
        </Text>
        <Text style={styles.distanceLabel}>
          {currentDistance === null ? "" : 
           currentDistance < 0.1 ? "You've arrived!" : "Distance to Beacon"}
        </Text>
      </View>

      {/* Additional information */}
      <Text style={styles.instructionText}>
        {scanning ? "Scanning for beacon..." : "Awaiting next scan..."}
      </Text>

      {/* Device list (optional, can be removed if you only want the big display) */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  statusText: {
    fontSize: 14,
  },
  distanceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
    width: '100%',
  },
  distanceText: {
    fontSize: 72,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-condensed',
  },
  distanceLabel: {
    fontSize: 18,
    color: '#ffffff',
    marginTop: 5,
  },
  instructionText: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
    color: '#ffffff',
  },
  devicesList: {
    width: '100%',
    marginTop: 20,
    maxHeight: 200, // Limit height to keep focus on the big distance display
  },
  deviceItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
    width: '100%',
  },
  deviceName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deviceData: {
    fontSize: 14,
    color: '#666',
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});
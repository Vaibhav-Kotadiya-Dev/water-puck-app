import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { setData, getData } from '../../utils/storageUtils.js'; 
import PushNotification, { Importance } from 'react-native-push-notification';

const Setting = () => {
  const [reminderPeriod,setReminderPeriod]=useState(null);
  const [targetWater,setTargetWater]=useState(null);
  const [updatedProgress,setUpdatedProgress]=useState(null);
  const [currentProgress,setCurrentProgress]=useState(null);

useEffect(()=>{
  const fetchData = async () => {
    const savedProgress = await getData('hydrationProgress');
    const savedCurrentProgress = await getData('currentProgress');
    console.log(savedCurrentProgress)
    console.log(savedProgress)
    if (savedProgress !== null) setUpdatedProgress(savedProgress);
    if (savedCurrentProgress !== null) setCurrentProgress(savedCurrentProgress);
  };

  fetchData();
},[])
 const handleSaveSettings = async () =>{
        await setData('IntervalTime',reminderPeriod);
        await setData('TargetWater',targetWater);
        await setData('currentProgress',updatedProgress);
        if (reminderPeriod && reminderPeriod > 0) {
          scheduleHydrationReminder();
        }
    
        Alert.alert('Settings Saved', 'Your settings have been successfully saved!');
 }
  const scheduleHydrationReminder = () => {
    const intervalTime = reminderPeriod * 60 * 1000;
    console.log('reminder scheduled..')
    const remaining = updatedProgress - currentProgress;
    const message = `You need to drink water for your goal achieve you set goal to drink ${targetWater} ml water in ${reminderPeriod} minutes bt you have consumed ${remaining}`;
   setInterval(() => {
      sendReminder();
    }, intervalTime);
    const sendReminder = () => {
      if(updatedProgress>currentProgress){
        PushNotification.localNotification({
          channelId: "hydration-channel",
          title: "Hydration Status",
          message: message,
          bigText: message,
          color: "blue",
          vibrate: true,
          priority: "high",
          visibility: "public",
        });
      }
     
      console.log('Hydration Status Notification sent');
    }
  
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hydration Reminder Settings</Text>

      <TextInput
        style={styles.input}
        value={reminderPeriod}
        onChangeText={(text) => setReminderPeriod(Number(text))}
        keyboardType="numeric"
        placeholder="Enter Reminder Interval Time (in minutes)"
      />
      <TextInput
        style={styles.input}
        value={targetWater}
        onChangeText={(text) => setTargetWater(Number(text))}
        keyboardType="numeric"
        placeholder="Enter Target Water  (in ml)"
      />

      {/* <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Enable Reminders</Text>
        <TouchableOpacity
          style={[styles.switchButton, isReminderEnabled && styles.switchOn]}
          onPress={() => setIsReminderEnabled(!isReminderEnabled)}
        >
          <Text style={styles.switchText}>{isReminderEnabled ? 'On' : 'Off'}</Text>
        </TouchableOpacity>
      </View> */}

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveSettings}>
        <Text style={styles.saveButtonText}>Save Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderRadius: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  switchButton: {
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 25,
  },
  switchOn: {
    backgroundColor: '#4CAF50',
  },
  switchText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#1e88e5',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Setting;


// useEffect(() => {
//   if (Platform.OS === 'android' && Platform.Version >= 33) {
//     PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
//       .then(granted => {
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           console.log('Notification permission granted');
//         } else {
//           console.log('Notification permission denied');
//         }
//       });
//   }

//   PushNotification.createChannel(
//     {
//       channelId: "hydration-channel",
//       channelName: "Hydration Tracker",
//       channelDescription: "Notifications for water consumption",
//       importance: 4,
//       vibrate: true,
//     },
//     (created) => console.log(`Channel created: ${created}`)
//   );

//   const sendHydrationStatus = () => {
//     const remaining = goal - progress;
//     const message = `You've consumed ${(progress / 1000).toFixed(1)}L (${progress}ml) Water today. You need ${(remaining / 1000).toFixed(1)}L (${remaining}ml) more to reach your goal.`;

//     PushNotification.localNotification({
//       channelId: "hydration-channel",
//       title: "Hydration Status",
//       message: message,
//       bigText: message,
//       color: "blue",
//       vibrate: true,
//       priority: "high",
//       visibility: "public",
//     });
//     console.log('Hydration Status Notification sent');
//   };

  // const intervalId = setInterval(() => {
  //   sendHydrationStatus();
  // }, 3600000);

//   return () => {
//     clearInterval(intervalId);
//   };
// }, [goal, progress]);
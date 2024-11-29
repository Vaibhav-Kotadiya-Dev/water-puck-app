/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { setData, getData } from "../../utils/storageUtils.js";
import HydrationChart from "../../components/hydrationChart/index.js";
import { startContinuousBleListener } from "../../utils/addBleListener.js";

const HydrationTracker = ({ navigation }) => {
  const [goal, setGoal] = useState(0);
  const [progress, setProgress] = useState(0);
  const [bottleSize, setBottleSize] = useState(0);
  const [bottles, setBottles] = useState([]);
  const [deviceInfo, setDeviceInfo] = useState({
    id: "device_id_here", 
    service: "service_uuid_here", 
    characteristic: "characteristic_uuid_here",
  });


  useEffect(() => {
    const fetchData = async () => {
      const savedGoal = await getData("hydration_goal");
      const savedProgress = await getData("hydrationProgress");
      const savedBottles = await getData("hydrationBottles");
     
      if (savedGoal !== null) setGoal(savedGoal);
      if (savedProgress !== null) setProgress(savedProgress);
      if (savedBottles !== null) setBottles(savedBottles);
    };

    fetchData();
  }, []);
  const addBottle = async () => {
    const size = parseFloat(bottleSize);
    if (!isNaN(size) && size > 0) {
      const updatedBottles = [...bottles, size];
      const updatedProgress = Math.min(progress + size, goal);
      setBottles(updatedBottles);
      setProgress(updatedProgress);
      setBottleSize("");

      await setData("hydrationProgress", updatedProgress);
      await setData("hydrationBottles", updatedBottles);
    }
  };

  const scanDevice = () => {
    navigation.navigate("ScanningScreen");
  };

  // useEffect(() => {
  //   if (!deviceInfo || !deviceInfo.id || !deviceInfo.service || !deviceInfo.characteristic) {
  //     console.error("Device information is incomplete.");
  //     return;
  //   }

  //   const cleanup = startContinuousBleListener(
  //     deviceInfo.id,
  //     deviceInfo.service,
  //     deviceInfo.characteristic,
  //     (data) => {
  //       console.log("Data received continuously:", data);
  //       setBleData((prevData) => [...prevData, data]);
  //     }
  //   );

  //   return () => {
  //     cleanup();
  //     console.log("BLE listener cleaned up");
  //   };
  // }, [deviceInfo]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
        colors={["#0f2027", "#203a43", "#2c5364"]}
        style={styles.gradientBackground}
      >
        <View style={styles.goalSection}>
          <Text style={styles.goalText}>Today's Goal: {goal} ml</Text>
          <Image
            source={require("../../../assets/img/bottle.png")}
            style={styles.waterIcon}
          />
          <Text style={styles.progressText}>Progress: {progress} ml</Text>
        </View>
        {bottles.length>0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.bottlesSection}
          >
            {bottles.map((size, index) => (
              <View key={index} style={styles.bottle}>
                <Image
                  source={require("../../../assets/img/bottle.png")}
                  style={styles.bottleIcon}
                />
                <Text style={styles.bottleText}>{size} ml</Text>
              </View>
            ))}
          </ScrollView>
        )}

        <View style={styles.addBottleSection}>
          <TextInput
            style={styles.input}
            placeholder="Enter bottle size (ml)"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            value={bottleSize}
            onChangeText={setBottleSize}
          />
          <TouchableOpacity style={styles.addButton} onPress={addBottle}>
            <Text style={styles.addButtonText}>Fill Bottle</Text>
          </TouchableOpacity>
        </View>
       
        <View style={styles.deviceSection}>
          <TouchableOpacity style={styles.scanButton} onPress={scanDevice}>
            <Text style={styles.buttonText}>Scan Device</Text>
          </TouchableOpacity>
          {/* {deviceInfo && (
            <View style={styles.deviceInfo}>
              <Text style={styles.deviceText}>
                Device Name: {deviceInfo.name}
              </Text>
              <Text style={styles.deviceText}>ID: {deviceInfo.id}</Text>
              <Text style={styles.deviceText}>
                Battery: {deviceInfo.battery}
              </Text>
              <Text style={styles.deviceText}>Status: {deviceInfo.status}</Text>
            </View>
          )} */}
        </View>
        <View style={styles.chartSection}>
          <HydrationChart progress={progress} goal={goal} />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('History')}
        >
          <Text style={styles.buttonText}>View History</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
  },
  gradientBackground: {
    flex: 1,
    width: "100%",
  },
  goalSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  goalText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
  },
  waterIcon: {
    width: 200,
    height: 200,
    marginVertical: 10,
    resizeMode: "contain",
  },
  progressText: {
    fontSize: 18,
    color: "#ffffff",
  },
  chartSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  legendText: {
    marginTop: 10,
    fontSize: 14,
    textAlign: "center",
    color: "#ffffff",
  },
  redText: {
    color: "red",
  },
  greenText: {
    color: "green",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#1e88e5",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
    marginHorizontal: 20,
    marginBottom:15
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#1e88e5",
    borderRadius: 10,
    padding: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  addBottleSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    padding:20
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 10,
    flex: 1,
    color: "#000",
  },
  bottlesSection: {
    // marginTop: 20,
    paddingHorizontal: 10,
  },
  bottle: {
    alignItems: "center",
    marginRight: 15,
  },
  bottleIcon: {
    width: 60,
    height: 100,
    resizeMode: "contain",
  },
  bottleText: {
    // marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  deviceSection: {
    width: "100%",
    padding: 20,
    // backgroundColor: '#1e88e5',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // marginTop: 20,
  },
  scanButton: {
    backgroundColor: "#1e88e5",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  deviceInfo: {
    marginTop: 10,
  },
  deviceText: {
    fontSize: 16,
    color: "#ffffff",
  },
});

export default HydrationTracker;

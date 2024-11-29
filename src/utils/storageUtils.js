import AsyncStorage from '@react-native-async-storage/async-storage';


export const setData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Error storing data: ', e);
  }
};

  
export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error retrieving data: ', e);
    return null;
  }
};
export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
    console.log("All data has been cleared.");
  } catch (e) {
    console.error("Error clearing all data: ", e);
  }
};

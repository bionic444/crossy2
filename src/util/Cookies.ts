import AsyncStorage from "@react-native-async-storage/async-storage";

export const setCookie = async (key: string, value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error("Error setting cookie:", error);
  }
};

export const getCookie = async (key: string): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error("Error getting cookie:", error);
    return null;
  }
};

export const removeCookie = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing cookie:", error);
  }
};
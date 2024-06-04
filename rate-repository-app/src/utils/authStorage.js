import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  async getAccessToken() {
    return await AsyncStorage.getItem(`${this.namespace}:accToken`);
  }

  async setAccessToken(token) {
    await AsyncStorage.setItem(`${this.namespace}:accToken`, token);
  }

  async removeAccessToken() { 
    await AsyncStorage.removeItem(`${this.namespace}:accToken`);
  }
}

export default AuthStorage;

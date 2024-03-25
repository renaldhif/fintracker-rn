import { Button, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import Colors from "../components/Colors";
import { CustomText } from "../components/CustomText";
import CustomButton from "../components/CustomButton";
import { logout } from "../services/authService";
import { useEffect, useState } from "react";
import { getUserData, getUserId } from "../services/userService";

const HomeScreen = ({navigation}: {navigation: any}) => {
  const [isLoading , setIsLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const userId = await getUserId();
      if (userId) {
        const data = await getUserData(userId);
        setUserData(data);
      }
    }
  
    fetchData();
  }, []);

  const handleLogout = () => {
    try{
      setIsLoading(true);
      logout();
      setIsLoading(false);
      navigation.navigate('Login');
    }
    catch(error){
      console.error('Error signing out: ', error);
    }
  }

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
        <View style={styles.dashboardContainer}>
        <CustomText fontVariant="XL" fontWeight="Medium">Welcome,</CustomText>
        <View style={{ height: 4 }}/>
        <CustomText fontVariant="XL" fontWeight="Medium">{userData?.fullname}</CustomText>
        </View>
        <CustomButton
          title="Logout"
          buttonColorVariant="secondary"
          isLoading={isLoading}
          buttonVariant="buttonText"
          onPress={handleLogout}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.background_light,
    padding: 16,
  },
  dashboardContainer: {
    flex: 1,
  }
});

export default HomeScreen;
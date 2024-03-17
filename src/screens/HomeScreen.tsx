import { Button, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import Colors from "../components/Colors";
import { CustomText } from "../components/CustomText";

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={{ margin: 16, backgroundColor: Colors.primary }}>
          <CustomText>
            Hello World from CustomText
          </CustomText>
          <Button title="Go to Login" onPress={() => { }} />
          <Button title="Go to Register" onPress={() => { }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.background_dark
  },
});

export default HomeScreen;
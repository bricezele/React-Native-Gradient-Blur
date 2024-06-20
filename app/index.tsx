import {ImageBackground, StyleSheet, Text, useWindowDimensions, View} from "react-native";

export default function Index() {
    const {width, height} = useWindowDimensions()
  return (
    <View
      style={styles.container}
    >
      <ImageBackground source={{uri: 'https://9to5mac.com/wp-content/uploads/sites/6/2022/06/WWDC22.png'}} resizeMode='cover'>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

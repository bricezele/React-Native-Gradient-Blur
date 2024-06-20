import {Image, ImageBackground, Platform, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import {easeGradient} from "react-native-easing-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import {LinearGradient} from "expo-linear-gradient";
import {BlurView} from "expo-blur";

export default function Index() {
    const {width, height} = useWindowDimensions()
    const { colors: colorsGradientIos, locations: locationIos } = easeGradient({
        colorStops: {
            0: {
                color: 'transparent',
            },
            0.5: {
                color: 'rgba(0,0,0,0.99)',
            },
            1: {
                color: 'black',
            },
        },
    })
  return (
    <View
      style={styles.container}
    >
      <Image source={{uri: 'https://cdn.pixabay.com/photo/2020/05/29/08/54/beach-5234306_640.jpg'}} resizeMode='cover' style={{width, height}} />
      <View
          style={[styles.blurContainer, {width, height: height / 2}]}>
          <MaskedView
              maskElement={
                  <LinearGradient
                      locations={locationIos}
                      colors={colorsGradientIos}
                      style={StyleSheet.absoluteFill}
                  />
              }
              style={[StyleSheet.absoluteFill]}>
              <BlurView intensity={100} tint={Platform.OS === 'ios' ? 'systemChromeMaterialDark' : 'systemMaterialDark'}  style={[StyleSheet.absoluteFill]} />
          </MaskedView>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    blurContainer: {
        position: 'absolute',
        bottom: 0,
        zIndex: 2,
    },
    blur: {
        bottom: 0,
        position: 'absolute',
        zIndex: 1,
        opacity: 0.9
    },
    linearGradient: {
        bottom: 0,
        position: 'absolute',
    },
})

import {Image, Platform, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import {easeGradient} from "react-native-easing-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import {LinearGradient} from "expo-linear-gradient";
import {BlurView} from "expo-blur";
import Animated, {
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue
} from "react-native-reanimated";

export default function Index() {
    const {width, height} = useWindowDimensions()
    // PARALLAX SCROLL
    const scrollY = useSharedValue(0)
    const onScroll = useAnimatedScrollHandler({
        onScroll: ({ contentOffset: { y } }) => {
            scrollY.value = -y;
        },
    })
    const imageContainerStyle = useAnimatedStyle(() => ({
        transform: [{scale: interpolate(scrollY.value, [0, height], [1, 2])}]
    }))
    // LINEAR GRADIENT
    const { colors, locations } = easeGradient({
        colorStops: {0: {color: 'transparent'},0.5: {color: 'rgba(0,0,0,0.99)'}, 1: {color: 'black'}},
    })
    return (
        <View
            style={styles.container}
        >
            <Animated.ScrollView scrollEventThrottle={16}
                                 onScroll={onScroll}
                                 style={[StyleSheet.absoluteFill, {zIndex: 3}]} />
            <Animated.View style={[styles.container, imageContainerStyle]}>
                <Image source={{uri: 'https://c4.wallpaperflare.com/wallpaper/894/228/1004/ios-ipod-ipad-iphone-wallpaper-preview.jpg'}}
                       resizeMode='cover'
                       style={{width, height}} />
            </Animated.View>
            <View
                style={[styles.blurContainer, {width, height: height / 2}]}>
                <MaskedView
                    maskElement={
                        <LinearGradient
                            locations={locations}
                            colors={colors}
                            style={StyleSheet.absoluteFill}
                        />
                    }
                    style={[StyleSheet.absoluteFill]}>
                    <BlurView intensity={100}
                              tint={Platform.OS === 'ios' ? 'systemChromeMaterialDark' : 'systemMaterialDark'}
                              style={[StyleSheet.absoluteFill]} />
                </MaskedView>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Hello World</Text>
                </View>
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
    linearGradient: {
        bottom: 0,
        position: 'absolute',
    },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    text: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold'
    }
})

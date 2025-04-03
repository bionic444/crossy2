import React from "react";
import {
  Alert,
  Animated,
  Easing,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Banner from "@/components/GameOver/Banner";
import Footer from "@/components/GameOver/Footer";
import AudioManager from "@/AudioManager";
import Characters from "@/Characters";
import Images from "@/Images";

// const AnimatedBanner = Animated.createAnimatedComponent(Banner);

function GameOver({ ...props }) {
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [characters, setCharacters] = React.useState(
    Object.keys(Characters).map((val) => Characters[val])
  );

  
  const finalScore = props.score;
  const banner = [
    {
      color: "#FF0000",
      title: "You Died!",
    },
    {
      color: "#36D6EB",
      title: finalScore + " Score!",
    },
  ];

  
  const [animations, setAnimations] = React.useState(
    banner.map((val) => new Animated.Value(0))
  );

  const dismiss = () => {
    // props.navigation.goBack();
    props.onRestart();
  };

  const pickRandom = () => {
    const randomIndex = Math.floor(Math.random() * (characters.length - 1));
    const randomCharacter = characters[randomIndex];
    // props.setCharacter(randomCharacter);
    dismiss();
  };

  React.useEffect(() => {
    setTimeout(() => {
      _animateBanners();

      const playBannerSound = async () => {
        await AudioManager.playAsync(AudioManager.sounds.banner);
        // const soundObject = new Audio.Sound();
        // try {
        //   await soundObject.loadAsync(AudioFiles.banner);
        //   await soundObject.playAsync();
        // } catch (error) {
        //   console.warn('sound error', { error });
        // }
      };
      playBannerSound();
      setTimeout(() => playBannerSound(), 300);
      setTimeout(() => playBannerSound(), 600);
    }, 600);
  });

  const _animateBanners = () => {
    const _animations = animations.map((animation) =>
      Animated.timing(animation, {
        useNativeDriver: true,
        toValue: 1,
        duration: 1000,
        easing: Easing.elastic(),
      })
    );
    Animated.stagger(300, _animations).start();
  };

  const _showResult = (result) => {
    // if (result.action === Share.sharedAction) {
    //   if (result.activityType) {
    //     this.setState({result: 'shared with an activityType: ' + result.activityType});
    //   } else {
    //     this.setState({result: 'shared'});
    //   }
    // } else if (result.action === Share.dismissedAction) {
    //   this.setState({result: 'dismissed'});
    // }
  };

  const select = () => {
    // props.setCharacter(characters[currentIndex]);
    dismiss();
  };

  const { top, bottom, left, right } = useSafeAreaInsets();

  const imageStyle = { width: 60, height: 48 };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: top || 12, paddingBottom: bottom || 8 },
        props.style,
      ]}
    >
      <View key="content" style={{ flex: 1, justifyContent: "center" }}>
        {banner.map((val, index) => (
          <Banner
            animatedValue={animations[index].interpolate({
              inputRange: [0.2, 1],
              outputRange: [-width, 0],
              extrapolate: "clamp",
            })}
            key={index}
            style={{
              backgroundColor: val.color,
              transform: [
                {
                  scaleY: animations[index].interpolate({
                    inputRange: [0, 0.2],
                    outputRange: [0, 1],
                    extrapolate: "clamp",
                  }),
                },
              ],
            }}
            title={val.title}
            button={val.button}
          />
        ))}
      </View>

      <Footer
        style={{ paddingLeft: left || 4, paddingRight: right || 4 }}
        showSettings={props.showSettings}
        setGameState={props.setGameState}
        navigation={props.navigation}
      />
    </View>
  );
}

export default GameOver;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e",
  },
});

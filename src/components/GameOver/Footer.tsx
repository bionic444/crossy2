import { isAvailableAsync } from "expo-sharing";
import React, { useEffect, useState } from "react";
import { LayoutAnimation, StyleSheet, View } from "react-native";

import Images from "@/Images";
import State from "@/state";
import Button from "../Button";

export default function Footer({
  style,
  showSettings,
  setGameState,
  navigation,
}) {
  const [canShare, setCanShare] = useState(true);

  useEffect(() => {
    isAvailableAsync()
      .then(setCanShare)
      .catch(() => {});
  }, []);

  LayoutAnimation.easeInEaseOut();

  return (
    <View style={[styles.container, style]}>
      <Button
        onPress={() => {
          setGameState(State.Game.none);
        }}
        imageStyle={[
          styles.button,
          { aspectRatio: 1.9 },
        ]}
        source={Images.button.long_play}
      />
      <Button
        onPress={() => {
          console.log("Game Center"); //TODO: Add GC
        }}
        imageStyle={[styles.button, { aspectRatio: 1.25 }]}
        source={Images.button.rank}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    justifyContent: "space-around",
    flexDirection: "row",
    paddingHorizontal: 4,
    minHeight: 56,
    maxHeight: 56,
    minWidth: "100%",
    maxWidth: "100%",
    flex: 1,
  },
  button: {
    height: 56,
  },
});

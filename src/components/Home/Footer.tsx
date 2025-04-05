import React, { Component } from "react";
import { LayoutAnimation, Animated, StyleSheet, View } from "react-native";

import Images from "@/Images";
import Button from "../Button";

const imageStyle = { width: 60, height: 48 };

export default function Footer(props) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <Animated.View style={[styles.container, props.style]}>
      <Button
        style={{ maxHeight: 48 }}
        onPress={props.onSettingSelect}
        imageStyle={imageStyle}
        source={Images.button.settings}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
    // maxHeight: 48,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

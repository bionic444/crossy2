import React, { Component } from "react";
import { Share, StyleSheet, Text, View, TextInput } from "react-native";
import { setCookie, getCookie, removeCookie } from "@/util/Cookies";

import Button from "@/components/Button";
import Characters from "@/Characters";
import Colors from "@/Colors";
import Images from "@/Images";

// import Footer from './Footer';

const TitleButton = ({ text, imageStyle, source, onPress }) => (
  <View
    style={{
      justifyContent: "center",
      width: 115,
      height: 100,
      alignItems: "center",
      marginHorizontal: 4,
    }}
  >
    <Button imageStyle={imageStyle} source={source} onPress={onPress} />
    <Text
      style={{
        fontFamily: "retro",
        textAlign: "center",
        color: "white",
        fontSize: 12,
        marginTop: 8,
      }}
    >
      {text.toUpperCase()}
    </Text>
  </View>
);

class Settings extends Component {
  state = {
    currentIndex: 0,
    characters: Object.keys(Characters).map((val) => Characters[val]),
    inputVisible: null,
    inputValue: "",
  };

  dismiss = () => {
    this.props.goBack();
  };

  pickRandom = () => {
    const { characters } = this.state;
    const randomIndex = Math.floor(Math.random() * (characters.length - 1));
    const randomCharacter = characters[randomIndex];
    this.props.setCharacter(randomCharacter);
    this.dismiss();
  };

  share = () => {
    const { characters, currentIndex } = this.state;
    const character = characters[currentIndex].name;
    Share.share(
      {
        message: `Check out Bouncy Bacon by @baconbrix`,
        url: "https://crossyroad.expo.app",
        title: "Bouncy Bacon",
      },
      {
        dialogTitle: "Share Bouncy Bacon",
        excludedActivityTypes: [
          "com.apple.UIKit.activity.AirDrop",
          "com.apple.UIKit.activity.AddToReadingList",
        ],
        tintColor: Colors.blue,
      }
    );
  };

  _showResult = (result) => {};

  select = () => {
    const { characters, currentIndex } = this.state;
    this.props.setCharacter(characters[currentIndex]);
    this.dismiss();
  };

  render() {
    const imageStyle = { width: 60, height: 48 };
    const { inputVisible, inputValue } = this.state;

    const buttons = [
      {
        text: "Username",
        source: Images.button.language,
        imageStyle: imageStyle,
        onPress: () => this.setState({ inputVisible: "user", inputValue: "" }),
      },
      {
        text: "Wallet",
        source: Images.button.purchase,
        imageStyle: imageStyle,
        onPress: () => this.setState({ inputVisible: "wallet", inputValue: "" }),
      },
    ];

    return (
      <View style={[styles.container, this.props.style]}>
        <View
          style={{ flexDirection: "row", marginTop: 8, paddingHorizontal: 4 }}
        >
          <Button
            source={Images.button.back}
            imageStyle={imageStyle}
            onPress={(_) => {
              this.dismiss();
            }}
          />
        </View>

        <View
          key="content"
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            key="content-inner"
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {buttons.map((val, index) => (
              <TitleButton
                key={index}
                source={val.source}
                text={val.text}
                imageStyle={val.imageStyle}
                onPress={val.onPress}
              />
            ))}
          </View>
        </View>

        {inputVisible && (
          <View style={styles.overlay}>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>
                {inputVisible === "wallet"
                  ? "Enter Wallet Address"
                  : "Enter User Identifier"}
              </Text>
              <TextInput
                style={styles.textInput}
                value={inputValue}
                onChangeText={(text) => this.setState({ inputValue: text })}
                placeholder="Type here..."
                placeholderTextColor="#ccc"
              />
              <View style={{ flexDirection: "row", marginTop: 16 }}>
                <Button
                  source={Images.button.exit}
                  imageStyle={{ width: 40, height: 32 }}
                  onPress={() =>
                    this.setState({ inputVisible: null, inputValue: "" })
                  }
                />
                <Button
                  source={Images.button.submit}
                  imageStyle={{ width: 40, height: 32, marginLeft: 8 }}
                  onPress={async () => {
                    console.log(`${inputVisible} input:`, inputValue);
                    
                    if (inputVisible === "wallet") {
                      await setCookie("wallet", inputValue);
                    } else {
                      await setCookie("username", inputValue);
                    }

                    this.setState({ inputVisible: null, inputValue: "" });
                  }}
                />
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default Settings;

Settings.defaultProps = {
  coins: 0,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(105, 201, 230, 0.8)",
    flexWrap: "wrap",
    maxWidth: "100%",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9,
  },
  inputBox: {
    position: "absolute",
    top: "30%",
    width: 400, // Less wide
    minHeight: 300, // Taller box
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    zIndex: 10,
  },
  textInput: {
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    width: "100%",
    fontSize: 16,
    fontFamily: "retro",
    backgroundColor: "#fff",
    color: "#000",
    marginTop: 10,
  },
  inputLabel: {
    fontFamily: "retro",
    fontSize: 14,
    color: "#222",
  },
});

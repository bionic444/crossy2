import React from "react";
import { StyleSheet, Text, Platform, View } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import GameContext from "@/context/GameContext";
import { setCookie, getCookie, removeCookie } from "@/util/Cookies";

function generateTextShadow(width) {
  return Platform.select({
    web: {
      textShadow: `-${width}px 0px 0px #000, ${width}px 0px 0px #000, 0px -${width}px 0px #000, 0px ${width}px 0px #000`,
    },
    default: {},
  });
}
const textShadow = generateTextShadow(4);
const textShadowHighscore = generateTextShadow(2);
export default function Score({ gameOver, score, ...props }) {
  const { highscore = 0, setHighscore } = React.useContext(GameContext);
  const [wallet, setWallet] = React.useState<string | null>(null);
  const [username, setUsername] = React.useState<string | null>(null);

  React.useEffect(() => {

    const fetchCookies = async () => {
      const wallet = await getCookie("wallet");
      const username = await getCookie("username");
      setWallet(wallet);
      setUsername(username);
    };
    fetchCookies();

    if (gameOver) {
      if (score > highscore) {
        setHighscore(score);
      }
    }
  }, [gameOver]);

  const { top, left, } = useSafeArea();

  return (
    <View style={StyleSheet.absoluteFill}>
      {/* Game view fills screen */}
      <View style={{ flex: 1 }}>{/* Render your game view here */}</View>
  
      {/* Top-left score & highscore */}
      <View
        pointerEvents="none"
        style={[
          styles.container,
          { top: Math.max(top, 16), left: Math.max(left, 8), position: 'absolute' },
        ]}
      >
        <Text style={[styles.score, textShadow]}>{score}</Text>
        {highscore > 0 && (
          <Text style={[styles.highscore, textShadowHighscore]}>
            BEST: {highscore}
          </Text>
        )}
      </View>
  
      {/* Top-right wallet & username */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: 16,
          right: 8,
          alignItems: 'flex-end',
        }}
      >
        <Text style={[styles.highscore, textShadowHighscore]}>
          Wallet: {wallet ? wallet.slice(-6) : 'None'}
        </Text>
        <Text style={[styles.highscore, textShadowHighscore]}>
          Name: {username}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    gap: 12,
  },

  score: {
    color: "white",
    fontFamily: "retro",
    fontSize: 48,
    backgroundColor: "transparent",
  },
  highscore: {
    color: "yellow",
    fontFamily: "retro",
    fontSize: 14,

    letterSpacing: -0.1,
    backgroundColor: "transparent",
  },
  rightInfoContainer: {
    position: 'absolute',
    top: 16,
    right: 8,
    alignItems: 'flex-end',
  },
});
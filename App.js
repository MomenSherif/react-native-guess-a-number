import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
}

export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded)
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={() => console.log(err)}
      />
    );

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const newGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }

  const gameOverHandler = (numOfRounds) => setGuessRounds(numOfRounds);

  return (
    <SafeAreaView style={styles.screen}>
        <Header title="Guess a Number" />
        {userNumber && guessRounds <= 0 ?
          <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
          :
          guessRounds > 0 ?
            <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onNewGame={newGameHandler} />
            :
            <StartGameScreen onStartGame={startGameHandler} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
});

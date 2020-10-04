import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions, ScrollView } from 'react-native';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';

const GameOverScreen = ({ roundsNumber, userNumber, onNewGame }) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>The Game is Over!</TitleText>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/success.png')}
            style={styles.image}
            fadeDuration={1000}
          />
        </View>
        <BodyText style={styles.resultText}>Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{userNumber}</Text></BodyText>
        <MainButton onPress={onNewGame} >
          NEW GAME
      </MainButton>
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: (Dimensions.get('window').width * 0.7) / 2,
    borderColor: 'black',
    borderWidth: 3,
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 30
  },
  image: {
    width: '100%',
    height: '100%',
  },
  resultText: {
    fontSize: Dimensions.get('window').height < 600 ? 16 : 20,
    textAlign: 'center',
    marginVertical: Dimensions.get('window').height / 60
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
  }
});

export default GameOverScreen;
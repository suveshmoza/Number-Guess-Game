import { ImageBackground, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import { useState } from 'react';

import Colors from './constants/colors';

export default function App() {
	const [userNumber, setUserNumber] = useState(null);
	const [gameIsOver, setGameIsOver] = useState(true);

	const pickedNumberHandler = (pickedNumber) => {
		setUserNumber(pickedNumber);
		setGameIsOver(false);
	};

	const gameOverHandler = () => {
		setGameIsOver(true);
	};

	let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

	if (userNumber) {
		screen = (
			<GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
		);
	}

	if (gameIsOver && userNumber) {
		screen = <GameOverScreen />;
	}

	return (
		<LinearGradient
			colors={[Colors.primary4, Colors.accent]}
			style={styles.rootContainer}
		>
			<ImageBackground
				source={require('./assets/images/background.jpg')}
				resizeMode="cover"
				style={styles.rootContainer}
				imageStyle={styles.backgroundImage}
			>
				<SafeAreaView style={styles.rootContainer}>{screen}</SafeAreaView>
			</ImageBackground>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
	},
	backgroundImage: {
		opacity: 0.15,
	},
});

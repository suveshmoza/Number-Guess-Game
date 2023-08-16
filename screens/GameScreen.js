import { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';

import NumberContainer from '../components/game/NumberContainer';
import Title from '../components/ui/Title';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';

const generateRandomBetween = (min, max, exclude) => {
	const rndNum = Math.floor(Math.random() * (max - min)) + min;
	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return rndNum;
	}
};

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }) => {
	const initialGuess = useMemo(
		() => generateRandomBetween(minBoundary, maxBoundary, userNumber),
		[minBoundary, maxBoundary, userNumber]
	);
	const [currGuess, setCurrGuess] = useState(initialGuess);

	useEffect(() => {
		if (currGuess === userNumber) {
			onGameOver();
		}
	}, [currGuess, userNumber, onGameOver]);

	const nextGuessHandler = (direction) => {
		if (
			(direction == 'lower' && currGuess < userNumber) ||
			(direction == 'higher' && currGuess > userNumber)
		) {
			Alert.alert("Don't lie", 'You know that is wrong...', [
				{ text: 'Sorry', style: 'cancel' },
			]);
			return;
		}
		if (direction === 'lower') {
			maxBoundary = currGuess - 1;
		} else {
			minBoundary = currGuess + 1;
		}
		const newRndNumber = generateRandomBetween(
			minBoundary,
			maxBoundary,
			currGuess
		);
		setCurrGuess(newRndNumber);
	};

	return (
		<View style={styles.screen}>
			<Title>Opponent's Score</Title>
			<NumberContainer>{currGuess}</NumberContainer>
			<View>
				<Text>Higher or Lower</Text>
				<Card>
					<PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
						-
					</PrimaryButton>
					<PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}>
						+
					</PrimaryButton>
				</Card>
			</View>
			{/* <View>LOG ROUNDS</View> */}
		</View>
	);
};

export default GameScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 24,
		marginTop: 25,
	},
});

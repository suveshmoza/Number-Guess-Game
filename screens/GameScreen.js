import { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, Text, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/game/NumberContainer';
import Title from '../components/ui/Title';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import GuessLogItem from '../components/game/GuessLogItem';

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
	const initialGuess = generateRandomBetween(1, 100, userNumber);
	const [currGuess, setCurrGuess] = useState(initialGuess);
	const [guessRounds, setGuessRounds] = useState([initialGuess]);

	useEffect(() => {
		if (currGuess === userNumber) {
			onGameOver(guessRounds.length);
		}
	}, [currGuess, userNumber, onGameOver]);

	useEffect(() => {
		minBoundary = 1;
		maxBoundary = 100;
	}, []);

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
		setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
	};

	const guessRoundsListLength = guessRounds.length;

	return (
		<View style={styles.screen}>
			<Title>Opponent's Score</Title>
			<NumberContainer>{currGuess}</NumberContainer>
			<Card>
				<InstructionText style={styles.instructionText}>
					Higher or Lower
				</InstructionText>
				<View style={styles.buttonsContainer}>
					<View style={styles.buttonContainer}>
						<PrimaryButton
							style={styles.buttonsContainer}
							onPress={nextGuessHandler.bind(this, 'lower')}
						>
							<Ionicons name="md-remove" size={24} color="white" />
						</PrimaryButton>
					</View>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}>
							<Ionicons name="md-add" size={24} color="white" />
						</PrimaryButton>
					</View>
				</View>
			</Card>
			<View style={styles.listContainer}>
				<FlatList
					data={guessRounds}
					renderItem={(itemData) => (
						<GuessLogItem
							roundNumber={guessRoundsListLength - itemData.index}
							guess={itemData.item}
						/>
					)}
					keyExtractor={(item) => item}
				/>
			</View>
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
	instructionText: {
		marginBottom: 12,
	},
	buttonsContainer: {
		flexDirection: 'row',
	},
	buttonContainer: {
		flex: 1,
	},
	listContainer: {
		flex: 1,
		padding: 16,
	},
});

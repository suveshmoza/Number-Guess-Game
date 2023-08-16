import { TextInput, View, StyleSheet, Alert, Text } from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
import { useState } from 'react';
import Colors from '../constants/colors';
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';

const StartGameScreen = ({ onPickNumber }) => {
	const [enteredNumber, setEnteredNumber] = useState('');

	const numberInputHandler = (enteredText) => {
		setEnteredNumber(enteredText);
	};

	const resetInputHandler = () => {
		setEnteredNumber('');
	};

	const confirmInputHandler = () => {
		const chosenNumber = parseInt(enteredNumber);
		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
			Alert.alert('Invalid Number', 'Number has to be between 1 and 99', [
				{ text: 'Okay', style: 'destructive', onPress: resetInputHandler },
			]);
			return;
		}
		onPickNumber(chosenNumber);
	};

	return (
		<View style={styles.rootContainer}>
			<Title>Guess the number</Title>
			<Card>
				<Text style={styles.instructionText}>Enter a number</Text>
				<TextInput
					style={styles.inputNumber}
					maxLength={2}
					keyboardType="number-pad"
					value={enteredNumber}
					onChangeText={numberInputHandler}
				/>
				<View style={styles.buttonsContainer}>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
					</View>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
					</View>
				</View>
			</Card>
		</View>
	);
};

export default StartGameScreen;

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		marginTop: 100,
		alignItems: 'center',
	},
	instructionText: {
		color: Colors.accent,
		fontSize: 24,
		fontWeight: 'bold',
	},
	inputNumber: {
		height: 50,
		width: 50,
		fontSize: 32,
		borderBottomColor: Colors.accent,
		borderBottomWidth: 2,
		color: Colors.accent,
		marginVertical: 8,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	buttonsContainer: {
		flexDirection: 'row',
	},
	buttonContainer: {
		flex: 1,
	},
});

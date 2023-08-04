import { View, Text, Pressable, StyleSheet } from 'react-native';

const PrimaryButton = ({ children }) => {
	return (
		<Pressable>
			<View style={styles.buttonContainer}>
				<Text>{children}</Text>
			</View>
		</Pressable>
	);
};
export default PrimaryButton;

const styles = StyleSheet.create({
	buttonContainer: {
		backgroundColor: '#71063c',
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 20,
		elevation: 4,
	},
});

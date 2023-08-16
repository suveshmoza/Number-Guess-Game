import { View, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

const Card = ({ children }) => {
	return <View style={styles.inputContainer}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
	inputContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 36,
		marginHorizontal: 24,
		padding: 16,
		backgroundColor: Colors.primary3,
		borderRadius: 8,
		elevation: 6,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		shadowOpacity: 0.25,
	},
});

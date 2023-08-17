import { StyleSheet, Text } from 'react-native';
import Colors from '../../constants/colors';

const Title = ({ children }) => {
	return <Text style={styles.title}>{children}</Text>;
};

export default Title;

const styles = StyleSheet.create({
	title: {
		fontFamily: 'open-sans-bold',
		fontSize: 18,
		color: Colors.accent,
		textAlign: 'center',
		borderWidth: 2,
		borderColor: Colors.accent,
		borderRadius: 25,
		padding: 12,
	},
});

import { ImageBackground, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import StartGameScreen from './screens/StartGameScreen';

export default function App() {
	return (
		<LinearGradient
			colors={['#3c0329', '#ddb52f']}
			style={styles.rootContainer}
		>
			<ImageBackground
				source={require('./assets/images/background.jpg')}
				resizeMode="cover"
				style={styles.rootContainer}
				imageStyle={styles.backgroundImage}
			>
				<StartGameScreen />
			</ImageBackground>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
	},
	backgroundImage: {
		opacity: 0.5,
	},
});

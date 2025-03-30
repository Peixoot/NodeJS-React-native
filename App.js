import { StyleSheet, View, ScrollView } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import ViaCep from './component/ViaCep';

export default function App() {
  return (
    <PaperProvider>
      <ScrollView style={styles.container}>
        <ViaCep />
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
});

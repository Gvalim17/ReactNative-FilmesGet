import React from 'react';
import { StyleSheet, View } from 'react-native';
import BuscaGenero from './GetGenero/BuscaGenero';

const App = () => {
  return (
    <View style={styles.container}>
      <BuscaGenero />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;

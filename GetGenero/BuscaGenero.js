import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Modal, ScrollView } from 'react-native';
import axios from 'axios';

const GenerosSemelhantes = () => {
  const [genre, setGenre] = useState('');
  const [suggestedMovies, setSuggestedMovies] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const buscarFilmesByGenero = async () => {
    try {
      const resp = await axios.get('http://10.136.63.193:3000/filmes');
      const filmeDb = resp.data;
  
      const filtroFilme = filmeDb.filter(movie => movie.Genre.toLowerCase().includes(genre.toLowerCase()));
  
      if (filtroFilme.length > 0) {
        setSuggestedMovies(filtroFilme);
        setModalVisible(true);
      } else {
        Alert.alert('Nenhum filme encontrado para este gênero');
      }
    } catch (error) {
      console.error('Erro ao buscar filmes', error);
      Alert.alert('Erro ao buscar filmes');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Insira o gênero do filme:</Text>
      <TextInput
        style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginTop: 10, marginBottom: 10 }}
        onChangeText={text => setGenre(text)}
        value={genre}
      />
      <Button title="Buscar semelhantes" onPress={buscarFilmesByGenero} color="black" />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
              <Text style={{ fontSize: 18, marginBottom: 10 }}>Filmes sugeridos:</Text>
              {suggestedMovies.map((movie, index) => (
                <View key={index} style={{ marginBottom: 20 }}>
                  <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{movie.Title}</Text>
                </View>
              ))}
              <Button title="Fechar" onPress={() => setModalVisible(false)} color="black" />
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

export default GenerosSemelhantes;

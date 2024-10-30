// app/(tabs)/index.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#FFDEE9', '#B5FFFC']}
      style={styles.container}
    >
      <Text style={styles.title}>🎉 Bienvenido a PuzzleMania 🎉</Text>
      <Text style={styles.subtitle}>Selecciona un juego para comenzar:</Text>

      <TouchableOpacity style={[styles.button, styles.wordButton]} onPress={() => router.push('/WordGame')}>
        <FontAwesome5 name="book" size={200} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}> Formando Palabras</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, styles.sumButton]} onPress={() => router.push('/SumGame')}>
        <FontAwesome5 name="plus" size={200} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}> Sumando Números</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, styles.memoryButton]} onPress={() => router.push('/MemoryGame')}>
        <FontAwesome5 name="brain" size={200} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}> Memoria Mágica</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: width * 0.04, // Disminuido para un ajuste mejor en vertical
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: width * 0.04, // Tamaño moderado
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: width * 0.03, // Ajuste de padding basado en ancho
    marginVertical: height * 0.02, // Ajuste para que no sea tan grande en vertical
    borderRadius: 10,
    width: '80%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  wordButton: {
    backgroundColor: '#FF6F61',
  },
  sumButton: {
    backgroundColor: '#FFAB40',
  },
  memoryButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    fontSize: width * 0.035, // Ajuste proporcional para evitar textos grandes
    fontWeight: 'bold',
    color: '#fff',
  },
  icon: {
    marginRight: 10,
  },
});

import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Text, View, Button, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const buttonSize = width * 0.18; // Ajuste del tamaño de los botones para celular

const levels = [
  { word: 'SOL', hint: '☀️ Brilla en el día' },
  { word: 'LUNA', hint: '🌕 La vemos de noche' },
  // ... resto de los niveles
];

const generateRandomLetters = (word) => {
  const letters = [...word];
  const additionalLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  while (letters.length < word.length + 5) {
    const randomLetter = additionalLetters[Math.floor(Math.random() * additionalLetters.length)];
    if (!letters.includes(randomLetter)) {
      letters.push(randomLetter);
    }
  }
  
  return letters.sort(() => Math.random() - 0.5);
};

const WordGame = () => {
  const router = useRouter();
  const [currentLevel, setCurrentLevel] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [availableLetters, setAvailableLetters] = useState(generateRandomLetters(levels[0].word));
  const [lives, setLives] = useState(3);
  const [timeRemaining, setTimeRemaining] = useState(30);

  useEffect(() => {
    if (timeRemaining <= 0) {
      setLives((prevLives) => prevLives - 1);
      if (lives - 1 <= 0) {
        router.replace('/LoseScreen');
      } else {
        resetLevel();
      }
    } else {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeRemaining, lives]);

  const resetLevel = () => {
    setTimeRemaining(30);
    setAvailableLetters(generateRandomLetters(levels[currentLevel].word));
    setSelectedLetters([]);
  };

  useEffect(() => {
    if (currentLevel >= levels.length) {
      router.replace('/WinScreen');
    } else if (lives <= 0) {
      router.replace('/LoseScreen');
    } else {
      resetLevel();
    }
  }, [currentLevel, lives]);

  const handleLetterPress = (letter, index) => {
    if (selectedLetters.length < levels[currentLevel].word.length) {
      setSelectedLetters([...selectedLetters, letter]);
      setAvailableLetters(availableLetters.filter((_, i) => i !== index));
    }
  };

  const handleCheckWord = () => {
    const currentWord = levels[currentLevel].word;
    const selectedWord = selectedLetters.join('');

    if (selectedWord === currentWord) {
      setCurrentLevel(currentLevel + 1);
    } else {
      setLives((prevLives) => prevLives - 1);
      if (lives - 1 > 0) {
        setAvailableLetters(generateRandomLetters(currentWord));
      }
    }

    setSelectedLetters([]);
  };

  return (
    <View style={styles.container}>
      <Button title="⬅️ Volver al Menú" onPress={() => router.replace('/')} />

      <View style={styles.header}>
        <Text style={styles.headerText}>
          Nivel: {'⭐'.repeat(currentLevel + 1)}{ '☆'.repeat(levels.length - currentLevel - 1) }
        </Text>
        <Text style={styles.headerText}>Vidas: {lives > 0 ? '❤️'.repeat(lives) : ''}</Text>
        <Text style={styles.headerText}>Tiempo: {timeRemaining}s</Text>
      </View>

      {currentLevel < levels.length && (
        <>
          <Text style={styles.hintText}>{levels[currentLevel].hint}</Text>

          <View style={styles.wordContainer}>
            {levels[currentLevel].word.split('').map((_, index) => (
              <View key={index} style={[
                styles.letterBox,
                { backgroundColor: selectedLetters[index] ? 'lightgreen' : '#eee' }
              ]}>
                <Text style={styles.letterText}>{selectedLetters[index] || ''}</Text>
              </View>
            ))}
          </View>

          <View style={styles.lettersContainer}>
            {availableLetters.map((letter, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleLetterPress(letter, index)}
                style={styles.letterButton}
              >
                <Text style={styles.letterButtonText}>{letter}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.checkButton} onPress={handleCheckWord}>
            <Text style={styles.checkButtonText}>Comprobar</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#FFF3E4',
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.02,
  },
  headerText: {
    fontSize: width * 0.04, // Ajuste de tamaño de texto para el header
  },
  hintText: {
    fontSize: width * 0.05, // Tamaño moderado para pistas
    marginBottom: height * 0.02,
    textAlign: 'center',
  },
  wordContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: height * 0.02,
  },
  letterBox: {
    width: buttonSize,
    height: buttonSize,
    margin: width * 0.015,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  letterText: {
    fontSize: width * 0.06, // Ajuste proporcional de las letras
    fontWeight: 'bold',
  },
  lettersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: width * 0.02,
  },
  letterButton: {
    width: buttonSize,
    height: buttonSize,
    margin: width * 0.015,
    backgroundColor: '#FFB74D',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  letterButtonText: {
    fontSize: width * 0.05, // Tamaño moderado para letras de botones
    fontWeight: 'bold',
    color: '#fff',
  },
  checkButton: {
    marginTop: height * 0.03,
    backgroundColor: '#1E88E5',
    paddingVertical: height * 0.015,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkButtonText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default WordGame;

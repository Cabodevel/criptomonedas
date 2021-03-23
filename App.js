/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  Image, 
  View
} from 'react-native';

import Header from './components/Header'
import Formulario from './components/Formulario'

const App = () => {

  const [moneda, setMoneda] = useState('');
  const [cryptoMoneda, setCryptoMoneda] = useState('');
  const [consultarAPI, setconsultarAPI] = useState(false)
  return (
   <>
    <Header />
    <Image style={styles.imagen} source={require('./assets/img/cryptomonedas.png')}/> 
    <View style={styles.contenido}>
      <Formulario 
        moneda={moneda}
        cryptoMoneda={cryptoMoneda}
        setMoneda={setMoneda}
        setCryptoMoneda={setCryptoMoneda}
        setConsultarAPI={setconsultarAPI}
      />
    </View>
   </>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%'
  },
   contenido: {
     marginHorizontal: '2.5%',

   }
});

export default App;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Image, 
  View,
  ActivityIndicator
} from 'react-native';

import Header from './components/Header'
import Formulario from './components/Formulario'
import axios from 'axios';

const App = () => {

  const [moneda, setMoneda] = useState('');
  const [cryptoMoneda, setCryptoMoneda] = useState('');
  const [consultarAPI, setconsultarAPI] = useState(false)
  const [apiResult, setApiResult] = useState({});

  

  useEffect(() => {
    const consultarCryptoMoneda = async () =>{
        if(consultarAPI){
          const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoMoneda}&tsyms=${moneda}`
          var result = await axios.get(url);
          setApiResult(result.data.DISPLAY[cryptoMoneda][moneda])
          setConsultarAPI(false);
        }
    }
    consultarCryptoMoneda();
  }, [consultarAPI])
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

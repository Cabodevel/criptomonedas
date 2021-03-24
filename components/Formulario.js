import React, { useState, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Alert} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import axios from 'axios';

const Formulario = ({moneda, cryptoMoneda, setMoneda, setCryptoMoneda, setConsultarAPI}) => {

    const [cryptoMonedas, setcryptoMonedas] = useState([]);

    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const result = await axios.get(url); 
            
            setcryptoMonedas(result.data.Data);
        }
        consultarAPI();
    }, []) 

    const obtenerMoneda = moneda => {
        setMoneda(moneda);
    }

    const obtenerCriptoMoneda = crypto => {
        setCryptoMoneda(crypto);
    }

    const cotizarPrecio = () =>{
        if(moneda.trim() === '' || cryptoMoneda.trim() === ''){
            mostrarAlerta();
            return;
        }
        else{
            setConsultarAPI(true)
        }
    }

    const mostrarAlerta = () => {
        Alert.alert(
            "Error",
            "Ambos campos son obligatorios",
            [
                {text: "Ok"}
            ]

        )
    }

    return (
        <View>
            <Text style={styles.label}>Moneda</Text>
            <Picker
                selectedValue={moneda}
                onValueChange={moneda => obtenerMoneda(moneda)}
                itemStyle={{height: 120}}
            >
                <Picker.Item label="- Seleccione -" value=""/>
                <Picker.Item label="Dolar EEUU" value="USD"/>
                <Picker.Item label="Peso Mexicano" value="MXN"/>
                <Picker.Item label="Euro" value="EUR"/>
                <Picker.Item label="Libra Esterlina" value="GBP"/>

            </Picker>
            <Text style={styles.label}>Criptomoneda</Text>
            <Picker
                selectedValue={cryptoMoneda}
                onValueChange={crypto => obtenerCriptoMoneda(crypto)}
                itemStyle={{height: 120}}
            >
                <Picker.Item label="- Seleccione -" value=""/>
                {cryptoMonedas && cryptoMonedas.map(cripto => (
                    <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name}/>
                ))}
            </Picker>
            <TouchableHighlight
                style={styles.btnCotizar}
                onPress={() => cotizarPrecio()}
            >
                <Text style={styles.textoCotizar}>Cotizar</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles  = StyleSheet.create({
    label: {
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        fontSize: 22, 
        marginVertical: 20
    },
    btnCotizar: {
        backgroundColor: "#5e49e2",
        padding: 10,
        marginTop: 20
    },
    textoCotizar:{
        color: "#FFF",
        fontSize: 18,
        fontFamily: "Lato-Black",
        textTransform: "uppercase",
        textAlign: "center"
    }
})

export default Formulario
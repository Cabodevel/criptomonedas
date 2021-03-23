import React, { useState, useEffect} from 'react'
import { View, Text, StyleSheet} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import axios from 'axios';

const Formulario = () => {
    const [moneda, setMoneda] = useState('');
    const [cryptoMoneda, setCryptoMoneda] = useState('');
    const [cryptoMonedas, setcryptoMonedas] = useState('');

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
        </View>
    )
}

const styles  = StyleSheet.create({
    label: {
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        fontSize: 22, 
        marginVertical: 20
    }
})

export default Formulario
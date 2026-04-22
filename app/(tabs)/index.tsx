import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';

export default function Index() {
  const [ingresos, setIngresos] = useState('');
  const [gastos, setGastos] = useState('');
  const [presupuesto, setPresupuesto] = useState(0);

  const calcularPresupuesto = () => {
    const total = parseFloat(ingresos || 0) - parseFloat(gastos || 0);
    setPresupuesto(total);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Calculadora de Presupuestos</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresos totales (MXN)"
        keyboardType="numeric"
        value={ingresos}
        onChangeText={setIngresos}
      />
      <TextInput
        style={styles.input}
        placeholder="Gastos totales (MXN)"
        keyboardType="numeric"
        value={gastos}
        onChangeText={setGastos}
      />
      <Button title="Calcular Presupuesto" onPress={calcularPresupuesto} />
      <Text style={styles.result}>
        Presupuesto restante: ${presupuesto.toFixed(2)} MXN
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  result: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});
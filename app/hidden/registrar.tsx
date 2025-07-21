import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Colores } from '@/constants/colores';
import { useCustomHeaderConfig } from '@/hooks/useCustomHeader';

export default function RegistrarScreen() {
  const [nombre, setNombre] = useState('');
  const [raza, setRaza] = useState('');
  const [edad, setEdad] = useState('');

  const registrarMascota = () => {
    console.log({ nombre, raza, edad });
  };

        useCustomHeaderConfig({
        title: "Registrar mascota",
      });

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
      <TextInput style={styles.input} placeholder="Raza" value={raza} onChangeText={setRaza} />
      <TextInput style={styles.input} placeholder="Edad" keyboardType="numeric" value={edad} onChangeText={setEdad} />
      <Button title="Registrar" onPress={registrarMascota} color={Colores.boton} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: Colores.fondoClaro },
  titulo: { fontSize: 24, fontWeight: 'bold', color: Colores.primario, marginBottom: 20, textAlign: 'center' },
  input: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    borderColor: Colores.neutro,
    borderWidth: 1,
  },
});

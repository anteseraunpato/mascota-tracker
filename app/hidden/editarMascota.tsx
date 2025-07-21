import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colores } from '@/constants/colores';
import { useCustomHeaderConfig } from '@/hooks/useCustomHeader';

export default function EditarMascota() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [nombre, setNombre] = useState(params.nombre || '');
  const [raza, setRaza] = useState(params.raza || '');
  const [edad, setEdad] = useState(params.edad || '');
  const [especie, setEspecie] = useState(params.especie || '');
  const [color, setColor] = useState(params.color || '');
  const [sexo, setSexo] = useState(params.sexo || '');
  const [fechaNacimiento, setFechaNacimiento] = useState(params.fechaNacimiento || '');
  const [senasParticulares, setSenasParticulares] = useState(params.senasParticulares || '');
  const [microchipId, setMicrochipId] = useState(params.microchipId || '');

  const handleGuardar = () => {
    // Aquí puedes implementar la lógica de guardado o llamada a API
    Alert.alert('Mascota actualizada', 'Los datos han sido guardados correctamente.');
    router.back(); // Regresa a la pantalla anterior
  };

            useCustomHeaderConfig({
            title: "Editar detalles de mascota",
          });

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <Input label="Nombre" value={nombre} onChangeText={setNombre} />
      <Input label="Edad" value={edad} onChangeText={setEdad} keyboardType="numeric" />
      <Input label="Raza" value={raza} onChangeText={setRaza} />
      <Input label="Especie" value={especie} onChangeText={setEspecie} />
      <Input label="Color" value={color} onChangeText={setColor} />
      <Input label="Sexo" value={sexo} onChangeText={setSexo} />
      <Input label="Fecha de Nacimiento" value={fechaNacimiento} onChangeText={setFechaNacimiento} />
      <Input label="Señas Particulares" value={senasParticulares} onChangeText={setSenasParticulares} />
      <Input label="Microchip ID" value={microchipId} onChangeText={setMicrochipId} />

      <Pressable style={styles.botonGuardar} onPress={handleGuardar}>
        <Text style={styles.botonTexto}>Guardar Cambios</Text>
      </Pressable>
    </ScrollView>
  );
}

function Input({ label, value, onChangeText, keyboardType = 'default' }: any) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        placeholder={label}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: Colores.fondoClaro,
  },
  container: {
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colores.texto,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    color: Colores.texto,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    borderColor: Colores.terciario,
    borderWidth: 1,
  },
  botonGuardar: {
    backgroundColor: Colores.primario,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

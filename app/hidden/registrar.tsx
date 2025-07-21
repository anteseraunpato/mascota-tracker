import { View, Text, TextInput, Pressable, StyleSheet, Image, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Colores } from '@/constants/colores';
import { useCustomHeaderConfig } from '@/hooks/useCustomHeader';

const API_URL = 'http://192.168.100.190:3000/mascotas';

export default function RegistrarScreen() {
  // Campos requeridos
  const [nombre, setNombre] = useState('');
  const [raza, setRaza] = useState('');
  const [especie, setEspecie] = useState('');
  const [sexo, setSexo] = useState('');
  const [edad, setEdad] = useState('');
  
  // Campos opcionales
  const [color, setColor] = useState('');
  const [caracteristicas, setCaracteristicas] = useState('');
  const [gpsId, setGpsId] = useState('');
  const [imagen, setImagen] = useState<{ uri: string } | null>(null);
  
  const [loading, setLoading] = useState(false);

  useCustomHeaderConfig({
    title: "Registrar mascota",
  });

  const seleccionarImagen = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permiso requerido', 'Necesitamos acceso a tus fotos');
    return;
  }

    const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images, // ← Forma correcta
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.8,
  });

    if (!result.canceled && result.assets?.[0]) {
    setImagen(result.assets[0]);
  }
};

  const registrarMascota = async () => {
    // Validar campos obligatorios
    if (!nombre || !raza || !especie || !sexo || !edad) {
      Alert.alert('Error', 'Por favor completa todos los campos requeridos');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      // Campos requeridos
      formData.append('nombre', nombre);
      formData.append('raza', raza);
      formData.append('especie', especie);
      formData.append('sexo', sexo);
      formData.append('edad', edad);
      
      // Campos opcionales (solo si tienen valor)
      if (color) formData.append('color', color);
      if (caracteristicas) formData.append('caracteristicas', caracteristicas);
      if (gpsId) formData.append('gpsId', gpsId);

      if (imagen) {
        formData.append('picture', {
          uri: imagen.uri,
          name: `mascota_${Date.now()}.jpg`,
          type: 'image/jpeg',
        } as any);
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Error en el servidor');
      }

      Alert.alert('Éxito', 'Mascota registrada correctamente');
      // Limpiar formulario
      setNombre('');
      setRaza('');
      setEspecie('');
      setSexo('');
      setEdad('');
      setColor('');
      setCaracteristicas('');
      setGpsId('');
      setImagen(null);

    } catch (error) {
      let mensajeError = 'Error al registrar mascota';
      if (error instanceof Error) {
        mensajeError = error.message;
      }
      Alert.alert('Error', mensajeError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.seccion}>Información Básica (Requerida)</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nombre *"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Raza *"
        value={raza}
        onChangeText={setRaza}
      />

      <TextInput
        style={styles.input}
        placeholder="Especie *"
        value={especie}
        onChangeText={setEspecie}
      />

      <TextInput
        style={styles.input}
        placeholder="Sexo *"
        value={sexo}
        onChangeText={setSexo}
      />

      <TextInput
        style={styles.input}
        placeholder="Edad *"
        value={edad}
        onChangeText={setEdad}
        keyboardType="numeric"
      />

      <Text style={styles.seccion}>Información Adicional (Opcional)</Text>

      <TextInput
        style={styles.input}
        placeholder="Color"
        value={color}
        onChangeText={setColor}
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Características particulares"
        value={caracteristicas}
        onChangeText={setCaracteristicas}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="ID del GPS (opcional)"
        value={gpsId}
        onChangeText={setGpsId}
        keyboardType="numeric"
      />

      <Pressable style={styles.botonImagen} onPress={seleccionarImagen}>
        <Text style={styles.botonImagenTexto}>
          {imagen ? "Cambiar imagen" : "Seleccionar imagen"}
        </Text>
      </Pressable>

      {imagen && <Image source={{ uri: imagen.uri }} style={styles.imagen} />}

      {loading ? (
        <ActivityIndicator size="large" color={Colores.primario} />
      ) : (
        <Pressable
          style={[styles.boton, (!nombre || !raza || !especie || !sexo || !edad) && styles.botonDisabled]}
          onPress={registrarMascota}
          disabled={!nombre || !raza || !especie || !sexo || !edad}
        >
          <Text style={styles.botonTexto}>Registrar Mascota</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colores.fondoClaro,
    paddingBottom: 40,
  },
  seccion: {
    fontSize: 16,
    fontWeight: '600',
    color: Colores.primario,
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 5,
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 12,
    borderRadius: 8,
    borderColor: Colores.neutro,
    borderWidth: 1,
  },
  imagen: {
    width: 150,
    height: 150,
    marginVertical: 15,
    alignSelf: 'center',
    borderRadius: 8,
  },
  boton: {
    backgroundColor: Colores.boton,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  botonDisabled: {
    backgroundColor: Colores.neutro,
    opacity: 0.6,
  },
  botonTexto: {
    color: Colores.botonTexto,
    fontWeight: 'bold',
    fontSize: 16,
  },
  botonImagen: {
    backgroundColor: Colores.primario,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  botonImagenTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
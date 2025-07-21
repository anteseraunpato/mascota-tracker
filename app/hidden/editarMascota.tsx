import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable, Alert, Image, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Colores } from '@/constants/colores';
import { useCustomHeaderConfig } from '@/hooks/useCustomHeader';

const API_URL = 'http://192.168.0.40:3000/mascotas';

interface MascotaParams {
  id?: string;
  nombre?: string;
  raza?: string;
  edad?: string;
  especie?: string;
  color?: string;
  sexo?: string;
  caracteristicas?: string;
  senasParticulares?: string;
  gpsId?: string;
  picture?: string;
  fotoUrl?: string;
}

export default function EditarMascota() {
  const params = useLocalSearchParams() as MascotaParams;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [imagen, setImagen] = useState<{ uri: string } | null>(null);

  const mascotaId = params.id ? Number(params.id) : null;

  const [formData, setFormData] = useState({
    nombre: params.nombre?.toString() || '',
    raza: params.raza?.toString() || '',
    edad: params.edad?.toString() || '',
    especie: params.especie?.toString() || '',
    color: params.color?.toString() || '',
    sexo: params.sexo?.toString() || '',
    caracteristicas: params.caracteristicas?.toString() || '', // Solo caracteristicas
    gpsId: params.gpsId?.toString() || '',
    picture: params.picture?.toString() || params.fotoUrl?.toString() || ''
  });

  useCustomHeaderConfig({
    title: "Editar detalles de mascota",
  });

  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);
      try {
        if (!mascotaId) {
          throw new Error('ID de mascota no válido');
        }

        const response = await fetch(`${API_URL}/${mascotaId}`);
        if (!response.ok) throw new Error('Mascota no encontrada');

        const data = await response.json();
        setFormData({
          ...data,
          gpsId: data.gpsId?.toString() || '',
          edad: data.edad?.toString() || '',
          caracteristicas: data.caracteristicas || data.senasParticulares || ''
        });

        if (data.picture) {
          setImagen({ uri: data.picture });
        }
      } catch (error) {
        Alert.alert('Error', error.message || 'No se pudieron cargar los datos');
        router.back();
      } finally {
        setLoading(false);
      }
    };

    if (mascotaId) cargarDatos();
  }, [mascotaId]);

  const handleSeleccionarImagen = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso requerido', 'Necesitamos acceso a tus fotos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Cambiado a 'mediaTypes'
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImagen(result.assets[0]);
    }
  };

  const handleActualizar = async () => {
    if (!formData.nombre || !formData.raza || !formData.edad || !formData.especie || !formData.sexo) {
      Alert.alert('Error', 'Por favor completa todos los campos requeridos');
      return;
    }

    if (!mascotaId) {
      Alert.alert('Error', 'ID de mascota no válido');
      return;
    }

    setUpdating(true);

    try {
      const datosActualizados = {
        nombre: formData.nombre,
        raza: formData.raza,
        edad: Number(formData.edad),
        especie: formData.especie,
        sexo: formData.sexo,
        color: formData.color || null,
        caracteristicas: formData.caracteristicas || null, // Solo caracteristicas
        gpsId: formData.gpsId.trim() === '' ? null : formData.gpsId
      };

      if (imagen) {
        if (!imagen.uri.startsWith('http')) {
          const formDataCloudinary = new FormData();
          formDataCloudinary.append('picture', {
            uri: imagen.uri,
            name: `mascota_${Date.now()}.jpg`,
            type: 'image/jpeg',
          } as any);

          const uploadResponse = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            body: formDataCloudinary,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          if (!uploadResponse.ok) throw new Error('Error al subir imagen');

          const { secure_url } = await uploadResponse.json();
          datosActualizados.picture = secure_url;
        } else {
          datosActualizados.picture = imagen.uri;
        }
      } else if (formData.picture) {
        datosActualizados.picture = formData.picture;
      }

      const response = await fetch(`${API_URL}/${mascotaId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosActualizados),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Error al actualizar');
      }

      Alert.alert('Éxito', 'Mascota actualizada correctamente');
      router.back();
    } catch (error) {
      Alert.alert('Error', error.message || 'Error al actualizar');
    } finally {
      setUpdating(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <View style={styles.cargandoContainer}>
        <ActivityIndicator size="large" color={Colores.primario} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <Input
        label="Nombre *"
        value={formData.nombre}
        onChangeText={(text) => handleChange('nombre', text)}
      />
      <Input
        label="Raza *"
        value={formData.raza}
        onChangeText={(text) => handleChange('raza', text)}
      />
      <Input
        label="Edad *"
        value={formData.edad}
        onChangeText={(text) => {
          if (/^\d*$/.test(text)) {
            handleChange('edad', text);
          }
        }}
        keyboardType="numeric"
      />
      <Input
        label="Especie *"
        value={formData.especie}
        onChangeText={(text) => handleChange('especie', text)}
      />
      <Input
        label="Sexo *"
        value={formData.sexo}
        onChangeText={(text) => handleChange('sexo', text)}
      />
      <Input
        label="Color"
        value={formData.color}
        onChangeText={(text) => handleChange('color', text)}
        placeholder="Opcional"
      />
      <Input
        label="Características"
        value={formData.caracteristicas}
        onChangeText={(text) => handleChange('caracteristicas', text)}
        multiline
        placeholder="Opcional"
      />
      <Input
        label="ID GPS"
        value={formData.gpsId}
        onChangeText={(text) => handleChange('gpsId', text)}
        placeholder="Opcional - dejar vacío si no tiene"
      />

      <Pressable style={styles.botonImagen} onPress={handleSeleccionarImagen}>
        <Text style={styles.botonImagenTexto}>
          {imagen ? "Cambiar imagen" : "Seleccionar imagen"}
        </Text>
      </Pressable>

      {(imagen || formData.picture) && (
        <Image
          source={{ uri: imagen?.uri || formData.picture }}
          style={styles.imagen}
        />
      )}

      <Pressable
        style={[styles.botonGuardar, updating && styles.botonDisabled]}
        onPress={handleActualizar}
        disabled={updating}
      >
        {updating ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.botonTexto}>Guardar Cambios</Text>
        )}
      </Pressable>
    </ScrollView>
  );
}

function Input({ label, value, onChangeText, keyboardType = 'default', multiline = false, placeholder }: any) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, multiline && { height: 100, textAlignVertical: 'top' }]}
        placeholder={placeholder || label}
        keyboardType={keyboardType}
        multiline={multiline}
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
    paddingBottom: 40,
  },
  cargandoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderColor: Colores.terciario,
    borderWidth: 1,
  },
  imagen: {
    width: 150,
    height: 150,
    marginVertical: 15,
    alignSelf: 'center',
    borderRadius: 8,
  },
  botonGuardar: {
    backgroundColor: Colores.primario,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  botonDisabled: {
    opacity: 0.7,
  },
  botonTexto: {
    color: '#fff',
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
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colores } from '@/constants/colores';
import React from 'react';
import { useRouter } from 'expo-router';

interface Props {
  mascota: {
    nombre: string;
    raza: string;
    edad: number;
    especie?: string;
    color?: string;
    sexo?: string;
    fechaNacimiento?: string;
    senasParticulares?: string;
    microchipId?: string;
    fotoUrl?: string;
  };
  index: number;
}

export default function MascotaCard({ mascota, index }: Props) {
  const router = useRouter();
  const fondo = coloresAlternos[index % coloresAlternos.length];

  const verUbicacion = () => {
    router.push({
      pathname: '/hidden/ubicacion',
      params: {
        ...mascota,
      },
    });
  };

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: fondo }]}
      onPress={verUbicacion}
      accessibilityRole="button"
    >
      <ImageBackground
        source={
          mascota.fotoUrl
            ? { uri: mascota.fotoUrl }
            : require('@/assets/images/perrito.png')
        }
        style={styles.imagen}
        imageStyle={styles.imagenRecorte}
      >
        <LinearGradient
          colors={['transparent', fondo]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.degradado}
        />
      </ImageBackground>

      <View style={styles.info}>
        <Text style={styles.nombre}>{mascota.nombre}</Text>
        <Text style={styles.raza}>🐾 {mascota.raza}</Text>
        <Text style={styles.detalle}>🎂 {mascota.edad} años · {mascota.especie}</Text>
      </View>
    </TouchableOpacity>
  );
}

const coloresAlternos = ['#FFE0B2', '#C8E6C9', '#BBDEFB'];

const styles = StyleSheet.create({
  card: {
    height: 170,
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    elevation: 4,
    marginBottom: 2,
    shadowColor: Colores.texto,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  imagen: {
    width: 160,
    height: '100%',
    justifyContent: 'flex-end',
  },
  imagenRecorte: {
    resizeMode: 'cover',
  },
  degradado: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  info: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colores.texto,
    marginBottom: 4,
  },
  raza: {
    fontSize: 16,
    color: Colores.texto,
  },
  detalle: {
    fontSize: 14,
    color: Colores.texto,
    marginTop: 4,
  },
});

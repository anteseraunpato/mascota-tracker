import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Pressable, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useLocalSearchParams, router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colores } from '@/constants/colores';
import { useCustomHeaderConfig } from '@/hooks/useCustomHeader';

const { width, height } = Dimensions.get('window');

export default function Ubicacion() {
  const params = useLocalSearchParams();

  // Verificar que tenemos todos los parámetros necesarios
  if (!params.id) {
    Alert.alert('Error', 'No se encontró el ID de la mascota');
    router.back();
    return null;
  }

  const {
    id,
    nombre,
    raza,
    especie,
    edad,
    color,
    sexo,
    fechaNacimiento,
    caracteristicas,
    gpsId,
    picture,
  } = params;

  const LATITUDE = 20.9364;
  const LONGITUDE = -89.0423;

  useCustomHeaderConfig({
    title: "Ubicación de mi mascota",
  });

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude: LATITUDE, longitude: LONGITUDE }}
          title={nombre as string}
          description={raza as string}
        />
      </MapView>

      {/* Contenedor superior con imagen y nombre */}
      <View style={styles.headerOverlay}>
        {picture ? (
          <Image source={{ uri: picture as string }} style={styles.avatar} />
        ) : (
          <MaterialCommunityIcons name="dog" size={48} color="#888" />
        )}
        <Text style={styles.nombre}>{nombre}</Text>

        <View>
          <Pressable
            style={styles.detallesBoton}
            onPress={() =>
              router.push({
                pathname: '/hidden/detalles',
                params: {
                  id: id as string,
                  nombre: nombre as string,
                  raza: raza as string,
                  edad: edad as string,
                  especie: especie as string,
                  color: color as string,
                  sexo: sexo as string,
                  fechaNacimiento: fechaNacimiento as string,
                  caracteristicas: caracteristicas as string, // Solo caracteristicas
                  gpsId: gpsId as string,
                  picture: picture as string,
                },
              })
            }
          >
            <Text style={styles.detallesTexto}>Ver detalles</Text>
          </Pressable>
        </View>
      </View>

      {/* Card con información básica */}
      <View style={styles.infoCard}>
        <InfoRow label="Especie" value={especie} iconName="paw" />
        <InfoRow label="Raza" value={raza} iconName="dog-side" />
        <InfoRow label="Sexo" value={sexo} iconName="gender-male-female" />
        <InfoRow label="Color" value={color} iconName="palette" />
        <InfoRow label="caracteristicas" value={caracteristicas} iconName="note-text" />
      </View>
    </View>
  );
}

function InfoRow({
  label,
  value,
  iconName,
}: {
  label: string;
  value?: string | number;
  iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
}) {
  if (!value) return null;
  return (
    <View style={styles.infoRow}>
      <MaterialCommunityIcons name={iconName} size={20} color="#666" style={{ marginRight: 8 }} />
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerOverlay: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 16,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    elevation: 4,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ccc',
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    maxWidth: 160,
  },
  infoCard: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 6,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontWeight: '700',
    color: Colores.texto,
    marginRight: 4,
  },
  detallesBoton: {
    marginTop: 4,
    backgroundColor: Colores.primario,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  detallesTexto: {
    color: 'white',
    fontWeight: '600',
    fontSize: 13,
  },
  value: {
    color: '#222',
  },
});

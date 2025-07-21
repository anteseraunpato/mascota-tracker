import { Colores } from '@/constants/colores';
import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

type Ubicacion = {
  latitude: number;
  longitude: number;
  status: string;
  googleMapsUrl: string;
  timestamp: string;
};

interface Props {
  ubicacion: Ubicacion;
}

export default function UbicacionInfo({ ubicacion }: Props) {
  const formatearFecha = (fechaISO: string) => {
    const fecha = new Date(fechaISO);
    return `${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTitulo}>Ubicación de tu mascota</Text>

      <View style={styles.infoContainer}>
        <Image
          source={require('@/assets/images/perrito.png')}
          style={styles.foto}
        />
        
        <View style={styles.infoTexto}>
          <Text style={styles.nombre}>Cheemcito</Text>
          <Text style={styles.estado}>Estado: {ubicacion.status}</Text>
          <Text style={styles.fecha}>Última actualización: {formatearFecha(ubicacion.timestamp)}</Text>
        </View>
      </View>

      <MapView
        style={styles.mapa}
        initialRegion={{
          latitude: ubicacion.latitude,
          longitude: ubicacion.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: ubicacion.latitude,
            longitude: ubicacion.longitude,
          }}
          title="Ubicación actual"
          description={ubicacion.status}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colores.fondoClaro,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  textTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colores.primario,
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colores.secundario,
    padding: 20,
    borderRadius: 25,
    marginBottom: 15,
    width: '90%',
  },
  foto: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  infoTexto: {
    flex: 1,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colores.primario,
  },
  estado: {
    color: Colores.texto,
    marginTop: 4,
  },
  fecha: {
    color: Colores.neutro,
    marginTop: 2,
    fontSize: 12,
  },
  mapa: {
    width: Dimensions.get('window').width * 1,
    height: Dimensions.get('window').height * 0.7,
    borderRadius: 10,
  },
});

import { View, Text, FlatList, Pressable, StyleSheet, BackHandler, Alert, ActivityIndicator } from 'react-native';
import MascotaCard from '@/components/MascotaCard';
import { router, useFocusEffect, useNavigation } from 'expo-router';
import { Colores } from '@/constants/colores';
import { useCallback, useEffect, useState } from 'react';
import { useCustomHeaderConfig } from '@/hooks/useCustomHeader';

type Mascota = {
  id: number;
  nombre: string;
  raza: string;
  color: string;
  caracteristicas: string;
  especie: string;
  sexo: string;
  gpsId?: number;
  edad: number;
  picture?: string;
  fechaNacimiento?: string;
  senasParticulares?: string;
  microchipId?: string;
};

const API_URL = 'http://192.168.0.40:3000/mascotas'; // Asegúrate que esta IP sea la correcta

export default function MascotasScreen() {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const fetchMascotas = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Error al obtener mascotas');
      const data = await res.json();
      setMascotas(data);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'No se pudieron cargar las mascotas');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchMascotas();
  };

  useEffect(() => {
    fetchMascotas();
  }, []);

  useCustomHeaderConfig({
    title: "Mis mascotas",
  });

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert('Salir de la app', '¿Estás seguro de que quieres salir?', [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Salir', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      const unsubscribe = navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();
        onBackPress();
      });

      return () => {
        backHandler.remove();
        unsubscribe();
      };
    }, [navigation])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.subtitulo}>
        Presiona una tarjeta para ver la ubicación y los detalles de tu mascota.
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color={Colores.primario} style={styles.cargando} />
      ) : (
        <FlatList
          data={mascotas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <MascotaCard 
              mascota={{ 
                ...item,
                fotoUrl: item.picture,
                senasParticulares: item.caracteristicas
              }} 
              index={index} 
            />
          )}
          contentContainerStyle={styles.lista}
          ListEmptyComponent={
            <Text style={styles.sinMascotas}>No hay mascotas registradas</Text>
          }
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}

      <View style={styles.botonContenedor}>
        <Pressable 
          style={styles.boton} 
          onPress={() => router.push('/hidden/registrar')}
          android_ripple={{ color: Colores.primario }}
        >
          <Text style={styles.botonTexto}>Agregar nueva mascota</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colores.fondoClaro,
    paddingHorizontal: 8,
    paddingTop: 16,
    paddingBottom: 30,
  },
  subtitulo: {
    marginHorizontal: 16,
    marginBottom: 12,
    fontSize: 16,
    color: Colores.textoSecundario,
  },
  lista: {
    gap: 16,
    paddingBottom: 40,
  },
  botonContenedor: {
    marginTop: 10,
    alignItems: 'center',
  },
  boton: {
    backgroundColor: Colores.boton,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    elevation: 3,
  },
  botonTexto: {
    color: Colores.botonTexto,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cargando: {
    flex: 1,
    justifyContent: 'center',
  },
  sinMascotas: {
    textAlign: 'center',
    marginTop: 20,
    color: Colores.textoSecundario,
    fontSize: 16,
  },
});
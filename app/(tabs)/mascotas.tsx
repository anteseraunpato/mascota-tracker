import { View, Text, FlatList, Pressable, StyleSheet,BackHandler, Alert } from 'react-native';
import MascotaCard from '@/components/MascotaCard';
import { router, useFocusEffect, useNavigation  } from 'expo-router';
import { Colores } from '@/constants/colores';
import { useCustomHeaderConfig } from "@/hooks/useCustomHeader";
import { useCallback } from 'react';

export default function MascotasScreen() {
  const mascotas = [
    {
      id: '1',
      nombre: 'Firulais',
      raza: 'Labrador',
      edad: 3,
      especie: 'Perro',
      color: 'Dorado',
      sexo: 'Macho',
      fechaNacimiento: '05/12/2021',
      senasParticulares: 'Mancha en la pata',
      microchipId: '123456789',
      fotoUrl: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6',
    },
    {
      id: '2',
      nombre: 'Michi',
      raza: 'Gato Persa',
      edad: 2,
      especie: 'Gato',
      color: 'Blanco',
      sexo: 'Hembra',
      fechaNacimiento: '2022-01-20',
      senasParticulares: 'Ojo izquierdo con mancha',
      microchipId: '987654321',
      fotoUrl: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5',
    },
    {
      id: '3',
      nombre: 'Terry',
      raza: 'Tortuga',
      edad: 2,
      especie: 'Tortuga',
      color: 'Verde y amarilla',
      sexo: 'Hembra',
      fechaNacimiento: '14/08/2023',
      senasParticulares: 'Patrones en forma de hexágonos y triángulos en su caparazón',
      microchipId: '987654321',
      fotoUrl: 'https://images.unsplash.com/photo-1585696862208-ca12defa3a78',
    },
    {
      id: '4',
      nombre: 'Nemo',
      raza: 'Pez payaso',
      edad: 1,
      especie: 'Pez',
      color: 'Naranja',
      sexo: 'Macho',
      fechaNacimiento: '05/01/2024',
      senasParticulares: 'Aletita lastimada',
      microchipId: '123456789',
      fotoUrl: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f',
    },
  ];

  const navigation = useNavigation();

  useCustomHeaderConfig({
  title: "Mis mascotas",
});

useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert('Salir de la app', 'Estás a punto de salir de la app. Presiona Salir para confirmar o Cancelar para seguir usandola', [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Salir', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      // Escucha el botón físico
      const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);


      // Bloquear el gesto de swipe back (solo si estás usando Stack)
      const unsubscribe = navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();
        onBackPress();
      });

      return () => {
  backHandler.remove(); // ✅ remover correctamente
  unsubscribe();        // ✅ para evitar memory leaks
};
    }, [navigation])
  );

  return (
    <View style={styles.container}>

      <Text style={{ marginHorizontal: 16, marginBottom: 12, fontSize: 16, color: "#666" }}>
  Presiona una tarjeta para ver la ubicación y los detalles de tu mascota.
</Text>

      <FlatList
        data={mascotas}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <MascotaCard mascota={item} index={index} />
        )}
        contentContainerStyle={styles.lista}
      />

      <View style={styles.botonContenedor}>
        <Pressable style={styles.boton} onPress={() => router.push('/hidden/registrar')}>
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
  },
  botonTexto: {
    color: Colores.botonTexto,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import MascotaCard from '@/components/MascotaCard';
import { router } from 'expo-router';
import { Colores } from '@/constants/colores';

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
  // Más mascotas...
];

  return (
    <View style={styles.container}>
      <FlatList
        data={mascotas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MascotaCard mascota={item} />}
        contentContainerStyle={styles.lista}
      />

      <View style={styles.botonContenedor}>
        <Pressable style={styles.boton} onPress={() => router.push('/registrar')}>
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
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colores.texto,
    marginBottom: 20,
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
    width: 'auto',
  },
});

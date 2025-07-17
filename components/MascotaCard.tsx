import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Colores } from '@/constants/colores';
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
}

export default function MascotaCard({ mascota }: Props) {
  const router = useRouter();

  const verUbicacion = () => {
    router.push({
      pathname: '/(tabs)/hidden/ubicacion',
      params: {
        ...mascota,
      },
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={verUbicacion} accessibilityRole="button">
      <Image
        source={mascota.fotoUrl ? { uri: mascota.fotoUrl } : require('@/assets/images/perrito.png')}
        style={styles.foto}
      />
      <View style={styles.info}>
        <Text style={styles.nombre}>{mascota.nombre}</Text>
        <Text style={styles.detalle}>🐾 Raza: {mascota.raza}</Text>
        <Text style={styles.detalle}>🎂 Edad: {mascota.edad} años</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colores.fondoSeccion,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 2,
  },
  foto: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
    borderWidth: 2,
    borderColor: Colores.primario,
    backgroundColor: Colores.fondoClaro,
  },
  info: {
    flex: 1,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colores.texto,
    marginBottom: 4,
  },
  detalle: {
    fontSize: 14,
    color: Colores.texto,
  },
});

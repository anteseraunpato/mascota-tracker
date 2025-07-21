import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colores } from '@/constants/colores';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRef } from 'react';
import { useCustomHeaderConfig } from '@/hooks/useCustomHeader';

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 450;

export default function DetallesMascota() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;

  useCustomHeaderConfig({
    title: `Información de ${params.nombre || 'mascota'}`,
  });
  

  const picture = typeof params.picture === 'string' ? params.picture : undefined;
  const imagenMascota = picture?.startsWith('http')
    ? { uri: picture }
    : require('@/assets/images/perrito.png');

  return (
    <View style={styles.container}>
      <Animated.Image
        source={imagenMascota}
        style={styles.imageBackground}
        resizeMode="cover"
      />

      <LinearGradient
        colors={['transparent', Colores.texto]}
        style={styles.gradient}
      />

      <Animated.ScrollView
        style={styles.scroll}
        scrollEventThrottle={8}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.basicInfoRow}>
          <InfoLinea icon="dog" value={params.nombre as string} />
          <InfoLinea icon="gender-male-female" value={params.sexo as string} />
          <InfoLinea icon="calendar" value={params.fechaNacimiento as string} />
        </View>

        <View style={styles.card}>
          <Info label="Edad" value={`${params.edad} años`} />
          <Info label="Raza" value={params.raza as string} />
          <Info label="Especie" value={params.especie as string} />
          <Info label="Color" value={params.color as string} />
          <Info label="Señas particulares" value={params.senasParticulares as string} />
          <Info label="Microchip ID" value={params.gpsId as string} />

          <View style={styles.botonesContainer}>
            <Pressable
              style={styles.boton}
              onPress={() =>
                router.push({
                  pathname: '/hidden/editarMascota',
                  params: {
                    id: params.id as string,
                    nombre: params.nombre as string,
                    raza: params.raza as string,
                    edad: params.edad as string,
                    especie: params.especie as string,
                    color: params.color as string,
                    sexo: params.sexo as string,
                    fechaNacimiento: params.fechaNacimiento as string,
                    gpsId: params.gpsId as string,
                    picture: params.picture as string,
                    caracteristicas: params.caracteristicas as string,
                  },
                })
              }
            >
              <Text style={styles.botonTexto}>Editar información</Text>
            </Pressable>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

function InfoLinea({ icon, value }: { icon: string; value?: string }) {
  if (!value) return null;
  return (
    <View style={styles.infoLinea}>
      <MaterialCommunityIcons name={icon} size={20} color="#fff" style={styles.iconoLinea} />
      <Text style={styles.textoLinea}>{value}</Text>
    </View>
  );
}

function Info({ label, value }: { label: string; value?: string }) {
  if (!value) return null;

  const iconMap: Record<string, string> = {
    Edad: 'calendar-clock',
    Raza: 'dog-side',
    Especie: 'paw',
    Color: 'palette',
    Sexo: 'gender-male-female',
    Nacimiento: 'calendar',
    'Señas particulares': 'magnify',
    'Microchip ID': 'barcode-scan',
  };

  const iconName = iconMap[label] || 'information-outline';

  return (
    <View style={styles.infoItem}>
      <View style={styles.infoRow}>
        <MaterialCommunityIcons
          name={iconName}
          size={20}
          color={Colores.primario}
          style={styles.infoIcon}
        />
        <Text style={styles.infoLabel}>{label}</Text>
      </View>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colores.fondoClaro,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: HEADER_HEIGHT + 40,
  },
  imageBackground: {
    position: 'absolute',
    width: width,
    height: "100%",
    top: -200,
    left: 0,
    zIndex: 0,
    backgroundColor: Colores.fondoClaro,
  },
  gradient: {
    position: 'absolute',
    top: 10,
    left: 0,
    height: "100%",
    width: width,
    zIndex: 0,
  },
  basicInfoRow: {
    backgroundColor: Colores.texto,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginBottom: 6,
  },
  infoLinea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  iconoLinea: {
    marginRight: 8,
  },
  textoLinea: {
    color: Colores.fondoClaro,
    fontSize: 18,
    fontWeight: 'bold',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  card: {
    backgroundColor: Colores.fondoClaro,
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 24,
    zIndex: 1,
  },
  infoItem: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoIcon: {
    marginRight: 8,
  },
  infoLabel: {
    fontWeight: '800',
    fontSize: 15,
    color: Colores.texto,
  },
  infoValue: {
    fontSize: 16,
    color: Colores.texto,
    paddingLeft: 28,
  },
  botonesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    marginTop: 12,
  },
  boton: {
    backgroundColor: Colores.primario,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    minWidth: 140,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  botonTexto: {
    color: Colores.botonTexto,
    fontWeight: '600',
    fontSize: 15,
  },
});
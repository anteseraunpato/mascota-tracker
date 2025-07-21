import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Dimensions,
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
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;

  const {
    nombre,
    raza,
    edad,
    especie,
    color,
    sexo,
    fechaNacimiento,
    senasParticulares,
    microchipId,
    fotoUrl,
  } = useLocalSearchParams();

  const imagenMascota = fotoUrl?.startsWith('http') ? { uri: fotoUrl } : require('@/assets/images/perrito.png');

          useCustomHeaderConfig({
          title: `informacion de ${nombre}`,
        });

  return (
    <View style={styles.container}>
      {/* Imagen fija arriba */}
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
          <InfoLinea icon="dog" value={nombre} />
          <InfoLinea icon="gender-male-female" value={sexo} />
          <InfoLinea icon="calendar" value={fechaNacimiento} />
        </View>

        <View style={styles.card}>
          <Info label="Edad" value={`${edad} años`} />
          <Info label="Raza" value={raza} />
          <Info label="Especie" value={especie} />
          <Info label="Color" value={color} />
          <Info label="Señas particulares" value={senasParticulares} />
          <Info label="Microchip ID" value={microchipId} />

          <View style={styles.botonesContainer}>
            <Pressable
              style={styles.boton}
              onPress={() =>
                router.push({
                  pathname: '/hidden/editarMascota',
                  params: {
                    nombre,
                    raza,
                    edad,
                    especie,
                    color,
                    sexo,
                    fechaNacimiento,
                    senasParticulares,
                    microchipId,
                    fotoUrl,
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
    paddingTop: HEADER_HEIGHT + 40,  // evitar solapar imagen
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
  botonSecundario: {
    backgroundColor: Colores.secundario,
  },
  botonTexto: {
    color: Colores.botonTexto,
    fontWeight: '600',
    fontSize: 15,
  },
});
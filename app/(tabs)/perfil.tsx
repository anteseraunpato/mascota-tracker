import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import { Colores } from '@/constants/colores';
import { useRouter } from 'expo-router';

export default function PerfilScreen() {
  const router = useRouter();

  const usuario = {
    nombre: 'Jahir Medina',
    email: 'jahir@example.com',
    telefono: '55-1234-5678',
    direccion: 'Izamal, México',
    mascotas: 2,
    foto: 'https://scontent.fmid1-3.fna.fbcdn.net/v/t39.30808-6/456240492_518249367265752_6463164286351966557_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHxeBf_rWXQkhPlDqHGbGp6neMfYgThKs2d4x9iBOEqzUTs_2QIMDjcwPaH3dInqyguiWzGQPGtGRV-O6W8fk99&_nc_ohc=L2U9wY84FQYQ7kNvwFlNB7D&_nc_oc=AdlEf4x9vzKirWQm5um-NxAA6UnpWUT4x9dPkvRyBR4gr28EIGquyPpuka-sEaXX5Oo&_nc_zt=23&_nc_ht=scontent.fmid1-3.fna&_nc_gid=18BXkQFIlxb02hlp9ZauFA&oh=00_AfSmmIH1ybqdRYFPnbm9cTy7PmKxWt2odYQIV-UAkY0Wsg&oe=687E5FE3',
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      {/* Foto de perfil */}
      <View style={styles.fotoContainer}>
        <Image source={{ uri: usuario.foto }} style={styles.foto} />
        <Text style={styles.nombre}>{usuario.nombre}</Text>
      </View>

      {/* Información del usuario */}
      <View style={styles.infoSection}>
        <Text style={styles.label}>Correo</Text>
        <Text style={styles.info}>{usuario.email}</Text>

        <Text style={styles.label}>Teléfono</Text>
        <Text style={styles.info}>{usuario.telefono}</Text>

        <Text style={styles.label}>Dirección</Text>
        <Text style={styles.info}>{usuario.direccion}</Text>

        <Text style={styles.label}>Mascotas registradas</Text>
        <Text style={styles.info}>{usuario.mascotas}</Text>
      </View>

      {/* Acciones */}
      <View style={styles.botonesContainer}>
        <Pressable style={styles.boton} onPress={() => router.push('/cambiarContrasena')}>
          <Text style={styles.botonTexto}>Cambiar contraseña</Text>
        </Pressable>

        <Pressable style={[styles.boton, styles.botonSecundario]} onPress={() => {/* cerrar sesión */}}>
          <Text style={[styles.botonTexto, styles.textoSecundario]}>Cerrar sesión</Text>
        </Pressable>

        <Text style={styles.desactivarTexto}>Eliminar mi cuenta</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: Colores.fondoClaro,
  },
  container: {
    padding: 24,
    paddingBottom: 40,
  },
  fotoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  foto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: Colores.boton,
  },
  nombre: {
    fontSize: 22,
    fontWeight: '600',
    color: Colores.texto,
  },
  infoSection: {
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    color: Colores.textoSecundario,
    marginTop: 12,
  },
  info: {
    fontSize: 16,
    color: Colores.texto,
  },
  botonesContainer: {
    gap: 12,
  },
  boton: {
    backgroundColor: Colores.boton,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  botonSecundario: {
    backgroundColor: Colores.card,
    borderWidth: 1,
    borderColor: Colores.boton,
  },
  botonTexto: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  textoSecundario: {
    color: Colores.boton,
  },
  desactivarTexto: {
    marginTop: 20,
    fontSize: 13,
    textAlign: 'center',
    color: 'gray',
    textDecorationLine: 'underline',
  },
});

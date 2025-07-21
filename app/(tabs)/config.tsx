import { View, Text, StyleSheet } from 'react-native';
import { Colores } from '@/constants/colores';
import { useCustomHeaderConfig } from '@/hooks/useCustomHeader';

export default function ConfiguracionScreen() {

          useCustomHeaderConfig({
          title: "Ajustes",
        });

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Pantalla de Configuración</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colores.fondoClaro },
  texto: { fontSize: 20, color: Colores.texto },
});

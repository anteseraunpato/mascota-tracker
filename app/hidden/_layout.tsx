// app/hidden/_layout.tsx
import { Stack } from 'expo-router';
import { Colores } from '@/constants/colores';
import { StatusBar } from 'react-native';

export default function HiddenLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colores.fondoClaro} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colores.fondoClaro,
          },
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 18,
          },
          headerShadowVisible: false,
          headerTintColor: Colores.texto,
          contentStyle: {
            backgroundColor: Colores.fondoClaro,
          },
        }}
      />
    </>
  );
}

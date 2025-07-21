// app/index.tsx
import { useEffect } from 'react';
import { router } from 'expo-router';

export default function Index() {
  useEffect(() => {
    router.replace('/(tabs)/mascotas'); // Cambia esto a la pantalla que quieras mostrar primero
  }, []);

  return null;
}

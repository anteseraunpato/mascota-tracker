import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Colores } from '@/constants/colores';
import { Stack } from 'expo-router';






export default function TabLayout() {

  return (
    <>
      <StatusBar style="auto" />
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: Colores.primario,
          },
          headerTintColor: Colores.texto,
          tabBarActiveTintColor: Colores.secundario,
          tabBarInactiveTintColor: Colores.terciario,
          tabBarStyle: {
            backgroundColor: Colores.texto,
            borderTopColor: Colores.neutro,
          },
        }}
      >
        <Tabs.Screen
          name="(tabs)/mascotas"
          options={{
            title: 'Inicio',
            tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="(tabs)/ubicacion"
          options={{
            title: 'Ubicación',
            tabBarIcon: ({ color, size }) => <Feather name="location-outline" color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="(tabs)/perfil"
          options={{
            title: 'Perfil',
            tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="(tabs)/configuracion"
          options={{
            title: 'Configuración',
            tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" color={color} size={size} />,
          }}
        />
      </Tabs>
    </>
  );
}

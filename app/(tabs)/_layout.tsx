import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Image, StatusBar } from 'react-native';
import { Colores } from '@/constants/colores';

const imagenPerfil = 'https://scontent.fmid1-3.fna.fbcdn.net/v/t39.30808-6/456240492_518249367265752_6463164286351966557_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHxeBf_rWXQkhPlDqHGbGp6neMfYgThKs2d4x9iBOEqzUTs_2QIMDjcwPaH3dInqyguiWzGQPGtGRV-O6W8fk99&_nc_ohc=L2U9wY84FQYQ7kNvwFlNB7D&_nc_oc=AdlEf4x9vzKirWQm5um-NxAA6UnpWUT4x9dPkvRyBR4gr28EIGquyPpuka-sEaXX5Oo&_nc_zt=23&_nc_ht=scontent.fmid1-3.fna&_nc_gid=18BXkQFIlxb02hlp9ZauFA&oh=00_AfSmmIH1ybqdRYFPnbm9cTy7PmKxWt2odYQIV-UAkY0Wsg&oe=687E5FE3';

export default function TabsLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colores.fondoClaro} />
      <Tabs
        screenOptions={({ route }: { route: { name: string } }) => ({
          headerStyle: {
            backgroundColor: Colores.fondoClaro,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 21,
          },
          headerShadowVisible: false,
          headerTintColor: Colores.texto,
          tabBarActiveTintColor: Colores.primario,
          tabBarInactiveTintColor: Colores.texto,
          tabBarStyle: {
            backgroundColor: Colores.fondoClaro,
            borderColor: Colores.fondoClaro,
          },
          tabBarIcon: ({ color, size }: { color: string; size: number }) => {
            let iconName: keyof typeof MaterialIcons.glyphMap = 'settings';

            switch (route.name) {
              case 'perfil':
                iconName = 'person';
                break;
              case 'mascotas':
                iconName = 'pets';
                break;
              case 'config':
                iconName = 'settings';
                break;
            }

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tabs.Screen
          name="mascotas"
          options={{
            title: 'Inicio',
          }}
        />
        <Tabs.Screen
          name="perfil"
          options={{
            title: 'Mi cuenta',
            tabBarIcon: ({ focused }: { focused: boolean }) => (
              <Image
                source={{ uri: imagenPerfil }}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderWidth: focused ? 2 : 0,
                  borderColor: Colores.secundario,
                }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="config"
          options={{
            title: 'Ajustes',
          }}
        />
      </Tabs>
    </>
  );
}

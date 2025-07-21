import { useLayoutEffect, useCallback } from "react";
import { TouchableOpacity, useColorScheme } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Colores } from "@/constants/colores";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

interface Props {
  title: string;
  onBackPress?: () => boolean | void;
}

export const useCustomHeaderConfig = ({ title, onBackPress }: Props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const router = useRouter();
  const colorScheme = useColorScheme();

  const themeIcon = colorScheme === "light" ? Colores.textoSecundario : Colores.texto;

  const handleBack = useCallback(() => {
    if (onBackPress) {
      const shouldBlock = onBackPress();
      if (shouldBlock) return;
    }
    router.back();
  }, [onBackPress, router]);

  const showClearIcon = ["new", "edit", "details"].some((keyword) =>
    route.name?.toLowerCase().includes(keyword)
  );

  const showUnloguinIcon = [
    "security",
    "operations",
    "maintenance",
    "notifications",
    "settings",
    "tour",
    "finding",
  ].some((keyword) => route.name?.toLowerCase().includes(keyword));

  const customBackButtonScreens = ["detalles", "ubicacion", "registrar"];
  const showManualBackButton = customBackButtonScreens.some((keyword) =>
    route.name?.toLowerCase().includes(keyword)
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: title,
      headerTitleAlign: "center",
      headerBackTitle: "Custom Back",
      headerBackTitleStyle: { fontSize: 30 },
      headerTintColor: themeIcon,
      headerLeft: showManualBackButton
        ? () => (
            <TouchableOpacity onPress={handleBack} style={{ marginLeft: 15 }}>
              <Ionicons name="arrow-back" size={24} color={themeIcon} />
            </TouchableOpacity>
          )
        : undefined,
      headerRight: () => {
        if (showClearIcon) {
          return (
            <TouchableOpacity onPress={handleBack} style={{ marginRight: 15 }}>
              <MaterialIcons name="close" size={28} color={themeIcon} />
            </TouchableOpacity>
          );
        }

        return null;
      },
    });
  }, [
    navigation,
    title,
    themeIcon,
    handleBack,
    showClearIcon,
    showUnloguinIcon,
    showManualBackButton,
  ]);
};

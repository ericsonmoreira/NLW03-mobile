import React from "react";
import { Image, StyleSheet, Switch, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

import { Formik } from "formik";
import api from "../../services/api";

interface OrphanageDataRouteProps {
  position: IPosition;
}

interface MyFormValues {
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_week: boolean;
  images: string[];
}

const OrphanageData: React.FC = () => {
  const { navigate } = useNavigation();

  const route = useRoute();

  const params = route.params as OrphanageDataRouteProps;

  const { position } = params;

  const initialValues = {
    name: "",
    about: "",
    latitude: position.latitude,
    longitude: position.longitude,
    instructions: "",
    opening_hours: "",
    open_on_week: false,
    images: new Array<string>(),
  };

  async function handleCreateOrphanage(values: MyFormValues) {
    console.log(values);

    const data = new FormData();
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_week,
      images,
    } = values;

    data.append("name", name);
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));
    data.append("about", about);
    data.append("instructions", instructions);
    data.append("opening_hours", opening_hours);
    data.append("open_on_week", String(open_on_week));
    images.forEach((image, index) => {
      data.append("images", {
        name: `image_${index}.jpg`,
        type: "image/jpg",
        uri: image,
      } as any); // Erro conhecido do React Native que está sendo resolvido.
    });

    await api.post("/orphanages", data);

    navigate('OrphanagesMap');
  }

  async function handleSelectImages(
    values: MyFormValues,
    setFieldValue: Function
  ) {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== "granted") {
      alert("Eita, precisamos de acesso para suar fotos...");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    console.log(result);

    if (result.cancelled) return;

    const { uri: image } = result;

    setFieldValue("images", [...values.images, image]);
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleCreateOrphanage(values)}
    >
      {({ handleChange, values, handleSubmit, handleBlur, setFieldValue }) => (
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ padding: 24 }}
        >
          <Text style={styles.title}>Dados</Text>

          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            value={values.name}
          />

          <Text style={styles.label}>Sobre</Text>
          <TextInput
            style={[styles.input, { height: 110 }]}
            onChangeText={handleChange("about")}
            onBlur={handleBlur("about")}
            value={values.about}
            multiline
          />

          <Text style={styles.label}>Whatsapp</Text>
          <TextInput style={styles.input} />

          <Text style={styles.label}>Fotos</Text>

          <View style={styles.uploadedImagesContainer}>
            {values.images.map((image) => (
              <Image
                key={image}
                source={{ uri: image }}
                style={styles.uploadedImage}
              />
            ))}
          </View>

          <TouchableOpacity
            style={styles.imagesInput}
            onPress={() => handleSelectImages(values, setFieldValue)}
          >
            <Feather name="plus" size={24} color="#15B6D6" />
          </TouchableOpacity>

          <Text style={styles.title}>Visitação</Text>

          <Text style={styles.label}>Instruções</Text>
          <TextInput
            style={[styles.input, { height: 110 }]}
            onChangeText={handleChange("instructions")}
            onBlur={handleBlur("instructions")}
            value={values.instructions}
            multiline
          />

          <Text style={styles.label}>Horario de visitas</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange("opening_hours")}
            onBlur={handleBlur("opening_hours")}
            value={values.opening_hours}
          />

          <View style={styles.switchContainer}>
            <Text style={styles.label}>Atende final de semana?</Text>
            <Switch
              thumbColor="#fff"
              trackColor={{ false: "#ccc", true: "#39CC83" }}
              value={values.open_on_week}
              onValueChange={(value) => setFieldValue("open_on_week", value)}
            />
          </View>

          <RectButton style={styles.nextButton} onPress={() => handleSubmit()}>
            <Text style={styles.nextButtonText}>Cadastrar</Text>
          </RectButton>
        </ScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: "#5c8599",
    fontSize: 24,
    fontFamily: "Nunito_700Bold",
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: "#D3E2E6",
  },
  label: {
    color: "#8fa7b3",
    fontFamily: "Nunito_600SemiBold",
    marginBottom: 8,
  },
  comment: {
    fontSize: 11,
    color: "#8fa7b3",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1.4,
    borderColor: "#d3e2e6",
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: "top",
  },
  imagesInput: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderStyle: "dashed",
    borderColor: "#96D2F0",
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
  },
  nextButton: {
    backgroundColor: "#15c3d6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 56,
    marginTop: 32,
  },
  nextButtonText: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 16,
    color: "#FFF",
  },
  uploadedImagesContainer: {
    flexDirection: "row",
  },
  uploadedImage: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight: 8,
  },
});

export default OrphanageData;

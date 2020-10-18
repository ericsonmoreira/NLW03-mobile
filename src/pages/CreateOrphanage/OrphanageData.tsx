import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { Formik } from "formik";

const CreateOrphanage: React.FC = () => {
  const route = useRoute();

  const initialValues = {
    name: "",
    latitude: 0,
    longitude: 0,
    about: "",
    instructions: "",
    opening_hours: "",
    open_on_week: false,
    images: [],
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
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
            onChangeText={handleChange("")}
            onBlur={handleBlur("about")}
            value={values.about}
            multiline
          />

          <Text style={styles.label}>Whatsapp</Text>
          <TextInput style={styles.input} />

          <Text style={styles.label}>Fotos</Text>
          <TouchableOpacity style={styles.imagesInput} onPress={() => {}}>
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
});

export default CreateOrphanage;

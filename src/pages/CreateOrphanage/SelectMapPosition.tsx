import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import MapView, { Marker, MapEvent } from "react-native-maps";

import mapMarkerImg from "../../images/map-marker.png";

const CreateOrphanage: React.FC = () => {
  const { navigate } = useNavigation();

  const [position, setPosition] = useState<IPosition>({
    latitude: 0,
    longitude: 0,
  });

  function handleNextStep() {
    navigate("OrphanageData", { position });
  }

  function handleSelectMapPosition(event: MapEvent) {
    setPosition(event.nativeEvent.coordinate);
  }

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: -5.2476207,
          longitude: -38.1309404,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}
        onPress={handleSelectMapPosition}
      >
        {position.longitude !== 0 && (
          <Marker icon={mapMarkerImg} coordinate={position} />
        )}
      </MapView>

      {position.longitude !== 0 && (
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },

  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  nextButton: {
    backgroundColor: "#15c3d6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 56,

    position: "absolute",
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 16,
    color: "#FFF",
  },
});

export default CreateOrphanage;

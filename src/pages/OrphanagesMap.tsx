import React, { useState } from "react";

import { StyleSheet, View, Dimensions, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { Feather } from "@expo/vector-icons";

import mapMarker from "../images/map-marker.png";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import api from "../services/api";

const OrphanagesMap: React.FC = () => {
  const { navigate } = useNavigation();

  const [orphanates, setOrphanates] = useState<IOrphanage[]>([]);

  useFocusEffect(() => {
    api.get("/orphanages").then((response) => {
      setOrphanates((old) => [...old, ...response.data]);
    });
  });

  function handleNavigateToOrphanateDetails(id: number) {
    navigate("OrphanageDetails", { id });
  }

  function handleNavigateToCreateOrphanate() {
    navigate("SelectMapPosition");
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -5.2476207,
          longitude: -38.1309404,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        {orphanates.map((orphanate, index) => (
          <Marker
            key={index}
            icon={mapMarker}
            calloutAnchor={{
              x: 2.7,
              y: 0.8,
            }}
            coordinate={{
              latitude: orphanate.latitude,
              longitude: orphanate.longitude,
            }}
          >
            <Callout
              tooltip
              onPress={() => handleNavigateToOrphanateDetails(orphanate.id)}
            >
              <View style={styles.callowtContainer}>
                <Text style={styles.callowtText}>{orphanate.name}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {orphanates.length} orfanato(s) encontrado(s)
        </Text>
        <RectButton
          style={styles.createOrphanateButton}
          onPress={handleNavigateToCreateOrphanate}
        >
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  callowtContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 16,
    justifyContent: "center",
  },
  callowtText: {
    fontFamily: "Nunito_700Bold",
    color: "#0089a5",
    fontSize: 14,
  },
  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 32,
    backgroundColor: "#FFF",
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
  },
  footerText: {
    fontFamily: "Nunito_700Bold",
    color: "#8fa7b3",
  },
  createOrphanateButton: {
    width: 56,
    height: 56,
    backgroundColor: "#15c3d6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrphanagesMap;

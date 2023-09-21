import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function SearchBar({ setCity }) {
  const [serachInput, setSearchInput] = useState("");

  return (
    <View style={{ marginTop: 15, flexDirection: "row" }}>
      <View
        style={{
          backgroundColor: "#eee",
          borderRadius: 50,
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          marginRight: 10,
          padding: 5,
        }}
      >
        <View style={{ marginLeft: 10 }}>
          <Ionicons name="location-sharp" size={24} />
        </View>
        <TextInput
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search..."
          style={{
            backgroundColor: "#eee",
            borderRadius: 20,
            fontWeight: "700",
            margin: 5,
            padding: 5,
            width: "85%",
          }}
        />
        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginRight: 8,
            backgroundColor: "#fff",
            padding: 9,
            borderRadius: 30,
            alignItems: "center",
          }}
          onPress={() => setCity(serachInput)}
        >
          <AntDesign name="clockcircle" size={15} style={{ marginRight: 10 }} />
          <Text>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/*
<GooglePlacesAutocomplete
        query={{ key: "AIzaSyADkg3uESvNqOQ_X27-KU0EdKIy9nFvzU8" }}
        onPress={(data, details = null) => {
          const city = data.description.split(",")[0];
          setCity(city);
        }}
        placeholder="Search..."
        renderLeftButton={() => (
          <View style={{ marginLeft: 10 }}>
            <Ionicons name="location-sharp" size={24} />
          </View>
        )}
        renderRightButton={() => (
          <View
            style={{
              flexDirection: "row",
              marginRight: 8,
              backgroundColor: "#fff",
              padding: 9,
              borderRadius: 30,
              alignItems: "center",
            }}
          >
            <AntDesign
              name="clockcircle"
              size={11}
              style={{ marginRight: 6 }}
            />
            <Text>Search</Text>
          </View>
        )}
        styles={{
          textInput: {
            backgroundColor: "#eee",
            borderRadius: 20,
            fontWeight: "700",
            marginTop: 7,
          },
          textInputContainer: {
            backgroundColor: "#eee",
            borderRadius: 50,
            flexDirection: "row",
            alignItems: "center",
            marginRight: 10,
          },
        }}
      />
*/

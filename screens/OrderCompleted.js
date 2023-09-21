import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Platform,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import LottieView from "lottie-react-native";

import MenuItems from "../components/restaurantDetail/MenuItems";
import { db } from "../firebase";

export default function OrderCompleted() {
  const [lastOrder, setLastOrder] = useState({
    items: [
      {
        title: "Pizza 1",
        description:
          "A mouth-watering mortadella salad served with garlic dressing",
        price: "$15.50",
        image:
          "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
      },
    ],
  });
  const cartItemsTemp = useSelector((state) => state.cart);
  const { items, restaurantName } = cartItemsTemp.selectedItem;
  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);

  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    const unsbiscribe = db
      .collection("orders")
      .orderBy("createAt", "desc")
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          setLastOrder(doc.data());
        });
      });

    return () => unsbiscribe();
  }, []);

  return (
    <SafeAreaView style={styles.SafeArea}>
      <View style={{ margin: 15, alignItems: "center", height: "100%" }}>
        {/* <LottieView
          style={{ height: 100, alignSelf: "center", marginBottom: 30 }}
          source={require("../assets/animations/check-mark.json")}
          autoPlay
          speed={0.5}
          loop={false}
        /> */}
        <Image
          source={{
            uri: require("../assets/images/placed.gif"),
          }}
          style={{
            width: 150,
            height: 150,
            resizeMode: "contain",
          }}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Your order at {restaurantName} has been place for ${totalUSD}
        </Text>
        <ScrollView>
          <MenuItems Foods={lastOrder.items} hideCheckbox={true} />
          {/* <LottieView
            style={{ height: 150, alignSelf: "center", marginBottom: 30 }}
            source={require("../assets/animations/cooking.json")}
            autoPlay
            speed={0.5}
            loop={true}
          /> */}
          <Image
            source={{
              uri: require("../assets/images/cooking.gif"),
            }}
            style={{
              width: 250,
              height: 250,
              resizeMode: "contain",
              margin: "auto",
            }}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeArea: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: Platform.OS == "android" ? 25 : 0,
  },
});

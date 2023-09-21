import {
  StyleSheet,
  SafeAreaView,
  View,
  Platform,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import Categories from "../components/home/Categories";
import HeaderTabs from "../components/home/HeaderTabs";
import RestaurantItems from "../components/home/RestaurantItems";
import SearchBar from "../components/home/SearchBar";
import BottomTabs from "../components/home/BottomTabs";
import { YELP_API_KEY } from "../config";

const Home = ({ navigation }) => {
  const [restaurantData, setRestaurantData] = useState();
  const [city, setCity] = useState("San Diego");
  const [activeTab, setActiveTab] = useState("Delivery");
  const getRestaurantsFromYelp = async () => {
    const yelpURL = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };

    return fetch(yelpURL, apiOptions)
      .then((res) => res.json())
      .then((data) =>
        setRestaurantData(
          data.businesses.filter((business) =>
            business.transactions.includes(activeTab.toLowerCase())
          )
        )
      );
  };

  useEffect(() => {
    getRestaurantsFromYelp();
  }, [city, activeTab]);

  return (
    <SafeAreaView style={styles.SafeArea}>
      <View style={{ backgroundColor: "#fff", padding: 15 }}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar setCity={setCity} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItems
          restaurantData={restaurantData}
          navigation={navigation}
        />
      </ScrollView>
      <BottomTabs />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  SafeArea: {
    backgroundColor: "#eee",
    flex: 1,
    paddingTop: Platform.OS == "android" ? 25 : 0,
  },
});

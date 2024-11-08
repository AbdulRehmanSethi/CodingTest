import React from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { toggleFavorite } from "../../redux/slices/favoritesSlice";
import { RootState } from "../../redux/store";
import { Movie } from "../../types/types";
import FastImage from "react-native-fast-image";
import { SafeAreaView } from "react-native-safe-area-context";

type DetailScreenRouteProp = RouteProp<{ params: { movie: string } }, "params">;
const { width } = Dimensions.get("window");

const DetailScreen: React.FC = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const movie: Movie = JSON.parse(route.params.movie);

  const isFavorite = useSelector((state: RootState) =>
    state.favorites.list.some((fav) => fav.trackId === movie?.trackId)
  );
  console.log(isFavorite);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <FastImage
          source={{ uri: movie?.artworkUrl100 }}
          style={styles.artwork}
          defaultSource={require("../../../assets/images/moviePlaceholder.png")}
        />
        <Text style={styles.title}>{movie?.trackName}</Text>
        <Text style={styles.genre}>{movie?.primaryGenreName}</Text>
        <Text style={styles.price}>Price: ${movie?.collectionPrice}</Text>
        <Text style={styles.description}>{movie?.longDescription}</Text>
        <TouchableOpacity
          style={[
            styles.favoriteButton,
            isFavorite && styles.favoriteButtonActive,
          ]}
          onPress={() => dispatch(toggleFavorite(movie))}
        >
          <Text style={styles.favoriteButtonText}>
            {isFavorite ? "★ Remove from Favorites" : "☆ Add to Favorites"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 70,
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 1,
    padding: 8,
  },
  backButtonText: {
    fontSize: 18,
    color: "#000000",
  },
  artwork: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  genre: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    width: width * 0.5,
    marginVertical: 20,
    alignSelf: "center",
  },
  favoriteButton: {
    width: width * 0.5,
    paddingVertical: 10,
    backgroundColor: "#666",
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 8,
  },
  favoriteButtonActive: {
    backgroundColor: "#FFD700",
  },
  favoriteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Movie } from "../types/types";
import FastImage from "react-native-fast-image";

interface MovieItemProps {
  movie?: Movie;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onPress?: () => void;
  style?: any;
  showDetails?: boolean;
  isFavoriteLayout?: boolean;
}

const MovieItem: React.FC<MovieItemProps> = ({
  movie,
  isFavorite,
  onToggleFavorite,
  onPress,
  style,
  showDetails = true,
  isFavoriteLayout = false,
}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <FastImage
        source={{ uri: movie?.artworkUrl100 }}
        style={[styles.image , {borderRadius: isFavoriteLayout ? 30 : 10}]}
        defaultSource={require("../../assets/images/moviePlaceholder.png")}
      />
        {showDetails && (
          <View style={styles.infoContainer}>
            <Text style={styles.movieName}>{movie?.trackName}</Text>
            <Text style={styles.genre}>{movie?.primaryGenreName}</Text>
            <Text style={styles.price}>${movie?.collectionPrice}</Text>
          </View>
        )}
      {showDetails && (
        <TouchableOpacity onPress={onToggleFavorite}>
          <Text style={styles.favorite}>{isFavorite ? "★" : "☆"}</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginHorizontal: 12,
  },
  image: {
    width: 70,
    height: 60,
    // borderRadius: 8,
    marginRight: 10,
    marginBottom: 5,
  },
  infoContainer: {
    flex: 1,
  },
  movieName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  genre: {
    fontSize: 14,
    color: "#666",
  },
  price: {
    fontSize: 14,
    color: "#333",
  },
  movieNameUnderImage: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
  favorite: {
    fontSize: 28,
    color: "#FFD700",
  },
});

export default MovieItem;

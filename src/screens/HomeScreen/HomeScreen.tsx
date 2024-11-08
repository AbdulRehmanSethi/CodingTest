import React, { useEffect, useState } from "react";
import { FlatList, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { fetchMovies } from "../../redux/slices/movieSlice";
import { toggleFavorite } from "../../redux/slices/favoritesSlice";
import { RootState } from "../../redux/store";
import MovieItem from "../../components/MovieItem";
import SearchBar from "../../components/SearchBar";
import { Movie } from "../../types/types";
import { useAppDispatch } from "../../redux/hooks";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const movies = useSelector((state: RootState) => state.movies.list);
  const favorites = useSelector((state: RootState) => state.favorites.list);
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    dispatch(fetchMovies(text));
  };

  const handleToggleFavorite = (movie: Movie) => {
    dispatch(toggleFavorite(movie));
  };

  const renderFavoriteItem = ({ item }: { item: Movie }) => (
    <MovieItem
      movie={item}
      isFavorite
      onToggleFavorite={() => handleToggleFavorite(item)}
      onPress={() => {
        router.push({
          pathname: "/explore",
          params: { movie: JSON.stringify(item) },
        });
      }}
      style={styles.favoriteMovieItem}
      showDetails={false}
      isFavoriteLayout={true}
    />
  );

  const renderMovieItem = ({ item }: { item: Movie | null }) => {
    if (!item) return null;

    return (
      <MovieItem
        movie={item}
        isFavorite={favorites.some((fav) => fav.trackId === item.trackId)}
        onToggleFavorite={() => handleToggleFavorite(item)}
        onPress={() => {
          router.push({
            pathname: "/explore",
            params: { movie: JSON.stringify(item) },
          });
        }}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      {favorites.length > 0 && (
        <FlatList
          data={favorites}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.trackId.toString()}
          renderItem={renderFavoriteItem}
          contentContainerStyle={styles.favoritesContainer}
          style={styles.favoritesList}
        />
      )}

      {movies.length === 0 && (
        <Text style={styles.empty}>No movies found.</Text>
      )}
      <FlatList
        data={movies}
        keyExtractor={(item) =>
          item ? item.trackId.toString() : Math.random().toString()
        }
        renderItem={renderMovieItem}
        numColumns={viewMode === "grid" ? 2 : 1}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  favoritesContainer: {
    paddingHorizontal: 10,
  },
  favoritesList: {
    marginBottom: 10,
  },
  favoriteMovieItem: {
    width: 80, 
    height: 90,
    marginRight: 10,
  },
  empty: {
    alignSelf: "center",
    marginVertical: 40,
    fontSize: 16,
  },
  gridColumn: {
    justifyContent: "space-between",
  },
});

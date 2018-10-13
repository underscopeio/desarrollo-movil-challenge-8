import React from 'react'
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native'
import { authorize, logout, getUserArtistsPromise } from '../spotify-api-client'
import ArtistaFavorito from '../ArtistaFavorito'

import { connect } from 'react-redux'
import { SET_AS_FAVORITE_TYPE } from '../reducers/artists'

class FavoritesScreen extends React.Component {
  handleFavoriteButtonPress = artist => {
    this.props.setArtistAsFavorite(artist.nombre)
  }

  render() {
    const { artistas } = this.props

    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          {artistas &&
            artistas.map(artist => (
              <ArtistaFavorito
                artista={artist}
                key={artist.nombre}
                esFavorito={this.props.favoritos[artist.nombre]}
                onFavoriteButtonPress={() => this.handleFavoriteButtonPress(artist)}
              />
            ))}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    minHeight: 45,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#000000C0',
  },

  scrollView: {
    flex: 1,
    width: '100%',
  },

  scrollViewContent: {
    alignItems: 'center',
    paddingTop: 20,
  },
})

const mapStateToProps = state => {
  return {
    favoritos: state.artists.favoritos,
    artistas: state.artists.artistas,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setArtistAsFavorite: id => dispatch({ type: SET_AS_FAVORITE_TYPE, payload: { id } }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoritesScreen)

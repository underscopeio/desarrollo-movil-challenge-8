import React from 'react'
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native'
import { logout, getUserArtistsPromise } from '../spotify-api-client'
import ArtistaFavorito from '../ArtistaFavorito'
import { connect } from 'react-redux'
import { ADD_ARTISTS_TYPE, SET_ARTIST_AS_FAVORITE } from './../reducers/artists'

class HomeScreen extends React.Component {
  state = {
    result: null,
  }

  _handleClickSetFavorite = id => {
    this.props.dispatch({ type: SET_ARTIST_AS_FAVORITE, payload: { artistId: id } })
  }

  _getArtists = () => {
    getUserArtistsPromise().then(artistas => {
      this.props.dispatch({ type: ADD_ARTISTS_TYPE, payload: { artistas } })
    })
  }

  componentDidMount() {
    this._getArtists()
  }

  _handleLogoutButtonPress = () => {
    logout().then(() => {
      this.props.navigation.navigate('Auth')
    })
  }

  render() {
    const { artistas, favoritos } = this.props

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
                handleClickFavorite={() => this._handleClickSetFavorite(artist.nombre)}
                esFavorito={favoritos[artist.nombre]}
              />
            ))}
        </ScrollView>
        <View style={styles.buttonsContainer}>
          <Button title="Logout" onPress={this._handleLogoutButtonPress} />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    artistas: state.artists.artistas,
    favoritos: state.artists.favoritos,
  }
}

export default connect(mapStateToProps)(HomeScreen)

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

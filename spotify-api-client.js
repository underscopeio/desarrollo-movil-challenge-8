import { AuthSession } from 'expo'
import { deleteItemAsync } from 'expo/src/SecureStore'

const SPOTIFY_CLIENT_ID = '33c6fefa26ee4538aa13ee9ed9bf3389'
const SECURE_STORE_ACCESS_TOKEN_KEY = 'spotifyAccessToken'

let token

Expo.SecureStore.getItemAsync(SECURE_STORE_ACCESS_TOKEN_KEY).then(accessToken => {
  token = accessToken
})

export const logout = () => {
  return Expo.SecureStore.deleteItemAsync(SECURE_STORE_ACCESS_TOKEN_KEY).then(() => {
    token = undefined
    return true
  })
}

export const isLoggedIn = () => {
  return Expo.SecureStore.getItemAsync(SECURE_STORE_ACCESS_TOKEN_KEY).then(accessToken => {
    return accessToken
  })
}

export const authorize = () => {
  const redirectUrl = AuthSession.getRedirectUrl()

  return AuthSession.startAsync({
    authUrl:
      `https://accounts.spotify.com/authorize?response_type=token` +
      `&client_id=${SPOTIFY_CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
      `&scope=user-follow-read`,
  }).then(result => handleAuthResult(result))
}

handleAuthResult = ({ type, params }) => {
  if (type !== 'success') {
    return false
  }

  const accessToken = params.access_token

  return Expo.SecureStore.setItemAsync(SECURE_STORE_ACCESS_TOKEN_KEY, accessToken).then(() => {
    token = accessToken
    return true
  })
}

export const getUserArtistsPromise = () => {
  return fetch('https://api.spotify.com/v1/me/following?type=artist', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .then(result => {
      if (result.error && [401, 403].includes(result.error.status)) {
        throw new Error('Authorization error')
      }

      const artistas = result.artists.items.map(({ name: nombre, images, followers: { total: seguidores } }) => {
        return {
          nombre,
          seguidores,
          imagen: images[0].url,
        }
      })

      return artistas
    })
}

export const getUserArtistsAsync = async accessToken => {
  const response = await fetch('https://api.spotify.com/v1/me/following?type=artist', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const result = await response.json()

  if (result.error && [401, 403].includes(result.error.status)) {
    throw new Error('Authorization error')
  }

  const artistas = result.artists.items.map(({ name, images, followers: { total } }) => ({
    nombre: name,
    seguidores: total,
    imagen: images[0].url,
  }))

  return artistas
}

import React, { Component } from 'react'

import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import HomeScreen from './screens/Home'
import FavoritesScreen from './screens/Favorites'
import AuthLoadingScreen from './screens/AuthLoadingScreen'
import SignInScreen from './screens/SignInScreen'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './reducers'

// const AppStack = createStackNavigator({ Home: HomeScreen })

const AppStack = createBottomTabNavigator({
  Home: HomeScreen,
  Favorites: FavoritesScreen,
})

const AuthStack = createStackNavigator({ SignIn: SignInScreen })

const MainNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
)

const store = createStore(rootReducer)

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    store.replaceReducer(rootReducer)
  })
}

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    )
  }
}

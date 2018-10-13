import React from 'react'
import { createSwitchNavigator, createStackNavigator } from 'react-navigation'
import HomeScreen from './screens/Home'
import AuthLoadingScreen from './screens/AuthLoadingScreen'
import SignInScreen from './screens/SignInScreen'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers/index'

const AppStack = createStackNavigator({ Home: HomeScreen })
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

const store = createStore(reducer)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    )
  }
}

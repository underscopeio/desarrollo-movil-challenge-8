import { createSwitchNavigator, createStackNavigator } from 'react-navigation'

import HomeScreen from './screens/Home'
import AuthLoadingScreen from './screens/AuthLoadingScreen'
import SignInScreen from './screens/SignInScreen'

const AppStack = createStackNavigator({ Home: HomeScreen })
const AuthStack = createStackNavigator({ SignIn: SignInScreen })

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
)

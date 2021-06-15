import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaView } from 'react-native'
import { Provider } from 'react-redux'
import { store } from './redux'
import { TopPostsScreen, PostScreen } from './screens'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TopPosts">
          <Stack.Screen name="TopPosts" component={TopPostsScreen} />
          <Stack.Screen name="Post" component={PostScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

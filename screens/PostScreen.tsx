import * as React from 'react'
import { View, Text } from 'react-native'

export const PostScreen = ({ navigation, route }) => {
  const { postId } = route.params
  return (
    <View>
      <Text>{postId}</Text>
    </View>
  )
}

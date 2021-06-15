import * as React from 'react'
import {
  Linking,
  TouchableOpacity,
  Alert,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native'

type PropType = {
  url: string
  title: string
  textStyle?: TextStyle
  containerStyle?: ViewStyle
}

export const OpenURLButton = ({
  url,
  title,
  containerStyle = {},
  textStyle = {},
}: PropType) => {
  const handlePress = React.useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url)

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url)
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`)
    }
  }, [url])

  return (
    <TouchableOpacity style={containerStyle} onPress={handlePress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  )
}

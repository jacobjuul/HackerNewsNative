import * as React from 'react'
import { useSelector } from 'react-redux'
import { View, Text, StyleSheet, StatusBar, SafeAreaView } from 'react-native'
import { OpenURLButton } from '../components/OpenURLButton'

export const PostScreen = ({ navigation, route }) => {
  const { postId } = route.params
  const post = useSelector((state) => state.posts.entities[postId])
  console.log(post)
  return (
    <SafeAreaView style={styles.container}>
      <OpenURLButton
        textStyle={styles.titleText}
        url={post.url}
        title={post.title}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginVertical: 30,
    marginHorizontal: 20,
  },
  titleText: {
    fontSize: 20,
  },
})

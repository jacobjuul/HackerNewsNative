import * as React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { StackNavigationProp } from '@react-navigation/stack'
import { SafeAreaView, Text, Button, StatusBar, StyleSheet } from 'react-native'
import { RootStackParamList } from '../types/navigation'
import { fetchPostIds } from '../redux/actions/postActions'
import { Posts } from '../components/Posts'
import { posts } from '../redux/reducers/posts'

type TopPosts = StackNavigationProp<RootStackParamList, 'TopPosts'>

type Props = {
  navigation: TopPosts
}

export const TopPostsScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch()

  const { status, ...posts } = useAppSelector(({ posts }) => posts)

  React.useEffect(() => {
    if (status === 'initial') {
      dispatch(fetchPostIds())
    }
  })

  return (
    <SafeAreaView style={styles.container}>
      {status === 'initial' && <Text>Loading...</Text>}
      {status !== 'initial' && status !== 'failed' && (
        <>
          <Posts
            posts={posts.entities}
            onRefresh={() => dispatch(fetchPostIds())}
            idsByScore={posts.idsByScore}
            status={status}
          />
          <Button
            disabled={status === 'loading'}
            title="Fetch new stories"
            onPress={() => dispatch(fetchPostIds())}
          />
        </>
      )}

      {/* <Button title="Read story" onPress={() => navigation.navigate('Post')} /> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
})

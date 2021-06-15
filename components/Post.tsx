import * as React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '../hooks'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { fetchUser } from '../redux/actions/userActions'
import { PostType } from '../types/PostTypes'
import { OpenURLButton } from './OpenURLButton'

type PropType = {
  post: PostType
}

export const Post = ({ post }: PropType) => {
  const dispatch = useAppDispatch()
  const users = useAppSelector(({ users }) => users.entities)
  const navigation = useNavigation()

  React.useEffect(() => {
    dispatch(fetchUser(post.by))
  }, [post.by])

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.score}>
          <Text>{post.score}</Text>
          <Text>👍</Text>
        </View>
        <TouchableOpacity
          style={styles.score}
          onPress={() => navigation.navigate('Post', { postId: post.id })}
        >
          <Text>{post.descendants}</Text>
          <Text>💬</Text>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <OpenURLButton
            textStyle={styles.titleText}
            url={post.url}
            title={post.title}
          />
          <View style={styles.authorContainer}>
            <Text style={styles.textItalic}>Submitter:</Text>
            <Text>
              {`${post.by} (${(users[post.by] && users[post.by].karma) || 0})`}
            </Text>
          </View>
          <View>
            <Text>on: {new Date(post.time * 1000).toDateString()}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginVertical: 30,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 6,
    flexDirection: 'column',
  },
  titleText: {
    fontWeight: 'bold',
  },
  textItalic: {
    fontStyle: 'italic',
  },
  score: {
    flex: 1,
    alignItems: 'center',
  },
  authorContainer: { flexDirection: 'row' },

  author: {
    flex: 1,
  },
})

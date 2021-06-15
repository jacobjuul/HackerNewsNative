import * as React from 'react'
import { ScrollView, StyleSheet, RefreshControl } from 'react-native'
import { PostsType } from '../types/PostTypes'
import { Post } from './Post'

type PropType = {
  posts: PostsType
  idsByScore: number[]
  status: 'initial' | 'loading' | 'succeeded' | 'failed'
  onRefresh: () => void
}

export const Posts = ({ posts, idsByScore, onRefresh, status }: PropType) => {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl
          refreshing={status === 'loading'}
          onRefresh={onRefresh}
        />
      }
    >
      {idsByScore.map((id: number) => (
        <Post key={id} post={posts[id]} />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 20,
  },
})

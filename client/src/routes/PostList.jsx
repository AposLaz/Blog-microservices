import React, { useEffect, useReducer } from 'react'
import { fetch_reducer } from '../reducers/reducers'
import { getPosts } from '../api/posts-api';

function PostList() {
   
  const [{loading, posts, error},dispatch] = useReducer(fetch_reducer,{
    loading: true,
    posts: [],
    error: ''
  })

  useEffect(()=>{
    const fetchPosts = async ()=>{
        dispatch({type: 'FETCH_REQUEST'})
        try {
            const result_get_posts = await getPosts;
            dispatch({type: 'FETCH_SUCCESS',payload: result_get_posts.data})
        } catch (error) {
            dispatch({type: 'FETCH_ERROR', payload: error.message})
        }
    
    }

    fetchPosts()
  },[])

  return (
    <div>PostList</div>
  )
}

export default PostList
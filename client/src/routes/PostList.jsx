import React, { useEffect, useReducer } from 'react'
import { fetch_reducer } from '../reducers/reducers'
import { getPosts } from '../api/post-comments-api';
import BlogCard from '../components/Blogs/BlogCard';

function PostList() {
   
  const [{loading, fetch_list, error},dispatch] = useReducer(fetch_reducer,{
    loading: true,
    fetch_list: [],
    error: ''
  })

  const fetchPosts = async ()=>{
    dispatch({type: 'FETCH_REQUEST'})
    try {
        const result_get_posts = await getPosts;
        dispatch({type: 'FETCH_SUCCESS',payload: result_get_posts.data})
        
    } catch (error) {
        dispatch({type: 'FETCH_ERROR', payload: error.message})
    }
  }

  useEffect(()=>{
    fetchPosts()
  },[])

  return (
    <div>
      <h3>PostList</h3>
      <br />
      {
        loading ? (<div>Loading</div>):
        error ? (<div>Error</div>):
        (
          <div className='flex flex-row justifyBetween flexWrap gap-1'>
            {Object.values(fetch_list).map((post,index)=>{
                return <BlogCard 
                          key={index}
                          postId={post._id}
                          title={post.post_title}
                          comments={post.comments}
                      />
            })}
          </div>
        )
      }
    </div>
  )
}

export default PostList
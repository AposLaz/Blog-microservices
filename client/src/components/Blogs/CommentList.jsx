import React, { useEffect, useReducer } from 'react'
import { getComments } from '../../api/comments-api'
import { fetch_reducer } from '../../reducers/reducers'

function CommentList({postId}) {

  const [{loading, fetch_list, error}, dispatch]= useReducer(fetch_reducer,{
    loading: true,
    fetch_list: [],
    error: ''
  })

  const fetchComments = async ()=>{
    dispatch({type: 'FETCH_REQUEST'})
    try {
        const getRequest = await getComments(postId);
        dispatch({type: 'FETCH_SUCCESS', payload: getRequest.data}) 
    } catch (error) {
        dispatch({type: 'FETCH_ERROR', payload: error.message})
    }
  }

  useEffect(()=>{
    fetchComments()
  },[])
  return (
    <div>
        {
            loading ? (<div>Loading</div>):
            error? (<div>Error</div>):
            (
                <ul >
                    {
                        fetch_list.map((comment,index)=>{
                            return <li className='mt-0-75 mb-0-75' style={{wordWrap: 'break-word'}} key={index}>{comment.comment}</li>
                        })
                    }
                </ul>
            )
        }
    </div>
  )
}

export default CommentList
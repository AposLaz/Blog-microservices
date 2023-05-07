import React from 'react'
import CommentList from './CommentList'
import CreateCommentsCard from './CreateCommentsCard'


function BlogCard(props) {
    const {postId, title, comments} = props

  return (
    <div className='blog-card pl-2 pr-2 pt-1 pb-1'>
        <h2 className='blog-title'><u>{title}</u></h2>
        <CreateCommentsCard 
            postId={postId}
        />
        <CommentList 
          comments={comments}
        />
    </div>
  )
}

export default BlogCard
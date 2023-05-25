const blogModel=require('../models/blog')

const blog_store = async (new_post)=>{
    const post = new blogModel({
        _id: new_post.id,
        post_title: new_post.title
    })
    await post.save()
}

const blog_retrieve = async (callback)=>{
        await blogModel.find({}).select({ __v: 0 })
                            .then((posts)=>{
                                callback(undefined,posts)
                            })
                            .catch((error)=>{
                                callback(error,undefined)
                            })
}

const blog_retrieve_by_id = async(post_id)=>{
    const blog = await blogModel.findById(post_id)
    return blog
}

const comments_store = async (new_comment)=>{
    try {
        await blog_retrieve_by_id(new_comment.post_id)
                                .then(async (blog_post)=>{
                                        await blog_post.comments.push(new_comment.comments)
                                        await blog_post.save()
                                })
                                .catch((error)=>{
                                    console.log(`Store comment has error: =========> ${error.message}`)
                                })
    } catch (error) {
        
    }
            
    // console.log(new_comment.post_id)
}

module.exports = {
    blog_store,
    blog_retrieve,
    comments_store
}
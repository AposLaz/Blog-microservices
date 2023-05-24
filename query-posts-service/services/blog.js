/**
 * Create blog
 */

const create_post = async (new_post,callback)=>{
    try {
        const post = new blogSchema(new_post)
        await post.save()
                    .then(async ()=>{
                        callback("Post Created", 200)
                    })
    } catch (error) {
        callback(error.message, 500)
    }
}

/**
 * Retrieve blog with comments
 */

/**
 * Create comments
 */

const create_comment = async (new_comment,callback)=>{

}

/**
 * Retrieve comments from blog
 */
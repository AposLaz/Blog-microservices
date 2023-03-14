import axios from 'axios'

const url = 'http://localhost:4000/posts'

export const createPost = async (title)=>{
    console.log(title)
    await axios
            .post(url,{
              title
            });
}
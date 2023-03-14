import axios from 'axios'

const url = 'http://localhost:4000/posts'

export const createPost = async (title)=>{
    await axios.post(url,{
              title
            });
}

export const getPosts = axios.get(url)
import axios from 'axios'
import { post_host } from '../config/config';

const url = `${post_host}/posts`

export const createPost = async (title)=>{
    await axios.post(url,{
              title
            });
}

export const getPosts = axios.get(url)
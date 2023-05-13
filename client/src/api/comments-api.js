import axios from "axios"
import {comment_host} from '../config/config'

const uri = `${comment_host}/posts/`
const route = '/comments'

export const createComment = async(id,comment)=>{
    const url = uri+id+route
    console.log(url)
    await axios.post(url,{
        comment
    })
}

export const getComments = async(id)=>{
    const url = uri+id+route
    return await axios.get(url);
}
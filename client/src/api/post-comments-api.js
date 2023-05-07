import axios from 'axios'

const url = 'http://localhost:4003/posts'

export const getPosts = axios.get(url)

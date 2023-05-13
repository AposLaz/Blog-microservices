import axios from 'axios'
import {query_host} from '../config/config'

const url = `${query_host}/posts`

export const getPosts = axios.get(url)

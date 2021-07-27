import axios from 'axios'

export const API_KEY = '66e3df787130147acae1d50069f3587c'

export const http = axios.create({
  baseURL: 'https://api.themoviedb.org/3/search'
})

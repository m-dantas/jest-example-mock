import { API_KEY, http } from './http'

export const fetchMovies = async (term) => {
  const {
    data: { results: movies }
  } = await http.get(`movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${term}`)

  return movies
}

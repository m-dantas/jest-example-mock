jest.mock('./http') // mock do axios

import { fetchMovies } from './movie-api'
import { http } from './http'

import data from '../mocks/movies.json'

import { shallowMount } from '@vue/test-utils'
import Index from '../pages/index'

describe('Movie API', () => {
    afterEach(() => {
        jest.resetAllMocks()
    })

    describe('fetchMovies', () => {

        beforeEach(() => {
            http.get.mockImplementation(() => { // mock da implementação do código
                return Promise.resolve({ data })
            })
            
            fetchMovies('star')
        })

        test('should call http.get', () => {
            expect(http.get).toHaveBeenCalledTimes(1)
        })

        test('should call http.get with proper URL', () => {
            expect(http.get).toHaveBeenCalledWith('movie?api_key=66e3df787130147acae1d50069f3587c&language=en-US&page=1&include_adult=false&query=star')
        })

        test('should set received values into the `movies`', async () => {
            const wrapper = shallowMount(Index)

            wrapper.find('#search').setValue('luca')
            wrapper.find('#submit').trigger('click')
            
            expect(http.get).toHaveBeenCalledTimes(2)
            expect(http.get).toHaveBeenCalledWith('movie?api_key=66e3df787130147acae1d50069f3587c&language=en-US&page=1&include_adult=false&query=luca')

            await new Promise((r) => setTimeout(r, 100));

            expect(wrapper.vm.$data.movies).toHaveLength(2)
        })
    })
})
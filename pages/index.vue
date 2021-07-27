<template>
  <div class="index">
    <form class="index__form">
      <input id="search" v-model="search" type="text" class="index__input">
      <button id="submit" type="submit" @click.prevent="onSubmit" class="index__submit">
        Submit
      </button>
    </form>
    <ul class="index__ul">
      <li :key="index" v-for="(movie, index) in movies" class="index__li">
        {{ movie.original_title }}
      </li>
    </ul>
  </div>
</template>

<script>
import { fetchMovies } from '@/services/movie-api'
export default {
  name: 'Index',
  data () {
    return {
      search: '',
      movies: []
    }
  },
  methods: {
    async onSubmit () {
      this.movies = await fetchMovies(this.search)
    }
  }
}
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  
  &__ul {
    display: grid;
    grid-template-columns: repeat(4, 25%);
    list-style: none;
  }
}
</style>

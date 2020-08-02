<template>
  <div class="home">
    <ul>
      <li>
        <router-link to="/board/1">Board 1</router-link>
      </li>
      <li>
        <router-link to="/board/2">Board 2</router-link>
      </li>
    </ul>
    <div v-if="loading">Loading...</div>
    <div v-else>{{ boards }}</div>
  </div>
</template>

<script>
import { board } from '@/api'

export default {
  name: 'Home',
  data () {
    return {
      loading: false,
      boards: [],
    }
  },
  methods: {
    fetchData () {
      this.loading = true
      board.fetch ()
        .then ( data => {
          this.boards = data
        })
        .finally( () => {
          this.loading = false
        })
    }
  },
  created () {
    this.fetchData()
  }
}
</script>

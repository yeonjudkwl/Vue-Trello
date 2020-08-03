<template>
  <div>
    <div v-if="loading">loading...</div>
    <div v-else>
      <p>{{ bid }}</p>
      <router-link :to="`/board/${bid}/card/1`">card 1</router-link>
      <router-link :to="`/board/${bid}/card/2`">card 2</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bid: 0,
      loading: false
    }
  },
  methods: {
    fetchData() {
      this.loading = true
      setTimeout( () => {
        this.bid = this.$route.params.id
        this.loading = false
      }, 500)
    }
  },
  created () {
    this.fetchData()
  },
}
</script>

<style>

</style>
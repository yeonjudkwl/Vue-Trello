<template>
  <div>
    <div v-if="loading">loading...</div>
    <div v-else>
      card {{ cid }}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cid: 0,
      loading: false
    }
  },
  watch: {
    '$route'() {
      this.fetchData()
    }
  },
  methods: {
    fetchData() {
      this.loading = true
      setTimeout( () => {
        this.cid = this.$route.params.cid
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
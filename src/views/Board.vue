<template>
  <div>
    <p>{{ bid }}</p>
    <router-link :to="`/board/${bid}/card/1`">card 1</router-link>
    <router-link :to="`/board/${bid}/card/2`">card 2</router-link>
    <router-view/>
  </div>
  
</template>

<script>
export default {
  data () {
    return {
      bid: 0
    }
  },
  created () {
    this.bid = this.$route.params.id
  },
}
</script>

<style>

</style>
<template>
  <div>
      card {{ cid }}
  </div>
</template>

<script>
export default {
  data () {
    return {
      cid: 0
    }
  },
  created () {
    this.cid = this.$route.params.cid
  }
}
</script>

<style>

</style>
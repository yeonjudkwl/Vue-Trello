<template>
  <Modal>
    <div slot="body">
      {{ card }}
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal.vue'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      cid: 0,
      loading: false
    }
  },
  components: {
    Modal
  },
  computed: {
    ...mapState({
      card: 'card'
    })
  },
  methods: {
   ...mapActions(['FETCH_CARD'])
  },
  created () {
    const id = this.$route.params.cid
    this.FETCH_CARD({id})
  }
}
</script>

<style>

</style>
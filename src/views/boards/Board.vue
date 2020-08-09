<template>
  <div>
    <div class="board-wrapper">
      <div class="board">
        <div class="board-header">
          <input v-if="isEditTitle" v-model="inputTitle" ref="inputTitle" type="text" name="" id=""
           @blur="onSubmitTitle" @keyup.enter="onSubmitTitle">
          <span v-else @click="onClickTitle" class="board-title">{{ board.title }}</span>
          <a @click.prevent="onShowSettings" href="" class="board-header-btn show-menu">...show Menu</a>
        </div>
        <div class="list-section-wrapper">
          <div class="list-section">
            <div class="list-wrapper" v-for="list in board.lists" :key="list.pos">
              <List :data="list" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <BoardSettings v-if="isShowBoardSettings"/>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import List from '@/components/List.vue'
import BoardSettings from '@/components/BoardSettings.vue'
// import dragular from '../dragular'
// import 'dragular/dist/dragular.css'

export default {
  data () {
    return {
      bid: 0,
      loading: false,
      dragularCards: null,
      isEditTitle: false,
      inputTitle: null,
    }
  },
  components: {
    List,
    BoardSettings,
  },
  computed: {
    ...mapState(['board', 'isShowBoardSettings'])
  },
  methods: {
    ...mapMutations(['SET_THEME', 'SET_IS_SHOW_BOARD_SETTINGS']),
    ...mapActions(['FETCH_BOARD', 'UPDATE_CARD', 'UPDATE_BOARD']),
    fetchData() {
      this.loading = true
      this.bid = this.$route.params.id
      this.FETCH_BOARD({id: this.bid}).then( () => this.loading = false)
    },
    onShowSettings () {
      this.SET_IS_SHOW_BOARD_SETTINGS(true)
    },
    onClickTitle () {
      this.isEditTitle = true
      this.$nextTick( () => this.$refs.inputTitle.focus())
    },
    onSubmitTitle () {
      this.isEditTitle = false

      this.inputTitle = this.inputTitle.trim()
      if(!this.inputTitle) return

      const id = this.board.id
      const title = this.inputTitle
      if(title === this.board.title) return

      this.UPDATE_BOARD({id, title})
    }
  },
  created () {
    this.fetchData()
      .then(() => this.inputTitle = this.board.title)
    this.SET_THEME(this.board.bgColor)
    this.SET_IS_SHOW_BOARD_SETTINGS(false)
  },
  // updated () {
  //   if (this.dragularCards) this.dragularCards.destroy()
  //   this.dragularCards = dragular ([
  //     //유사배열을 진짜 배열로
  //     ...Array.from(this.$el.querySelectorAll('.card-list'))
  //   ]).on('drop', (el, wrapper) => {
  //     const targetCard = {
  //       // (* 1)로 숫자로 바꾸기
  //       id: el.dataset.cardId * 1,
  //       pos: 65535

  //     }
  //     let prevCard = null
  //     let nextCard = null
  //     Array.from(wrapper.querySelectorAll('.card-item'))
  //       .forEach((el, idx, arr) => {
  //         const cardId = el.dataset.cardId * 1
  //         if (cardId == targetCard.id) {
  //           prevCard = idx > 0 ? {
  //             id : arr[idx - 1].dataset.cardId * 1,
  //             pos: arr[idx - 1].dataset.cardPos * 1,
  //           } : null
  //           nextCard = idx < arr.length - 1 ? {
  //             id: arr[idx + 1].dataset.cardId * 1,
  //             pos: arr[idx + 1].dataset.cardPos * 1,
  //           } : null
  //         }
  //       })
  //     // 첫 번째 카드일 경우
  //     if (!prevCard && nextCard) targetCard.pos = nextCard.pos / 2
  //     // 마지막 카드일 경우
  //     else if (!nextCard && prevCard) targetCard.pos = prevCard.post * 2
  //     // 중간 카드일 경우
  //     else if (prevCard && nextCard) targetCard.pos = (prevCard.pos + nextCard.pos) / 2
    
  //     this.UPDATE_CARD(targetCard)
  //   })
  // }
}
</script>

<style>
.board-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.board {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.board-header {
  flex: none;
  padding: 8px 4px 8px 8px;
  margin: 0;
  height: 32px;
  line-height: 32px;
} 
.board-header input[type=text] {
  width: 200px;
}
.board-header-btn {
  border-radius: 4px;
  padding: 2px 10px;
  height: 30px;
  margin-bottom: 15px;
  display: inline-block;
  color: #fff;
}
.board-header-btn:hover,
.board-header-btn:focus {
  background-color: rgba(0,0,0,.15);
  cursor: pointer;
}
.board-title {
  font-weight: 700;
  font-size: 18px;
}
.show-menu {
  font-size: 14px;
  position: absolute;
  right: 15px;
}
.list-section-wrapper {
  flex-grow: 1;
  position: relative;
}
.list-section {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 0 10px;
}
.list-wrapper {
  display: inline-block;
  height: 100%;
  width: 272px;
  vertical-align: top;
  margin-right: 5px;
}
.card-item.gu-transit {
  background-color: #555 !important;
}
.card-item.gu-mirror {
  opacity: 1 !important;
  background-color: #fff !important;
  transform: rotate(3deg) !important;
}
</style>
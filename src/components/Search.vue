<template>
  <div class="Search">
    <div id="InpuText">
      <input type="text" name="SearchText" placeholder="News Search" v-model="searchText">
      <button @click="seacch()">
        <p>Search</p>
      </button>
    </div>
    <div id="Box">
      <!-- Original -->
      <div id="Original">
        <h1 class="title">Original</h1>
        <div id="content_box" >
          <div v-for="(items,index) in this.model1">
            <div v-for="item in items" :id="index">
              <h1 class="ContentTitle" v-text="item.title" v-if="item.title"></h1>
              <div class="date" v-text="item.date" v-if="item.date"></div>
              <p class="text" v-text="item.content" v-if="item.content"></p>
            </div>
          </div>
        </div>
      </div>
      <div id="other">
        <div class="content_box">
          <div class="content_title">
            <h1 class="">BM21</h1>
            <h1 class="">BM22</h1>
            <h1 class="">BM23</h1>
            <h1 class="">BM24</h1>
          </div>
          <div class="content">
            <div class="but_box left">
              <button @click="left()"><</button>
            </div>
            <div class="move">
              <div class="content_text">
                <h1 class="ContentTitle">標題</h1>
                <div class="date">2019-02-15</div>
                <p class="text">
                  內文內文
                  <span>內文內文</span>內文內文
                </p>
              </div>
              <div class="content_text">
                <h1 class="ContentTitle">標題</h1>
                <div class="date">2019-02-15</div>
                <p class="text">
                  內文內文
                  <span>內文內文</span>內文內文
                </p>
              </div>
              <div class="content_text">
                <h1 class="ContentTitle">標題</h1>
                <div class="date">2019-02-15</div>
                <p class="text">
                  內文內文
                  <span>內文內文</span>內文內文
                </p>
              </div>
              <div class="content_text">
                <h1 class="ContentTitle">標題</h1>
                <div class="date">2019-02-15</div>
                <p class="text">
                  內文內文
                  <span>內文內文</span>內文內文
                </p>
              </div>
            </div>
            <div class="but_box right">
              <button @click="right()">></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "Search",
  data() {
    return {
      searchText:'',
      model1:[],
      isRight: true,
      isLeft: false,
      nub: 0
    };
  },
  mounted () {},
  computed: mapState({
    searchDtat: state => state.search
  }),
  methods:{
    seacch(){
      this.$store.dispatch('postsearch',this.searchText)
      this.seacchComputed()
      // console.log(this.searchText)
      // console.log(this.searchDtat)
    },
    seacchComputed(){
      for(var items in this.searchDtat.model1){
        this.model1 = this.searchDtat.model1
      }
    },
    right() {
      var box = document.getElementsByClassName("move")[0];
      var title = document.getElementsByClassName("content_title")[0];
      if(this.isRight === true){
        box.style.left = box.offsetLeft - 552 + "px";
        title.style.left = title.offsetLeft - 552 + "px";
        this.isLeft = true
        this.nub = this.nub +1
        if(this.nub === 3){
          this.isRight = false
        }
      }
    },
    left() {
      var box = document.getElementsByClassName("move")[0];
      var title = document.getElementsByClassName("content_title")[0];
      if(this.isLeft === true){
        box.style.left = box.offsetLeft + 400 + "px";
        title.style.left = title.offsetLeft + 400 + "px";
        this.nub = this.nub - 1
        if(this.nub === 0){
          this.isLeft = false
          this.isRight = true
        }
      }
      console.log(box.offsetLeft,title.offsetLeft)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
  @import '/Search.sass'
</style>

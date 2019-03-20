<template>
  <div class="Search">
    <div id="InpuText">
      <input type="text" name="SearchText" placeholder="News Search" v-model="searchText">
      <button @click="seacch()"><p>Search</p></button>
    </div>
    <div id="Box">
      <!-- Original -->
      <div id="Original" v-show="this.isShowData">
        <h1 class="title" v-for="item in this.Original">{{item.name}}<span>{{item.total}}</span></h1>
        <div id="content_box" >
          <div class="content_text" v-for="items in this.Original">
            <div v-for="(item,index) in items.results" :id="index" v-if="item">
              <h1 class="ContentTitle" v-text="item.title" v-if="item.title"></h1>
              <div class="date" v-text="item.date" v-if="item.date"></div>
              <p class="text" v-text="item.content" v-if="item.content"></p>
            </div>
          </div>
        </div>
      </div>
      <div id="other" v-show="this.isShowData">
        <div class="content_box">
          <div class="content_title">
            <h1 class="" v-for="item in this.OtherModel">{{item.name}}<span>{{item.total}}</span></h1>
          </div>
          <div class="content">
            <div class="but_box left">
              <button @click="left()"><img src="../assets/img/left.png"></button>
            </div>
            <div class="move">
              <div class="content_text" v-for="items in this.OtherModel">
                <div v-for="(item,index) in items.results" :id="index">
                  <h1 class="ContentTitle" v-text="item.title" v-if="item.title"></h1>
                  <div class="date" v-text="item.date" v-if="item.date"></div>
                  <p class="text" v-text="item.content" v-if="item.content"></p>
                </div>
              </div>
            </div>
            <div class="but_box right">
              <button @click="right()"><img src="../assets/img/right.png"></button>
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
      Original:[],
      OtherModel:[],
      tempData:[],
      isShowData:false,
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
      this.$store.dispatch('postsearch',{
        search: this.searchText,
        searchCallback: this.searchComputed
      })
    },
    searchComputed(){
      this.OtherModel = []
      this.tempData = []
      this.nub = 0
      this.isRight = true,
      this.isLeft = false
      for(var items in this.searchDtat.model1){
        this.Original[0] = this.searchDtat.model1
      }
      for(var items in this.searchDtat){
        if(items != 'model1'){
          this.OtherModel[this.nub] = this.searchDtat[items]
          this.nub = this.nub +1
        }
      }
      if(this.Original.length > 0 || this.OtherModel.length > 0){
        this.isShowData = true
      }else{
        this.isShowData = false
      }
    },
    right() {
      if(this.isRight === true){
        this.tempData.unshift(this.OtherModel[0])
        this.OtherModel.shift()
        this.isLeft = true

        if(this.OtherModel.length === 2){
          this.isRight = false
        }
      }
    },
    left() {
      if(this.isLeft === true){
        this.OtherModel.unshift(this.tempData[0])
        this.tempData.shift()
        this.isRight = true
        if(this.tempData.length === 0){
          this.isLeft = false
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
  @import '/Search.sass'
</style>

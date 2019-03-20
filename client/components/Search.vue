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
      /* 重新搜尋時將變數恢復原本預設狀態 */
      this.OtherModel = []
      this.tempData = []
      this.nub = 0
      this.isRight = true,
      this.isLeft = false

      /* 將 model1 data 獨立存入 Original 陣列 */
      for(var items in this.searchDtat.model1){
        this.Original[0] = this.searchDtat.model1
      }

      /* 將 model1 data 過濾 剩下 data 存入 OtherModel 陣列 */
      for(var items in this.searchDtat){
        if(items != 'model1'){
          this.OtherModel[this.nub] = this.searchDtat[items]
          this.nub = this.nub +1
        }
      }

      /* 判斷其中一個陣列是否有 data 才顯示資料，因為搜尋引擎不一定每個 modal 都有資料 */
      if(this.Original.length > 0 || this.OtherModel.length > 0){
        this.isShowData = true
      }else{
        this.isShowData = false
      }
    },
    right() {
      if(this.isRight === true){
        /* 點擊右邊時，將 this.OtherModel 第一筆資料暫存至 this.tempData，每次都存到陣列最前面 */
        this.tempData.unshift(this.OtherModel[0])
        /* 點擊右邊時，將 this.OtherModel移除第一筆資料 */
        this.OtherModel.shift()
        this.isLeft = true
        /* 當 this.OtherModel 陣列成員剩兩筆時，則不能點擊右邊按鈕*/
        if(this.OtherModel.length === 2){
          this.isRight = false
        }
      }
    },
    left() {
      if(this.isLeft === true){
        /* 點擊左邊時，將 this.tempData 第一筆資料加回去 至 this.OtherModel 陣列最前面 */
        this.OtherModel.unshift(this.tempData[0])
        /* 點擊左邊時，將 this.tempData 移除第一筆資料 */
        this.tempData.shift()
        this.isRight = true
        /* 當 this.tempData 陣列成員 0 筆時，則不能點擊左邊按鈕 */
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

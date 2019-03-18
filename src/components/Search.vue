<template>
  <div class="Search">
    <div id="InpuText">
      <input type="text" name="SearchText" placeholder="News Search">
      <button>
        <p>Search</p>
      </button>
    </div>

    <div id="other">
      <div class="but_left">
        <button><</button>
      </div>
      <div id="content_box">
        <h1 class="title">BM25</h1>
        <div class="content">
          <h1 class="ContentTitle">標題</h1>
          <div class="date">2019-02-15</div>
          <p class="text">
            內文內文
            <span>內文內文</span>內文內文
          </p>
        </div>
      </div>
      <div id="content_box">
        <h1 class="title">BM25</h1>
        <div class="content">
          <h1 class="ContentTitle">標題</h1>
          <div class="date">2019-02-15</div>
          <p class="text">
            內文內文
            <span>內文內文</span>內文內文
          </p>
        </div>
      </div>
      <div id="content_box">
        <h1 class="title">BM25</h1>
        <div class="content">
          <h1 class="ContentTitle">標題</h1>
          <div class="date">2019-02-15</div>
          <p class="text">
            內文內文
            <span>內文內文</span>內文內文
          </p>
        </div>
      </div>
      <div class="but_right">
        <button>></button>
      </div>
    </div>
    <!-- Original -->
    <div id="Original">
      <h1 class="title">Original</h1>
      <div id="content_box">
        <div class="content">
          <h1 class="ContentTitle">標題</h1>
          <div class="date">2019-02-15</div>
          <p class="text">
            內文內文
            <span>內文內文</span>內文內文
          </p>
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
      search:''
    };
  },
  mounted () {
    this.$store.dispatch('postAdmin')
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
  @import '/Search.sass'
</style>

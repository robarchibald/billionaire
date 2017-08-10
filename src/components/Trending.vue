<template>
  <div class="trending">
    <h1>Trending</h1>
    <span class="trendingTypes">
      <i class="fa fa-line-chart" :class="{ selected:trendingCategory=='News' }" title="News" v-on:click="setTrendingCategory('News')"></i>
      <i class="fa fa-institution" :class="{ selected:trendingCategory=='Politics' }" title="Politics" v-on:click="setTrendingCategory('Politics')"></i>
      <i class="fa fa-flask" :class="{ selected:trendingCategory=='Tech' }" title="Science and Technology" v-on:click="setTrendingCategory('Tech')"></i>
      <i class="fa fa-futbol-o" :class="{ selected:trendingCategory=='Sports' }" title="Sports" v-on:click="setTrendingCategory('Sports')"></i>
      <i class="fa fa-film" :class="{ selected:trendingCategory=='Entertainment' }" title="Entertainment" v-on:click="setTrendingCategory('Entertainment')"></i>
    </span>
    <ul>
      <li v-for="item in trendingFiltered" v-on:mouseenter="waitPopup($event.target, item, trendingPopup)" v-on:mouseleave="waitClearPopup(trendingPopup)">
        <i class="fa fa-bolt"></i>
        <a :href="item.Url"><article><div class="title">{{item.Title | truncate(25) }}</div>
        <div class="description">{{item.Description | truncate(55) }} <span class="grey">- {{item.Url | urlDomain }}</span></div></article></a>
      </li>
      <li v-if="trendingFiltered.length == 3"><a v-on:click="trendingFiltered = trending[trendingCategory];"><i class="fa fa-caret-down"></i> See More...</a></li>
    </ul>
    <div id="trendingPopup" class="popup" v-show="trendingPopup.visible" v-on:mouseenter="trendingPopup.hoveringOver = $el" v-on:mouseleave="waitClearPopup(trendingPopup)">
      <h1>Trending popup</h1>
    </div>
  </div>
</template>

<style>
  .trending {
    padding: 10px;
  }
  .trending li:hover .title {
    text-decoration: underline;
  }
  .trending i {
    margin-left: 10px;
    color: #337ab7;
    float: left;
  }
  .trending article {
    margin-left: 30px;
  }
  .trending a:hover {
    text-decoration: none;
  }
  .trending .title {
    font-weight: bold;
  }
  .trendingTypes {
    position: absolute;
    top: 5px;
    right: 5px;
  }
  .trendingTypes i {
    color: darkgray;
    padding: 5px;
  }
  .trendingTypes i:hover {
    color: #337ab7;
  }
  .trendingTypes i.selected {
    border-bottom: 1px solid #337ab7;
    color: #337ab7;
  }
</style>

<script>
import axios from 'axios';
import { PopupMixin } from './mixins';

export default {
  name: 'trending',
  created() {
    this.getTrending();
  },
  data() {
    return {
      trending: {},
      trendingFiltered: [],
      trendingCategory: 'News',
      trendingPopup: { visible: false, elementId: 'trendingPopup', preferredLocation: 'left' },
    };
  },
  methods: {
    getTrending() {
      axios.get('http://localhost:1234/api/trending').then((response) => {
        this.trending = response.data;
        this.trendingFiltered = this.trending[this.trendingCategory].slice(0, 3);
      }).catch(() => {});
    },
    setTrendingCategory(category) {
      this.trendingCategory = category;
      this.trendingFiltered = this.trending[category];
    },
  },
  mixins: [PopupMixin],
};
</script>

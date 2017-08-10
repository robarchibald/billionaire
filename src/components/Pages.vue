<template>
  <div>
    <h1 class="bottomborder">Your Pages</h1>
    <div v-if="pages[selectedPageIndex]">
      <section class="bottomborder">
        <img class="avatar img64" :src="pages[selectedPageIndex].ProfileImage"/>
        <div class="indent">
          <a :href="'/pages/' + selectedPageIndex" v-on:mouseenter="waitPopup($event.target, pages[selectedPageIndex], pagePopup)" 
            v-on:mouseleave="waitClearPopup(pagePopup)">{{ pages[selectedPageIndex].Name }}</a>
          <div title="Messages"><a href="/messages" role="button"><i class="fa fa-comments-o"></i> Messages</a></div>
          <div title="Notifications"><a href="/notifications" role="button"><i class="fa fa-bell"></i> Notifications</a></div>
        </div>
      </section>
      <section class="actions columns">
        <a title="Publish"><div><i class="fa fa-edit"></i></div><div>Publish</div></a>
        <a title="Photo"><div><i class="fa fa-camera"></i></div><div>Photo</div></a>
        <a title="Event"><div><i class="fa fa-calendar-o"></i></div><div>Event</div></a>
        <a title="Promote"><div><i class="fa fa-bullhorn"></i></div><div>Promote</div></a>
      </section>
      <section class="tabNav columns">
        <a v-on:click="selectedTab = 0" v-bind:class="{ active: selectedTab === 0 }" class="box">Likes</a>
        <a v-on:click="selectedTab = 1" v-bind:class="{ active: selectedTab === 1 }" class="box">Views</a>
        <a v-on:click="selectedTab = 2" v-bind:class="{ active: selectedTab === 2 }" class="box">Posts</a>
      </section>
      <section class="bottomborder">
        <div class="columns" v-show="selectedTab === 0">
          <span class="center">
            <div class="big">{{ pages[selectedPageIndex].Likes }}</div>
            <div>{{ pages[selectedPageIndex].LikesThisWeek }} new likes this week</div>
          </span>
        </div>
        <div v-show="selectedTab === 1">
          <div>{{ getCurrentWeekRange() }}</div>
          <div class="columns">
            <span class="twocolumn">
              <div class="big">{{ pages[selectedPageIndex].Views }}</div>
              <div>Page Views</div>
            </span>
            <span class="twocolumn">
              <div class="big">{{ pages[selectedPageIndex].PostEngagements }}</div>
              <div>Post Engagements</div>
            </span>
          </div>
        </div>
        <div v-show="selectedTab === 2">
          <div>{{ getCurrentWeekRange() }}</div>
          <div class="columns">
            <span class="twocolumn">
              <div class="big">{{ pages[selectedPageIndex].PostComments }}</div>
              <div>Comment</div>
            </span>
            <span class="twocolumn">
              <div class="big">{{ pages[selectedPageIndex].PostShares }}</div>
              <div>Shares</div>
            </span>
          </div>
        </div>
      </section>
      <section class="bottomborder">
        <div class="title">{{ pages[selectedPageIndex].AdTitle }}</div>
        <img :src="pages[selectedPageIndex].AdImageURL" class="avatar img64" />
        <div class="indent">
          <div class="description">{{ pages[selectedPageIndex].AdText }}</div>
          <button>{{ pages[selectedPageIndex].AdButtonText }}</button>
        </div>
      </section>
      <div>Recent Posts</div>
      <section class="recentPosts">
        <ul>
          <li class="box" v-for="item in pages[selectedPageIndex].RecentPosts">
            <img class="avatar img32" :src="item.ProfileImage"/>
            <div>
              <div class="title">{{item.Name}}</div>
              <div class="date">{{ item.PostDate | relativeDate }}</div>
            </div>
            <div class="bottomborder">{{ item.Post | truncate(40) }}</div>
            <button class="right">Boost Post</button>
          </li>
        </ul>
      </section>
    </div>
    <div v-else>Loading</div>
    <div id="pagePopup" class="popup" v-show="pagePopup.visible" v-on:mouseenter="pagePopup.hoveringOver = $el" v-on:mouseleave="waitClearPopup(pagePopup)">
      <h1>Page popup</h1>
    </div>
  </div>
</template>

<style>
  .bottomborder {
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }
  #pages a {
    color: #888;
  }
  #pages section {
    padding: 0 0 10px 0;
  }
  #pages {
    padding: 10px;
  }
  #pages .actions a {
    width: 25%;
  }
  #pages .box {
    border: 1px solid #ccc;
  }
  #pages .indent {
    margin-left: 75px;
  }
  #pages .tabNav a {
    width: 33.3%;
    height: 34px;
    display: inline-block;
    line-height: 34px;
  }
  #pages .tabNav a.active {
    background-color: lightgray;
  }
  #pages .big {
    font-size: 26px;
  }
  #pages .twocolumn {
    width: 50%;
  }
  #pages .center {
    width: 100%;
  }
  #pages .recentPosts {
    overflow-x: hidden;
  }
  #pages ul {
    display: flex;
    width: 1500px !important;
  }
  #pages li {
    width: 250px;
    margin-right: 5px;
    padding: 10px;
  }
  #pages .right {
    float: right;
  }
</style>

<script>
import axios from 'axios';
import moment from 'moment';
import { PopupMixin } from './mixins';


export default {
  name: 'pages',
  created() {
    this.getPages();
  },
  data() {
    return {
      pages: [],
      selectedTab: 0,
      selectedPageIndex: 0,
      pagePopup: { visible: false, elementId: 'pagePopup', preferredLocation: 'left' },
    };
  },
  methods: {
    getPages() {
      axios.get('http://localhost:1234/api/pages').then((response) => {
        this.pages = response.data;
      }).catch(() => {});
    },
    getCurrentWeekRange() {
      const first = moment().startOf('week');
      const last = moment().endOf('week');
      return `${first.format('MMM D')} - ${last.format('MMM D')}`;
    },
  },
  mixins: [PopupMixin],
};
</script>

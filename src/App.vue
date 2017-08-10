<template>
  <div id="app">
    <navbar :me="me"></navbar>
    <div class="page">
      <leftnav id="leftnav" :me="me"></leftnav>
      <router-view :me="me"></router-view>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import navbar from './components/Navbar';
import leftnav from './components/Leftnav';

export default {
  name: 'app',
  created() {
    this.getLoggedInUser();
  },
  data() {
    return {
      me: undefined,
    };
  },
  components: {
    navbar, leftnav,
  },
  methods: {
    getLoggedInUser() {
      axios.get('http://localhost:1234/api/users/me').then((response) => {
        this.me = response.data;
      }).catch(() => {});
    },
  },
};
</script>

<style>
  a {
    cursor: pointer;
  }
  h1 {
    font-size: 12pt;
    font-weight: bold;
    margin-top: 10px;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  .fa {
    font-size: 12pt;
  }
  .avatar {
    float: left;
    margin-right: 10px;
  }
  .img32 {
    width: 32px;
  }
  .img40 {
    width: 40px;
  }
  .img64 {
    width: 64px;
  }
  .columns {
    display: flex;
    text-align: center;
  }
  .page {
    margin: 60px auto 0 auto;
    width: 988px;
  }
  #maincontent {
    width: 500px;
    float: left;
    margin-left: 190px;
  }
  #leftnav {
    width: 180px;
    position: fixed;
    padding-top: 10px;
  }
  #leftnav li {
    color: #666;
    cursor: pointer;
    padding: 4px 6px;
  }
  #leftnav li:hover {
    background-color: #ddd;
  }
  #leftnav .icon {
    width: 22px;
    display: inline-block;
  }
  #leftnav .header {
    text-transform: uppercase;
  }
  #rightnav {
    width: 308px;
    position: fixed;
    margin-left: 700px;
  }
  .list-group-item {
    margin-top: 10px;
    padding: 0;
    position: relative; 
    display: block;
    margin-bottom: -1px;
    border: 1px solid #ddd;
    padding: 10px 15px;
  }
  .miniprofile {
    width: 24px;
  }
  .date > a {
    color: #999;
  }
  .date {
    font-size: 12px;
  }
  .popup {
    z-index: 10000;
    border: 1px solid #ddd;
    position: absolute;
    background-color: #fff;
  }
  .description {
    color: #222;
  }
  .grey {
    color: #888;
  }
</style>

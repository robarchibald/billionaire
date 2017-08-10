<template>
  <ul class="list-group">
    <li class="list-group-item" v-for="source in sources">
      <div class="row">
        <label class="col-md-3">Account ID</label>
        <span class="col-md-9">{{account.account_id}}</span>
      </div>
      <div class="row">
        <label class="col-md-3">Status</label>
        <span class="col-md-3">{{account.status}}</span>
        <label class="col-md-3">Type</label>
        <span class="col-md-3">{{account.customer_type}}</span>
      </div>
      <h3>Applicants</h3>
      <div v-for="applicant in account.applicants">
        <div class="row">
          <label class="col-md-3">Applicant ID</label>
          <span class="col-md-9">{{applicant.applicant_id}}</span>
        </div>
        <div class="row">
          <label class="col-md-3">Name</label>
          <span class="col-md-3">{{applicant.name.first}} {{applicant.name.last}}</span>
        </div>
        <div class="row">
          <label class="col-md-3">Email</label><span class="col-md-3">{{applicant.email}}</span>
        </div>
        <div class="row">
          <label class="col-md-3">Mobile #</label><span class="col-md-3">{{applicant.mobile}}</span>
        </div>
        <div class="row">
          <label class="col-md-3">Address</label>
          <div class="col-md-9">
            <div>{{applicant.address.line_1}}</div>
            <div>{{applicant.address.city}}, {{applicant.address.state}} {{applicant.address.postal_code}}</div>
          </div>
        </div>
      </div>
    </li>
    <li class="list-group-item">
      <div>
        <h2>New Funding Source</h2>
      </div>
      <form>
        <div class="row">
          <label class="col-md-6">Label</label><input class="col-md-6" :value="label"/>
        </div>
        <div class="row">
          <label class="col-md-6">Type</label>
          <select v-model="fundingType" class="col-md-6">
              <option>ach</option>
              <option>wire</option>
          </select>
        </div>
        <input type="button" value="Create Source" v-on:click="createSource"/>
      </form>
    </li>
  </ul>
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


export default {
  name: 'pages',
  created() {
    this.getSources();
  },
  data() {
    return {
      sources: [],
    };
  },
  methods: {
    getSources() {
      axios.get(`http://localhost:1234/api/accounts/${this.accountID}/sources`).then((response) => {
        this.sources = response.data.items;
      }).catch(() => {});
    },
    createSource() {
      alert('not working yet');
    },
  },
  props: ['accountID'],
};
</script>

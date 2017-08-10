<template>
  <div>
    <ul v-if="me">
      <li><span class="icon"><img class="miniprofile" :src="me.picture"/></span> 
          {{me.name}}</li>
    </ul>
    <div class="header">Shortcuts</div>
    <ul>
      <router-link to="accounts"><li><img src="static/images/accounts.png" class="img20"/> Accounts</li></router-link>
      <router-link to="portfolio"><li><img src="static/images/portfolio.png" class="img20"/> Portfolio</li></router-link>
      <router-link to="orders"><li><img src="static/images/orders.png" class="img20"/> Orders</li></router-link>
      <router-link to="marketData"><li><img src="static/images/market.png" class="img20"/> Market Data</li></router-link>
    </ul>
  </div>
</template>

<style>
  .img20 {
    width: 20px;
  }
</style>

<script>
export default {
  name: 'shortcuts',
  props: ['me'],
};
</script>

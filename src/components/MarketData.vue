<template>
  <div>
    <marketDetail id="maincontent"></marketDetail>
    <div id="rightnav">
      <div class="list-group-item">
        Cool market info
      </div>
    </div>
  </div>
</template>

<script>
import marketDetail from './MarketDetail';
import pages from './Pages';
import trending from './Trending';

export default {
  name: 'marketData',
  components: {
    marketDetail, pages, trending,
  },
};
</script>

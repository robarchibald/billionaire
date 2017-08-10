<template>
  <div>
    <portfolioDetail id="maincontent"></portfolioDetail>
    <div id="rightnav">
      <div class="list-group-item">
        Cool order info
      </div>
    </div>
  </div>
</template>

<script>
import portfolioDetail from './PortfolioDetail';

export default {
  name: 'portfolio',
  components: {
    portfolioDetail,
  },
};
</script>

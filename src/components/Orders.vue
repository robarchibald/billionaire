<template>
  <div>
    <orderDetail id="maincontent"></orderDetail>
    <div id="rightnav">
      <div class="list-group-item">
        Cool order info
      </div>
    </div>
  </div>
</template>

<script>
import orderDetail from './OrderDetail';

export default {
  name: 'orders',
  components: {
    orderDetail,
  },
};
</script>

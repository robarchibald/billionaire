<template>
  <div>
    <accountDetail id="maincontent"></accountDetail>
    <div id="rightnav">
      <funding accountID="09304533-814c-42f9-9049-942e6167b331"></funding>
    </div>
  </div>
</template>

<script>
import accountDetail from './AccountDetail';
import funding from './Funding';

export default {
  name: 'accounts',
  components: {
    accountDetail, funding,
  },
};
</script>

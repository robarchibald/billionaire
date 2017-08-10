<template>
  <div>
    <ul class="list-group">
      <li class="list-group-item">
      Market Detail
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import { PopupMixin, ImagePrefixMixin } from './mixins';
import { truncate } from './filters';

export default {
  name: 'marketDetail',
  components: { truncate },
  data() {
    return {
      page: 0,
      feed: [],
      selected: {},
    };
  },
  methods: {
    getFeed() {
      this.page += 1;
      axios.get(`http://localhost:1234/api/feed/${this.page}`).then((response) => {
        this.feed.push(...response.data);
        this.error = undefined;
        // TODO: Remove
        this.selected = this.feed[0];
      }).catch(() => {});
    },
  },
  mixins: [PopupMixin, ImagePrefixMixin],
};
</script>

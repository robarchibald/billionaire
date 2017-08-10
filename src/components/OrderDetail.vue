<template>
  <div>
    <ul class="list-group">
      <li class="list-group-item">
        Order Detail
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import { PopupMixin, ImagePrefixMixin } from './mixins';
import { truncate } from './filters';

export default {
  name: 'feed',
  created() {
    window.addEventListener('scroll', this.infiniteScroll);
    this.getFeed();
  },
  destroyed() {
    window.removeEventListener('scroll', this.infiniteScroll);
  },
  components: { truncate },
  data() {
    return {
      page: 0,
      feed: [],
      selected: {},
      cardPopup: { visible: false, elementId: 'cardPopup' },
      reactPopup: { visible: false, elementId: 'reactPopup', preferredLocation: 'top' },
      getFeedOnce: this.debounce(this.getFeed, 500, true),
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
    getDocHeight() { // calculates document height same way as jquery does
      const body = document.body;
      const html = document.documentElement;
      return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,
        html.scrollHeight, html.offsetHeight);
    },
    infiniteScroll() { // fetch data when < 200 px from bottom
      if (window.pageYOffset + window.innerHeight >= this.getDocHeight() - 200) {
        this.getFeedOnce();
      }
    },
    debounce(callback, wait, immediate) {
      let timeout;
      return function debounceInner(...args) {
        const context = this;
        const later = () => {
          timeout = null;
          if (!immediate) callback.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) callback.apply(context, args);
      };
    },
  },
  mixins: [PopupMixin, ImagePrefixMixin],
};
</script>

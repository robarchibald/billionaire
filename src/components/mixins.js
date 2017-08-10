import Vue from 'vue';

export const PopupMixin = Vue.extend({
  methods: {
    waitPopup(el, data, config) {
      config.hoveringOver = el;
      this.selected = data;
      const delay = config.inDelay || 750;
      setTimeout(this.showPopup(el, config), delay);
    },
    waitClearPopup(config) {
      config.hoveringOver = undefined;
      const delay = config.outDelay || 750;
      setTimeout(this.clearPopup(config), delay);
    },
    clearPopup(config) {
      return function clearPopup() {
        if (!config.hoveringOver) {
          config.visible = false;
        }
      };
    },
    showPopup(el, config) {
      return function showPopup() {
        if (config.hoveringOver !== el) {  // not same element so exit
          return;
        }
        if (!config.popupElement) { // initialize popupElement and parentElement properties
          const popup = document.getElementById(config.elementId);
          let parent = popup.parentElement;
          let parentStyle = window.getComputedStyle(parent);
          // find the parent element which the popup will be positioned based on
          while (parent.parentElement && parentStyle.position === 'static') {
            parent = parent.parentElement;
            parentStyle = window.getComputedStyle(parent);
          }
          config.popupElement = popup;
          config.parentElement = parent;
        }

        const headerHeight = 50;
        const margin = 20;
        config.visible = true;

        // run on next tick so that popup will already be visible. Otherwise the height of the rectangle is 0
        Vue.nextTick(() => {
          const rect = el.getBoundingClientRect();
          const parentRect = config.parentElement.getBoundingClientRect();
          const popupRect = config.popupElement.getBoundingClientRect();
          const topAbove = rect.top - parentRect.top - popupRect.height - margin;
          const topBelow = (rect.bottom - parentRect.top) + margin;
          let top;
          let left;
          switch (config.preferredLocation) {
            case 'top': {
              const hasSpaceAbove = rect.top - headerHeight > margin + popupRect.height;
              top = hasSpaceAbove ? topAbove : topBelow;
              left = rect.left - parentRect.left;
              break;
            }
            case 'left':
              top = rect.top - parentRect.top;
              left = rect.left - parentRect.left - popupRect.width;
              break;
            default: {
              const isAboveCenter = window.innerHeight - rect.bottom <= rect.top - headerHeight;
              top = isAboveCenter ? topAbove : topBelow;
              left = rect.left - parentRect.left;
            }
          }
          config.popupElement.style.top = `${top}px`;
          config.popupElement.style.left = `${left}px`;
        });
      };
    },
  },
});

export const ImagePrefixMixin = Vue.extend({
  data() {
    return {
      medPrefix: 'https://randomuser.me/api/portraits/med/',
      largePrefix: 'https://randomuser.me/api/portraits/',
      thumbPrefix: 'https://randomuser.me/api/portraits/thumb/',
    };
  },
});

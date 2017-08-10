import Vue from 'vue';
import moment from 'moment';

export const relativeDate = Vue.filter('relativeDate', (value) => {
  if (value) {
    return moment(String(value)).fromNow();
  }
  return '';
});

export const formatDate = Vue.filter('formatDate', (value) => {
  if (value) {
    return moment(String(value)).format('dddd MMMM Do, YYYY [at] h:mma');
  }
  return '';
});

export const truncate = Vue.filter('truncate', (value, length = 480) => {
  if (value) {
    return value.length > length ? `${value.substring(0, length)}...` : value;
  }
  return '';
});

export const urlDomain = Vue.filter('urlDomain', (value) => {
  if (value) {
    const domainStart = value.indexOf('//') + 2;
    return value.substring(domainStart, value.indexOf('/', domainStart));
  }
  return '';
});

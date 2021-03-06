
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import Vuex from 'vuex';

Vue.use(Vuex);
import Autocomplete from 'v-autocomplete'
import 'v-autocomplete/dist/v-autocomplete.css'
Vue.use(Autocomplete)
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
Vue.component('conversation-form', require('./components/forms/ConversationForm.vue'));
Vue.component('conversation-reply-form', require('./components/forms/ConversationReplyForm.vue'));
Vue.component('conversation-add-user-form', require('./components/forms/ConversationAddUserForm.vue'));
Vue.component('conversation-dashboard', require('./components/ConversationDashboard.vue'));
Vue.component('conversations', require('./components/Conversations.vue'));
Vue.component('conversation', require('./components/Conversation.vue'));
Vue.component('autocomplete', require('./components/Autocomplete.vue'));
Vue.component('item-template', require('./components/AutocompleteItem.vue'));
Vue.component('message-area', require('./components/forms/MessageArea.vue'));


import store from './store/index'

const app = new Vue({
    el: '#app',
    store
});

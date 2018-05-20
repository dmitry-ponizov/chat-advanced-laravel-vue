import api from '../api/all';

const state = {
    conversation: null,
    loadingConversation: false
};

const getters = {
    currentConversation: state => {
        return state.conversation;
    },
    loadingConversation: state => {
        return state.loadingConversation
    }
};

const actions = {
    getConversation({dispatch, commit}, id) {
        commit('setConversationLoading', true);
        api.getConversation(id).then((response) => {
            commit('setConversation', response.data.data);
            commit('setConversationLoading', false);

            window.history.pushState(null, null, '/conversations/' + id);
        });
    },
    createConversationReply({dispatch, commit}, {id, body}) {
        return api.storeConversationReply(id, {
            body: body
        }).then( ({data}) => {
            commit('appendToConversation', data.data);
            commit('prependToConversations',data.data.parent.data)
        })
    }
};

const mutations = {
    setConversation(state, payload) {
        state.conversation = payload;
    },
    setConversationLoading(state, status) {
        state.loadingConversations = status;
    },
    appendToConversation(state, payload) {
        state.conversation.replies.data.unshift(payload)
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}
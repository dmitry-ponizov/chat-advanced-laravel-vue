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

            if(state.conversation){
                Echo.leave('conversation.'+ state.conversation.id);
            }
            Echo.private('conversation.' + id)
                .listen('ConversationReplyCreated', (e) => {
                    commit('appendToConversation', e.data)
                })
                .listen('ConversationUsersCreated', (e) => {
                    commit('updateUsersInConversation', e.data.users.data)
                });

            window.history.pushState(null, null, '/conversations/' + id);
        });
    },
    createConversationReply({dispatch, commit}, {id, body}) {
        return api.storeConversationReply(id, {
            body: body
        }).then( ({data}) => {
            commit('appendToConversation', data.data)
            commit('prependToConversations', data.data.parent.data)
        })
    },
    createConversation ({dispatch, commit}, {body,recipientIds}) {
        return api.storeConversation({
            body: body,
            recipients:recipientIds
        }).then( ({data}) => {
            dispatch('getConversation', data.data.id);
            commit('prependToConversations', data.data)
        })
    },
    addConversationUsers({dispatch, commit},{id, recipientIds}){
        return api.storeConversationUsers(id,{
            recipientIds: recipientIds
        }).then(({ data }) => {
            commit('updateUsersInConversation', data.data.users.data)
            commit('updateConversationInList', data.data)
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
    },
    updateUsersInConversation (state, users) {
        state.conversation.users.data = users
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}
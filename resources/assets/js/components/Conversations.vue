<template>
    <div class="card card-default">
        <div class="card-header">
            All conversations
        </div>
        <div class="card-body">
            <div v-if="loading" class="loader"></div>
            <div class="media" v-for="conversation in conversations" v-else-if="conversations.length">
                <div class="media-body">
                    <a href="#" @click.prevent="getConversation(conversation.id)">{{ trunc(conversation.body,50) }}</a>
                    <p class="text-muted">
                        You and {{ conversation.participant_count }} {{ pluralize('other',conversation.participant_count
                        ) }}
                    </p>
                    <ul class="list-inline">
                        <li>
                            <img :src="user.avatar" :title="user.name" v-for="user in conversation.users.data" alt="">
                        </li>
                        <li>
                            Last reply {{ conversation.last_reply_human }}
                        </li>
                    </ul>
                </div>
            </div>
            <div v-else>No conversations</div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import trunc from '../helpers/trunc'
    import pluralize from 'pluralize'

    export default {
        computed: mapGetters({
            conversations: 'allConversations',
            loading: 'loadingConversations'
        }),
        methods: {
            ...mapActions([
                'getConversations',
                'getConversation'
            ]),
            trunc: trunc,
            pluralize: pluralize
        },
        mounted() {
            this.getConversations(1)
        }
    }
</script>

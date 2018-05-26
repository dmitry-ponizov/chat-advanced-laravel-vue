<template>
    <form action="">
        <div class="form-group">
            <autocomplete @send="send"/>
        </div>
    </form>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    export default {
        methods:{
            ...mapActions([
                'addConversationUsers'
            ]),
            send(recipients){
                this.addConversationUsers({
                    id: this.conversation.id,
                    recipientIds: recipients.map(recipient=>{
                        return recipient.id;
                    })
                })
            }
        },
        computed:mapGetters({
            conversation: 'currentConversation',

        }),

    }
</script>


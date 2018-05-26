<template>
    <div>
        <div class="card">
            <div class="card-header">
                New message
            </div>
            <div class="card-body">
                <div class="form-group">
                    <autocomplete ref="autocomplete" />
                    <message-area ref="message"/>
                    <div class="form-group">
                        <button class="btn btn-light" @click="onSubmit" >Send</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    export default {
        data(){
            return {
                body:null,
                recipients: null
            }
        },
        methods:{
            ...mapActions([
                'createConversation'
            ]),
            onSubmit(){
                let recipients = this.$refs.autocomplete.recipients;
                let body = this.$refs.message.body;
                this.createConversation({
                    recipientIds: recipients.map((r) => {
                        return r.id;
                    }),
                    body: body
                }).then(() => {
                    this.$refs.autocomplete.recipients = [];
                    this.$refs.message.body = null;
                })
            }
        }
    }
</script>

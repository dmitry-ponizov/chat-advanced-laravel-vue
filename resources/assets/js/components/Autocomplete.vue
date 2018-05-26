<template>
    <div class="autocomplete">
            <input class="form-control" placeholder="Start typing to find ..." type="text" v-model="search">
            <ul class="list-group search_result">
                <autocomplete-item @selectItem="selectItem" v-for="(item,index) in items" :item="item" :key="index"/>
            </ul>
            <ul v-if="recipients.length" class="list-inline">
                <li class="list-inline-item"><strong>To:</strong></li>
                <li class="list-inline-item" v-for="recipient in recipients">{{ recipient.name }}
                    [<a href="#" @click.prevent="removeRecipient(recipient)">x</a>]
                </li>
            </ul>
    </div>
</template>
<script>
    import AutocompleteItem from './AutocompleteItem'
    export default {

        components: {AutocompleteItem},
        data() {
            return {
                recipients: [],
                search: '',
                items: [],
                count: 3,
                result: [],
                endpoint: '/get-users'
            }
        },
        watch: {
            search(newValue, oldValue) {
                this.handler(newValue);
            }
        },
        methods: {
            handler(query) {
                if (query.length >= this.count) {
                    this.getData(query);
                    this.find(query);
                } else {
                    this.items = [];
                    this.result = [];
                }
            },
            getData(query) {
                if (query.length === this.count && this.items.length === 0) {
                    axios.post(this.endpoint, {
                        search: query
                    }).then(response => {
                        this.result = response.data;
                        this.find(query);
                    });
                }
            },
            find(query) {
                this.items = this.result.filter(item => {
                    return (new RegExp(query.toLowerCase())).test(item.name.toLowerCase())
                });
            },
            selectItem(item) {
                this.search = '';
                this.result = [];
                this.addRecipient(item);
            },
            addRecipient(item) {
                let existing = this.recipients.find(f => {
                    return f.id === item.id;
                });
                if (!!existing) {
                    return;
                }
                this.recipients.push(item);

                this.$emit('send', this.recipients)
            },
            removeRecipient(recipient) {
                this.recipients = this.recipients.filter(r => {
                    return r.id !== recipient.id;
                });
            }
        }
    }
</script>

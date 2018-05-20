<template>
    <li @click="selectItem" class="list-group-item" >
        {{ item.name }}
    </li>
</template>

<script>
    export default {
        props: {
            item: { required: true },
        },
        methods:{
            selectItem(){
                this.$emit('selectItem',this.item);
            }
        }
    }
</script>
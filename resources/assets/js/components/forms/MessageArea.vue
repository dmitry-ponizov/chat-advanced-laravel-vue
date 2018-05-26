<template>
    <div class="form-group">
        <label for="message">Message</label>
        <textarea name="" id="message" cols="30" rows="4" v-model="body" class="form-control"></textarea>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                body:null
            }
        }
    }
</script>


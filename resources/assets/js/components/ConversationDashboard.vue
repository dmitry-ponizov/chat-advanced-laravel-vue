<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-sm-5">
                <conversation-form />
                <conversations />
            </div>
            <div class="col-sm-7">
                <conversation :id="id" />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            'id': {
                 default: null
            }
        }
    }
</script>

<script>
export default {
    name: "avatar",
    data() {
        return {
            image: "http://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
        }
    }
}
</script>

<template>
<img :src=image class="rounded-circle" alt="Avatar"/>
</template>

<style>
.rounded-circle {
    width:50px
}
</style>
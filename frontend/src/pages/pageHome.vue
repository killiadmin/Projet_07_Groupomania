<script>
import card from "../components/uiCard.vue"
import postCard from "./pagePostCard.vue"
export default {
    name: "pageHome",
    components : {
        card,
        postCard
    }
}
</script>

<template>
<div class="container">
    <postCard></postCard>
        <card></card>
    </div>
</template>

<style>

</style>
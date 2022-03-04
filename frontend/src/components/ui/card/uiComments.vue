<script>
import avatar from "../uiAvatar.vue"
    export default {
        name: "comments",
        data() {
            return {
                responsePost: [{
                username: "Sylvie",
                name: "Duriff",
                postMessage: "Trop cool, j'adore !" ,    
            }, {
                username: "Sylvain",
                name: "Poiti",
                postMessage: "Combien de temps cela devrait prendre ?",    
            },{
                username: "Thibault",
                name: "Paleau",
                postMessage: "Bonne journée à toi!",    
            }
            ]}
        },
        components: {
            avatar
        }}
</script>

<template>
    <div class="d-flex comment" v-for="(comment, idx) in responsePost" v-bind:key="idx">
        <div class="user d-flex align-items-center">
            <avatar></avatar>
            <div class="d-flex flex-column">
                <p class="fw-bold">{{ comment.name}} {{comment.username}}: </p>
                <p>{{ comment.postMessage }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>

.user{
    gap: 10px;
}
.flex-column {
    background-color: lightgrey;
    border-radius: 10px;
    width: 100%;
    padding: 5px;
    margin-top:10px;
}
.rounded-circle {
    width:50px
}
</style>
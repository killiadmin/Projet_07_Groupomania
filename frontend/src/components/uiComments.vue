<script>
import avatar from "./uiAvatar.vue";
import axios from "axios";

    export default {
        name: "comments",
        data() {
            return {
                userId: localStorage.getItem("userId"),
                token: localStorage.getItem("token"),
                postId: "",
                body: "",
                comment: {},
                comments: [],
            };
        },
        components: {
            avatar
        }
        }
</script>

<template>
    <div class="d-flex comment" v-for="(comment, idx) in responsePost" v-bind:key="idx">
        <div class="user d-flex align-items-center">
            <avatar></avatar>
            <div class="d-flex flex-column">
                    <p class="fw-bold">{{ comment.name}} {{comment.username}}: </p>
                <p>{{ comment.postMessage }}</p>
                <div class="form-floating">
                    <input type="text">
                </div>
            </div>
                <a href="#" class="btn btn-light" >Modifier</a>
                <a href="#" class="btn btn-success" >Valider</a>
                <a href="#" class="btn btn-light">Supprimer</a>
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
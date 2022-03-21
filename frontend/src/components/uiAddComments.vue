<script>
import axios from "axios";

export default {
    name: "addComments",
    data(){
        return {
            userId: localStorage.getItem("userId"),
            token: localStorage.getItem("token"),
            postId: "",
            body:"",
            comment: {},
            comments: [],
        };
    },
    methods: {
        postComment() {
            axios.get("http://localhost:5000/api/comments", {
                headers: {
                    Authorization: "Bearer " + this.token,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
            this.comments = response.data.comments;
            console.log(PostId);
            })
            .catch((error) => console.error(error))
        }
    },
    //     postComment(){
//         console.log(this.userId)
            //         // axios.post(`http://localhost:5000/api/comments/${this.userId}`, {
    //         //     userId: localStorage.getItem("userId"),
    //         //     postId: this.$refs.comment.id,
    //         //     body: this.$refs.body.value,

    //         //     headers: {
    //         //         "Content-Type": "application/json",
    //         //         Authorization: "Bearer " + this.token,
    //         //     },
    //         // })
    //         // .then((response) => {console.log(response)})
    //         // .catch((error) => console.error(error))
    //         console.log("test")
    }
</script>

<template>
    <input type="text" class="form-control" placeholder="Commentaire"/>
        <a href="#" class="btn btn-warning" @click.prevent="postComment()">Envoyer</a>
</template>

<style></style>
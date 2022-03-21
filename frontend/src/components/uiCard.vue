<script>
import comments from "./uiComments.vue";
import avatar from "./uiAvatar.vue";
import axios from "axios";
import addComments from "./uiAddComments.vue"
import postCard from "../pages/pagePostCard.vue"
import moment from "moment"


export default {
    name: "card",
    components: {
        avatar,
        comments,
        addComments,
        postCard
    },
    data() {
        return {
            userId: localStorage.getItem("userId"),
            token: localStorage.getItem("token"),
            users : [],
            user: {
                id: localStorage.getItem("userId"),
                admin: localStorage.getItem("admin")
            },
            postId:"",
            body:"",
            post:{},
            posts:[],
            comment: '',
            comments: [],
      };
    },
    methods: {
        dateFormat(date){
            if(date) {
                return moment(date).format('DD/MM/YYYY à hh:mm a')
            }
        },
        async deletePost(id) {
            let confirmDeletepost = confirm("Voulez-vous vraiment supprimer cette publication?");

            if (confirmDeletepost == true) {
                await axios
                    .delete(`http://localhost:5000/api/posts/${id}`, {
                        headers: {
                            Authorization: "Bearer " + this.token,
                     },
            })
            .then((response) => {
                let i = this.posts.map((data) => data.id).indexOf(id);
                this.posts.slice(i, 1);
                console.log(response)
            });
            } else {
                return;
            }
        },
        async deleteComment(id) {
            let confirmDeleteComment = confirm("Voulez-vous vraiment supprimer ce commentaire?");
            if (confirmDeleteComment == true) {
                await axios
                    .delete(`http://localhost:5000/api/comments/${id}`, {
                        headers: {
                            Authorization: "Bearer " + this.token,
                            "Content-Type": "application/json",
                        },
                    })
                    .then(() => {
                        let i = this.comments.map((data) => data.id).indexOf(id);
                        this.comments.splice(i, 1);
                    });
            } else {
                return;
            }
        }
    },
        mounted: function (){
        axios.get("http://localhost:5000/api/users", {
            headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json",
        },
        })
        .then((response) => {
            this.users = response.data;
            console.log(this.users)
        })
        .catch((error) => console.error(error))

        axios
        .get(`http://localhost:5000/api/users/${this.userId}`, {
            headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            this.user = response.data;
            console.log(this.user)
            });

        axios.get("http://localhost:5000/api/posts", {
            headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
        this.posts = response.data;
        console.log(this.posts)
        })
        .catch((error) => console.error(error))

        axios.get("http://localhost:5000/api/comments", {
            headers : {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            this.comments = response.data;
            console.log(this.comments)
        })
        .catch((error) => console.error(error))
        },

}

    
</script>

<template>
<div class="container article" v-for="post in posts" v-bind:key="post.id">
    <div class="card m-auto">
        <div class="card-header d-flex fw-bold" >{{ post.User.firstname }} {{ post.User.lastname }}
            <img v-if="post.User.imageUrl !== null" :src=post.User.imageUrl class="rounded-circle" alt="Avatar"/>
            <img v-else src="http://localhost:5000/images/DEFAULT.png" class="rounded-circle" alt="Avatar"/>
                <div>
                    <span class="display-date fw-light">Publié le : {{ dateFormat(post.createdAt) }}</span>
                </div>
            <div class="d-flex">
                <!-- <a href="#" class="btn btn-light">Modifier</a> -->
                <a href="#" class="btn btn-danger btn-delete" v-if="user.admin == true || post.User.id == userId " @click.prevent="deletePost(post.id)">Supprimer</a>
                <a href="#" class="btn btn-danger btn-responsive" v-if="user.admin == true || post.User.id == userId " @click.prevent="deletePost(post.id)">X</a>
            </div>
        </div>
      <div class="form-floating" v-if="post.imageUrl !== null">
          <img :src=post.imageUrl class="card-img-top" alt="...">
          </div>
      <div class="card-body">
        <p class="card-text border-bottom">{{ post.body }}</p>
        <div class="container">
            
            <div class="d-flex comment" v-for="comment in comments" v-bind:key="comment.id">
         {{ post.id }} {{ comment }}
        <div v-if="post.id == comment.postId" class="user d-flex align-items-center">
            
            <img :src=post.User.imageUrl class="rounded-circle" alt="Avatar"/>
            <div class="d-flex flex-column">
                    <p class="fw-bold">{{  }} {{ post.User.firstname }}: </p>
                <p>{{ comment.body }}</p>
            </div>
                <a href="#" class="btn btn-light" v-if="comment.userId == user.id || user.admin == 'true'" @click.prevent="deleteComment(comment.id)">Supprimer</a>
        </div>
    </div>
        </div>
        <div class="d-flex">
            <addComments></addComments>
        </div>
      </div>
    </div>
</div>
</template>

<style scoped>

input{
    margin-left: 5px;
}

.container {
    margin-top: 20px;
    width:60%;
}

.bloc_like{
    border: 1px solid red;
    height:10px
}


.card-header{
    align-items: center;
    justify-content: space-between;
}

.btn-responsive{
    display: none
}

@media (max-width: 767px) {
    .container{
        width: 100%;
    }
    .btn-delete {
        display: none;
    }
    .btn-responsive{
        display: block;
    }

    .rounded-circle {
        display: none;
    }
}

</style>
<script>
import axios from "axios";
import moment from "moment";

export default {
    name: "card",
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
            comment: {},
            comments: [],
            bodyComment: "",
            error: ""
      };
    },
    methods: {
        dateFormat(date){
            if(date) {
                return moment(date).format('DD/MM/YYYY à hh:mm a')
            }
        },
        /**
         * Fonction DELETE executer avec axios, qui fait un appel backend pour supprimer un post après confirmation de l'utilisateur
         */
        async deletePost(id) {
            let confirmDeletepost = confirm("Voulez-vous vraiment supprimer cette publication?");

            if (confirmDeletepost == true) {
                await axios
                    .delete(`http://localhost:5000/api/posts/${id}`, {
                        headers: {
                            Authorization: "Bearer " + this.token,
                     },
            })
            .then(() => {
            let i = this.posts.map((data) => data.id).indexOf(id);
            this.posts.splice(i, 1);
            })
            .catch((error) => console.error(error))
            } else {
                return;
            }
        },
        /**
         * Fonction DELETE executer avec axios, qui fait un appel backend pour supprimer un commentaire après confirmation de l'utilisateur
         */
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
        },
        /**
         * Fonction POST executer avec axios, qui fait un appel backend pour poster un commentaire
         */
        async postComment(id) {
            const postId = id
            const data = {
                UserId: this.userId,
                PostId: postId, 
                body: this.bodyComment }

            if (this.bodyComment != "") {
                await axios.post(`http://localhost:5000/api/comments/${postId}`, data,  {
                    headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json",
              },
                })
                .then(() => {
                    window.location.reload();
                    this.bodyComment = ""
                })
                .catch((error) => console.error(error))
            } else {
                alert("Vous n'avez rien saisie dans la section commentaire!")
            }
        },
        async getComment() {
            await axios.get("http://localhost:5000/api/comments", {
            headers : {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            this.comments = response.data.comments;
        })
        .catch((error) => console.error(error))
        },
    },
    beforeMount: function() {
        if(!localStorage.getItem("userId")){
            this.$router.push('/');
        }
    },
    /**
     * Fonction GET executer avec axios, qui fait un appel backend pour accéder aux données d'utilisateurs
     */
        mounted: function (){
            const userId = localStorage.getItem("userId")
            const token = localStorage.getItem("token")
            if(userId && token) {
                axios.get("http://localhost:5000/api/users", {
                    headers: {
                        Authorization: "Bearer " + this.token,
                        "Content-Type": "application/json",
                },
                })
                .then((response) => {
                    this.users = response.data;
                })
                .catch((error) => {
            if (error.response.status === 401) {
                localStorage.clear();
                this.$router.push();
                window.location.reload();
            } else {
                console.error(error)
            }})            
        /**
         * Fonction GET executer avec axios, qui fait un appel backend pour accéder aux données d'un utilisateur
         */
        axios
        .get(`http://localhost:5000/api/users/${this.userId}`, {
            headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            this.user = response.data;
            })
        .catch((error) => {
            if (error.response.status === 401) {
                localStorage.clear();
                this.$router.push();
                window.location.reload();
            } else {
                console.error(error)
            }})            
        /**
         * Fonction GET executer avec axios, qui fait un appel backend pour accéder à la BDD et afficher les posts
         */

        axios.get("http://localhost:5000/api/posts", {
            headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
        this.posts = response.data;
        })
        .catch((error) => {
            if (error.response.status === 401) {
                localStorage.clear();
                this.$router.push();
                window.location.reload();
            } else {
                console.error(error)
            }})            
        /**
         * Fonction GET executer avec axios, qui fait un appel backend pour accéder aux commentaires et afficher les commentaires
         */
        axios.get("http://localhost:5000/api/comments", {
            headers : {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            this.comments = response.data.comments;
        })
        .catch((error) => {
            if (error.response.status === 401) {
                localStorage.clear();
                this.$router.push();
                window.location.reload();
            } else {
                console.error(error)
            }})            
            }
        },
}
</script>

<template>
<div class="container__connected">
    <div>Vous êtes connecté en tant que : 
        <p class="fw-bold bloc__connected">{{ user.firstname }} {{ user.lastname }}</p>
    </div>
</div>
<div class="container article" v-for="post in posts" v-bind:key="post.id">
    <div class="card m-auto">
        <div class="card-header d-flex fw-bold" >{{ post.User.firstname }} {{ post.User.lastname }}
            <img v-if="post.User.imageUrl !== null" :src=post.User.imageUrl class="rounded-circle" alt="Avatar"/>
            <img v-else src="http://localhost:5000/images/public/DEFAULT.png" class="rounded-circle" alt="Avatar"/>
                <div>
                    <span class="display-date fw-light">Publié le : {{ dateFormat(post.createdAt) }}</span>
                </div>
            <div class="d-flex">
                <a href="#" class="btn btn-danger btn-delete" v-if="user.admin == true || post.User.id == userId " @click.prevent="deletePost(post.id)">Supprimer</a>
                <a href="#" class="btn btn-danger btn-responsive" v-if="user.admin == true || post.User.id == userId " @click.prevent="deletePost(post.id)"><fa icon="trash-can" /></a>
            </div>
        </div>
      <div class="form-floating" v-if="post.imageUrl !== null">
          <img :src=post.imageUrl class="card-img-top" alt="...">
          </div>
      <div class="card-body">
        <p class="card-text border-bottom">{{ post.body }}</p>
        <div class="container">           
            <div class="d-flex comment" v-for="comment in comments" v-bind:key="comment.id">
        <div v-if="post.id === comment.postId" class="user d-flex align-items-center">    
            <div class="d-flex flex-column" >
                <div class="bloc__users" v-for="user in users" v-bind:key="user.id">
                <img v-if="user.id === comment.User.id && user.imageUrl !== null" :src=user.imageUrl class="rounded-circle image__comment" alt="Avatar"/>
                    <p class="fw-bold" v-if="user.id === comment.userId">{{ user.firstname }} {{ user.lastname }} :</p>                    
                </div>
                <p>{{ comment.body }}</p>
            </div>
                <a href="#" class="btn btn-danger btn-delete" v-if="comment.userId == user.id || user.admin == true" @click.prevent="deleteComment(comment.id)">Supprimer</a>
                <a href="#" class="btn btn-danger btn-responsive" v-if="comment.userId == user.id || user.admin == true" @click.prevent="deleteComment(comment.id)"><fa icon="trash-can" /></a>
                {{ dateFormat(comment.createdAt) }}
        </div>
    </div>
        </div>
        <div class="d-flex justify-content-end">
            <a href="#" class="btn btn-warning btn-delete" @click.prevent="postComment(post.id)">Poster votre commentaire ici !</a>
            <a href="#" class="btn btn-warning btn-responsive" @click.prevent="postComment(post.id)"><fa icon="share" /></a>
        </div>
      </div>
    </div>
</div>
<div class="container__comment">
    <div class="bloc__comment">
        <p>Votre espace commentaire :</p>
    <input id="bodyComment" v-model="bodyComment" type="text" class="form-control" placeholder="Votre commentaire ..."/>
    </div>
</div>
</template>

<style scoped>

input{
    margin-left: 5px;
}

.container__comment{
    height:120px;
}

.bloc__comment{
    position:fixed;
    bottom: 10px;
    width: 500px;
    padding: 10px;
    right: 0;
    left: 0;
    background-color: #f9815c;
    color: white;
    border-radius:20px;
    box-shadow: 1px 1px 10px #000000;
    margin: auto;
}

.article {
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

.user{
    gap: 15px;
}

.rounded-circle{
    width: 50px;
}

.container__connected{
    padding: 10px;
    color: black;
}

.bloc__connected{
    background-color:#198754;
    color: white;
    width:20%;
    text-align: center
}

@media (max-width: 992px) {
    .container{
        width: 70%;
    }
    .bloc__comment{
        width:400px;
    }
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

    .image__comment {
        width: 25px;
    }
    .bloc__connected{
        width:50%;
    }
    .bloc__comment{
        width:300px;
    }
}

</style>
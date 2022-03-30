<script>
    import axios from "axios";

    export default {
        name: "allUsers",
    data() {
        return{
            userId: localStorage.getItem("userId"),
            token: localStorage.getItem("token"),
            admin: localStorage.getItem("admin"),
            users : [],
            user: {}
        }
    },
    methods: {
        /**
         * Fonction DELETE executer avec axios, qui fait un appel backend pour supprimer un utilisateur,
         * la page n'est accessible que pour les admins de l'application pour gérer les utilisateurs
         */
        async deleteUser(id){
            let confirmDeleteUser = confirm("Voulez vous vraiment supprimer ce compte ?");
            if (confirmDeleteUser == true) {
                await axios.delete(`http://localhost:5000/api/users/${id}`, {
                    headers: {
                        Authorization: "Bearer " + this.token,
                        'Content-Type': 'application/json'
                },
                })
                .then((response) => {
                    console.log(response.data)
                    window.location.reload();
                })
                .catch((error) => console.error(error))
            } else {
                return;
            }
        }
    },
    
        beforeMount: function() {
        if(localStorage.getItem("admin") === 'false' || !localStorage.getItem("userId")){
            this.$router.push('/');
        };
    },
    /**
     * Fonction GET executer avec axios, qui fait un appel backend pour afficher tout les utilisateurs qui se sont isncrit sur l'appli
     */
        mounted: function (){
        axios.get("http://localhost:5000/api/users", {
            headers: {
                Authorization: "Bearer " + this.token,
                "Content-Type": "application/json",
        },
        })
        .then((response) => {
            this.users = response.data;
        })
        .catch((error) => console.error(error))
    }
    }
</script>

<template>
<div class="container">  
    <h1 class="titleAllUsers">Voici tout les utilisateurs inscrit sur Groupomania !</h1>
        <div class="bloc__allUsers" v-for="user in users" v-bind:key="user.id">
            <p class="fw-bold">Prénom : {{ user.firstname }}</p>
            <p class="fw-bold">Nom : {{ user.lastname }}</p>
            <p class="fw-bold">Email : {{ user.email}} </p>      
                <a href="#" class="btn btn-danger btn-delete" @click.prevent="deleteUser(user.id)">Supprimer</a>
        </div>
</div>
</template>

<style scoped>
    .bloc__allUsers{
        padding: 10px;
        margin: 10px;
        background-color:white;
        width: max-content;
        border-radius: 10%;
        box-shadow: 1px 1px 10px black;
    }

    .container{
        display: grid;
        place-items: center;
    }


</style>
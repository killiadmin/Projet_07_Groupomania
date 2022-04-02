<script>
    import axios from "axios";
    import moment from "moment";

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
                .catch((error) => {
                    console.error(error)
                })    
            } else {
                return;
            }
        },
        dateFormat(date){
            if(date) {
                return moment(date).format('DD/MM/YYYY')
            }
        },
    },
        beforeMount: function() {
        if(localStorage.getItem("admin") === 'false'){
            this.$router.push('/');
        };
    },
        beforeMount: function() {
            if(!localStorage.getItem("userId")){
                this.$router.push('/');
            }
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
        .catch((error) => {
            if (error.response.status === 401) {
                localStorage.clear();
                this.$router.push();
                window.location.reload();
            } else {
                console.error(error)
            }})            
    }
    }
</script>

<template>
    <h1 class="titleAllUsers">Voici tout les utilisateurs inscrit sur Groupomania !</h1>
<div class="container">  
        <div class="bloc__allUsers" v-for="user in users" v-bind:key="user.id">
            <div class="admin__true" v-if="user.admin == true">
                
                <p class="fw-bold d-flex justify-content-between">Prénom : {{ user.firstname }} <fa icon="id-card" /></p>
                <p class="fw-bold">Nom : {{ user.lastname }}</p>
                <p class="fw-bold">Email : {{ user.email}} </p>
                <p class="fw-bold">Créer le : {{ dateFormat(user.createdAt) }}</p>
                    <a href="#" class="btn btn-danger btn-delete" v-if="user.id != userId" @click.prevent="deleteUser(user.id)">Supprimer</a>
            </div>
            <div class="admin__false" v-if="user.admin == false">
                <p class="fw-bold d-flex justify-content-between">Prénom : {{ user.firstname }} <fa icon="user" /></p>
                <p class="fw-bold">Nom : {{ user.lastname }}</p>
                <p class="fw-bold">Email : {{ user.email}} </p>
                <p class="fw-bold">Créer le : {{ dateFormat(user.createdAt) }}</p>
                    <a href="#" class="btn btn-danger btn-delete" @click.prevent="deleteUser(user.id)">Supprimer</a>       
            </div>
        </div>
</div>
</template>

<style scoped>

    .titleAllUsers {
        text-align: center;
        margin:24px
    }
    .admin__false, .admin__true {
        padding: 10px;
        margin: 10px;
        background-color:white;
        width: max-content;
        border-radius: 10%;
        box-shadow: 1px 1px 10px black;
    }

    .btn-delete{
        display: flex;
        align-items: center;
        justify-content:center;
    }

    .container{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        place-items: center;
    }

    .admin__true{
        background-color: #FFF59B;
    }

    .admin__false{
        background-color: #E7F1FA;
    }

    @media (max-width: 700px) {
        .container {
                    grid-template-columns: repeat(1, 1fr);

        }
    }

</style>
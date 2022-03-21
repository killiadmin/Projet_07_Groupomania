<script>
import axios from "axios";
import avatar from "../components/uiAvatar.vue";

export default{
    name: "pageProfil",
    // mounted: function() {
    //     if(this.$store.state.user.userId == -1){
    //         this.$router.push('/');
    //         return;
    //     }
    //     console.log(this.$store.state.user.id)
    //     this.$store.dispatch('getUserInfos');
        
    // },
    data() {
        return {
            user: {
            id: localStorage.getItem('userId'),
            admin: localStorage.getItem('admin'),
            firstname: "",
            lastname:"",
            email:"",
            imageUrl:"",
            image:""
            },
            token: localStorage.getItem('token'),
            userId: localStorage.getItem('userId'),
            mode: "cancelModify",
        };
    },

    mounted: function() {
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
    },
        components: {
        avatar
    },
        methods: {
            modifyAccount() {
                this.mode = "modify";
            },
            backModifyAccount() {
                this.mode = "cancelModify";
            },
            modifyProfil() {
                console.log(this.username, this.lastname, this.email, this.password)
            },
            async deleteProfil() {
                let confirmDeleteUser = confirm("Voulez vous vraiment supprimer votre compte ?")

                if (confirmDeleteUser == true) {
                    await axios
                    .delete(`http://localhost:5000/api/users/${this.userId}`, {
                        headers: {
                            Authorization: "Bearer " + this.token,
                        },
                    })
                    .then(() => {
                        localStorage.clear();
                        this.$router.push("/");
                    })
                } else {
                    return;
                }
            },
                filePictureUpload(){
            this.image = this.$refs.image.files[0];
            // this.imageUrl = URL.createObjectURL(this.image);
            },

            async updatePicture() {
                const formData = new FormData();
                formData.append("userId", parseInt(localStorage.getItem("userId")));
                formData.append("image", this.image);
                // formData.append("imageUrl", this.imageUrl);

                await axios
                    .put(`http://localhost:5000/api/users/${this.userId}`, formData, {
                        headers: {
                            Authorization: "Bearer " + this.token,
                                "Content-Type": "multipart/form-data",
                        },
                    })
                    .then((response) => {
                    this.user = response.data.user;
                    this.image = response.data.image;
            });
    }
}}
</script>

<template>
<div>
    <main class="form-signin">
    <form class="bloc_form">
      <div class="container d-flex align-items-center flex-column gap-3 position">
          <h1 class="h3 mb-3 fw-normal text-center" v-if="mode == 'cancelModify'">Votre profil</h1>
          <h1 class="h3 mb-3 fw-normal text-center" v-else>Veuillez renseignez vos modifications</h1>
            <img v-if="user.imageUrl == null" src="http://localhost:5000/images/DEFAULT.png" class="rounded-circle" alt="Avatar"/>
            <img v-else :src=user.imageUrl class="rounded-circle" alt="Avatar"/>
            <label for="file-input" class="btn btn-secondary mt-1" v-if="mode == 'modify'">Modifier mon avatar</label>
            <input id="image" type="file" name="image" ref="image" @change="filePictureUpload()"/>
        <div class="form-floating">
            <h4 class="mb-0" v-if="mode == 'cancelModify'">{{ user.firstname }}</h4>
                <div class="form-floating" v-else>
                    <input v-model="username" class="form-control" id="floatingInput" placeholder="username">
                    <label for="floatingInput">Prénom</label>
                </div>
            </div>
            <div class="form-floating">
            <h4 class="mb-0" v-if="mode == 'cancelModify'">{{ user.lastname }}</h4>
                <div class="form-floating" v-else>
                    <input v-model="lastname" class="form-control" id="floatingInput" placeholder="lastname">
                    <label for="floatingInput">Nom</label>
                </div>
            </div>
            <div class="form-floating">
            <h6 class="mb-0" v-if="mode == 'cancelModify'">{{ user.email }}</h6>
                <div class="form-floating" v-else>
                    <input v-model="email" type="email" class="form-control imageUpload" id="floatingInput" accept=".jpg, .png," placeholder="name@example.com">
                    <label for="floatingInput">Adresse mail</label>
                </div>
            </div>
            <div class="form-floating">
            <h6 class="mb-0" v-if="mode == 'cancelModify'">Mot de passe : **********</h6>
                <!-- <div class="form-floating" v-else>
                    <input v-model="password" type="password" class="form-control" id="floatingInput" placeholder="password">
                    <label for="floatingInput">Password</label>
                </div> -->
            </div>
      </div>
          <!-- <button class="w-100 btn btn-lg btn-warning" type="submit" v-if="mode == 'cancelModify'" @click.prevent="modifyAccount()">Modifier le profil</button> -->
          <!-- <button class="w-100 btn btn-lg btn-warning" type="submit" v-else @click.prevent="backModifyAccount()">Ne pas modifier</button> -->
          <button class="w-100 btn btn-lg btn-danger" type="submit"  v-if="mode == 'cancelModify'" @click.prevent="deleteProfil()">Supprimer le profil</button>
          <button class="w-100 btn btn-lg btn-success" type="submit" @click="updatePicture()">Modifier mon image</button>
    </form>
    </main>
</div>
</template>

<style scoped>
.bloc_form{
    background-color:rgb(246, 246, 246);
    padding:25px;
    border-radius: 10px;
}
.btn{
    margin-top: 50px;
}
.rounded-circle{
    width: 150px;
}

#file-input{
    display: none;
}

.imageUpload{
        font-size: 16px;
        background: white;
        border-radius: 50px;
        box-shadow: 1px 1px 10px #acacac;
        width: 350px;
        outline: none;         
        margin-top: 4px;
    }

::-webkit-file-upload-button{
    color: white;
    background: #5c636a;
    padding: 20px;
    border: none;
    border-radius: 50px;
    outline: none;
    cursor: pointer;
}

::-webkit-file-upload-button:hover{
    color: black;
    background: #ffca2c;
}

@media (max-width: 450px){
    .form-signin{
        padding: 30px;
    }
}
</style>
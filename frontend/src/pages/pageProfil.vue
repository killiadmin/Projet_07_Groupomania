<script>
import avatar from "../components/ui/uiAvatar.vue"
export default{
    name: "pageProfil",
    data() {
        return {
            mode: "cancelModify",
            name:"Jean",
            username: "Dupont",
            email:"jean.dupont@groupomania.fr",
            password: "****"
        }
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
            deleteProfil() {
                this.$router.push("/");
            },
    }
}
</script>

<template>
<div>
    <main class="form-signin">
    <form class="bloc_form">
      <div class="container d-flex align-items-center flex-column gap-3 position">
          <h1 class="h3 mb-3 fw-normal text-center" v-if="mode == 'cancelModify'">Votre profil</h1>
          <h1 class="h3 mb-3 fw-normal text-center" v-else>Veuillez renseignez vos modifications</h1>
            <avatar></avatar>
            <label for="file-input" class="btn btn-secondary mt-1" v-if="mode == 'modify'">Modifier mon avatar</label>
            <input id="file-input" type="file" />
        <div class="form-floating">
            <h4 class="mb-0" v-if="mode == 'cancelModify'">{{ username }}</h4>
                <div class="form-floating" v-else>
                    <input v-model="username" class="form-control" id="floatingInput" placeholder="username">
                    <label for="floatingInput">Prénom</label>
                </div>
            </div>
            <div class="form-floating">
            <h4 class="mb-0" v-if="mode == 'cancelModify'">{{ name }}</h4>
                <div class="form-floating" v-else>
                    <input v-model="name" class="form-control" id="floatingInput" placeholder="name">
                    <label for="floatingInput">Nom</label>
                </div>
            </div>
            <div class="form-floating">
            <h6 class="mb-0" v-if="mode == 'cancelModify'">{{ email }}</h6>
                <div class="form-floating" v-else>
                    <input v-model="email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                    <label for="floatingInput">Adresse mail</label>
                </div>
            </div>
            <div class="form-floating">
            <h6 class="mb-0" v-if="mode == 'cancelModify'">Mot de passe : {{ password }}</h6>
                <div class="form-floating" v-else>
                    <input v-model="password" type="password" class="form-control" id="floatingInput" placeholder="password">
                    <label for="floatingInput">Password</label>
                </div>
            </div>
      </div>
          <button class="w-100 btn btn-lg btn-warning" type="submit" v-if="mode == 'cancelModify'" @click.prevent="modifyAccount()">Modifier le profil</button>
          <button class="w-100 btn btn-lg btn-warning" type="submit" v-else @click.prevent="backModifyAccount()">Ne pas modifier</button>
          <button class="w-100 btn btn-lg btn-danger" type="submit" @click="deleteProfil()" v-if="mode == 'cancelModify'">Supprimer le profil</button>
          <button class="w-100 btn btn-lg btn-success" type="submit" v-else>Modifier mon profil</button>
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
</style>
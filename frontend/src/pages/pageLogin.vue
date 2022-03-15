<script>
export default {
    name: "login",
      data() { 
        return {
          mode: "login",
          email:'',
          username:'',
          name:'',
          password:'',
        }
      },
    computed: {
      validateFields() {
        if (this.mode == "create") {
          if (this.email != "" && this.password != "" && this.lastname != "" && this.firstname != "") {
            return true;
          } else {
            return false;
          }
        } else {
          if(this.email != "" && this.password != "") {
            return true;
          } else {
            return false;
          }
        }
      }
    },
    methods: {
      switchToCreateAccount() {
        this.mode = "create";
      },
      switchToLogin() {
        this.mode = "login";
      },
      connectLogin(){
        const self = this;
        this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        }).then(function (){
          self.$router.push('/home');
        }),function (err) {
          console.log(err)
        }
      },
      createAccount() {
        const self = this;
        this.$store.dispatch('createAccount', {
          email: this.email,
          lastname: this.lastname,
          firstname: this.firstname,
          password: this.password
        }).then(function (){
          self.connectLogin();
        }),function (err) {
          console.log(err)
        }
      }
    }
}
</script>

<template>
<div>
  <main class="form-signin">
  <form>
    <h1 class="text-center">Bienvenue sur le réseau social :</h1>
    <img class="d-block mx-auto" src="../../assets/logo_monochrome_black.png" alt="" width="400" height="50">
    <h2 class="h3 mb-3 fw-normal text-center" v-if="mode == 'login'">Accéder à mon espace</h2>
    <h2 class="h3 mb-3 fw-normal text-center" v-else>Inscription</h2>
    <button class="w-100 btn btn-lg btn-warning" type="submit" v-if="mode == 'login'" @click.prevent="switchToCreateAccount()">Créer un compte</button>
    <button class="w-100 btn btn-lg btn-light" type="submit" v-else @click.prevent="switchToLogin()">Connexion</button>
    <div class="form-floating">
      <input v-model="email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
      <label for="floatingInput">Adresse mail</label>
    </div>
        <div class="form-floating" v-if="mode == 'create'">
      <input v-model="lastname" class="form-control" id="floatingInput" placeholder="name">
      <label for="floatingInput">Nom</label>
    </div>
    <div class="form-floating" v-if="mode == 'create'">
      <input v-model="firstname" class="form-control" id="floatingInput" placeholder="username">
      <label for="floatingInput">Prenom</label>
    </div>
    <div class="form-floating">
      <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
      <label for="floatingPassword">Mot de passe</label>
    </div>
    <div class="form-row" v-if="mode == 'login' && $store.state.status == 'error_login'">
      Adresse ou mot de passe invalide! 
    </div>
        <div class="form-row" v-if="mode == 'create' && $store.state.status == 'error_create'">
      Adresse mail déjà utiliser! 
    </div>
      <button class="w-100 btn btn-lg btn-success" type="submit" @click.prevent="connectLogin()" :disabled=!validateFields v-if="mode == 'login'" >
        <span v-if="$store.state.status == 'loading'">Connexion en cours ...</span>
        <span v-else>Se connecter</span>
      </button>
      <button class="w-100 btn btn-lg btn-success" type="submit" @click.prevent="createAccount()" :disabled=!validateFields v-else >
      <span v-if="$store.state.status == 'loading'">Création en cours...</span>
      <span v-else>Créer mon compte</span>
      </button>
  </form>
</main>
</div>
</template>

<style>
html,
body {
  height: 100%;
}
body {
  align-items: center;
  padding-bottom: 40px;
  background-color: #f4d4d3!important;
}
.form-signin {
  width: 100%;
  max-width: 400px;
  margin: auto;
}
.form-signin .form-floating:focus-within {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
.btn-lg {
  margin: 5px 0 5px 0;
}
form img{
  margin-bottom: 50px;
}
form h1{
  margin: 50px;
}
  
@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
  </style>
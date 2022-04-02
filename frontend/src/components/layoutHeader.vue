<script>
export default {
    name: "header",
    data() {
      return {
        userId : localStorage.getItem("userId"),
        admin : localStorage.getItem("admin")
      }
    },
    methods: {
      logOut(){
        const userId = localStorage.getItem('userId')
        if (userId) {
          localStorage.clear();  
        this.$router.push('/');
        setTimeout(function() {
          window.location.reload();
        } , 50);
        } else {
          window.alert("Vous n'etes pas connecté !")
        }

      },
      controlUserIdProfil(){
        const userId = localStorage.getItem('userId')
        if (!userId) {
          window.alert("Vous n'etes pas connecté !")
        }else{
          this.$router.push('/profil')
        }
      },
      controlUserIdHome(){
        const userId = localStorage.getItem('userId')
        if (!userId) {
          window.alert("Vous n'etes pas connecté !")
        }else{
          this.$router.push('/home')
        }
      },
      controlAllUsers(){
        const admin = localStorage.getItem('admin')
        if (admin == false) {
          window.alert("Vous n'êtes pas autorisés à accéder à ce contenu!")
        }else{
          this.$router.push('/allUsers')
        }
      }
    }

}
</script>

<template>
<header>
    <div class="bar__nav px-3 py-2 border-bottom mb-3" >
      <div class="container d-flex flex-wrap">
        <img class="d-flex" src="../../../assets/logo_monochrome_white.png" alt="" width="400" height="50">
        <div class="text-end d-flex align-items-center" v-if="userId">
          <router-link to="/allUsers"><button type="button" class="btn btn-light text-dark me-2" v-if="admin === 'true' " @click.prevent="controlAllUsers()">Tout les utilisateurs</button></router-link>
          <router-link to="/profil"><button type="button" class="btn btn-light text-dark me-2"  @click.prevent="controlUserIdProfil()">Mon profil</button></router-link>
          <router-link to="/home"><button type="button" class="btn btn-secondary text-light me-2" @click.prevent="controlUserIdHome()">Home</button></router-link>
          <router-link to="/"><button type="button" class="btn btn-warning text-dark me-2" v-on:click="logOut()">Se déconnecter</button></router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<style>
.px-3 {
  background-color: #da4418;
}

.container {
  justify-content: space-between;
}

.bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }
    
@media (max-width: 992px) {

.bd-placeholder-img-lg {
    font-size: 3.5rem;
  }

  .container {
  justify-content: center;
}
}

.b-example-divider {
    height: 3rem;
    background-color: rgba(0, 0, 0, .1);
    border: solid rgba(0, 0, 0, .15);
    border-width: 1px 0;
    box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
    }

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}
.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 .25rem rgba(255, 255, 255, .25);
}

.bi {
  vertical-align: -.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}

</style>


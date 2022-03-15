<script>import axios from "axios"

    export default {
        name: "postCard",
        data(){
            return {
                postCard : 'Mon nouveau message !'
            }
        },
        // methods: {
        //     sendPost(){
        //         axios.post('http://localhost:5000/api', {
        //             userId: 23,
        //             body: 'Mon commentaire',
        //             imageUrl:null 
        //         })
        //         .then(response => console.log(response))
        //         .catch(error => console.log(error)) 
        //     }
        // }
    }
</script>

<template>
    <div class="form-floating">
          <input contenteditable="true" class="form-control" id="floatingTextarea" v-model="postCard"/>
      <label  for="floatingTextarea" >Votre commentaire</label>
    </div>
    <div class="d-flex">
        <label for ="file-input" class="btn btn-secondary mt-1">Ajouter une image</label>
        <input id="file-input" type="file" />
        <button type="button" class="btn btn-warning btn-envoyer mt-1 ms-auto" @click="sendPost()">Envoyer</button>
    </div>
</template>

<style scoped>
    #file-input{
        display: none;
    }
    .form-control {
        height:auto 
    }
</style>
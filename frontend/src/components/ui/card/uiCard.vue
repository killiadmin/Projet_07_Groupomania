<script>
import comments from "./uiComments.vue"
import avatar from "../uiAvatar.vue"
export default {
    name: "card",
    data() {
        return {
            post: [{
            id: "1",
            username: "Jean",
            name: "Dupont",
            image: "https://picsum.photos/400/200",
            postMessage: "Reunion à 16h !" ,     
        },{
            id: "2",
            username: "Michel",
            name: "Marc",
            image: "https://picsum.photos/200/200",
            postMessage: "Pourquoi il n'y a plus de café ?",     
        },{
            id: "3",
            username: "Catherine",
            name: "Mouen",
            image: "https://picsum.photos/300/200",
            postMessage: "Disponible pour un tennis !",     
        }],
    }
    },
    components: {
        avatar,
        comments
    }
}
</script>

<template>
<div class="container article" v-for="(article, idx) in post" v-bind:key="idx">
    <div class="card w-50 m-auto">
        <div class="card-header d-flex fw-bold">{{ article.username }} {{article.name}}
            <avatar></avatar>
        </div>
      <img :src=article.image class="card-img-top" alt="...">
      <div class="card-body">
        <p class="card-text border-bottom">{{ article.postMessage }}</p>
        <div class="container">
            <comments></comments>
        </div>
        <div class="d-flex">
            <avatar></avatar>
            <input type="text" class="form-control" placeholder="Commentaire"/>
        <a href="#" class="btn btn-warning">Envoyer</a>
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
}

.bloc_like{
    border: 1px solid red;
    height:10px
}


.d-flex{
    align-items: center;
    justify-content: space-between;
}
</style>
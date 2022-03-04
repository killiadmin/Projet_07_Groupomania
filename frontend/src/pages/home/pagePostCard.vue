<script>
    export default {
        name: "postCard"
    }
</script>

<template>
    <div class="form-floating">
          <div contenteditable="true" class="form-control" placeholder="Leave a comment here" id="floatingTextarea" style="height:auto"></div>
      <label  for="floatingTextarea">Votre commentaire</label>
    </div>
    <div class="d-flex">
        <label for ="file-input" class="btn btn-secondary mt-1">Ajouter une image</label>
        <input id="file-input" type="file" />
        <button type="button" class="btn btn-warning btn-envoyer mt-1 ms-auto">Envoyer</button>
    </div>
</template>

<style scoped>
    input{
        display: none;
    }
</style>
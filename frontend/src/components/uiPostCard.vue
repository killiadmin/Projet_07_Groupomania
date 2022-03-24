<script>import axios from "axios"

    export default {
        name: "postCard",
        data(){
            return {
                token: localStorage.getItem("token"),
                userId: localStorage.getItem("userId"),
                body: '',
                imageUrl: '',
                error: '',
            };
        },
        computed: {
            validatePosts() {
                if (this.body != ""){
                    return true;
                } else {
                    return false;
                }
            }
        },
        methods: {
            selectFile() {
                this.image = this.$refs.image.files[0];
                this.imageUrl = URL.createObjectURL(this.image);
                console.log(this.image.name);
            },
            postCard() {
                const formData = new FormData();
                formData.append("image", this.image);
                formData.append("userId", parseInt(localStorage.getItem("userId")));
                formData.append("body", document.getElementById("body").value);
                axios.post("http://localhost:5000/api/posts", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: "Bearer " + this.token,
                    },
                })
                .then((response) => {
                    window.location.reload();
                    console.log(response)
                })
                .catch((error) => console.error(error));
                this.body = "";
                this.image = "";
            }
        },
    }
</script>

<template>
    <div class="form-floating">
          <input contenteditable="true" class="form-control" id="body" v-model="body"/>
      <label  for="floatingTextarea" >Votre commentaire</label>
    </div>
    <div class="d-flex">
        <input id="image" class="imageUpload" name="image" ref="image" type="file" accept=".jpg, .png, .gif" @change="selectFile()"/>
        <button type="button" class="btn btn-warning btn-envoyer mt-1 ms-auto" :disabled=!validatePosts @click="postCard()">Envoyer</button>
    </div>
    <div v-if="error" class="alert alert-danger" role="altert" id="msgError">
      {{ error }}
    </div>
</template>

<style scoped>
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
    .form-control {
        height:auto 
    }

    @media (max-width: 557px){
        .d-flex {
            margin: 8px;
        }

        .imageUpload{
            margin-right: 10px;
        }
    }
</style>
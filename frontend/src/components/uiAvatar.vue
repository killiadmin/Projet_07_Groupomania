<script>
import axios from "axios";

export default {
    name: "avatar",
    data() {
        return {
            image: "http://localhost:5000/images/DEFAULT.png"
        }
    },
    // methods: {
    //     updatePicture(){
    //         await axios.put(`http://localhost:5000/api/users/${this.userId}`, {
    //             headers: {
    //                 Authorization: "Bearer " + this.token
    //             },
    //         })
    //         .then((response) => {
    //             console.log(response)
    //         })
    //         .catch((error) => {console.log(error)})
    //     }
    // }
}
</script>

<template>
<img :src=image class="rounded-circle" alt="Avatar"/>
</template>

<style>
.rounded-circle {
    width:50px
}
</style>
<script>
import LoginVue from "./pages/pageLogin.vue"
import Header from "./components/layout/layoutHeader.vue"

export default {
  name: "app",
  components: {
    LoginVue,
    Header
  }
}
</script>

<template>
  <Header />
  <router-view></router-view>
</template>

<style>

</style>
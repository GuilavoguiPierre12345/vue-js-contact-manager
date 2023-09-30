<template>
  <!-- appel du spinner -->

  <!-- appel du composant navBar -->
  <NavBarVue/>  
  <!-- rendre visible le routeur -->
  <router-view/>
  
</template>


<script>
import NavBarVue from '@/components/NavBar.vue';

export default {
    name : "App",
    components : {NavBarVue,}
    
  }
</script>

<style>

</style>

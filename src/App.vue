<template>
  <div class="h-screen">
    
    <!-- Header -->
    <Header />

    <!-- content -->
    <router-view></router-view>

    <!-- footer -->
    <Footer />

  </div>
</template>

<script>

  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'

  export default {
    components: {
      Header,
      Footer
    }
  }
</script>

<style>
  .my-custom-toast-class{
    min-width: 100px !important;
    padding:10px !important;
    font-size: 9px;
  }
  .bottom-left{
    bottom:1.5em !important;
  }
</style>

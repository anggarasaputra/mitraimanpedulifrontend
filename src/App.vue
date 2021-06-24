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
  import { useToast } from "vue-toastification"

  export default {
    setup(){
      const toast = useToast()
      return {
        toast
      }
    },
    components: {
      Header,
      Footer
    },
    mounted() {
      this.notify()
    },
    methods: {
      async notify(){
        let vm = this
        this.$store.dispatch('notifications/notify').then(res=>{
          let i = 0
          let lng = res.data.data.data.length
          setInterval(()=>{
            if(vm.$store.state.notifications.notifications[i]){
              vm.toast.success(`${vm.$store.state.notifications.notifications[i].amount}\n${vm.$store.state.notifications.notifications[i].pray}`, {
                closeButton:false,
                hideProgressBar: true,
                pauseOnHover:false,
                closeOnClick:false,
                icon: "fas fa-comment-dollar",
                position:'bottom-left'
              })
              if(i == (lng-1)){
                i = 0
              }else{
                i = i + 1
              }
            }
          },4000)
        })
      }
    },
  }
</script>

<style>

</style>

<template>
    <div class="pb-20 pt-20">
        <div class="container mx-auto grid grid-cols-1 p-5 sm:w-full md:w-5/12">

            <form @submit.prevent="login">
                <div class="bg-white rounded-md shadow-md p-5">
                    <div class="text-xl">
                        MASUK AKUN
                    </div>
                    <div class="border-2 border-gray-200 mt-3 mb-2"></div>

                    <div class="mb-5">
                        <label class="mt-2">Alamat Email</label>
                        <input type="email" v-model="user.email"
                            class="mt-2 appearance-none w-full bg-gray-200 border border-gray-200 rounded h-7 shadow-sm placeholder-gray-600 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600 p-5"
                            placeholder="Alamat Email">
                    </div>

                    <div class="mb-5">
                        <label class="mt-2">Password</label>
                        <input type="password" v-model="user.password"
                            class="mt-2 appearance-none w-full bg-gray-200 border border-gray-200 rounded h-7 shadow-sm placeholder-gray-600 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600 p-5"
                            placeholder="Password">
                    </div>

                    <div>
                        <button
                            class="bg-green-400 py-1 px-3 text-white rounded-md shadow-md text-xl inline-block w-full focus:outline-none focus:bg-green-400">MASUK</button>
                            <div class="text-center mt-5">
                                <h3><b>Atau</b></h3>
                                <br>
                            </div>
                        <button 
                        class="bg-blue-400 mt-1 py-1 px-3 text-white rounded-md shadow-md text-xl inline-block w-full focus:outline-none focus:bg-blue-400" @click.prevent="handleClickSignIn" :disabled="!Vue3GoogleOauth.isInit || Vue3GoogleOauth.isAuthorized">Masuk Akun Google</button>
                    </div>

                </div>
            </form>

            <div class="text-center mt-5">
                Belum punya akun ? <router-link :to="{name: 'register'}" class="underline text-blue-600">Daftar Sekarang
                    !</router-link>
            </div>

            <div class="text-center mt-5">
                <br>
                <br>
                <br>
            </div>

        </div>
    </div>
</template>

<script>

    //hook vue
    import { inject, ref, toRefs, reactive, onMounted } from 'vue'
    
    //hook vuex
    import { useStore } from 'vuex'
    
    //hook vue router
    import { useRouter } from 'vue-router'
    
    //hook Toast
    import { useToast } from "vue-toastification"

    export default {
        methods:{
            async handleClickSignIn(){
                let vm = this
                let user = {}
                try {
                    const googleUser = await this.$gAuth.signIn()
                    if (!googleUser) {
                        return null
                    }
                    user = {
                        name :googleUser.Ys.Ve,
                        email : googleUser.getBasicProfile().getEmail(),
                        password: googleUser.getBasicProfile().getEmail(),
                        password_confirmation: googleUser.getBasicProfile().getEmail(),
                    }
                    vm.$store.dispatch('auth/loginGoogle',user).then(()=>{
                        vm.$router.push({name: 'dashboard'})
                    }).catch(()=>{
                        vm.$store.dispatch('auth/register',user).then(()=>{
                            vm.$router.push({name: 'dashboard'})
                        })
                    })
                } catch (error) {
                    //on fail do something
                    console.error(error)
                    return null
                }
            },
        },
        setup(props) {
            const { isSignIn } = toRefs(props);

            const Vue3GoogleOauth = inject("Vue3GoogleOauth");

            //user state
            const user = reactive({
                email: '',
                password: ''
            })

            //validation state
            const validation = ref([])

            //store vuex
            const store = useStore()

            //route
            const router = useRouter()

            // Same interface as this.$toast
            const toast = useToast()

            //method login
            function login() {

                //define variable 
                let email    = user.email
                let password = user.password            
               
               //panggil actions "login" dari module "auth" Vuex
                store.dispatch('auth/login', {
                    email,
                    password
                })
                .then(() => {

                    //redirect ke dashboard
                    router.push({name: 'dashboard'})

                    toast.success("Login Berhasil!")

                }).catch(error => {
                    //assign validaation message
                    validation.value = error

                    //show validation email with toast
                    if(validation.value.email) {
                        toast.error(`${validation.value.email[0]}`)
                    }

                    //show validation password with toast
                    if(validation.value.password) {
                        toast.error(`${validation.value.password[0]}`)
                    }

                    //show login failed
                    if(validation.value.message) {
                        toast.error(`${validation.value.message}`)
                    }
                })
            }

            //check user is loggedIn
            onMounted(() => {
                if(store.getters['auth/isLoggedIn']) {
                    router.push({name: 'dashboard'})
                }
            })

            //return object
            return {
                Vue3GoogleOauth,
                user,           // <-- state user
                validation,     // <-- state validation
                login,          // <-- method login
                isSignIn,
            }

        }

    }
</script>

<style>

</style>
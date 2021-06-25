<template>
    <div class="pb-20 pt-20">
        <div class="container mx-auto grid grid-cols-1 p-3 sm:w-full md:w-5/12">

            <!-- slider -->
            <div class="grid grid-cols-1 bg-white rounded shadow-md p-1 text-sm">
                <Slider />
            </div>

            <!-- categoryHome -->
            <CategoryHome />

            <div v-if="campaigns.length > 0">
                <div class="mt-5 grid grid-cols-4 gap-4" v-for="campaign in campaigns" :key="campaign.id">
                    <div class="col-span-4">
                        <div class="bg-white rounded-md shadow-md p-2">
                            <div class="md:flex rounded-xl md:p-0">
                                <img class="w-full h-34 md:w-56 rounded object-cover"
                                    :src="campaign.image" width="384" height="512">
                                <div class="w-full pt-6 p-5 md:p-3 text-center md:text-left space-y-4">
                                    <router-link :to="{name: 'campaign.show', params:{slug: campaign.slug }}">
                                        <p class="text-sm font-semibold">
                                        {{ campaign.title }}
                                        </p>
                                    </router-link>
                                    <div class="font-medium">
                                        <div class="mt-3 text-gray-500 text-xs">
                                            {{ campaign.user.name }}
                                        </div>
                                        <div v-if="campaign.sum_donation.length > 0">
                                            <div v-for="donation in campaign.sum_donation" :key="donation">

                                                <div class="relative pt-1">
                                                    <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-400">
                                                        <div :style="{width: percentage(donation.total, campaign.target_donation) + '%'}" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                                                    </div>
                                                </div>

                                                <p class="text-xs text-gray-500">
                                                    <span class="font-bold text-blue-400">Rp. {{ formatPrice(donation.total) }} </span> terkumpul dari
                                                    <span class="font-bold">Rp. {{ formatPrice(campaign.target_donation) }}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div v-else>

                                            <div class="relative pt-1">
                                                <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                                                    <div :style="{width: percentage(0, campaign.target_donation) + '%'}" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                                                </div>
                                            </div>

                                            <p class="text-xs text-gray-500">
                                                <span class="font-bold text-blue-400">Rp. 0 </span> terkumpul dari
                                                <span class="font-bold">Rp. {{ formatPrice(campaign.target_donation) }}</span>
                                            </p>
                                        </div>
                                        <div class="mt-3 text-xs">
                                            <strong>{{ countDay(campaign.max_date) }}</strong> hari lagi
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>

                <div v-for="index in 2" :key="index" class="grid grid-cols-1 bg-white rounded shadow-md p-3 text-sm mt-4 mb-4">
                    <FacebookLoader class="h-24"/>
                </div>

            </div>

        </div>

        <div class="text-center mt-4 mb-4" v-show="nextExists">
            <a @click="loadMore"
                class="bg-gray-700 text-white p-2 px-3 rounded-md shadow-md focus:outline-none focus:bg-gray-900 cursor-pointer">LIHAT
                SEMUA <i class="fa fa-long-arrow-alt-right"></i></a>
        </div>
        <div class="text-center mt-4 mb-4">
            <a class="bg-blue-700 text-white p-2 rounded-md mr-2" target="_blank" href="https://www.facebook.com/profile.php?id=100070070730151"><i class="fab fa-facebook-square"></i> Facebook</a>
            <a class="bg-purple-700 text-white p-2 rounded-md mr-2" target="_blank" href="https://instagram.com/mitraimanpeduli"><i class="fab fa-instagram"></i> Instagram</a>
            <a class="bg-green-700 text-white p-2 rounded-md mr-2" target="_blank" href="https://api.whatsapp.com/send?phone=6281953717888"><i class="fab fa-whatsapp"></i> Whatsapp</a>
        </div>
        <div class="text-center mt-4 mb-4">
            <br>
            <br>
            <br>
        </div>
    </div>
</template>

<script>

    //hook vue
    import { computed, onMounted, onUnmounted } from 'vue'

    //vuex
    import { useStore } from 'vuex'

    //component slider
    import Slider from '@/components/Slider.vue'

    //component categoryHome
    import CategoryHome from '@/components/CategoryHome.vue'

    //vue content loader
    import { FacebookLoader } from 'vue-content-loader'

    //hook Toast
    import { useToast } from "vue-toastification"

    let varInterval

    export default {

        components: {
            Slider,         // <-- register component slider
            CategoryHome,   // <-- register component CategoryHome
            FacebookLoader  // <-- register component FacebooLoader dari Vue Content Loader
        },

        setup() {
            // toast
            const toast = useToast()

            //store vuex
            const store = useStore()

            //onMounted akan menjalankan action "getCampaign" di module "campaign"
            onMounted(() => {
                notify()
                store.dispatch('campaign/getCampaign')
            })
            
            onUnmounted(() => {
                toast.clear()
                clearInterval(varInterval)
            })
            //digunakan untuk get data  state "campaigns" di module "campaign" 
            const campaigns = computed(() => {
                return store.state.campaign.campaigns
            })

            /**
             * LOADMORE
             */

            //get status NextExists
            const nextExists = computed(() => {
                return store.state.campaign.nextExists
            })

            //get nextPage
            const nextPage = computed(() => {
                return store.state.campaign.nextPage
            })

            //loadMore function
            function loadMore() {
                store.dispatch('campaign/getLoadMore', nextPage.value)
            }   

            function showToast(iteration, length, data){
                let i = iteration
                let lng = length
                toast.success(`${data[i].donatur['name']}\nBaru Saja Berdonasi`, {
                    closeButton:false,
                    hideProgressBar: true,
                    pauseOnHover:false,
                    closeOnClick:false,
                    icon: "fas fa-comment-dollar",
                    position:'bottom-left',
                    toastClassName: "my-custom-toast-class",
                })
                if(i == (lng-1)){
                    i = 0
                }else{
                    i = i + 1
                }
            }

            function notify(){
                store.dispatch('notifications/notify').then(res=>{
                    let i = 0
                    let lng = res.data.data.data.length
                    if(lng){
                        showToast(i,lng,store.state.notifications.notifications)
                    }
                    varInterval = setInterval(()=>{
                        if(store.state.notifications.notifications[i]){
                            showToast(i,lng,store.state.notifications.notifications)
                        }
                    },15000)
                })
            }

            return {
                campaigns,      // <-- return campaigns
                nextExists,     // <-- return nextExists,
                nextPage,       // <-- return nextPage
                loadMore,        // <-- return loadMore
            }

        }

    }
</script>
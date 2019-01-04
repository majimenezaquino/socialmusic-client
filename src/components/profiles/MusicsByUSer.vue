<template>
   <div class="conttainet-user-profiles">
        <CardMusic 
        v-for="(mus ,index) in musics" :music="mus" 
        :key="index" 
        :id="'card_music'+index"
    />
   </div>
</template>
<script>
	const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
	const {DBLocal} =require('@/services/data_local')
	const dbLocal= new DBLocal(DB_USER_NAME);
	const axios = require('axios')
import CardMusic from "../cards/CardMusic.vue";

export default {
    name: "music-profiles",
    components:{
        CardMusic
    },
    data(){
        return{
            musics: [],
                user_data: undefined,
                user_id: this.$route.params.id || 0
        }
    },
    	methods:{
		 redirectUserLogin(){
			 
		if(!dbLocal.checkDataLocalStorageOBject()){
				this.$router.push( './login' )
			}else{
                //set data by user
                this.user_data  =dbLocal.getDataLocalStorageOBject();
            }
            },
        getmusicsByUser(){
            let self = this
            axios.get(`${SERVER_URI}/api/musicsbyuser/${this.user_id}`).
            then(function(req){

                if(req.data.musics.length>0){
                    self.musics= req.data.musics;
                }
             
            }).catch(function(err){
                console.log(`error--->${err}`)
            })
            
           // console.log(this.musics)
        }
		},
		
        created(){
           this.redirectUserLogin()
            this.getmusicsByUser();
        
            
        }
}
</script>
<style>
    .conttainet-user-profiles {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        overflow-y: scroll;
        max-height: 70vh;
    }
</style>


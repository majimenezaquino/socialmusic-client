<template>

     <LayoutDashboard> 
		 <div slot="content">
        <section id="content_outer_wrapper">
            	<div class="playlist-body">
                    <div class="content-playlist">
                         <div class="header">
                                    <h1>Musicians</h1>
                                </div>
                            <div class=" card-musician">
                                <CardMusician
                                    v-for="(umusician,index) in musicians"
                                    :key="index"
                                    :musician="umusician"
                                 />
                           
                       
                         
                                <div class="show-more">
                                    <a href="" v-on:click.prevent="getPlaylistByUser">show more</a>
                                </div>
                            </div>
                    </div>

                   
				</div>
	
    </section>
		 </div>
     </LayoutDashboard>

</template>

<script>
  

	const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
	const {DBLocal} =require('@/services/data_local')
	const dbLocal= new DBLocal(DB_USER_NAME);
    const axios = require('axios');

    import LayoutDashboard from "@/layouts/LayoutDashboard.vue"
    import CardMusician from "@/components/cards/CardMusician.vue"
    import { setTimeout } from 'timers';
    export default {
        name: "playlist",
        components:{
            LayoutDashboard,
            CardMusician,
            
            
        },
        data(){
            return{
                musicians: [],
                user_data: undefined,
            }
        }
		,
		methods:{
		 redirectUserLogin(){
			 
		if(!dbLocal.checkDataLocalStorageOBject()){
				this.$router.push( './login' )
			}else{
                //set data by user
                this.user_data  =dbLocal.getDataLocalStorageOBject();
            }
            },
        getUserMusician(){
            let self = this
            axios.get(`${SERVER_URI}/api/usermusician?token=${this.user_data.token}`).
            then(function(req){
                
               console.log("USER MUSICIAN==>>",req.data)
               if(!req.data.error){
                   self.musicians =req.data.musicians;
               }
             
            }).catch(function(err){
                console.log(`error--->${err}`)
            })
            
           // console.log(this.playlist)
        }
		},
		
        created(){
           this.redirectUserLogin();
           this.getUserMusician();
           
            
        }
	}
	

</script>
<style>
    .card-musician{
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: flex-start;
       flex-wrap: wrap;
    }
</style>

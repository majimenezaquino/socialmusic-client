<template>
    <section>
<div class="modal fade" id="modal-music-dedicataction" tabindex="-1" role="dialog" aria-labelledby="modal-music-dedicataction">
<div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="card m-0">
            <header class="card-heading p-b-20">
                <h2 class="card-title">Dedicar canción </h2>
                <div class="card-search">
                    <div class="form-group is-empty">
                        <a href="javascript:void(0)" class="close-search" data-card-search="close" data-toggle="tooltip" data-placement="top" title="" data-original-title="Back"> <i class="zmdi zmdi-arrow-left"></i></a>
                        <input type="text" placeholder="Escriba el nombre del usuario… " class="form-control" autocomplete="off">
                        <a href="javascript:void(0)" class="clear-search" data-card-search="clear" data-toggle="tooltip" data-placement="top" title="" data-original-title="Clear search"><i class="zmdi zmdi-close-circle"></i></a>
                    </div>
                </div>
                <ul class="card-actions icons right-top">
                    <li>
                        <a href="javascript:void(0)" data-card-search="open">
                            <i class="zmdi zmdi-search"></i>
                        </a>
                    </li>
                   
                    <li>
                        <a href="javascript:void(0)" data-dismiss="modal" aria-label="Close">
                            <i class="zmdi zmdi-close"></i>
                        </a>
                    </li>
                </ul>
            </header>
        </div>
        <div class="modal-body">
           <div class=" container-fluid">
               <div class="row">
                     <CardMusic 
                          v-for="(_music,index) in musics"
                          :music="_music"
                          :key="index"
                          
                      />
                   <div class="col-md-6">
                       <div class="container-user-dedocate">
                        <CardUserDedicate />
                       </div>
                   </div>
               </div>
           </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-flat" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary">Ok</button>
            </div>
        </div>
        <!-- modal-content -->
    </div>
    <!-- modal-dialog -->
</div>
		
    </section>
</template>
<script>


    import CardMusic from "./CardMusicNoDedicate.vue";
    import CardUserDedicate from "./CardUserDedicate.vue";
    const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
    const {DBLocal} =require('@/services/data_local')
    const dbLocal= new DBLocal(DB_USER_NAME);
    const axios = require('axios');
    const {EventBus} =require('@/eventbus');

    export default {
        name: 'dedicate-music',
        props:{
        music_dedicate: String 
        },
        components:{
            CardMusic,
            CardUserDedicate
        },

        data(){
            return {
                user_data: undefined,
                musics: [],
            }
        },methods:{
            redirectUserLogin(){
            if(dbLocal.checkDataLocalStorageOBject())
            this.user_data  =dbLocal.getDataLocalStorageOBject();
            },
                getMusicById(music_id){
                let _this = this;
                axios.get(`${SERVER_URI}/api/musics/${music_id}?token=${this.user_data.token}`).
                then(function(req){
                    _this.musics=req.data.music
                console.log( req);
                                
                }).catch(function(err){
                    console.log(`error--->${err}`)
                })
            }
        },
        mounted(){
            this.redirectUserLogin();
        },
        watch:{
            'music_dedicate':function(music_select){
                this.getMusicById(music_select);
            }
        }
    }
</script>
<style>
.container-user-dedocate{
    overflow: hidden;
    width: 100%;
}
</style>

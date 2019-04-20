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
                        <input type="text" placeholder="Escriba el nombre del usuario… " class="form-control" autocomplete="off" 
                        v-model="keyword"
                        />
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
                        <CardUserDedicate
                           v-for=" _follower in followers" :key="_follower._id"
                           :follower="_follower.user_follower"
                           :toggle="hanlderUserSelect"
                         />
                       </div>
                       
                   </div>
                   <div class="col-md-12">
                        
                       <div class="footer-dediccation">
                           <p> Dedicar esta canción de forma natural u oculta, si dedica de forma oculta el usuario final no sabrá quien se la está dedicando.  </p>
                           <div class="conten">
                               <a href="" :class="{'active': !inconito}" v-on:click.prevent="toggleClassActive('visible')"><i class="fa fa-user" aria-hidden="true"></i></a>
                              <a href="" :class="{'active': inconito}"  v-on:click.prevent="toggleClassActive('incognito')"><i class="fa fa-user-secret" aria-hidden="true"></i></a>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-flat" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" v-on:click.prevent="addMusicDedicaction" :disabled="!userDedicate.length>0">Ok</button>
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
                inconito: false,
                keyword: undefined,
                type_dedicaction: 'visible',
                music_select_id: undefined,
                musics: [],
                followers: [],
                userDedicate: [],
            }
        },methods:{
            redirectUserLogin(){
            if(dbLocal.checkDataLocalStorageOBject())
            this.user_data  =dbLocal.getDataLocalStorageOBject();
            },
            toggleClassActive(ev){
                    this.type_dedicaction=ev;
                    if(ev=='incognito'){
                        this.inconito=true;
                    }else{
                        this.inconito=false; 
                    }
            },
            hanlderUserSelect(callback){
                console.log("user ",callback)
                if(callback.status){
                    this.userDedicate.push( callback.id)
                }else{
                    let delte_user= this.userDedicate.filter(function(user_selec){
                        return user_selec!= callback.id
                    });
                    this.userDedicate =delte_user;
                }
                console.log("user",  this.userDedicate)
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
            },

              searchUser(word){
                let _this = this;
                axios.get(`${SERVER_URI}/api/search/${word}?token=${this.user_data.token}`).
                then(function(req){
                    
                    let userMpa=req.data.users.map(function(user){
                        return {
                            user_follower:  user
                        }
                    })
                  _this.followers= userMpa;
                         console.log( "req.data.users",userMpa);       
                }).catch(function(err){
                    console.log(`error--->${err}`)
                })
            },
        getFallowerByUser(){
                let _this = this;
                axios.get(`${SERVER_URI}/api/followers?token=${this.user_data.token}`).
                then(function(req){
                   _this.followers=req.data.followers;
     
                                
                }).catch(function(err){
                    console.log(`error--->${err}`)
                })
            },
            addMusicDedicaction(){
                 let _this = this;
                 let dedication={
                     users: this.userDedicate,
                     type_dedicaction: this.type_dedicaction,
                     music_id: this.music_select_id,
                 }

                axios.post(`${SERVER_URI}/api/songdedicate?token=${this.user_data.token}`,dedication).
                then(function(req){
                if(!req.data.error){
                    swal({
                      text: "La música fue dedicada",
                      icon: "success",
                      button: "ok",
                    }).then((value) => {
                        if(value) _this.$router.go();
                       })
                    $("#modal-music-dedicataction").modal("hide");
                    
                  }
             
                                
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
                this.music_select_id=music_select;
                this.getMusicById(music_select);
                this.getFallowerByUser();
            },
            'keyword':function(value){
                this. searchUser(value)
            }
        }
    }
</script>
<style>
.container-user-dedocate{
    overflow: hidden;
    width: 100%;
    overflow-y: scroll;
  height: 300px;
}
.footer-dediccation {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.footer-dediccation > p{
    display: flex;
    border:#eee solid 1px;
    padding: 10px;
    border-radius: 5px;
}
.footer-dediccation .conten{
display: flex;
}
.footer-dediccation .conten > a{
    display: flex;
    width: 50px;
    height: 50px;
    border:#eee solid 3px;
    border-radius: 50%;
    margin: 0px 10px;
    justify-content: center;
    align-items: center;
    font-size: 35px;
    background: #ccc;
    color: #444;
}
.footer-dediccation .active{
     background: rgb(33, 150, 243) !important;
          color:#eee !important;
}
</style>

<template>
    <section>
<div class="modal fade" id="create_musician" tabindex="-1" role="dialog" aria-labelledby="create_musician">
<div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="card m-0">
            <header class="card-heading p-b-20">
                <h4 class="card-title">Registrarme como creador de contenido musical. </h4>
                <div class="card-search">
                    <div class="form-group is-empty">
                        <a href="javascript:void(0)" class="close-search" data-card-search="close" data-toggle="tooltip" data-placement="top" title="" data-original-title="Back"> <i class="zmdi zmdi-arrow-left"></i></a>
                        <input type="text" placeholder="Search and press enter..." class="form-control" autocomplete="off"
                        v-on:keyup="searMusiciaanByKeyWord"
                        >
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
            <div class="container-item-musician">
                <div class="item-musician"
                   
                    v-for=" musc in musician"
                    :key="musc._id"
                    >
                        <button class="musician"
                        :value="musc._id"
                        v-on:click.prevent="toggleSelectMusician"
                        :disabled="musicianIds.includes(musc._id)"
                        >
                           <span>{{musc.name}}</span>
                            <i :class="musc.icon"></i>
                         </button>
                    </div>
                   

               
               
            </div>
             <div class="form-group">
                <label for="exampleFormControlTextarea1">Detalla tu profesión </label>
                <textarea class="form-control" 
                id="exampleFormControlTextarea1" rows="2" 
                placeholder="Ejemplo: Soy guitarrita profesional. Gane el premio al guitarrista el año.  "
                v-model="musicina_send.description"
                >
                </textarea>
            </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-flat" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary"
                 :disabled="!btn_active"
                 v-on:click.prevent="sendMusicians"
                 >Ok</button>
            </div>
        </div>
        <!-- modal-content -->
    </div>
    <!-- modal-dialog -->
</div>
		
    </section>
</template>
<script>
 const axios = require('axios');
const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
const {DBLocal} =require('@/services/data_local')
    const dbLocal= new DBLocal(DB_USER_NAME);
     import swal from 'sweetalert';

export default {
    name :'create-musician',
    data(){
        return {
             user_data: undefined,
             musician: [],
             userMusicians: [],
             musicianIds: [],
             musician_select_limt: [],
             user_musician: [],
             musician_select: undefined,
             btn_active: false,
             limit: 10,
             musicina_send: {
                 musicians: [],
                 description: undefined,
             }
        }
    },
    methods:{
         redirectUserLogin(){
            if(dbLocal.checkDataLocalStorageOBject())
            this.user_data  =dbLocal.getDataLocalStorageOBject();
            },
            getMusicians(){
                let _this = this;
                axios.get(`${SERVER_URI}/api/musician?token=${this.user_data.token}`).
                then(function(req){
                    _this.musician =req.data.musicians;
            
                                
                }).catch(function(err){
                    console.log(`error--->${err}`)
                })
            },

             getUserMusicians(){
                let _this = this;
                axios.get(`${SERVER_URI}/api/usermusician?token=${this.user_data.token}`).
                then(function(req){
                   //musicians;
                   console.log(req.data.musicians)
            
                                
                }).catch(function(err){
                    console.log(`error--->${err}`)
                })
            },


             searMusiciaanByKeyWord(ev){
                 let keyword =ev.target.value;
                 keyword.charAt(0).toUpperCase();
                 if(!keyword!=''){
                     return false;
                 }
                let _this = this;
                axios.get(`${SERVER_URI}/api/searmusician/${keyword}?token=${this.user_data.token}`).
                then(function(req){
                    _this.musician =req.data.musicians;
                    console.log(req);
                                
                }).catch(function(err){
                    console.log(`error--->${err}`)
                })
            },
             getMusiciansByUserId(){
                let _this = this;
                axios.get(`${SERVER_URI}/api/usermusician/${this.user_data.user.id}?token=${this.user_data.token}`).
                then(function(req){
                   
                    _this.user_musician=req.data.musicians;
         
                  let item_select  =req.data.musicians[0].musicians.map(function(musician){
                        return musician.musician._id;
                    });
                     _this.musicianIds =item_select;
                   ;
                   for(let i in item_select){
                       _this.musician_select_limt.push(item_select[i])
                   }

        
                                
                }).catch(function(err){
                    console.log(`error`,err.response)
                })
            },

            sendMusicians(){
                let _this = this;
                axios.post(`${SERVER_URI}/api/usermusician?token=${this.user_data.token}`,
                this.musicina_send).
                then(function(req){
                     if(!req.data.error){
                    swal({
                      text: "Su profesión fue guardada con existo.",
                      icon: "success",
                      button: "ok",
                    }).then((value) => {
                        if(value) _this.$router.go();
                       })
                    $("#create_musician").modal("hide");
                    
                  }else{
                      swal({
                      text: req.data.message,
                      icon: "error",
                      button: "ok",
                    });

                  }
                console.log("musician", req);
                                
                }).catch(function(err){
                    console.log(err.response)
                })
            },

            toggleSelectMusician(ev){
                 let button =ev.target;              
                
                     button.classList.toggle("active");
                     
                

                    
               
                 if(!button.className.includes('active')){ 
                     
                     
                     let  music_delete =button.value;
                     let newArray =this.musicina_send.musicians.filter(item=>item.musician!=music_delete);
                     this.musicina_send.musicians = newArray;
                     this.musician_select_limt = newArray;
                    return false;
                 }else{
                     if( this.musician_select_limt.length>=this.limit){
                    swal({
                      text: "Ya alcánzate el límite de profesiones, para agregar más profesiones cambia e tipo de cuenta.",
                      icon: "error",
                      button: "ok",
                    });

                    return false;
                }

                 }
            
                this.musician_select =  button.value;
                 this.musician_select_limt.push( button.value);

               console.log( this.musician_select_limt.length)
            }

    }
    ,
    mounted(){
        this.redirectUserLogin();
        this.getMusicians();
        this. getUserMusicians()
        this.getMusiciansByUserId();
    },
    watch:{
        'musician_select':function(val){
     
            this.musicina_send.musicians.push({musician: val});
            console.log( this.musicina_send.musicians);
            if(this.musicina_send.musicians.length>0 && this.musicina_send.description !=undefined && this.musicina_send.description !=''){
                this.btn_active=true;
            }else{
                 this.btn_active=false;
            }
        },
        'musicina_send.description':function(val){
            //  musicina_send: {
            //      musician: undefined,
            //      user_published: undefined,
            //      description: undefined,
            //  }
            if(this.musicina_send.musicians.length>0 && this.musicina_send.description !=undefined && this.musicina_send.description !=''){
                this.btn_active=true;
            }else{
                 this.btn_active=false;
            }
        }
    }
}
</script>

<style>
    .container-item-musician{
        width:100%;
        display:flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        margin: 10px;
        overflow-y: scroll;
        max-height: 400px;
    }
    .item-musician{
        width: 130px;
        height: 130px;
          margin-bottom: 10px;
    }
    .container-item-musician .musician{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border: #ccc solid 1px;
        padding: 10px;
      height: 100%;
        width: 100%;
         color: #444;
       
      
    }
     .container-item-musician .musician span{
         font-size: 14px;
        
         line-height: 15px;
         display: flex;
         justify-content: center;
         padding-bottom: 10px;
     }
     .container-item-musician .musician i{
         display: flex;
         justify-content: center;
         font-size: 30px;
        

     }
     .container-item-musician button.active{
         background: rgb(33, 150, 243);
         color: #fff;
     }
      .container-item-musician button:disabled{
         background: #ef5350!important;
         color: #fff;
     }
</style>
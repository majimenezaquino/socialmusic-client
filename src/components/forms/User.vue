<template>
<div class="container__music">
    <div class="col-music">
        <UserAvatar :propImageUrl="user_profile" />
    </div>
     <div class="col-music">
            <div class="form-upload">
                <div class="card">
                  <header class="card-heading ">
                    <h2 class="card-title">Informacion de la cancion</h2>
                        <div class="container-error">
                         <div class="alert alert-danger" role="alert" v-if="error.error">
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close" disabled="disabled">
                                    <span aria-hidden="true">&times;</span></button>
                                <strong>Oh snap! </strong> {{error.message}}
                        </div>
                         <div class="alert alert-success" role="alert" v-if="success.success">
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close" disabled="disabled">
                                    <span aria-hidden="true">&times;</span></button>
                                <strong></strong> {{success.message}}
                        </div>
                        </div>
                  </header>
                  <div class="card-body">
                     <div class="group-card-user">
                <div class="form-group">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="zmdi zmdi-account"></i></span>
                        <input type="text" class="form-control" placeholder=" Nombre " v-model="user.name" name="user_name">
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="zmdi zmdi-account"></i></span>
                        <input type="text" class="form-control" placeholder="Apellidos" v-model="user.last_name" name="last_name">
                    </div>
                </div>
                </div>
                <div class="group-card-user">
                    <div class="form-group">
                      <div class="input-group">
                        <span class="input-group-addon"><i class="zmdi zmdi-email" ></i></span>
                        <input type="email" class="form-control" placeholder="Su correo electrónico." v-model="user.email" name="user_email" disabled>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="input-group">
                        <span class="input-group-addon"><i class="zmdi zmdi-phone"></i></span>
                        <input type="text" class="form-control" placeholder="Su número de teléfono. " 
                        v-model="user.phone"  name="user_phone"
                        maxlength="12" minlength="6">
                      </div>
                    </div>
                </div>
                    <div class="group-card-user">
                    <div class="form-group">
                      <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-calendar-o"></i></span>
                        <input type="date" class="form-control" max="2018-02-10" min="1960-01-02" :value="user.birth_date" placeholder="YYYY-MM-DD"
                          name="user_birth_date"
                         >
                      </div>
                    </div>
                    <div class="form-group oardio">
                     
                        <label class="radio-inline"> Sexo: </label>
                        
                          <label class="radio-inline">
                            <input type="radio" name="gender" id="male" value="male" :checked="gender.male">
                            Masculino 
                          </label>
                          <label class="radio-inline">
                            <input type="radio" name="gender" id="female" value="female" :checked="gender.female">
                            Femenino 
                          </label>
                      </div>
        
                </div>
                  </div>
                  <div class="card-footer text-right">
                    <button class="btn btn-primary btn-sm" v-on:click.prevent="saveUpdate">Guardar </button>
                  </div>
         
              </div>
            </div>
    </div>
    <!-- <LimitUpladMusic> </LimitUpladMusic> -->
</div>
</template>
<script>
  const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
  const {DBLocal} =require('@/services/data_local')
  const dbLocal= new DBLocal(DB_USER_NAME);
  const axios = require('axios');
    const {EventBus} =require('@/eventbus');
    import LimitUpladMusic from './limit-upload-music.vue';
    import UserAvatar from './userImage.vue';
    import { setInterval, setImmediate } from 'timers';
export default {
    name: 'avatar',
    components:{
        LimitUpladMusic,
        UserAvatar
    },
    data(){
        return{
            isDraging:false,
  
            user_profile: undefined,
            user: {
                name: undefined,
               last_name: undefined,
               birth_date: undefined,
               phone: undefined,
               gender: undefined,
            },
            gender:{
                male: false,
                female: false,
            },
            message_upload:'selecciones una imagen para esta música.',
            extension:["png","jpg","jpeg"],
            genres_label: true,
            genres: [],
               user: {
                
            },
            error:{
                error:false,
                message: undefined
            },
            success:{
                success:false,
                message:undefined
            }
        }
    },
    methods:{
     
        //============================================================
        //LOADF MUSIC
        //============================================================

   handlSelectGenrens(ev){
         this.genres_label=false; 
         this.music.genre =ev.target.value;
   },
    
       async   getUserPublicById(userId){
            let self = this
           await axios.get(`${SERVER_URI}/api/public/user/${userId}`).
            then(function(req){
                let _user =req.data.user;
                if(_user.length>0){
                    self.user =_user[0];
                    self.user_profile =`${SERVER_URI}/api/files/image/${_user[0].profile_picture}`; //image 
                  //  self.user.birth_date = self.changeDate(self.user.birth_date);
                    if(String(self.user.gender).toLowerCase()==='male'){
                        self.gender.male=true;
                    }
                     if(String(self.user.gender).toLowerCase()==='female'){
                        self.gender.female=true;
                    }
                }
                
             
            }).catch(function(err){
                console.log(`error--->${err}`)
            })
            
           // console.log(this.musics)
        },
    
    redirectUserLogin(){
        if(dbLocal.checkDataLocalStorageOBject())
        this.user_data  =dbLocal.getDataLocalStorageOBject();
    },
     updateMusicUpload(){
  
    },
      checkInfoMusic(){
        this.error.error=false;
        this.success.success=false;
          if(this.music.file_name== undefined || this.music.file_name== ''){
            this.error.error=true;
            this.error.message=`Debe subir un archivo con una de las siguientes extencion MP3 , OGG y WAV `;
           return false;
        }

        if(this.music.genre == undefined || this.music.genre== ''){
            this.error.error=true;
            this.error.message=`Debe selecionar un  genero musical.`;
           return false;
        }

        if(this.music.title== undefined || this.music.title== ''){
            this.error.error=true;
            this.error.message=`El campo titulo es requerido`;
           return false;
        }

       


        if(this.music.description== undefined || this.music.description== ''){
            this.error.error=true;
            this.error.message=`El campo descripcion es requerido`;
         return false;
        }

        if(this.music.tags== undefined || this.music.tags== ''){
            this.error.error=true;
            this.error.message=`El campo etiqueta es requerido`;
           return false;
        }
        return true;
    },
   
 

     uploadFilesForm(){
       
        
    }
    },
    mounted(){
        this.redirectUserLogin();
        this.getUserPublicById(this.user_data.user.id);
        
       
    },
    watch:{
        'music.title':function(){
        this.error.error=false;
        this.success.success=false;
        },
         'music.tags':function(){
        this.error.error=false;
        this.success.success=false;
        },
         'music.genre':function(){
        this.error.error=false;
        this.success.success=false;
        },
         'music.file':function(){
        this.error.error=false;
        this.success.success=false;
        },
        'music.description':function(){
        this.error.error=false;
        this.success.success=false;
        },
        'music.file_name':function(){
        this.error.error=false;
        this.success.success=false;
        }
    }
}
</script>
<style>
@import url("./styles.css");

</style>

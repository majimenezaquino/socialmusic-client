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
                    <div class="group-genre">
                     
                        <label class="radio-inline"> Sexo: </label>
                        
                          <label class="radio-select">
                            <input type="radio"
                             name="gender" id="male" value="male" :checked="gender.male"
                             class="inputcheck" v-on:click="toggleCheck" />
                            Masculino 
                          </label>
                          <label class="radio-select">
                            <input type="radio" name="gender" id="female" value="female" :checked="gender.female"
                            class="inputcheck" v-on:click="toggleCheck" />
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
    import { setInterval, setImmediate, setTimeout } from 'timers';
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
            genres_label: true,
            genres: [],
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


   toggleCheck(ev){
       this.user.gender = ev.target.value;
   },
   checkUser(){
       if(
           this.user.name=='' || this.user.name==undefined ||
           this.user.last_name=='' || this.user.last_name==undefined ||
           this.user.last_name=='' || this.user.last_name==undefined ||
           this.user.email=='' || this.user.email==undefined ||
           this.user.phone=='' || this.user.phone==undefined ||
           this.user.birth_date=='' || this.user.birth_date==undefined
        ){
            return false;
        }
        return true;
   },
    
       async   getUserPublicById(userId){
            let self = this
           await axios.get(`${SERVER_URI}/api/public/user/${userId}`).
            then(function(req){
                let _user =req.data.user;
                if(_user.length>0){
                    self.user =_user[0];
                    self.user_profile =`${SERVER_URI}/api/files/image/${_user[0].profile_picture}`; //image 
                 
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
     saveUpdate(){
          let self=this;
            axios.put(`${SERVER_URI}/api/user?token=${this.user_data.token}`,this.user)
             .then(function (req) {
                 console.log(req.data)
           if(!req.data.error){
               self.success.success=true;
               self.success.message=`Datos guardado.`;
               setTimeout(function(){
                   self.success.success=false;
               },1500)
           }
          
             })
            .catch(function (err) {
            //handle error
            
            if(err.response.data.error){
                self.error.error=true;
                self.error.message = err.response.data.message;
            }
        });
     },
   
   
 

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
       
    }
}
</script>
<style>
@import url("./styles.css");
.group-genre {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
    .radio-select {
        display: flex;
        flex-direction: column;
        margin:  20px;
        align-items: center;
    }
    .inputcheck{
        width: 20px;
        height: 20px;
        color: #f55;
    }
 .inputcheck:after {
  content: "";
  position: absolute;
  display: none;
  background: #f55;
}
</style>

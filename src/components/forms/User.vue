<template>
      <div class="card-user user-info-update">
                  <div class="card-body">
                        <div class="gropu-image">
                            <UserAvatar :propImageUrl="user_profile"/>
                        </div>

                        <div class="container-error">
                         <div class="alert alert-danger" role="alert" v-if="show_error.error">
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close" disabled="disabled">
                                    <span aria-hidden="true">&times;</span></button>
                                <strong>Oh snap! </strong> {{show_error.message}}
                        </div>
                         <div class="alert alert-success" role="alert" v-if="req_surcess">
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close" disabled="disabled">
                                    <span aria-hidden="true">&times;</span></button>
                                <strong></strong> {{surcess_message}}
                        </div>
                        </div>
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
                        v-model="user.phone" v-on:keyup="checkPhone" name="user_phone"
                        maxlength="12" minlength="6">
                      </div>
                    </div>
                </div>
                    <div class="group-card-user">
                    <div class="form-group">
                      <div class="input-group">
                        <span class="input-group-addon"><i class="fa fa-calendar-o"></i></span>
                        <input type="date" class="form-control" max="2018-02-10" min="1960-01-02" :value="user.birth_date" placeholder="YYYY-MM-DD"
                         v-on:change="setBirthDate" name="user_birth_date"
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
                    <button class="btn btn-primary btn-sm" v-on:click.prevent="saveUpdate" :disabled="btn_upload">Guardar </button>
                  </div>
            </div>
</template>
<script>
const {SERVER_URI,DB_USER_NAME}=require('@/config/index');
const {VPersons} =require('@/helpers/validate-persons');
const {DBLocal} =require('@/services/data_local');
const {EventBus} =require('@/eventbus');
import UserAvatar from './userImage.vue';
import { setTimeout } from 'timers';
const dbLocal= new DBLocal(DB_USER_NAME);
const VP= new VPersons();
const axios = require('axios');

export default {
    name: 'user-form',
    data(){
        return{
            user_data: undefined,
            hiddenSave: true,
            user_profile : undefined,
            req_surcess:false,
            surcess_message:'',
            btn_upload:true,
            show_error: {
                error: false,
                message: ''
            },
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
            }
        }
    },
    watch: {
        //validate name of person
        'user.name':function(newValue){
            this.show_error.error =false;
            if(newValue.length>2){
                if(!VP.name(newValue) ){
                    this.show_error.error =true;
                    this.show_error.message=`"${newValue}"  No es un nombre permitido`;
                }
            }           
        },
         //validate name of person
        'user.last_name':function(newValue){
            this.show_error.error =false;
            if(newValue.length>2){
                if(!VP.name(newValue) ){
                    this.show_error.error =true;
                    this.show_error.message=`"${newValue}"  No es un apellido permitido`;
                }
            }           
        }

    },
    components:{
        UserAvatar
    },
    methods:{
    redirectUserLogin(){
        if(dbLocal.checkDataLocalStorageOBject())
        this.user_data  =dbLocal.getDataLocalStorageOBject();
    },
       async   getUserPublicById(userId){
            let self = this
           await axios.get(`${SERVER_URI}/api/public/user/${userId}`).
            then(function(req){
                let _user =req.data.user;
                if(_user.length>0){
                    self.user =_user[0];
                    self.user_profile =`${SERVER_URI}/api/files/image/${_user[0].profile_picture}`; //image 
                    self.user.birth_date = self.changeDate(self.user.birth_date);
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
        saveUpdate(){
            let self =this;
            let input= document.querySelectorAll('.user-info-update input[type="radio"]');
             for( let i in input){
                 self.validateField(input[i].name,input[i].value)
             }
             //send data uplodad this.user
             axios.put(`${SERVER_URI}/api/user?token=${this.user_data.token}`,{
               name: this.user.name,
               last_name: this.user.last_name,
               birth_date: this.user.birth_date,
               phone: this.user.phone,
               gender: this.user.gender,
             }).then((req)=>{
                 if(!req.data.error){
                     self.req_surcess =true;
                     self.surcess_message =req.data.message;
                     self.btn_upload=true;
                     setTimeout(function(){
                            self.req_surcess =false;
                     },2000)
                 }
            }).catch((err)=>{
                console.log("error",err)
            })

        },
       
        changeDate(form_date){
            let dateFormat;
            dateFormat =new Date(form_date).toLocaleString('en-GB', { timeZone: 'UTC' });
            dateFormat =dateFormat.split(",")[0];
            let tmp=   dateFormat.split("/");
            return `${tmp[2]}-${tmp[1]}-${tmp[0]}`;
        },
        setBirthDate(event){
            this.user.birth_date = event.target.value;
        }
        ,
        checkPhone(){
            console.log('chek font')
        },
        save(){
        
            axios.post(`${SERVER_URI}/api/public/user`,function(req){

            }).catch((err)=>{
                console.log(err)
            })
    

        },
        cheketImput(){
            let self =this;
            let input= document.querySelectorAll(".user-info-update input");
             for( let i in input){
              if( input[i]!=undefined || input[i]!=null){
                     input[i].addEventListener("keyup",function(event){
                     let formName =event.target.name || undefined;
                     let form_value =event.target.value || undefined;
                      if(formName===undefined){
                          throw new Error('tag not allowed');
                          return;
                      }
                       
                     self.validateField(formName,form_value)
                 },false);
             }
              let inputRadio= document.querySelectorAll('input[name="gender"]') || [];
                if(inputRadio.length>0){
             for(let i in inputRadio.length){
                 inputRadio[i-1].addEventListener('click',function(event){
                 self.btn_upload=false;
             })
            }
                }
             }

          

        },
        validateField(formName,form_value){
             //validate name and last name
           
                        let self =this;
                        if(formName=='user_name' || formName=='last_name'){
                            let re = /(^([A-Za-zÁÉÍÓÚñáéíóúÑ]{3,12}[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{2,12})?[\s]*$))/ig;
                            if(!re.test(form_value) || !form_value.length>0){
                            self.show_error.error= true;
                            self.show_error.message= `"El nombre o apellido no es válido.  ${form_value}" `;
                            throw new Error( self.show_error.message);
                            }else{
                                self.show_error.error= false;
                            }
                        }
                        // validate email 
                         if(formName=='user_email'){
                            let re = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/ig;
                            if(!re.test(form_value) || !form_value.length>0){
                            self.show_error.error= true;
                            self.show_error.message= `"El correo electrónico no es válido.  ${form_value}"`;
                            throw new Error( self.show_error.message);
                            }else{
                                self.show_error.error= false;
                            }
                        }
                        //validate
                         if(formName=='user_phone'){
                            let re = /^[1?+]?[0-9]{0,12}$/ig;
                            if(!re.test(form_value) || !form_value.length>0){
                            self.show_error.error= true;
                            self.show_error.message= `"El numero de teléfono no es válido  ${form_value}" `;
                            throw new Error( self.show_error.message);
                            }else{
                                self.show_error.error= false;
                            }
                        }

                        if(formName=='gender'){
                        let  gender=   document.querySelectorAll('input[name="gender"]')
                           let _gender=undefined;
                           let ifcheck=false;
                           for(let i in gender){
                               if(gender[i].checked){
                                _gender=gender[i];
                                self.user.gender =_gender.value
                                ifcheck=true;
                               }
                           }
                           if(!ifcheck){
                            self.show_error.error= true;
                            self.show_error.message= `"No ha seleccionado su sexo." `;
                            throw new Error( self.show_error.message); 
                           }
                        }
                        self.btn_upload =false;

        }
        
    },
    
    mounted(){
        this.redirectUserLogin();
         let user_id  =dbLocal.getDataLocalStorageOBject().user.id;
         this.getUserPublicById(user_id);
         let self =this;
         EventBus.$on('LOAIMAGEPROFILE', function(data){
             self.user.profile_picture =data.url;
             console.log( self.user);
         });
         //check imput
         this.cheketImput();

         ///probar exprexion
        
    
        
    },
  
}
</script>
<style>
.card-user{
    max-width: 800px;
    margin: 0px auto;
    background: #fff;
}
    .group-card-user{
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
    }
   .group-card-user .form-group{
       flex-grow: 1;
    }
    .gropu-image{
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .container-error{
        width: 100%;
        height: 30px;
    }
    .oardio input{
        border: #363636 solid 1px !important;
    }
</style>



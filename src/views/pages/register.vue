<template>
    <div class="container-auxiliar">
     <Layoutpage> 
		  
    <div  class="container-page-form" slot="content">

   <div id="register_wrapper">
	  <div class="logo">
				<img src="assets/img/logo/ml-logo.png" alt="logo" class="logo-img">
			</div>
        <h1 class="login-title">
          Create an account
        </h1>
        <div class="login-body">
					<div class="col-xs-12">
						<button class="btn btn-facebook btn-block"><i class="zmdi zmdi-facebook"></i> Sign Up with Facebook</button>
					</div>
			

          <form class="clear-both">
						<h2 class="text-center p-t-20">
							Or sign up below
						</h2>
            <div class="form-group label-floating is-empty">
              <label class="control-label">Name
                <span v-if="nameError!==undefined" class="form-error-label"> {{nameError}}</span>
              </label>
              <input type="text" v-model="user.name" class="form-control" required v-on:keyup="nameError=undefined">
            </div>
            <div class="form-group label-floating is-empty">
              <label class="control-label"  >Email 
                <span v-if="emailError!=undefined" class="form-error-label"> {{emailError}}</span>
                </label>
              <input type="email" class="form-control" v-model="user.email" required v-on:keyup="emailError=undefined">
            </div>
            <div class="form-group label-floating is-empty">
              <label class="control-label passwor-content"><span>Password</span>
                 <span v-if="passwordError!=undefined" class="form-error-label"> {{passwordError}}</span>
                 <span v-if="passwordStatus>0" :class="'form-error-color '+passwordStatusClass"> </span>
              </label>
              <input type="password" class="form-control" v-model="user.password"  v-on:keyup="checkPassWord">
            </div>
            <div class="checkbox inline-block">
              <label>
                <input type="checkbox" class="checkbox-inline" v-model="user.terms" v-on:click="checkActive">
                I agree to the <a href="/terms">terms of services</a>
              </label>
            </div>
            <a href="javascript:void(0)" class="btn btn-info btn-block m-t-40"
            v-on:click.prevent="regiterUser"
            :disabled="btnActive"
            >Create my account</a>
          </form>
        </div>
        <div class="login-footer p-15">
          <p>
            Already have an account? <a href="/login" data-toggle="register">Sign In</a>
          </p>
        </div>
      </div>
    </div> 
     </Layoutpage>
    </div>
</template>

<script>
     import Router from "vue-router";
 import Layoutpage from "@/layouts/Layoutpage.vue"
//librerias for webservices
const axios =require('axios')
const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
//db local 
const {DBLocal} =require('@/services/data_local')
const dbLocal = new DBLocal(DB_USER_NAME);
		
    export default {
        name: "login",
        components:{
            Layoutpage
        },
        data(){
            return {
              location,
              user: {
                name: undefined,
                email: undefined,
                password: undefined,
                terms:false,
                check: false,
                

              },
              emailError: undefined,
              passwordStatus: 0,
              passwordStatusClass: undefined,
              nameError: undefined,
              passwordError: undefined,
              btnActive:true,
                messages: {
                    code: "404",
                    description: "We couldn't find this page.",
                    button: "Let's go home",
                    signal: "Whoops!"
                }
            }
        },
   
		methods:{
      checkActive(event){
        if(event.target.checked)
        this.btnActive=false;
        else
        this.btnActive=true;
      },
			regiterUser(){
        if(this.btnActive){
          return ;
        }
         
      if(this.user.name===undefined){
        this.nameError=`Name is required`;
        return;
     
      }
       var re = /^(?=.*?[a-z]).{4,}$/;
      if(!re.test(String(this.user.name))){
        this.nameError=`${this.user.name} is not a name validate`;
        return;
     
      }

      if(!this.validateEmail(this.user.email)){
       return this.emailError=`This ${this.user.email} email address is not valid`;
      }



    if(this.user.password===undefined  || this.user.password==''){
        this.password=`password is required`;
        return;
     
    }

				let self =this;
		 axios.post(SERVER_URI+"/api/user",self.user).then(data=>{
       console.log(data.data)
					 if(data.data.error){
             self.emailError =data.data.message;
           }else{
             self.getLoginRequire();
           }
					}).catch(err=>{
	
						
					})
	
			},
      checkPassWord(){
        this.emailError=undefined;
      this.validatePassword(this.user.password);
      },
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },

     validatePassword(password) {
       if(String(password).length>5){
         this.passwordStatusClass="md-bg-red-800";
         this.passwordStatus =1;
         
      
       // var re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        var re = /^(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;
       if(re.test(String(password))){
         this.passwordStatus =2;
         this.passwordStatusClass="md-bg-amber-300";
       }

        re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;
       if(re.test(String(password))){
         this.passwordStatus =2;
         this.passwordStatusClass="md-bg-light-green-A200";
       }
        re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
       if(re.test(String(password))){
         this.passwordStatus =3;
         this.passwordStatusClass="md-bg-light-green-A700";
       }
}else{
  this.passwordStatus =0;
  return ;
}
    },
    process(event){
      console.log("Event==>", event)
    },
	redirectUserLogin(){
		if(dbLocal.checkDataLocalStorageOBject()){
			this.$router.push('/profile')
			}
      },
      	getLoginRequire(){
				
		 axios.post(SERVER_URI+"/api/login",{
						email: this.user.email,
						password: this.user.password
					}).then(data=>{
					
					//set datas to save in localstorage
						const user={
							token: data.data.token,
							user: data.data.users
						}
					
            dbLocal.seveDataLocalStorageJson(user);
            if(dbLocal.checkDataLocalStorageOBject()){
		        	this.$router.push( '/profile/' +dbLocal.getDataLocalStorageOBject().user.id)
		    	}
					
					}).catch(err=>{
						console.log(err)
						let error =err.response.data;
						//pass error tu tag
						this.error.error =error.error;
						this.error.message =error.message;
						
					})
	
			}


		},
		mounted(){
      this.redirectUserLogin();
 
      },
      updated(){
     //   this.emailError=undefined;
      }
		
		}
		
 
			
</script>
<style>
#register_wrapper{
	max-width: 420px;
	padding: 20px;
	padding-top: 100px;
	box-sizing: border-box;
}
.container-page-forms{
  padding-bottom: 100px;
}
.form-error-label{
  font-size: 10px;
  color: #f00;
}
.passwor-content{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.form-error-color{
  display: block;
  flex-grow: 1;
  margin-left: 5px;
  width: 200px;
  height: 5px;
}
</style>
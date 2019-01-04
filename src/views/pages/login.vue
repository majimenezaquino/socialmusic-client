<template>
    <div class="container-auxiliar">
     <Layoutpage> 
  
	  <div slot="content">  
		<div id="login_content">
			<div class="logo">
				<img src="assets/img/logo/ml-logo.png" alt="logo" class="logo-img">
			</div>
      <h1 class="login-title">
        Sign In to your account
      </h1>
	  <p class="text-error bg-danger" v-if="error.error">{{error.message}} </p>
      <div class="login-body">
		        <form>
		          <div class="form-group label-floating is-empty">
		            <label class="control-label">Email</label>
		            <input type="text" class="form-control" v-model="credentials.username" @keyup="checkFields">
		          </div>
		          <div class="form-group label-floating is-empty">
		            <label class="control-label">Password</label>
		            <input type="password" class="form-control" v-model="credentials.userpassword" @keyup="checkFields">
		          </div>
		          <a href="javascript:void(0)" class="forgot-pass pull-right">Forgot Password?</a>
		          <div class="checkbox inline-block">
		            <label>
		              <input type="checkbox" class="checkbox-inline" value="">
		              Remember Me
		            </label>
		          </div>
				<button class="btn btn-info btn-block m-t-40" @click.prevent="getLoginRequire" :disabled="btn_disabled" >Sign In</button>

		          <div class="login-options">
		            <span>OR</span>
		            <hr />
		          </div>
		          <div class="row">
		            <div class="col-xs-12">
		              <button class="btn btn-facebook btn-block"><i class="zmdi zmdi-facebook"></i> Sign In with Facebook</button>
		            </div>
		            <div class="col-xs-12">
		              <button class="btn btn-google btn-block"><i class="zmdi zmdi-google-plus"></i> Sign In with Google</button>
		            </div>
								<div class="col-xs-12">
									<button class="btn btn-twitter btn-block"><i class="zmdi zmdi-twitter"></i> Sign In with Twitter</button>
								</div>
		          </div>
		        </form>
      </div>
      <div class="login-footer p-15">
        <p>
          Don't have an account? <a href="./register" data-toggle="register">Create an account</a>
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
                credentials: { 
						username: '',
						userpassword: ''
				},
				error:{
					error: false,
					message: ''
				},
				btn_disabled: true,
            }
		},
		methods:{
			getLoginRequire(){
				
		 axios.post(SERVER_URI+"/api/login",{
						email: this.credentials.username,
						password: this.credentials.userpassword
					}).then(data=>{
					
					//set datas to save in localstorage
						const user={
							token: data.data.token,
							user: data.data.users
						}
					
						dbLocal.seveDataLocalStorageJson(user)
						this.redirectUserLogin();
					}).catch(err=>{
						console.log(err)
						let error =err.response.data;
						//pass error tu tag
						this.error.error =error.error;
						this.error.message =error.message;
						
					})
	
			},
		checkFields(){
				if(this.credentials.username.length>6 && this.credentials.userpassword.length>=5){
					this.btn_disabled =false;
					this.error.error=false;
				}else{
					this.btn_disabled =true;
				}

			},

	redirectUserLogin(){
		if(dbLocal.checkDataLocalStorageOBject()){
			this.$router.push( '/profile/' +dbLocal.getDataLocalStorageOBject().user.id)
			}
			}


		},
		mounted(){
			this.redirectUserLogin();
			
			}
		
		}
		
 
			
</script>
<style>
  #login_content{
	max-width: 420px;
	padding:50px  20px;
	box-sizing: border-box;
}
.text-error{
text-align: center;
padding: 0px 5px;
color :red;
}

</style>
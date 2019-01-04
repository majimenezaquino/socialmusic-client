<template>
    <div class="container-auxiliar">
     <LayoutDashboard> 
		 
		 <div slot="content" >
        <div id="app_wrapper" class="page-profile">


<section id="content_outer_wrapper">
<div id="content_wrapper" class="card-overlay">
				<div id="header_wrapper" class="header-xl custom profile-header">
					<ul class="card-actions fab-action right">
						<li>
							<button class="btn btn-primary btn-fab" data-toggle="modal" data-target="#toolabr_modal">
								<i class="zmdi zmdi-plus"></i>
							</button>
						</li>
					</ul>
				</div>

	<!-- container-fluid	 -->
<div id="content" class="container-fluid">
<div class="row">
<div class="col-xs-12">

<!-- card card-transparent -->
<div class="card card-transparent">
		<div class="card-body wrapper">
						<div class="row">
						<!-- fixed -->
									<div class="col-md-12 col-lg-3">
									 <UserProfile 
									 :user_id="user_id"
									 />
									</div>
							<div class="col-md-12 col-lg-8">
										<div class="card">
											<header class="card-heading p-0">
													<div class="tabpanel m-b-30">
															<ul class="nav nav-tabs nav-justified">
																
																<li role="presentation">
																	<a href="#profile-about" data-toggle="tab" aria-expanded="true">About</a>
																</li>
																<li  class="active "  role="presentation">
																	<a href="#profile-musics" data-toggle="tab" aria-expanded="true">
																		<i class="fa fa-music" aria-hidden="true"></i>
																		Musics
																		</a>
																</li>
																<li role="presentation">
																	<a href="#profile-playlist" data-toggle="tab" aria-expanded="true">Playlist</a>
																</li>
																<li role="presentation">
																	<a href="#profile-contacts" data-toggle="tab" aria-expanded="true">Event</a>
																</li>
															</ul>
													</div>
												</header>
									<div class="card-body">
										<div class="tab-content">
											<div class="tab-pane fadeIn active" id="profile-about">
											 <About />
											</div>

											<div class="tab-pane fadeIn" id="profile-musics">
											<MusicsByUSer />
											</div>
											

											<div class="tab-pane fadeIn" id="profile-contacts">
											contenido elilminado	
											</div>

											<div class="tab-pane fadeIn" id="profile-playlist">
											contenido elilminado	
											</div>
										</div>
									</div>
										</div>
									</div>
							<!-- fixed -->
						</div>
			</div>
		</div>
		<!-- card card-transparent -->
	</div>
</div>
</div>
<!-- container-fluid	 -->
</div>

</section>

</div>
	<ContentNotFound 
	v-if="!user_found"
	:error_name="'user not found'"
	:error_description="''"
	 />
		 </div>
     </LayoutDashboard>
    </div>
</template>

<script>
  

	const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
	const {DBLocal} =require('@/services/data_local')
	const dbLocal= new DBLocal(DB_USER_NAME);
	import LayoutDashboard from "@/layouts/LayoutDashboard.vue";
	import MusicsByUSer from "@/components/profiles/MusicsByUSer.vue";
	import UserProfile from "@/components/profiles/profile.vue";
	import About from "@/components/profiles/about.vue";
	const axios =require('axios')
	import ContentNotFound from "@/components/cards/ContentNotFound.vue";
    export default {
		name: "dashboard",
		data(){
			return {
				user_found: false,
				user_id: this.$route.params.id,
				}
			},
        components:{
			LayoutDashboard,
			MusicsByUSer,
			UserProfile,
			About,
			ContentNotFound

		}
		,
		methods:{
		 redirectUserLogin(){
			 
		if(!dbLocal.checkDataLocalStorageOBject()){
				this.$router.push( './login' )
			}
			},
		   async   getUserPublicById(userId){
			  
            let self = this
           await axios.get(`${SERVER_URI}/api/public/user/${userId}`).
            then(function(req){
                let _user =req.data.user;
                if(_user.length>0){
					self.user_found=true;
                    self.userPublic =_user[0];
                    
                }
                
             
            }).catch(function(err){
			//	console.log(`error--->${err}`)
				
            })
            
           // console.log(this.musics)
        }
		},
		mounted(){
		this.redirectUserLogin();
		this.getUserPublicById(this.user_id);	
		},
		beforeMount(){
			//console.log("USER IN DASTBOARD",dbLocal.getDataLocalStorageOBject())
			
		}
	}
	

</script>
<style>

</style>
<template>
    	<nav id="app_main-menu-wrapper" class="scrollbar">
				<div class="sidebar-inner sidebar-push">
					<div class="card profile-menu" id="profile-menu">
						<header class="card-heading card-img alt-heading">
							<div class="profile">
								<header class="card-heading card-background" id="card_img_02">
									<img src="assets/img/profiles/18.jpg" alt="" class="img-circle max-w-75 mCS_img_loaded">
								</header>
								<a href="javascript:void(0)" class="info" data-profile="open-menu"><span>admin@materiallab.pro</span></a>
							</div>
						</header>
					
					</div>
					<ul class="nav nav-pills nav-stacked">
						<li class="sidebar-header">NAVIGATION</li>
						<li><router-link :to="'/profile/'+user_id">
							<i class="fa fa-home" aria-hidden="true"></i>Home
						</router-link></li>
						<li>
							<router-link to="/musics"><i class="fa fa-music"></i>Music</router-link>
							
							</li>
						<li><router-link to="/playlist">
							<i class="zmdi zmdi-playlist-audio"></i>Playlist</router-link>
						</li>

						<li><router-link to="/musician">
							<i class="zmdi zmdi-gradient"></i>Musician</router-link>
						</li>

						<li><router-link to="/nightclub">
							<i class="zmdi zmdi-store"></i> Nigthclub</router-link>
						</li>
						
	
						<li class="nav-dropdown">
							<a href="#"><i class="zmdi zmdi-google-pages"></i>Nigthclub</a>
							<ul class="nav-sub">
								<li><a href="page-profile.html">Profile</a></li>
							</ul>
						</li> 
						
						</ul>
					</div>
				</nav>
</template>
<script>
const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
const {DBLocal} =require('@/services/data_local')
const dbLocal= new DBLocal(DB_USER_NAME);

    export default {
		name: "sidebar-left",
		data(){
			return{
				user_id: undefined,
			}
		},
		methods:{
			redirectUserLogin(){
			 
			if(dbLocal.checkDataLocalStorageOBject()){
					this.user_id=dbLocal.getDataLocalStorageOBject().user.id;
				}
            }
		},
		mounted(){
			this.redirectUserLogin();
		}
    }
</script>
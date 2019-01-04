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
										<div class="card type--profile">
											<header class="card-heading">
													<img src="assets/img/profiles/05.jpg" alt="" class="img-circle">
													<ul class="card-actions icons right-top">
														<li class="dropdown">
															<a href="javascript:void(0)" data-toggle="dropdown">
																<i class="zmdi zmdi-more-vert"></i>
															</a>
															<ul class="dropdown-menu dropdown-menu-right btn-primary">
																<li>
																	<a href="javascript:void(0)">Edit Profile</a>
																</li>
															</ul>
														</li>
													</ul>
											</header>
												<div class="card-body">
													<h3 class="name">Sarah Lee</h3>
													<span class="title">UI/UX Designer</span>
													<button type="button" class="btn btn-primary btn-round">Connect</button>
												</div>
												<footer class="card-footer border-top">
														<div class="row row p-t-10 p-b-10">
														<div class="col-xs-4"><span class="count">250</span><span>Musics</span></div>
														<div class="col-xs-4"><span class="count">1.5m</span><span>Followers</span></div>
														<div class="col-xs-4"><span class="count">627</span><span>Following</span></div>
													</div>
												</footer>
										</div>	
									</div>
							<div class="col-md-12 col-lg-8">
										<div class="card">
											<header class="card-heading p-0">
													<div class="tabpanel m-b-30">
															<ul class="nav nav-tabs nav-justified">
																<li class="active " role="presentation"><a href="#profile-timeline" data-toggle="tab" aria-expanded="true">Musics</a></li>
																<li role="presentation"><a href="#profile-about" data-toggle="tab" aria-expanded="true">About</a></li>
															</ul>
													</div>
												</header>
										<div class="card-body">
										<div class="tab-content">
															<div class="tab-pane fadeIn active" id="profile-timeline">
																<!-- slot for  put the musics-->
																<slot name="content-music"></slot>
																<!--end  slot for  put the musics-->
															</div>
															<div class="tab-pane fadeIn" id="profile-about">
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
		 </div>
     </LayoutDashboard>
    </div>
</template>

<script>
	const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
	const {DBLocal} =require('@/services/data_local')
	const dbLocal= new DBLocal(DBLocal);
	
    import LayoutDashboard from "@/layouts/LayoutDashboard.vue"
    export default {
        name: "profiles",
        components:{
            LayoutDashboard
		}
		,
		methods:{
		 redirectUserLogin(){
			 
		if(!dbLocal.checkDataLocalStorageOBject()){
				this.$router.push( './login' )
			}
			}
		},
		created(){
			this.redirectUserLogin();
		}
	}
	

	 
  
</script>
<style>

</style>
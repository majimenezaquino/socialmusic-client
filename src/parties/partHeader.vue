<template>
    <header id="app_topnavbar-wrapper">
			<nav role="navigation" class="navbar topnavbar">
				<div class="nav-wrapper">
					<div id="logo_wrapper" class="nav navbar-nav">
						<ul>
							<li class="logo-icon">
								<a href="index-2.html">
									<div class="logo">
										<img src="assets/img/logo/logo-icon.png" alt="Logo">
									</div>
									<h1 class="brand-text">MaterialLab</h1>
								</a>
							</li>
						</ul>
					</div>
					<ul class="nav navbar-nav left-menu ">
						<li class="menu-icon">
							<a href="javascript:void(0)" role="button" data-toggle-state="app_sidebar-menu-collapsed" data-key="leftSideBar">
								<i class="mdi mdi-backburger"></i>
							</a>
						</li>
					</ul>
					<ul class="nav navbar-nav left-menu">
						<li>
							<a href="javascript:void(0)" class="nav-link" data-toggle-profile="profile-open">
								<i class="zmdi zmdi-account"></i>
							</a>
						</li>
						<li class="dropdown dropdown-lg app_menu_launcher">
							<a href="javascript:void(0)" class="nav-link" data-toggle="dropdown" aria-expanded="false">
								<i class="zmdi zmdi-apps"></i>
							</a>
							<ul class="dropdown-menu dropdown-lg-menu dropdown-menu-left btn-primary p-15 text-center">
								<li>
									<ul>
										<li><a href="app-mail.html"><i class="zmdi zmdi-email"></i><span>Mail</span></a></li>
										<li><a href="javascript:void(0)"><i class="zmdi zmdi-accounts-list"></i><span>Contacts</span></a></li>
										<li><a href="javascript:void(0)"><i class="zmdi zmdi-comment-text"></i><span>Chat</span></a></li>
									</ul>
								</li>
								<li>
									<ul>
										<li><a href="app-notes.html"><i class="mdi mdi-lightbulb"></i><span>Notes</span></a></li>
										<li><a href="app-taskboard.html"><i class="zmdi zmdi-view-column"></i><span>Taskboard</span></a></li>
										<li><a href="javascript:void(0)"><i class="zmdi zmdi-calendar-note"></i><span>Calendar</span></a></li>
									</ul>
								</li>
							</ul>
						</li>
						<li class="dropdown mega">
							<a href="#" data-toggle="dropdown" class="dropdown-toggle nav-link" aria-expanded="false">
								<span>Mega</span>
								<span class="caret"></span>
							</a>
							<div class="dropdown-menu full-width p-l-10 p-b-20">
									<div class="row">
										<div class="col-sm-4 col-md-4">
											<h3>Application Views <span class="badge status info">10</span></h3>
											<ul class="col-xs-6">
												<li>
													<a href="app-mail.html" class="btn-primary-hover"><i class="zmdi zmdi-chevron-right m-r-5"></i> Mail</a>
												</li>
												<li>
													<a href="ecommerce-dashboard.html" class="btn-primary-hover"><i class="zmdi zmdi-chevron-right m-r-5"></i>  E-commerce Dashboard</a>
												</li>
												<li>
													<a href="ecommerce-products.html" class="btn-primary-hover"><i class="zmdi zmdi-chevron-right m-r-5"></i>Products</a>
												</li>
												<li>
													<a href="ecommerce-customers.html" class="btn-primary-hover"><i class="zmdi zmdi-chevron-right m-r-5"></i>Customers</a>
												</li>
												<li>
													<a href="ecommerce-settings.html" class="btn-primary-hover"><i class="zmdi zmdi-chevron-right m-r-5"></i>Settings</a>
												</li>
											</ul>
											<ul class="col-xs-6">
												<li>
													<a href="app-chat.html" class="btn-primary-hover"><i class="zmdi zmdi-chevron-right m-r-5"></i>Chat</a>
												</li>
												<li>
													<a href="app-calendar.html" class="btn-primary-hover"><i class="zmdi zmdi-chevron-right m-r-5"></i>Calendar</a>
												</li>
												<li>
													<a href="app-contacts.html" class="btn-primary-hover"><i class="zmdi zmdi-chevron-right m-r-5"></i>Contacts</a>
												</li>
												<li>
													<a href="app-locations.html" class="btn-primary-hover"><i class="zmdi zmdi-chevron-right m-r-5"></i>Office Locations</a>
												</li>
												<li>
													<a href="app-notes.html" class="btn-primary-hover"><i class="zmdi zmdi-chevron-right m-r-5"></i>  Notes</a>
												</li>
											</ul>
										</div>
										<div class="col-sm-4 col-md-4">
											<h3>Pages <span class="badge status info">10</span></h3>
											<ul class="col-xs-6">
												<li>
													<a href="page-profile.html" class="btn-primary-hover"><i class="zmdi zmdi-chevron-right m-r-5"></i> Profile</a>
												</li>
												<li>
													<a href="page-invoice.html" class="btn-primary-hover"><i class="zmdi zmdi-chevron-right m-r-5"></i>  Invoice</a>
												</li>
												<li>
													<a href="page-contact.html" class="btn-primary-hover"><i class="zmdi zmdi-chevron-right m-r-5"></i>  Contact Us</a>
												</li>
												<li>
													<a href="page-pricing-tables.html" class="btn-primary-hover"><i class="zmdi zmdi-chevron-right m-r-5"></i>  Pricing Tables</a>
												</li>
												<li>
													<a href="page-gallery.html" class="btn-primary-hover"><i class="zmdi zmdi-chevron-right m-r-5"></i>Photo Gallery</a>
												</li>
											</ul>
											<ul class="col-xs-6">
												<li>
													<a href="page-locations.html" class="btn-primary-hover"><i class="zmdi zmdi-chevron-right m-r-5"></i>  Locations</a>
												</li>
												<li>
													<a href="page-400.html" class="btn-primary-hover"><i class="zmdi zmdi-chevron-right m-r-5"></i> 400 Error</a>
												</li>
												<li>
													<a href="page-maintenance.html" class="btn-primary-hover"><i class="zmdi zmdi-chevron-right m-r-5"></i>500 Error</a>
												</li>
												<li>
													<a href="page-maintenance.html" class="btn-primary-hover"><i class="zmdi zmdi-chevron-right m-r-5"></i>  Maintenance</a>
												</li>
												<li>
													<a href="login.html" class="btn-primary-hover"><i class="zmdi zmdi-chevron-right m-r-5"></i>  Login</a>
												</li>
											</ul>
										</div>
										<div class="col-sm-12 col-md-4">
											<h3 class="p-t-15 p-b-15">New Arrivals</h3>
											<div id="new_arrivals_megamenu" class="row">
												<div class="col-xs-12">
													<img src="assets/img/ecom/products/39_Ie8T.jpg" class="max-h-100" alt="">
													<img src="assets/img/ecom/products/39_8wMD.jpg" class="max-h-100" alt="">
													<img src="assets/img/ecom/products/39_JnFC.jpg" class="max-h-100" alt="">
													<img src="assets/img/ecom/products/2830_S4ql.jpg" class="max-h-100" alt="">
													<img src="assets/img/ecom/products/4107_PPxC.jpg" class="max-h-100" alt="">
													<img src="assets/img/ecom/products/5764_YK7g.jpg" class="max-h-100" alt="">
													<img src="assets/img/ecom/products/420_dEPl.jpg" class="max-h-100" alt="">
													<img src="assets/img/ecom/products/1850_N6ck.jpg" class="max-h-100" alt="">
												</div>
											</div>
										</div>
									</div>
							</div>
						</li>
					</ul>
					<ul class="nav navbar-nav pull-right">
						<li>
							<a href="javascript:void(0)" data-navsearch-open>
								<i class="zmdi zmdi-search"></i>
							</a>
						</li>
						<li class="select-menu hidden-xs hidden-sm">
							<select class="select form-control country" style="display:none">
								<option option="EN">English</option>
								<option option="ES">Español</option>
								<option option="FN"> Français</option>
								<option option="IT">Italiano</option>
							</select>
						</li>
						<li class="dropdown hidden-xs hidden-sm">
							<a href="javascript:void(0)" data-toggle="dropdown" aria-expanded="false">
								<span class="badge mini status danger"></span>
								<i class="zmdi zmdi-notifications"></i>
							</a>
							<Notification />
						</li>
						<li class="dropdown hidden-xs hidden-sm">
							<a href="javascript:void(0)" data-toggle="dropdown" aria-expanded="false">
								<i class="fa fa-cog" aria-hidden="true"></i>
							</a>
							<ul class="dropdown-menu dropdown-lg-menu dropdown-menu-right dropdown-alt">
								<li class="dropdown-menu-header">
									<Loguot />
								</li>
							</ul>
						</li>
						<li class="last">
							<a href="javascript:void(0)" data-toggle-state="sidebar-overlay-open" data-key="rightSideBar">
								<i class="mdi mdi-playlist-plus"></i>
							</a>
						</li>
					</ul>
				</div>
				<form role="search" action="#" class="navbar-form" id="navbar_form">
					<div class="form-group">
						<input type="text" placeholder="Search and press enter..." class="form-control" id="navbar_search" autocomplete="off">
						<i data-navsearch-close class="zmdi zmdi-close close-search"></i>
					</div>
					<button type="submit" class="hidden btn btn-default">Submit</button>
				</form>
			</nav>
		</header>
</template>
<script>
 import Loguot from'@/components/config/logout.vue';
 import Notification from'@/components/notification/notification.vue';
 
	
    export default {
		name: "partheader",
		components:{
			Loguot,
			Notification
		},

	
    }
</script>
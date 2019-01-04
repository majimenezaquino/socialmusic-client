<template>
    <div id="app_wrapper">
		<!--header -->
		<PartHeader> </PartHeader>
		<!--end header -->
			<aside id="app_sidebar-left">
			<!--sidebar left-->
				<PartSideBarLeft> </PartSideBarLeft>
			<!-- and sidebar left-->
			</aside>
			
				<div id="content_wrapper" class="simple"> 
		
					
						<!--hire put conten -->
						<slot name="content"></slot>
						<!--  -->
			
					</div>

						<!-- component playlist -->
					<!-- <Player> </Player> -->
					<!-- footer -->
					<!-- <PartFooter> 
						
					</PartFooter> -->
					
				<aside id="app_sidebar-right">
						<!--sidebar-right-->
						<PartSideBarRight> </PartSideBarRight>
						<!-- end sidebar-right-->
					</aside>
				</div>
				
</template>

<script>
//import Player from "@/components/player/Player.vue";
import Player from "@/components/player/player2.vue";
import PartHeader from "@/parties/partHeader.vue";
import PartFooter from "@/parties/partFooter.vue";
import PartSideBarRight from "@/parties/part-sidebar-right.vue";
import PartSideBarLeft from "@/parties/part-sidebar-left.vue";

const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
const {DBLocal} =require('@/services/data_local')
const dbLocal= new DBLocal(DB_USER_NAME);

	   export default {
        name: "layoutdashboard",
		components:{
			PartHeader,
			PartFooter,
			PartSideBarRight,
			PartSideBarLeft,
			Player
			
		},
		methods:{
			redirectUserLogin(){
			 
			if(!dbLocal.checkDataLocalStorageOBject()){
					this.$router.push( '/login' )
				}
            }
		},
		mounted(){
			this.redirectUserLogin();
		}
    }
</script>


<template>

     <LayoutDashboard> 
		 <div slot="content">
        <section id="content_outer_wrapper">
            <Language :markers='[
        {"lat":35.6432027,"lng":139.6729435},
        {"lat":35.5279833,"lng":139.6989209},
        {"lat":35.6563623,"lng":139.7215211},
        {"lat":35.6167531,"lng":139.5469376},
        {"lat":35.6950961,"lng":139.5037899}
      ]'/>
    </section>
		 </div>
     </LayoutDashboard>

</template>

<script>
  

	const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
	const {DBLocal} =require('@/services/data_local')
    const dbLocal= new DBLocal(DB_USER_NAME);
    const axios =require('axios')
	
    import LayoutDashboard from "@/layouts/LayoutDashboard.vue";
    import Language from "@/components/map/map.vue";
    import LoadFiles from "@/components/cards/LoadFile.vue";

    export default {
        name: "playlist_music",
        components:{
            Language
		}
    }

</script>

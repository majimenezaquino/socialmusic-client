<template>

     <LayoutDashboard> 
		 <div slot="content">
        <section id="content_outer_wrapper">
            	<Language> </Language>
            <LoadFiles />
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
    import Language from "@/components/config/language.vue";
    import LoadFiles from "@/components/cards/LoadFile.vue";

    export default {
        name: "playlist_music",
        components:{
            LayoutDashboard,
            Language,
            LoadFiles
		}
    }

</script>

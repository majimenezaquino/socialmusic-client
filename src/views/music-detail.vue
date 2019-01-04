<template>

     <LayoutDashboard> 
		 <div slot="content">
        <section id="content_outer_wrapper">
            	<div class="musics-body">
                    <div class="content-musics">
                         <div class="header">
                                    <h1></h1>
                                </div>
                            <div class="content">
                               <!-- show card-music if have`nt paramas -->
                                
                                    <CardMusicDetail
                                     v-for="(music_item ,index) in music_obj"
                                     :music="music_item"
                                     :key="index"
                                     />
                              
                                <div class="show-more">
                                    <a href="" v-on:click.prevent="getmusicsByUser">show more</a>
                                </div>
                            </div>
                    </div>

                   
				</div>
		
    </section>
		 </div>
     </LayoutDashboard>

</template>

<script>
  

	const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
	const {DBLocal} =require('@/services/data_local')
	const dbLocal= new DBLocal(DB_USER_NAME);
	const axios = require('axios')
    import LayoutDashboard from "@/layouts/LayoutDashboard.vue";
    import CardMusicDetail from "@/components/cards/cardMusicDetail.vue";
   import { setTimeout } from 'timers';
    export default {
        name: "musics",
        components:{
            LayoutDashboard,
            CardMusicDetail
        },
        data(){
            return {
                user_data: undefined,
                music_obj: []
            }
        },
        methods:{
            getMusicById(id){
            let self = this;
            axios.get(`${SERVER_URI}/api/musics/${id}?token=${this.user_data.token}`).
            then(function(req){
                console.log(req)
                    self.music_obj =req.data.music;           
            }).catch(function(err){
                console.log(`error--->${err}`)
            })

        },
         redirectUserLogin(){
			 if(!dbLocal.checkDataLocalStorageOBject()){
                this.$router.push( '../' )
			 }else{ 
                 this.user_data  =dbLocal.getDataLocalStorageOBject();
                 }
            }
        },
        mounted(){
            this.redirectUserLogin();
            this.getMusicById(this.$route.params.id);
            console.log(this.music_obj)

        }
    }

</script>
<style>
.musics-body{
padding-top: 70px;
background: #fff;
}
.content-musics{
    border-top: #ccc solid 1px;
  
    background: #eee;

}
.content-musics:last-child{
      border-bottom: #ccc solid 1px;
}
.content-musics .header{

    padding:10px;
    box-sizing: border-box;

}

.content-musics .content{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
    position: relative;
    
}
.show-more{
position: absolute;
bottom: 0px;
width: 100%;
overflow: hidden;
padding-top: 30px;
text-align: center;
}
.show-more a{
    text-decoration: underline;
}
.content-musics .content .musics{
    width: 175px;
    display: flex;
    flex-wrap: wrap;
    margin:0px 20px;
    margin-bottom: 30px;
    background: #fff !important;
}


.content-musics .content .musics .thumb{
    display: flex;
    position: relative;
    width: 175px;
    height: 175px;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    /*  */
}

/*color for album when not haven`t picture*/
.content-musics .content .musics:nth-of-type(2){
background-color: #1976d2!important;
}
.content-musics .content .musics:nth-of-type(3){
background-color: #64ffda!important;
}

.content-musics .content .musics:nth-of-type(4){
background-color: #ff1744!important;
}

.content-musics .content .musics .thumb .card-back{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    display: flex;
    justify-content: center;
    align-items: center;
}
.content-musics .content .musics .thumb .card-back button{
    display: block;
    width: 56px;
    height: 56px;
    border:#fff solid 1px;
    border-radius: 50%;
    font-size: 40px;
    background: transparent;
    padding: 0px;
    margin: 0px;
    position: relative;
    box-sizing: border-box;

}
.content-musics .content .musics .thumb .card-back button i{
    display: inline-block;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    margin-left: 3px;
    color: #fff;
}
.content-musics .content .musics:hover > .thumb  .card-back{
    z-index: 1;
    transition: all ease 0.2s;
    background: rgba(0, 0, 0, 0.7);
}
.content-musics .content .musics .card-option{
    display: flex;
    position: absolute;
    bottom: 0px;
    flex-wrap: wrap;
    align-items: flex-start;
     color: #fff;
     padding: 0px 4px;

}
.content-musics .content .musics .card-option span{
    font-size: 13px;
    width: 100%;
    margin: 0px;
    padding: 0px;
    line-height: 14px;
}
.content-musics .content .musics .card-option span a{
    display: inline-block;
    padding-bottom: 10px;
    text-decoration: underline;
}
.content-musics .content .musics  .card-info{
    text-align: center;
    width: 100%;
    height: 45px;
    background:rgba(255,255,255,1);
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.content-musics .content .musics  .card-info .info{
    flex-grow: 1;
    z-index: 10;
}
.content-musics .content .musics  .card-info .option a{
    display: block;
    width: 20px;
    position: relative;
    z-index: 10;
}
.content-musics .content .musics  .card-info .option{
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    color: #363636;
}
.content-musics .content .musics  .card-info .option .box-option{
    position: absolute;
    bottom: 38px;
    right: 0px;
    width: 175px;
    height:0px;
    background: #fff;
    z-index: 10;

}
.content-musics .content .musics  .card-info .option a:hover .box-option{
height: 175px;
}
.content-musics .content .musics  .card-info span{
    display: block;
    font-size: 13px;
    font-weight: bold;
     color: #363636;
     line-height: 17px;
     margin: 0px;
     padding: 0px;
     
     
}

.content-musics .content .musics  .card-info p{
    width: 100%;
    font-size: 11px;
     color: #363636;
     line-height: 12px;
     margin: 0px;
     padding: 0px;
 
}
.btn_link{
    text-decoration: underline;
    z-index: 100;
    font-size: 14px;
}
</style>
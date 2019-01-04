<template>

     <LayoutDashboard> 
		 <div slot="content">
        <section id="content_outer_wrapper">
            	<div class="playlist-body">
                    <div class="content-playlist">
                         <div class="header">
                                    <h1>My PlayList</h1>
                                </div>
                            <div class="content">
                                
                                
                                    <article class="playlist" v-for="(playl, index) in playlist" :key="index">
                                    <div class="thumb">
                                        <img :src="playl.img" alt="" v-if="playl.img!==null">
                                        <div class="card-back">
                                            <button> <i class="fa fa-play" aria-hidden="true"></i> </button>
                                            <div class="card-option">
                                                <span>Created By</span>
                                                <span><a href="">{{playl.user_published.name}}</a></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-info">
                                        <div class="info">
                                        
                                        <span>{{playl.name}}</span>
                                        <router-link :to="'playlist/'+playl._id" class="btn_link">Show soungs</router-link>
                                        </div>
                                        <div class="option">
                                            <a href="">
                                                <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                <div class="box-option"></div>
                                            </a>
                                            
                                        </div>
                                    </div>

                                </article>
                              
                                <div class="show-more">
                                    <a href="" v-on:click.prevent="getPlaylistByUser">show more</a>
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
    import LayoutDashboard from "@/layouts/LayoutDashboard.vue"
import { setTimeout } from 'timers';
    export default {
        name: "playlist",
        components:{
            LayoutDashboard
        },
        data(){
            return{
                playlist: [],
                user_data: undefined,
            }
        }
		,
		methods:{
		 redirectUserLogin(){
			 
		if(!dbLocal.checkDataLocalStorageOBject()){
				this.$router.push( './login' )
			}else{
                //set data by user
                this.user_data  =dbLocal.getDataLocalStorageOBject();
            }
            },
        getPlaylistByUser(){
            let self = this
            axios.get(`${SERVER_URI}/api/albumes?token=${this.user_data.token}`).
            then(function(req){
                
                if(req.data.albumes.length>0){
                    self.playlist= req.data.albumes;
                }
             
            }).catch(function(err){
                console.log(`error--->${err}`)
            })
            
           // console.log(this.playlist)
        }
		},
		
        created(){
           this.redirectUserLogin()
            this.getPlaylistByUser();
            console.log(this.playlist)
            
        }
	}
	

</script>
<style>
.playlist-body{
padding-top: 70px;
background: #fff;
}
.content-playlist{
    border-top: #ccc solid 1px;
  
    background: #eee;

}
.content-playlist:last-child{
      border-bottom: #ccc solid 1px;
}
.content-playlist .header{

    padding:10px;
    box-sizing: border-box;

}

.content-playlist .content{
    display: flex;
    justify-content: flex-start;
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
.content-playlist .content .playlist{
    width: 175px;
    display: flex;
    flex-wrap: wrap;
    margin:0px 20px;
    margin-bottom: 30px;
    background: #fff !important;
}


.content-playlist .content .playlist .thumb{
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
.content-playlist .content .playlist:nth-of-type(2){
background-color: #1976d2!important;
}
.content-playlist .content .playlist:nth-of-type(3){
background-color: #64ffda!important;
}

.content-playlist .content .playlist:nth-of-type(4){
background-color: #ff1744!important;
}

.content-playlist .content .playlist .thumb .card-back{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    display: flex;
    justify-content: center;
    align-items: center;
}
.content-playlist .content .playlist .thumb .card-back button{
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
.content-playlist .content .playlist .thumb .card-back button i{
    display: inline-block;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    margin-left: 3px;
    color: #fff;
}
.content-playlist .content .playlist:hover > .thumb  .card-back{
    z-index: 1;
    transition: all ease 0.2s;
    background: rgba(0, 0, 0, 0.7);
}
.content-playlist .content .playlist .card-option{
    display: flex;
    position: absolute;
    bottom: 0px;
    flex-wrap: wrap;
    align-items: flex-start;
     color: #fff;
     padding: 0px 4px;

}
.content-playlist .content .playlist .card-option span{
    font-size: 13px;
    width: 100%;
    margin: 0px;
    padding: 0px;
    line-height: 14px;
}
.content-playlist .content .playlist .card-option span a{
    display: inline-block;
    padding-bottom: 10px;
    text-decoration: underline;
}
.content-playlist .content .playlist  .card-info{
    text-align: center;
    width: 100%;
    height: 45px;
    background:rgba(255,255,255,1);
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.content-playlist .content .playlist  .card-info .info{
    flex-grow: 1;
    z-index: 10;
}
.content-playlist .content .playlist  .card-info .option a{
    display: block;
    width: 20px;
    position: relative;
    z-index: 10;
}
.content-playlist .content .playlist  .card-info .option{
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    color: #363636;
}
.content-playlist .content .playlist  .card-info .option .box-option{
    position: absolute;
    bottom: 38px;
    right: 0px;
    width: 175px;
    height:0px;
    background: #fff;
    z-index: 10;

}
.content-playlist .content .playlist  .card-info .option a:hover .box-option{
height: 175px;
}
.content-playlist .content .playlist  .card-info span{
    display: block;
    font-size: 13px;
    font-weight: bold;
     color: #363636;
     line-height: 17px;
     margin: 0px;
     padding: 0px;
     
     
}

.content-playlist .content .playlist  .card-info p{
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
<template>

     <LayoutDashboard> 
		 <div slot="content">
        <section id="content_outer_wrapper">
            	<div class="container-music-body">
                    <div class="content-musics">
                         <div class="header">
                                    <h1>My musics</h1>
                                    <div class="upload-music">
                                        <a href="/uploads/">
                                            <i class="fa fa-cloud-upload fa-2x"></i>
                                            <span>Uplod Muiscs</span>
                                        </a>
                                    </div>
                                </div>
                            <div class="content">
                               <!-- show card-music if have`nt paramas -->
                                <CardMusic 
                                    v-if="!$route.params.id"
                                    v-for="(mus ,index) in musics" :music="mus" 
                                    :key="index" 
                                    :id="'card_music'+index"
                                 />
                              
                              
                                
                            </div>
                            <div class="show-more-music">
                                    <a href="" v-on:click.prevent="getmusicsByUser">show more</a>
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
    import CardMusic from "@/components/cards/CardMusic.vue";
   import { setTimeout } from 'timers';
    export default {
        name: "musics",
        components:{
            LayoutDashboard,
            CardMusic
        },
        data(){
            return{
                musics: [],
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
        getmusicsByUser(){
            let self = this
            axios.get(`${SERVER_URI}/api/musics?token=${this.user_data.token}`).
            then(function(req){
                console.log("Musics count",req)
                if(req.data.musics.length>0){
                    self.musics= req.data.musics;
                }
             
            }).catch(function(err){
                console.log(`error--->${err}`)
            })
            
           // console.log(this.musics)
        }
		},
		
        created(){
           this.redirectUserLogin()
            this.getmusicsByUser();
        
            
        }
	}
	

</script>
<style>
.container-music-body{
background: #fff;
margin-top: 70px;
}
.content-musics{
    border-top: #ccc solid 1px;
  
    background: #eee;

}
 .content-musics .header{
     width: 100%;
     display: flex;
     justify-content: space-around;
     justify-items: center;
 }
  
  .content-musics .header h1{
      margin: 0px;
  }
  .content-musics .header .upload-music{
      display: flex;
    flex-wrap: wrap;
  }

  .content-musics .header a{
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      align-items: center;
      color: #4fc3f7;
      padding:0px 10px;
      width: 100%;
  }
  .content-musics .header a span{
      display: inline-block;
      font-size: 10px;
      font-weight: bold;
      color: #363636;
      margin: 0px;
      line-height: 11px;
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
.show-more-music{
width: 100%;
display: flex;
justify-content: center;
align-items: center;
padding: 10px;
}
.show-more-music a{
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
<template>
    <section class="card-music-detail active" id="music_details" >
    <div class="container-music">
        <div class="music-card">
              <div class="card-music-head">
                   <div class="card-user">
                  <div class="thumb-user">
                     <a href=""> 
                         <img 
                         :src="music.user_published.profile_picture" 
                         :alt="music.user_published.name"
                         v-if="music.user_published.profile_picture!=null"
                         ></a>
                  </div>
                   <a href=""> <h3>{{music.user_published.name}}</h3></a>
              </div>
              </div>
            <div class="card-thumbnail">
                <div class="box-img">
                    <img :src="music.img" alt="cantando" v-if="music.img!=null">
                </div>
                <div class="card-back-content">
                     
                          <button id="btn-pay">
                              <i class="fa fa-play"></i>
                          </button>

                  <div class="conent-played">
                      <span>Played</span>
                      <span>555 Mil</span>
                  </div>
                </div>
            </div>
            <div class="card-content">
                <div class="container-info">
                     <div class="music-info">
                              <h1>{{music.title}} </h1>
                              <p>{{music.description}}</p>
                              <div class="singers">
                                  <small> <a href="" v-on:click.prevent="togglerCollaborators">
                                      show collaborators</a>
                                      </small>
                                  <div class="dropdow" v-if="show_collabarators">
                                       <CardUserListSmoll
                                        v-for="(user, index) in users"
                                        :user="user"
                                        :key="index"
                                        />
                                       
        
                                  </div>
                              </div>
                    </div>
                </div>
            </div>
            <div class="card-content">
                <div class="content-qualification"
                >
                        <!-- if self user not has qualified -->
                         <QualificationStars
                          :props_qualification="music.qualification"
                           v-if="show_qualified"
                           :contend_id="music._id"
                           />

                           
      
                </div>
            </div>
            <div class="card-content">
                <div class="card-reactions">
                     <div class="content">
                        <a href=""><i class="fa fa-heart-o"></i> <span>35</span></a>
                        <a href=""><i class="fa fa-frown-o"></i> <span>35</span></a>
                        <a href=""><i class="fa fa-comment-o"></i> <span>{{music.commentes_count}}</span></a>
                        <a href=""><i class="fa fa-share-square-o"></i> <span>35</span></a>
                        <a href=""><i class="fa fa-download"></i> <span>35</span></a>
                     </div>
                     
                </div>
            </div>
    </div>
        <div class="content-comment">
            <div class="content">
                <div class="card">
                  <header class="card-heading">
                    <h2 class="card-title">comments</h2>
                    <ul class="card-actions icons right-top">
                      <li>
                        <a href="" data-toggle-view="code">
                          <i class="zmdi zmdi-code"></i>
                        </a>
                      </li>
                    </ul>
                  </header>
             <div class="card-body">
                   
                     <!-- componetn comment -->
                   <CardMusicComment 
                        v-for="(comment, index) in songcomments"
                        :key="index" 
                        :comment="comment"
                    />
             </div>
                  <div class="card-footer">
                    <div class="form-group label-floating is-empty">
                      <div class="input-group">
                        <span class="input-group-addon"><i class="zmdi zmdi-comment-text"></i></span>
                        <label class="control-label">Write you comments</label>
                        <input type="text" class="form-control" v-model="comment" />
                        <span class="input-group-btn">
                          <button type="button" class="btn btn-success btn-fab animate-fab btn-fab-sm" v-on:click.prevent="sendSongComments">
                            <i class="zmdi zmdi-mail-send"></i>
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        </div>
    </div>
        
           <div class="container-details-item">
            <div class="header">
                <h3>Musics Relactions</h3>
            </div>
            <div class="content">
                <CardMusic 
                    v-for="(mus ,index) in musics" :music="mus" 
                    :key="index" 
                    :id="'card_music'+index"
                    v-if="index<10"
                    />
            </div>

        </div>

    </section>
  
  
</template>
<script>
const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
	const {DBLocal} =require('@/services/data_local')
    const dbLocal= new DBLocal(DB_USER_NAME);
        const {EventBus} =require('@/eventbus');
        const axios =require('axios')
        import CardMusicComment from "./CardMusicComment.vue";
        import CardMusic from "./CardMusic.vue";
        import QualificationStars from "../qualifications/qualifications.vue";
        import CardUserListSmoll from "./CardUserListSmoll.vue";


export default {
    name: 'music-ditail',

    props:{
         music:{
            type: Object,
            required: true
        }
    }
    ,
    components:{
        CardMusicComment,
        QualificationStars,
        CardUserListSmoll,
        CardMusic
    },
    data(){
        return{
            activated_option: '',
            card_active: '',
            songcomments: [],
            comment: undefined,
            musics: [],
            tmp: true,
            user_data: undefined,
            //class to draw stars
            
            qualification: 0,
            click_quilification: false,
            user_qualified: false,
            show_qualified: true,
            show_collabarators: false,
            users: [
                {name: 'Miguel jimenez', _id: '122', profile_picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi1JteAsDe27lReOCAf0wlNwI2t0yU2j9cknTffTfbLuXWA2Wqtg'},
                {name: 'Ramon Porto Real', _id: '122', profile_picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVjvGZEvjBLfcHNjRl-RtMNDEUf7G8vrzgYt2h5yo6hn90XlcV'},
                {name: 'Miguel jimenez', _id: '122', profile_picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi1JteAsDe27lReOCAf0wlNwI2t0yU2j9cknTffTfbLuXWA2Wqtg'},
                {name: 'Ramon Porto Real', _id: '122', profile_picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVjvGZEvjBLfcHNjRl-RtMNDEUf7G8vrzgYt2h5yo6hn90XlcV'},
            ]
       
        }
    },
    methods:{
        //show and hidden conten colaborator
         togglerCollaborators(){
             this.show_collabarators= !this.show_collabarators;
         },
          //set class to stars
      
     checkUserlificatied(music_id){
            let self = this;
            axios.get(`${SERVER_URI}/api/qualification/${music_id}?token=${this.user_data.token}`).
            then(function(req){
                if(req.data.qualification.length>0){
                    self.user_qualified=true;
                }
            }).catch(function(err){
                console.log(`error--->${err}`)
            })
        }
   ,
        toggleStar(){
            if(!this.user_qualified){
                this.show_qualified =false;
            }else{
                this.show_qualified =true;
            }
            
            
        },
        //get all comment by music
        getSongComments(music_id){
            let self = this;
            axios.get(`${SERVER_URI}/api/songcomment/${music_id}?token=${this.user_data.token}`).
            then(function(req){
                console.log(req)
                    self.songcomments =req.data.songcomments;           
            }).catch(function(err){
                console.log(`error--->${err}`)
            })
        },

        

            //send comment 
         sendSongComments(comment){
             let  music_id=this.$route.params.id;
             let _comment =this.comment;
             if(_comment.length<4){
                 return Error('erro')
             }
            let self = this;
            axios.post(`${SERVER_URI}/api/songcomment?token=${this.user_data.token}`,{
               comment:_comment,
               music_id
            }).
            then(function(req){
                self.songcomments.unshift(req.data.songcomment);
                self.getSongComments(self.$route.params.id);
                
                if(!req.data.err){
                    self.comment ='';
                    
                }
                   // self.songcomments =req.data.songcomments;           
            }).catch(function(err){
                console.log(`error--->${err}`)
            })
        },
     async getQualificationCount(music_id){
            let self = this;
            const music= await  axios.get(`${SERVER_URI}/api/musics/${music_id}?token=${this.user_data.token}`);
               EventBus.$emit('ADD_MUSIC_PLAYER', {tracks:music.data,playlist:false});
            return music.data.music[0].qualification;
            
        },
         redirectUserLogin(){
			 
		if(!dbLocal.checkDataLocalStorageOBject()){
                this.$router.push( '../' )
			}else{
                 this.user_data  =dbLocal.getDataLocalStorageOBject();
            }
            },
            changeStatUsuserQualified(status,_value){
               this.show_qualified =status;
               this.user_qualified=status;
               self.qualification=_value;
            },
            getmusicsByUser(){
            let self = this
            axios.get(`${SERVER_URI}/api/musics?token=${this.user_data.token}`).
            then(function(req){

                if(req.data.musics.length>0){
                    self.musics= req.data.musics;
                }
             
            }).catch(function(err){
                console.log(`error--->${err}`)
            })
            
           // console.log(this.musics)
        }
        
    },
   async mounted(){
        this.redirectUserLogin();
        this.getmusicsByUser();
        this.getSongComments(this.$route.params.id);
        this.checkUserlificatied(this.$route.params.id);
        this.qualification= await this.getQualificationCount(this.$route.params.id);
    
    },
     updated(){
        // this.redirectUserLogin();
        // this.getmusicsByUser();
        // this.getSongComments(this.$route.params.id);
        // this.checkUserlificatied(this.$route.params.id);
        // this.qualification= await this.getQualificationCount(this.$route.params.id);
        if(this.tmp)
        {
            console.log("hola como esta tu?")
            this.tmp=false;
        }

        console.log("hola como esta tu ll?")
    }
  
    
}
</script>
  
<style>
    .card-music-detail{
        margin: 0px auto;
        padding: 0px;
        width: 100%;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        background: #fff;
        padding: 20px;
        margin-bottom: 20px;
    
    }
    .container-music{
        width: 80%;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
     margin: 0px auto;
    }
  .card-music-detail  .music-card {
      width: 100%;
      max-width: 400px;
      background: #fff;
      margin: 0px;
     padding: 0px;
     display: flex;
     flex-direction: column;
    }
 
  .card-thumbnail{
            position: relative;
            width: 100%;
            height: 284px;
            padding: 1px;
            box-sizing: border-box;

        }
    .card-thumbnail  .box-img{
         position: absolute;
           left: 0px;
           top: 0px;
           overflow: hidden;
           display: flex;
           width: 100%;
           height: 100%;
           margin: 0px;
           justify-content: center;
           align-items: center;
           background: #000;
         }
         .card-thumbnail  .box-img img{
             width: 100%;
             height: auto;
         }
         .card-back-content{
             position: absolute;
             top: 0px;
             bottom: 0px;
             left: 0px;
             width: 100%;
             margin: 0px;
             padding: 0px;
             display: flex;
             justify-content: center;
             align-items: center;
             
             box-sizing: border-box;
             z-index: -10;
         }
       .card-thumbnail:hover  .card-back-content{
             z-index: 10;
             background: rgba(0, 174, 239, 0.7);
         }

         .active  .card-back-content{
             z-index: 10;
             background: rgba(0, 0, 0, 0.7);
         }

         .card-thumbnail   #btn-pay{
         
          width: 62px;
          height: 62px;
         
          border-radius: 50%;
          font-size: 42px;
          padding-left: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: transparent;
          color: #ffffff;
          border: #fff solid 2px;
      }
      .card-content {
          flex-grow: 1;
          width: 100%;
          position: relative;
      }
       .card-content .container-info{
           position: absolute;
           bottom: 0px;
           width: 100% !important;
           background: #990;
           display: flex;
           justify-content: center;
       }
       .card-content .music-info{
         position: absolute;
          bottom: 0px;
          overflow: hidden;
         width: 100%;
          box-sizing: border-box;
          background: #fff;
          z-index: 10;
          transition: 0.5 all ease;
          color: #363636;
          line-height: 17px;
          padding:10px;
          text-transform:capitalize;
      }
      

       .music-info h1 {
          font-size: 13px;
          font-weight: bold;
          margin: 0px;
          color: #363636;
          
      } 
      .music-info small{
          display: flex;
          width: 100%;
          justify-content: center;
      }
      .music-info p{
          font-size: 13px;
          color: #363636;
          line-height: 14px;
          margin: 5px 0px;
      }
     .music-info  .dropdow{
        display: flex;
        flex-wrap: wrap;
        padding: 0px;
        justify-content: space-around;
        align-items: center;
        max-height: 280px;
        overflow-y: scroll;
    }
   
    .music-card{
        width: 100%;
        overflow: hidden;
        border: #ccc solid  1px;
        border-radius: 4px 4px 0px 0px;
    }
    .music-card .card-user{
        height: 50px;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
     }
     .music-card .card-user .thumb-user{
         width: 42px;
         height: 42px;
         border-radius: 50%;
         display: flex;
         justify-content: center;
         align-items: center;
         overflow: hidden;
         background: #ccc;
         margin: 5px;
         border: #ccc solid 1px;
     }
      .music-card .card-user .thumb-user img{
          width: 100%;
          width: auto;
      }
      .music-card .card-user h3{
          font-size: 15px;
          font-weight: bold;
          height: 50px;
          display: flex;
          align-items: center;
          align-self: center;
          text-decoration: underline;
      }
      
     
    
   
      .content-comment{
          width: 400px;
          flex-grow: 1;
          padding:0px 10px;
          display: flex;
         justify-content: space-between;}

    .content-comment  .content{
        width: 100%;
        height: 100%;
        background: #eee;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        
        
      }
     .content-comment  .content .card{
         width: 100% !important;
         height: 100%;
         
         margin-bottom: 0px !important;
      }
      .content-comment  .content .card-body{
          max-height: 50vh;
         overflow-y: scroll;
         width: 100%;
         overflow-x: hidden !important;
       }
     .content-comment  .content .card .control-label{
         font-size: 10px;
         line-height: 14px;
         margin-top: 12px;
      }
    
     
     
  
      .card-reactions{
          display: flex;
          justify-content: space-around;
          width: 100%;
          padding: 10px;
          box-sizing: border-box;
      }
      .card-reactions .content{
          display: flex;
          justify-content: space-around !important;
          padding: 10px;
      }
      .card-reactions .content a{
          display: block;
          
      }
      .card-reactions .content a:hover{
          transform: scale(1.5);
      }
     

        .card-reactions .content a span{
            display: inline-block;
            font-size: 10px;
            padding-left: 5px;
        }
      
  
.conent-played{
    position: absolute;
    bottom: 10px;
    left: 10px;
    font-size: 12px;
    color: #fff;
}
.conent-played span:last-child{
    font-size: 10px;
    display: inline-block;
    margin-left: 5px;
    color: #ccc ;
}
.singers small{
    display: flex;
    border-bottom: #ccc solid 1px;
    color: #2196f3;
}
/**/
.container-details-item{
    width: 100%;
    background: #eee;
}
</style>

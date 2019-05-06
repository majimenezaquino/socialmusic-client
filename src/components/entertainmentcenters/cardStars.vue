<template>
 <div class="container-qualifications-place" :id="'card-stars-'+contend_id">
        <div class="container-star"
         v-if="!allower_qualification"
         v-on:mouseover="toggleQualification"
         >
            {{setClassStars(qualification)}}
            <div class="group-stars">
                <a v-for="(star,index) in stars_class" :key="index">
                <i :class="stars_class[index]"></i> 
                </a>
                <a class="user-qualified"
                v-if="onw_calification>0">
                     <span>({{onw_calification}}) </span> <i class="fa fa-check"></i> 
                </a>
            </div>
            <div class="star-info">
               <span >Calificaciones <a>({{qualification || 0}})</a></span>
            </div>
        </div>
        <div id="container-star" class="container-star stars-editail" v-if="allower_qualification">
            <div class="group-stars" v-on:mouseover="selectStars">
                <a><i class="fa fa-star-o"></i></a>
                <a><i class="fa fa-star-o"></i></a>
                <a><i class="fa fa-star-o"></i></a>
                <a><i class="fa fa-star-o"></i></a>
                <a><i class="fa fa-star-o"></i></a>
            </div>
            <div class="star-info">
               <span >Calificaciones <a>({{qualification || 0}})</a></span>
            </div>
    </div>
 </div>
</template>
<script>
    const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
	const {DBLocal} =require('@/services/data_local')
	const dbLocal= new DBLocal(DB_USER_NAME);
    const axios = require('axios')
    import swal from 'sweetalert';
export default {
  name: 'star-qualified',
  props:{
    props_qualification: {
        type: Number,
        default: 0
    },
    contend_id: String,
  },
  data(){
    return{
      stars_class: [],
      user_qualified: true,
      qualification: 0,
      allower_qualification: false,
       onw_calification:0,
      toggle_save: false,
      user_data: undefined,
      qualification_point: undefined

    }
  },
  methods:{  
      toggleQualification(){
            if(this.user_qualified)
             this.allower_qualification =true;   
        },
        toggle_qualification(){
        this.toggle_save = !this.toggle_save;
        },
        setClassStars(nStars=0){
            nStars =nStars.toFixed(1)
          let   parts_index = nStars.split(".");
          let _enter = true;
            //
            for(let i =0; i<5; i++){
                if(i<parts_index[0]){
                this.stars_class[i]='fa fa-star';
                }else if(i<5){
                    if(parseInt(parts_index[1])>0 && _enter){
                        _enter= false;
                        this.stars_class[i]='fa fa-star-half-o';
                    }else{
                        this.stars_class[i]='fa fa-star-o';
                    }
                  

                }
                else{
                    this.stars_class[i]='fa fa-heart-o';
                }
               
           }

        },
    selectStars(event){
            //id this card-music
           let id_element= "#"+ this.$el.id;
            let class_card=  document.querySelectorAll(id_element+' .group-stars a');
            let self =this;
            let clicked =false;
    for(let i=0; i<class_card.length; i++){
        class_card[i].addEventListener('mouseover',function(e){
            e.preventDefault();
            self. clearStarsSelected(id_element);
            self. drawStarsSelect(id_element,i);
            
        });
        class_card[i].addEventListener('click',function(e){
            e.preventDefault();
            self.toggle_save =true;
            clicked=!clicked;
            self.qualification_point=i+1;
            self.onw_calification =self.qualification_point;
        });
     }},
          
    drawStarsSelect(id_element,max_stars=0){
        for(let i=0; i<max_stars+1; i++){
        document.querySelectorAll(id_element+' .group-stars a i')[i].className='fa fa-star';
        }
    },
        clearStarsSelected(id_element){
            for(let i=0; i<document.querySelectorAll(id_element+' .group-stars a i').length; i++){
                document.querySelectorAll(id_element+' .group-stars a i')[i].className='fa fa-star-o';
            }
        },
        redirectUserLogin(){
            if(dbLocal.checkDataLocalStorageOBject()){
            this.user_data  =dbLocal.getDataLocalStorageOBject();
            }
    },
    resetQualification(){
      this.toggle_save =!this.toggle_save;
    },
      sendQualification(){
            let self = this;
            axios.post(`${SERVER_URI}/api/qualification?token=${this.user_data.token}`,{
               point: self.qualification_point,
               music_id: self.contend_id
            }).
            then(function(req){
                
                if(!req.data.error){
                    
                    self.setNewCalification(self.contend_id);
                    
                    return self.user_qualified =false;
                   console.log('save -->', req.data);
                    
                }
            }).catch(function(err){
                console.log(`error--->${err}`)
            })
        },
        redirectUserLogin(){
			 
		if(!dbLocal.checkDataLocalStorageOBject()){
				this.$router.push( './login' )
			}else{
                //set data by user
                this.user_data  =dbLocal.getDataLocalStorageOBject();
            }
            },
           setNewCalification(music_id){
            let self = this;
             axios.get(`${SERVER_URI}/api/musics/${music_id}?token=${this.user_data.token}`).then(function(music){
                 self.qualification = music.data.music[0].qualification;
                self.allower_qualification=false;
             })
        
        }, 
        getCalificationByUser(){
            let self =this;
             axios.get(`${SERVER_URI}/api/qualification/${this.contend_id}?token=${this.user_data.token}`)
             .then(function(music){
                 if(music.data.qualification.length>0)
                  self.user_qualified=false;
                  for(let i in music.data.qualification)
                 self.onw_calification = music.data.qualification[i].point_qualified;
                
             })
        }
  },
  mounted(){
      this.redirectUserLogin();
      this.getCalificationByUser();
      this.qualification =this.props_qualification;
      if(this.qualification>0){
         // ;
      }
  },
  watch: {
      'toggle_save': function(value){
         if(value){
             swal({
  text: `¿Está seguro de guardar esta calificación de ${this.onw_calification} de 5 ?, una vez guardad ya no podrá modificarla nuevamente.`,
   buttons: ["No Guardar", "Guardar"],
})
.then((willDelete) => {
  if (willDelete) {
      // ELIMINAR PLAYLIST
       let self = this;
 //this.sendQualification

    swal("Lista de reproducción eliminada", {
      icon: "success",
    });
  } else{
      this.resetQualification();
  }
}); 
         }
      }
  }
}
</script>
<style>
    .container-qualifications-place{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        flex-direction: column;
        overflow: hidden;
        margin: 0px;
      
        
     
    }
     .container-qualifications-place  .container-star{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        box-sizing: border-box;
    }

   .container-qualifications-place .container-star .group-stars{
        max-width: 200px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-around;
         margin: 0px;
         padding: 0px;
    }
  .container-qualifications-place   .container-star .group-stars a{
        display: flex;
        font-size: 24px;
        color: #f4c150;
        margin: 2.5px;
    }
.container-qualifications-place  .container-star .group-stars a:hover{
    transform: scale(1.2);
}
.container-qualifications-place .star-info{
  width: 100%;
  font-size: 13px;
  line-height: 14px;
}
 .user-qualified{
    display: flex;
    justify-content: center;
    justify-items: center;
    margin: 0px;
    padding: 0px;
    color: #2196f3 !important;
    font-size: 15px !important;
    height: 24px;
    border-radius: 50px;
    margin-top: 5px;
}
.user-qualified span {
display: flex;
font-size: 10px;
color: #363636;
height: 24px;
align-items: center;
}
      
.save-qualification{
    width: 100%;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    font-size: 12px;
    line-height: 13px;
    margin: 5px;
    z-index: 100;
    color: #363636;
}
.save-qualification button {
    background: #fff;
    border: #ccc solid 1px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin:0px 5px;
    padding: 5px;
    
}

.save-qualification small{
    width: 100%;
    display: flex;
    justify-content: center;
    font-weight: bold;
    text-align: center;
    padding: 5px;
}
.stars-editail{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
</style>

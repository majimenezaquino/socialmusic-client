<template>
 <div class="col-md-3">

    <div class="card-creactor">
      <a class="thumbnil"
      :href="'/profile/'+musician.user_published._id"
      v-bind:style="{ 'background-image': 'url('+getImageUrl(musician.user_published.profile_picture)+')' }" >
          <div class="content">
        <a href=""> <h1>{{musician.user_published.name}} {{musician.user_published.last_name}}</h1> </a>
      </div>
        <div class="info-hidden">
          <div class="musician">
              <div class="itme-musician"
              v-for="(ms, index) in musician_limit"
              :key="index" 
              >
                  <span>{{ms.musician.name}}</span>
                   <i :class="ms.musician.icon"></i>
              </div>

              <a class="itme-musician"
              v-if=" musician.musicians.length>3"
                :href="'/profile/'+musician.user_published._id"
              >
                  <span>{{musician.musicians.length -musician_limit.length}} más </span>
                  <i class="zmdi zmdi-collection-plus"></i>
                   
              </a>

          </div>
          <p>{{musician.description}}</p>
        </div>
      </a>
      
  </div>
 </div>
</template>
<script>
const {SERVER_URI,DB_USER_NAME}=require('@/config/index');
export default {
  name: "card-musician",
  props:{
    musician: {
      type: Object,
      required: false
    }
  },
  data(){
    return {
      musician_limit: []
    }
  },

  methods: {
    getImageUrl(image_name){
           
              if(image_name===undefined){
                  return 'miaga'
              }
            if(image_name.includes("https://") || image_name.includes("http://")){
                return image_name;
            }
            return `${SERVER_URI}/api/files/image/${image_name}`;
        }
  },
  mounted(){
  

  }
}
</script>

<style>
  .card-creactor{
    margin: 0px;
    padding: 0px;
    width: 100%;
    margin-bottom: 20px;
  }
  .card-creactor .thumbnil{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    background-size: cover;
    min-height: 300px;
    border-radius: 4px;
    position: relative;
    z-index: 10;
    background-size: cover;
  }
  .card-creactor .thumbnil .info-hidden{
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    height: 60px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.5);
    color: #444;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    transition: all ease 3s;
   }
   .card-creactor .thumbnil:hover .info-hidden{
     height: auto;
     transition: all ease 0.3s;
   }
   .card-creactor .thumbnil .info-hidden p{
     font-size: 15px;
     line-height: 16px;
     padding:4px 10px;
     color: #444;
     font-weight: 600px;
   }
  .card-creactor .thumbnil  .musician{
    display: flex;
    justify-content: center;
   }
   .itme-musician{
     display: flex;
     justify-content: center;
     align-items: center;
     flex-direction: column;
     padding:  10px;
     margin: 0px 1px;
     background: #eee;
     height: 60px;
     z-index: 10;
     color: #444;
   }
   .itme-musician span{
     font-size: 12px;
   } 
   .card-creactor  .content {
     color: #eee;
   }
   .card-creactor  .content h1{
     font-size: 30px;
     color: #fff;
   }
</style>
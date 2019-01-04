<template>

 <section class="card-user-musician">
        <div class="image-container">
         <div class="thum">
             <div class="thum-boder">
                 <a :href="'./profile/'+musician.user_published._id" >
                    <img :src="musician.user_published.profile_picture" alt="">
                 </a>
             </div>
         </div>
    </div>
  <div class="card-musician-info">
    <h3>{{musician.user_published.name}}</h3>
  </div>
  <div class="job-follow">
    <i :class="'font-musician '+musician.musician.icon" v-if="musician.musician.icon!=''"></i>
    <span>{{musician.musician.name}}</span>
  </div>
  <div class="connect-follow">
    <a href="#" v-on:click.prevent="fallowing">follow</a>
  </div>
  <div :class="'card-back '+active">
      <a href=""><i class="fa fa-check fa-3x" ></i></a>
      <div><small>User fueck</small></div>
  </div>
</section>
</template>
<script>
import { setTimeout } from 'timers';
export default {
    name: 'card-user-musician-musician',
    data(){
        return{
            active: ''
        }
    },
    props:{
        musician: {
            type: Object,
            required: false
        }
    },
    methods:{
        fallowing(){
            this.active='active';
            let self =this;
            setTimeout(function(){
                self.active='';
            },1500)
        }
    }
    
    
}
</script>
<style>


.card-user-musician {
  height: 360px;
  width: 230px;
  background-color: #fff;
  border-radius: 5px;
  margin: 40px auto;
  transition: 0.15s linear;
  -moz-transition: 0.15s linear;
  box-shadow: 0px 0px 1px #999;
  overflow: hidden;
  position: relative;
}

.image-container {
 display: flex;
 justify-content: center;
 align-items: center;
  border-bottom: 2px solid #ebeaec;
  height: 190px;
  width: 100%;
}
.image-container .thum{
  width: 148px;
  height: 146px;
  border: 2px solid #ebeaec;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
}
.image-container .thum-boder{
    width: 130px;
    height: 130px;
    overflow: hidden;
    padding: 0px;
    margin: 0px;
    border: none;
    border-radius: 50%;
    border: 2px solid #ebeaec;
}
.image-container .thum .thum-boder img {
  min-height: 100%;
  min-width: 100%;
}

.card-user-musician #close a {
    width: 23px;
    height: 23px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: inherit;
    font-size: 12px;
    position: absolute;
    top: 5px;
}


.card-back{
    background: #5fbeff;
    position: absolute;
    top:0px;
    left: 0px;
    bottom: 0px;
    display: none;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
.card-back a{
    color: #fff;
}
.card-back small{
    display: block;
    width: 100%;
}
.image-container:hover #close,
.image-container:hover #incommon {
  display: inline;
  cursor: pointer;
}

.card-musician-info h3{
  font-size: 24px;
  font-weight: 500;
  font-family: "Raleway", Helvetica Neue, Helvetica;
  letter-spacing: -0.5px;
  text-align: center;
  padding: 0px 18px;
  box-sizing: border-box;
}

.job-follow{
  font-size: 16px;
  font-family: "Raleway", Helvetica Neue, Georgia;
  font-weight: 200;
  letter-spacing: 0px;
  line-height: 17px;
  text-align: center;
}

.connect-follow {
  position: relative;
  top: 38px;
 display: flex;
 justify-content: center;
 align-items: center;
 border-top: 2px solid #ebeaec;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
}
.connect-follow a {
  display: block;
  text-decoration: none;
  color: #5fbeff;
  font-weight: 400;
  margin: 5px;
  padding: 2px 30px;
  font-family: Helvetica Neue, Helvetica;
  box-sizing: border-box;
}
.connect-follow a:hover {
  background-color: #5fbeff;
  color: #fff;
}

.added {
  position: absolute;
  display: none;
  height: 360px;
  width: 230px;
  background-color: #5fbeff;
  border-radius: 5px;
  margin: 20px auto;
  box-shadow: 0px 0px 1px #999;
  top: 20px;
  left: 0;
  right: 0;
  z-index: 1;
  text-align: center;
}
.added img {
  padding: 50% 0 0;
}
.added span {
  color: #fff;
  font-family: "Raleway", Helvetica Neue, Helvetica;
  font-weight: 100;
  display: inline-block;
  width: 100%;
  height: 100px;
  padding: 2% 0;
  margin: 0 auto;
}
.active{
    display: flex;
}
</style>


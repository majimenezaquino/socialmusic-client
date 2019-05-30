
<template>
    <div>
        <div class="row " v-for=" day in days" :key="day._id">
        <div class="col-md-2">
            <span>{{(day.name).capitalize()}}</span> 
        </div>
        <div class="col-md-7">
            <HourComponent :callback="handleHuorStart" :day="day._id" /> -
            <HourComponent :callback="handleHuorEnd"  :day="day._id"/>
            
        </div>
        <div class="col-md-1">
            <div class="checkbo-day">
                <input type="checkbox" :value="day._id" id="" :checked="day.open"
                @click="handlerCheckBox"
                >
            </div>
        </div>
    </div>
    </div>
</template>

<script>
const axios = require('axios');
const {SERVER_URI}=require('@/config/index');
import HourComponent from "./CardHourFrom.vue"
export default {
    name: 'schedules',
    data(){
        return {
            days:[],
            schedul: [],
            getPrivacies: []
        }
    },
    props: {
        callback: Function,
    },
    components:{
        HourComponent
    },
    methods: {
          handleHuorStart(data){
           
             this.schedul=this.days.filter(function(sced){
                 if(sced._id==data.day){
                     sced.hour_start= data.hour;
                 }
                 return sced;
             }); 
         this.callback(this.schedul)
        },
        getPrivacies(){
          let self=this;
        axios.get(`${SERVER_URI}/api/privacies?token=${this.user_data.token}`)
             .then(function (req) {
             self.privacies =req.data.privacies;  
              self.music.privacy=  self.privacies[0]._id;
                   
             })
            .catch(function (response) {
            //handle error
            console.log(response);
        });},
         handleHuorEnd(data){
             this.schedul=this.schedul.filter(function(sced){
                 if(sced._id==data.day){
                     sced.hour_end = data.hour;
                 }
                 return sced;
             });
           
           this.callback(this.schedul)

        },
               getEntertainmentCent(token){
        let self=this;
             axios.get(`${SERVER_URI}/api/entertainmentcentersday/es?token=${token}`,
            )
             .then(function (req) {
            //handle success
            
             self.days=req.data.schedules || [];
       
             })
            .catch(function (err) {
            //handle error
            console.log("erro ", err);
        });
    },
           getIpLocation(){
               axios.get(`http://www.geoplugin.net/json.gp`).
            then(function(req){
              
                 let  geoplugin_status = req.data.geoplugin_status || undefined;
                 if(geoplugin_status!=200){
                     return ;
                 }

            }).catch(function(err){
                console.log(`error--->${err}`)
            });
        },
         handlerCheckBox(ev){
            let day= ev.target.value;

            this.schedul=this.schedul.filter(function(sced){
                 if(sced._id==day){
                     sced.open = ev.target.checked;
                 }
                 return sced;
             });

             this.callback(this.schedul)

        }
    }, mounted(){
        this.getEntertainmentCent(this.$user_data.token);
        this.callback(this.schedul);
        this.getPrivacies();
    }

}
</script>

<style>

</style>


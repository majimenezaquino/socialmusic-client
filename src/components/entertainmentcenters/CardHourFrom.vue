<template>
     <div class="container-select-hour">
         <select name="" id="" v-on:change="handlerChangeHour">
             <option v-for=" (a,i) in hours" :value="(i+1)" :key="i">{{(i+1)}}</option>
         </select>:
         <select name="" id="" v-on:change="handlerChangeMinuto">
             <option v-for=" (a,i) in minute" :value="(i)" :key="i">{{(i)}}</option>
         </select>
         <select name="" id="" v-on:change="handlerChangeP">
             <option value="am">AM</option>
             <option value="pm">PM</option>
         </select>
     </div>
</template>
    <script>
    export default {
        name: "select-hour",
        props: {
            callback: {
                type: Function,
                required: false
            },
            day: {
                type: String,
                required: false
            }
        },
        data(){
            return {
                hour: {
                    h: 1,
                    m: 0,
                    p: 'am'
                },
                hours: 12,
                minute: 60
            }
        },
        methods:{
            handlerChangeHour(ev){
                this.hour.h=ev.target.value;
                this.callback({day: this.day, hour:`${this.hour.h}:${this.hour.m} ${this.hour.p}`});
            },
            handlerChangeMinuto(ev){
                this.hour.m=ev.target.value;
                this.callback({day: this.day, hour:`${this.hour.h}:${this.hour.m} ${this.hour.p}`});
            },
            handlerChangeP(ev){
                this.hour.p=ev.target.value;
                this.callback({day: this.day, hour:`${this.hour.h}:${this.hour.m} ${this.hour.p}`});
            }
        },
        mounted(){
            this.callback({day: this.day, hour:`${this.hour.h}:${this.hour.m} ${this.hour.p}`});
        }
    }
    </script>
    
   <style>
   .container-select-hour{
       border: #ccc solid 1px;
       padding: 00px;
       background: #fff;
       display: inline-block;
       border-radius: 2px;
   }
    .container-select-hour select{
        border: none;
        background: #fff;
        text-align: center;
    }
    .container-select-hour select::-webkit-scrollbar {
                width: 2px;
                overflow: hidden;
        }
.container-select-hour select::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
   </style>
   
    

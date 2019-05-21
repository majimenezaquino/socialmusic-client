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
        data(){
            return {
                hour: {
                    h: undefined,
                    m: undefined,
                    p: undefined
                },
                hours: 12,
                minute: 60
            }
        },
        methods:{
            handlerChangeHour(ev){
                this.hour.h=ev.target.value;
            },
            handlerChangeMinuto(ev){
                this.hour.m=ev.target.value;
            },
            handlerChangeP(ev){
                this.hour.p=ev.target.value;
            }
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
   
    

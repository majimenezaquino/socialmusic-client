
<template>
    <div>
        <div class="row " v-for=" day in days" :key="day._id">
        <div class="col-md-2">
            <span>{{(day.name).capitalize()}}</span> 
        </div>
        <div class="col-md-9">
            <HourComponent :callback="handleHuorStart" :day="day._id" /> -
            <HourComponent :callback="handleHuorEnd"  :day="day._id"/>
            
        </div>
        <div class="col-md-1">
            <div class="checkbo-day">
                <input type="checkbox" :value="day._id" id=""
                @click="handlerCheckBox"
                >
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import HourComponent from "./CardHourFrom.vue"
export default {
    name: 'schedules',
    data(){
        return {
            days:[],
        }
    },
    components:{
        HourComponent
    },
    methods: {
          handleHuorStart(data){
            console.log(data)

        },
         handleHuorEnd(data){
            console.log(data)

        },
    }

}
</script>

<style>

</style>


<template>
<div class="container-calendar">
    <FullCalendar
    :plugins="calendarPlugins"
     @dateClick="handleDateClick"
    v-on:select="handleDateCelect"
    @eventClick="handlerCLickEvent"
     v-on:eventDrop="handlerDrop"
     v-on:eventResizeStop="handlerResizeStop"
    :defaultView="'dayGridMonth'"
   :weekends="true"
    :events="music_events"

    />
    <AddEventCalendar />
</div>
</template>
<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import { Calendar } from '@fullcalendar/core';
import esLocale from '@fullcalendar/core/locales/es';
import AddEventCalendar from './add-event-calendar.vue';

    const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
    const {DBLocal} =require('@/services/data_local')
    const dbLocal= new DBLocal(DB_USER_NAME);
    const axios = require('axios');
    const moment =require("moment");
    moment.locale('es')

export default {
  name: 'calendar',
  components:{
    FullCalendar,
    dayGridPlugin,
    AddEventCalendar

  },
  props:{
    music_events: Array,
  },
  data(){
      return {
        calendarPlugins: [ dayGridPlugin ,interactionPlugin ],
        user_data: undefined,
        user_id : undefined,
      }
  },
  methods:{
    redirectUserLogin(){
      if(dbLocal.checkDataLocalStorageOBject())
      this.user_data  =dbLocal.getDataLocalStorageOBject();
       },
    handleDateClick(arg) {
    if(this.user_data.user.id==this.user_id && this.user_data.user.id!=undefined){
      $("#modal_add_event").modal();
    }else{
      return false;
    }
    
  }
,

  handleDateCelect(arg) {
    console.log(arg)
  },
  handlerCLickEvent(ev){
    console.log(ev)
    
  }
  ,
  handlerDrop(ev){
    console.log(ev)
  }
  ,
  handlerResizeStop(ev){
    console.log(ev)
  }

  
  },
  mounted(){
    this.redirectUserLogin();
    this.user_id=this.$route.params.id;
    setTimeout(function(){

    },100)

  }
}
</script>
<style >

@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';

.container-calendar{
  width: 100%;
  box-sizing: border-box;
  border-left: #ccc solid 1px;
}

.fc-toolbar.fc-header-toolbar {
  background: #337ab7;
color: #eee;
  padding: 10px;
  margin: 0px;
}
.card-body{
  padding: 0px;
}


.fc-nonbusiness {
pointer-events: none !important;
}
</style>
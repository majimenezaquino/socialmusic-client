<template>
<div class="container-calendar">
    <FullCalendar
    :plugins="calendarPlugins"
     @dateClick="handleDateClick"
    v-on:select="handleDateCelect"
    @eventClick="handlerCLickEvent"
     v-on:eventDrop="handlerDrop"
     v-on:eventResizeStop="handlerResizeStop"
    defaultView="dayGridMonth"
   :weekends="true"
    :events='[
      {
        start:"2019-04-10",
        end:"2019-04-21",
        title:"Cassio Godinho",
        icon : "asterisk",
       // url:"/reservas/44/edit",
        allDay:true,
        editable:true,
       // updateUrl:"/reservation/44",
        transport_id:1,
        user_id:1,
        textColor: "#ffffff",
      },
       {
        start:"2019-04-10",
        end:"2019-04-11",
        title:"Cassio  2",
       // url:"/reservas/44/edit",
        allDay:true,
        editable:true,
       // updateUrl:"/reservation/44",
        transport_id:2,
        user_id:2,
        textColor: "#ffffff"
      },
         {
        start:"2019-04-11",
        end:"2019-05-11",
        title:"Cassio  2",
       // url:"/reservas/44/edit",
        allDay:true,
        editable:true,
       // updateUrl:"/reservation/44",
        transport_id:2,
        user_id:2,
        textColor: "#ffffff"
      }
    ]'

    />
    <AddEventCalendar />
    <a href="#"> hola como esta</a>
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

export default {
  name: 'calendar',
  components:{
    FullCalendar,
    dayGridPlugin,
    AddEventCalendar

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
    console.log(arg.date)
    console.log()
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
</style>
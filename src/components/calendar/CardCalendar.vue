<template>
<div class="container-calendar">
   <full-calendar :events="[
	{
      title : 'Sunny Out of Office',
      start : '2019-04-08',
      end : '2019-04-15'
    }
]" locale="es" />

 
</div>
</template>
<script>

export default {
  name: 'calendar',
  components:{
    'full-calendar': require('vue-fullcalendar')

  },
  data(){
      return {
        calendarPlugins: [ dayGridPlugin ,interactionPlugin ]
      }
  },
  methods:{
    handleDateClick(arg) {
    console.log(arg.date)
  }
,

  handleDateCelect(arg) {
    console.log(arg.date)
  }
  }
}
</script>
<style >

 @import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css'; 

/*
 .container-calendar{
  width: 100%;
  padding-left: 5px;
  box-sizing: border-box;
  color: #444;
}
.fc table tr>td:first-child {
    border-left-width: 1px;
    color: #444;
} */
</style>
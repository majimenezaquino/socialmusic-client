<template>
<div class="container-calendar">
    <FullCalendar
    v-on:dateClick="handleDateClick"
    v-on:select="handleDateCelect"

    :plugins="calendarPlugins"
    defaultView="dayGridMonth"
   :weekends="true"
  :events="[
    { title: 'event 1', date: '2019-04-01' },
    { title: 'event 2',
     start : '2016-08-25',
      end : '2017-07-27' }
  ]"

    />
</div>
</template>
<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
export default {
  name: 'calendar',
  components:{
    FullCalendar,
    dayGridPlugin

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

.container-calendar{
  width: 100%;
  padding-left: 5px;
  box-sizing: border-box;
  color: #444;
}
.fc table tr>td:first-child {
    border-left-width: 1px;
    color: #444;
}
</style>
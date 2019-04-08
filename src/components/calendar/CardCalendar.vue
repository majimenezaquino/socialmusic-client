<template>
  <div class="calendar">
    <div class="calendar__info">
        <div class="calendar__prev" id="prev-month">&#9664;</div>
        <div class="calendar__month" id="month"></div>
        <div class="calendar__year" id="year"></div>
        <div class="calendar__next" id="next-month">&#9654;</div>
    </div>

    <div class="calendar__week">
        <div class="calendar__day calendar__item">Mon</div>
        <div class="calendar__day calendar__item">Tue</div>
        <div class="calendar__day calendar__item">Wed</div>
        <div class="calendar__day calendar__item">Thu</div>
        <div class="calendar__day calendar__item">Fri</div>
        <div class="calendar__day calendar__item">Sat</div>
        <div class="calendar__day calendar__item">Sun</div>
    </div>

    <div class="calendar__dates" id="dates"></div>
</div>
</template>
<script>
import { constants } from 'fs';
export default {
  name: 'calendar',
  data(){
    return {
      events: [{
          icon: '',
          name: 'Nombre del evento',
          date_start: new Date(),
          date_end: new Date()
      }]
    }
  },
  mounted(){
    let _this =this;
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November', 'December'];

let currentDate = new Date();
let currentDay = currentDate.getDate();
let monthNumber = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

let dates = document.getElementById('dates');
let month = document.getElementById('month');
let year = document.getElementById('year');

let prevMonthDOM = document.getElementById('prev-month');
let nextMonthDOM = document.getElementById('next-month');

month.textContent = monthNames[monthNumber];
year.textContent = currentYear.toString();

prevMonthDOM.addEventListener('click', ()=>lastMonth());
nextMonthDOM.addEventListener('click', ()=>nextMonth());

writeMonth(monthNumber);

function writeMonth(month) {

    for(let i = startDay(); i>0;i--){
        dates.innerHTML += ` <div class="calendar__date calendar__item calendar__last-days" id="date${i}">
        ${getTotalDays(monthNumber-1)-(i-1)}
</div>`;

    }

    for(let i=1; i<=getTotalDays(month); i++){
        if(i===currentDay) {
            dates.innerHTML += ` <div class="calendar__date calendar__item calendar__today" id="date${i}">${i}</div>`;
        }else{
            dates.innerHTML += ` <div class="calendar__date calendar__item" id="date${i}">${i}</div>`;
        }

 
    
    let date_select=new Date(currentYear,monthNumber,i)
    let event= document.createElement("div");
    _this.events.forEach((eve,index)=>{
    if(date_select.getMonth()===eve.date_start.getMonth() &&
     date_select.getFullYear()===eve.date_start.getFullYear() && 
     date_select.getDay()=== eve.date_start.getDay()){
       event.classList.add("event-container");
      //  event.innerHTML=`<span> Musica Caserola</span>`;
      document.getElementById(`date${i}`).appendChild(event)
      console.log(i)
    }
    
       
    });
   

       // console.log(resultado)
    }
}

function getTotalDays(month) {
    if(month === -1) month = 11;

    if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
        return  31;

    } else if (month == 3 || month == 5 || month == 8 || month == 10) {
        return 30;

    } else {

        return isLeap() ? 29:28;
    }
}

function isLeap() {
    return ((currentYear % 100 !==0) && (currentYear % 4 === 0) || (currentYear % 400 === 0));
}

function startDay() {
    let start = new Date(currentYear, monthNumber, 1);
    return ((start.getDay()-1) === -1) ? 6 : start.getDay()-1;
}

function lastMonth() {
    if(monthNumber !== 0){
        monthNumber--;
    }else{
        monthNumber = 11;
        currentYear--;
    }

    setNewDate();
}

function nextMonth() {
    if(monthNumber !== 11){
        monthNumber++;
    }else{
        monthNumber = 0;
        currentYear++;
    }

    setNewDate();
}

function setNewDate() {
    currentDate.setFullYear(currentYear,monthNumber,currentDay);
    month.textContent = monthNames[monthNumber];
    year.textContent = currentYear.toString();
    dates.textContent = '';
    writeMonth(monthNumber);
    
}



  }
}
</script>
<style>




.title {
  text-align: center;
  color: #444; }

.calendar {
  background: #4ECDC4;
  width: 100%;
  margin: 1em auto;
  min-height: 400px;
   }
  .calendar__info {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 0 2em;
    font-size: 1.2em;
    text-transform: uppercase; }
  .calendar__prev, .calendar__next {
    color: #C7F464;
    cursor: pointer;
    font-size: 1.3em; }
  .calendar__prev {
    margin-right: auto; }
  .calendar__next {
    margin-left: auto; }
  .calendar__week, .calendar__dates {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 10px; }
  .calendar__month, .calendar__year {
    padding: .5em 1em; }
  .calendar__item {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    font-size: 22px;
    min-height: 60px;
    
     }
     .event-container{
       width: 100%;
       height: 100%;
       position: absolute;
     }
  .calendar__today {
    background: lightcoral;
    color: white;
    width: 50%;
    border-radius: 50%;
    margin: auto; }
  .calendar__last-days {
    opacity: .3; }

</style>


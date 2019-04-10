<template>
<div class="calendar-containe">
      <div class="calendar">
    <div class="calendar__info">
        <div class="calendar__prev" id="prev-month">&#9664;</div>
        <div class="calendar__month" id="month"></div>
        <div class="calendar__year" id="year"></div>
        <div class="calendar__next" id="next-month">&#9654;</div>
    </div>

    <div class="calendar__week">
        <div class="calendar__day calendar__item">LU</div>
        <div class="calendar__day calendar__item">MA</div>
        <div class="calendar__day calendar__item">MI</div>
        <div class="calendar__day calendar__item">JU</div>
        <div class="calendar__day calendar__item">VI</div>
        <div class="calendar__day calendar__item">SA</div>
        <div class="calendar__day calendar__item">DO</div>
    </div>

    <div class="calendar__dates" id="dates"></div>
</div>
</div>
</template>
<script>
import { constants } from 'fs';
export default {
  name: 'calendar',
  data(){
    return {
      events: [
        {
          icon: 'fa fa-microphone',
          name: 'Nombre del evento',
          date_start: `${new Date("2019-04-08")}`,
          date_end: `${new Date("2019-04-20")}`
      },
       {
          icon: 'fa fa-headphones',
          name: 'Nombre del evento',
          date_start: `${new Date("2019-04-08")}`,
          date_end: `${new Date("2019-04-08")}`
      },
       {
          icon: '',
          name: 'Nombre del evento',
          date_start: `${new Date("2019-04-09")}`,
          date_end: `${new Date("2019-04-08")}`
      }
      ,
       {
          icon: '',
          name: 'Nombre del evento',
          date_start: `${new Date("2019-05-26")}`,
          date_end: `${new Date("2019-04-08")}`
      }
      ]
    }
  },
  mounted(){
    let _this =this;
    let monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'];

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

 
    
   
    let event= document.createElement("a");
     let dateSelect =undefined;
     let  date;
    _this.events.forEach((eve,index)=>{

        date = new Date(eve.date_start);
        date_end = new Date(eve.date_end);
       console.log("------->",date)
       getDateBetwen(new Date( date_end.getFullYear(), date_end.getMonth(), date_end.getDate()+1),new Date( date.getFullYear(), date.getMonth(), date.getDate()+1))
  
    if( deteisquals(new Date(currentYear,monthNumber,i),new Date( date.getFullYear(), date.getMonth(), date.getDate()+1))){
       let id_parent =document.getElementById(`date${i}`);
       id_parent.innerHTML=`<a  class="event-select" href="">${i}</a>`;
     
     
      
    }
    
       
    });
   

       // console.log(resultado)
    }
}

function deteisquals(date_a,sate_b){
   
return  ( new Date(date_a).getTime() === new Date(sate_b).getTime());
}


function getDateBetwen(date_a,sate_b){
     console.log(date_a,sate_b)
//return  ( new Date(date_a).getTime() === new Date(sate_b).getTime());
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
  color: #fff; }

.calendar {
  background: rgb(33, 150, 243);
  width: 100%;
  margin: 0px auto;
  min-height: 400px;
  color: #FFF;
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
    color: #CCC;
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
    font-size: 18px;
  line-height: 23px;
      padding: 15px;

    
     }
  .calendar__item:hover{ 
    background: #ccc;
  }

   

     .event-select{
        display: flex;
        
        width: 32px;
        height: 32px;
        border-radius: 50%;
        justify-content: center;
        align-items: center;
        border: #666 solid 2px;
        color: #444 !important;
        background: #CCC;

      }
  .calendar__today {
    background: lightcoral;
    color: white;
    margin: auto; }
  .calendar__last-days {
    opacity: .3; }

</style>


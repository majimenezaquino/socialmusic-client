class MjTime{
   
      differences(old_date){
       // asignar la fecha en milisegundos
let secods, minutes ,hours,days,weeks,mouth
let date = new Date();
let interval =date.setTime(new Date().getTime()-new Date(old_date).getTime());
 secods = Math.floor(interval / (1000) );
 minutes = Math.floor(secods/60);
 hours = Math.floor(minutes/60);
 days = Math.floor(hours/24);
 weeks = Math.floor(days/7);
 mouth = Math.floor(days/30);
 console.log("===============================",secods,minutes,hours,days,weeks,mouth)
 if(secods<60) return `${ Math.floor(secods)} segundos`;
 if(minutes<60) return `${ Math.floor(minutes)} minutos`;
 if(hours<24) return `${ Math.floor(hours)} horas `;
 if(days<7) return `${days} días  `;
 if(weeks>1 && weeks<=4) return `${ Math.floor(weeks)} semanas`;
 if(mouth>1 && mouth<=12) return `${ Math.floor(mouth)} meses`;
}
}
export {MjTime};
  class VPersons{
      //validate name and last-name
      name(name){
        let re = /(^([A-Za-zÁÉÍÓÚñáéíóúÑ]{3,12}[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{2,12})?[\s]*$))/ig;
        if(re.test(name)){
         return true;
        }else{
        return false;
        }
      }
//validate email
    email(email){
        let re = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/ig;
        if(re.test(email)){
          return true
        }else{
           return false
        }
    }
    
    phone(){  
        let re = /^[1?+]?[0-9]{0,12}$/ig;
        if(re.test(form_value)){
        return true;
        }else{
            return false;
        }
    }
    
    
}

export { VPersons}
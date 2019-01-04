

class DBLocal{
    constructor(db_name){
   this.DB_USER_NAME=db_name;
   this.hasOwnProperty = Object.prototype.hasOwnProperty;
    }
checkDataLocalStorageOBject(){
        if(!this.isEmpty(this.getDataLocalStorageOBject())){
            return true;
        }else{
            return false;
        }
        }

        //get data localstorage
 getDataLocalStorageOBject(){
    if(!localStorage.getItem(this.DB_USER_NAME) || localStorage.getItem(this.DB_USER_NAME)==''){
        return [];
    }

    if(localStorage.getItem(this.DB_USER_NAME)!=null){
        
     let data=  JSON.parse(localStorage.getItem(this.DB_USER_NAME))
        return data;
    }else{
        return []
    }
    }

//save data in localstorage
seveDataLocalStorageJson(data){
    localStorage.setItem(this.DB_USER_NAME, JSON.stringify(data));
    }

    //save data in localstorage
 clearDataLocalStorage(){
    localStorage.clear();
    }
  isEmpty(obj) {

        // null and undefined are "empty"
        if (obj == null) return true;
    
       
        if (obj.length > 0)    return false;
        if (obj.length === 0)  return true;
    
        if (typeof obj !== "object") return true;
    
        
        for (var key in obj) {
            if (this.hasOwnProperty.call(obj, key)) return false;
        }
    
        return true;
    }

}




















export {DBLocal};


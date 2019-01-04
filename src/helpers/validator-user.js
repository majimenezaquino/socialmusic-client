class VUser{
    constructor(regExp,){
        let re = /^[1?+]?[0-9]{0,12}$/ig;
        if(!re.test(form_value)){
        self.show_error.error= true;
        self.show_error.message= `"${form_value}" not allowed in this field `;
        throw new Error( self.show_error.message);
        }else{
            self.show_error.error= false;
        }
    }
}
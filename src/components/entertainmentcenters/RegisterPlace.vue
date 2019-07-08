<template>
    <section>
<div class="modal fade" id="modal_register_place" tabindex="-1" role="dialog" aria-labelledby="modal_register_place">
<div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-body">
                  <form-wizard  
                        shape="square"
                        stepSize="xs"
                        color="#3498db"
                        title="Centro de Diversión"
                        subtitle="Registras tus centros de diversiones."
                        nextButtonText="Siguiente"
                        backButtonText="Volver atrás"
                         @on-complete="onComplete"
                        >
      <tab-content 
      title="Dirección"
      icon="ti-location-arrow"
      :before-change="validateFirstTab"
      >
            <div class="form-controll">
                <div class="form-group">
 
    <input type="text" class="form-control"  placeholder="Nombre del centro de diversión " v-model="place.name">
  </div>
  <div class="form-group">
    <input type="text" class="form-control"  placeholder="Dirección del centro de diversión"  v-model="place.description">
  </div>
            </div>
      </tab-content>
      <tab-content title="Imagen de centro"
                   icon="ti-image">
                   <div class="row">
                       <div class="col-md-12">
                           <UploadFile :callback="handlerdata"/>
                       </div>
                   </div>
      
      </tab-content>
      <tab-content title="Horarios"
                   icon="ti-time">
                <div class="row">
                    <div class="col-md-12">
                         <HourComponent :callback="handlerSchedules"  v-if="true" />
                    </div>
                </div>
      </tab-content>
  </form-wizard>
            </div>
        <!-- modal-content -->
    </div>
    <!-- modal-dialog -->
</div>
</div>
    </section>
</template>
<script>
 const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
  const {DBLocal} =require('@/services/data_local')
  const dbLocal= new DBLocal(DB_USER_NAME);
  const axios = require('axios');


import UploadFile from '@/components/forms/UploadFile.vue'
import HourComponent from "./schedules.vue"
export default {
    name: 'register-validate',
    data(){
        return {
            place: {
                name: undefined,
                description: undefined,
                schedule: undefined,
                image: undefined
            },
               user_data: {},
        }
    },
    components:{
        UploadFile,
        HourComponent
    },
    methods:{
        validateFirstTab(){
            if(this.place.name == undefined || this.place.description== undefined) {
                return false;
            }
            return true;
        },
        handlerdata(data){
            this.place.image=data;
            console.log(data)
        },
        handlerSchedules(data){
            this.place.schedule=data;

        },
        onComplete(){
       let place= this.place;
       let formData = new FormData();
       formData.append('image',"");
        formData.append('schedules',"");
        console.log(place)


        axios.post(`${SERVER_URI}/api/nightclub?token=${this.user_data.token}`,formData)
             .then(function (req) {
               console.log(req.data)
             })
            .catch(function (err) {
           
        });


        }
    },
    mounted(){
        if(dbLocal.checkDataLocalStorageOBject())
        this.user_data  =dbLocal.getDataLocalStorageOBject();
    }
}
</script>

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
                        validateOnBack="true"
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
                           <UploadFile />
                       </div>
                   </div>
      
      </tab-content>
      <tab-content title="Last step"
                   icon="ti-check">
        Yuhuuu! This seems pretty damn simple
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
import UploadFile from '@/components/forms/UploadFile.vue'
export default {
    name: 'register-validate',
    data(){
        return {
            place: {
                name: undefined,
                description: undefined,
            }
        }
    },
    components:{
        UploadFile
    },
    methods:{
        validateFirstTab(){
            if(this.place.name == undefined || this.place.description== undefined) {
                return false;
            }
            return true;
        }
    }
}
</script>

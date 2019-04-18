<template>
      <!-- Edit event modal-->
    <div class="modal fade" id="modal_add_event" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header ">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">Crear un evento</h4>
          </div>
          <div class="modal-body">
            <form class="form-horizontal edit-event__form">
              <div class="form-group">
                <label for="editTitle" class="col-md-2 control-label">Titulo </label>
                <div class="col-md-10">
                  <input type="text" class="form-control edit_event_title" id="editTitle" placeholder="Titulo del evento" v-model="events.title">
                </div>
              </div>
              <div class="form-group">
                <label for="toggle-allDay" class="col-md-2 control-label">Todo el día </label>
                <div class="col-md-10">
                  <div class="togglebutton m-t-5">
                    <label>
                      <input type="checkbox" class="toggle-primary" id="toggle-allDay" v-model="events.allday">
                    </label>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="col-md-10 col-md-offset-2 p-0">
                  <div class="col-xs-6 p-0">
                    <div class="form-group m-0 is-empty">
                      <div class="input-group">
                        <span class="input-group-addon"><i class="zmdi zmdi-calendar"></i></span>
                        <input type="text" class="form-control datepicker" id="event_start_date" placeholder="Fecha de inicio " v-model="events.date_start">
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-6">
                    <div class="form-group m-0 is-empty">
                      <div class="input-group">
                        <span class="input-group-addon"><i class="zmdi zmdi-time"></i></span>
                        <input type="text" class="form-control datepicker" id="event_start_time" placeholder="Hora de inicio " v-model="events.hour_start">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="col-md-10 col-md-offset-2 p-0">
                  <div class="col-xs-6 p-0">
                    <div class="form-group m-0 is-empty">
                      <div class="input-group">
                        <span class="input-group-addon"><i class="zmdi zmdi-calendar"></i></span>
                        <input type="text" class="form-control datepicker" id="event_end_date" placeholder="Fecha fin " v-model="events.date_start">
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-6">
                    <div class="form-group m-0 is-empty">
                      <div class="input-group">
                        <span class="input-group-addon"><i class="zmdi zmdi-time"></i></span>
                        <input type="text" class="form-control datepicker" id="event_end_time" placeholder="Hora fin" v-model="events.hour_end">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="eventColor" class="col-md-4 control-label p10">Seleccione un color para el evento </label>
                <div class="col-md-8">
                  <div class="form-group m-t-5 p-l-10">
                    <div class="event-tag event-tag-edit">
                      <span class="mw-lightBlue">
                        <input type="radio" value="mw-lightBlue" name="event-tag" v-on:click.prevent="handlerColor">
                        <i></i>
                      </span>
                      <span class="mw-blue">
                        <input type="radio" value="mw-blue" name="event-tag" v-on:click.prevent="handlerColor">
                        <i></i>
                      </span>
                      <span class="mw-turquoise">
                        <input type="radio" value="mw-turquoise" name="event-tag" v-on:click.prevent="handlerColor">
                        <i></i>
                      </span>
                      <span class="mw-peach">
                        <input type="radio" value="mw-peach" name="event-tag" v-on:click.prevent="handlerColor">
                        <i></i>
                      </span>
                      <span class="mw-salmon">
                        <input type="radio" value="mw-salmon" name="event-tag" v-on:click.prevent="handlerColor">
                        <i></i>
                      </span>
                      <span class="mw-green">
                        <input type="radio" value="mw-green" name="event-tag" v-on:click.prevent="handlerColor">
                        <i></i>
                      </span>
                      <span class="mw-purple">
                        <input type="radio" value="mw-purple" name="event-tag" v-on:click.prevent="handlerColor">
                        <i></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
               <CardAddUser />
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default btn-flat" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" data-calendar="update">Update</button>
          </div>
        </div>
        <!-- modal-content -->
      </div>
      <!-- modal-dialog -->
    </div>
</template>
<script>
import CardAddUser from '@/components/users/CardAddUser.vue'
export default {
    name: 'add-event',
    components:{
      CardAddUser
    },
    data(){
        return {
            openSearch: false,
            events: {
              user_id: undefined,
              title: undefined,
              color: undefined,
              date_start: undefined,
              date_end: undefined,
              hour_start: undefined,
              hour_end: undefined,
              guests: [],
              nightclub: undefined,
            }
        }
    },
    methods:{
        openToggle(){
            this.openSearch =!this.openSearch;
        }
        ,handlerColor(ev){
          this.events.color =ev.target.value;
        },


    },
    mounted(){

    },
    updated(){
      console.log(this.events)
    }
}
</script>
<style>

</style>
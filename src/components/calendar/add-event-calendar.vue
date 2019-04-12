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
                  <input type="text" class="form-control edit_event_title" id="editTitle" placeholder="Titulo del evento">
                </div>
              </div>
              <div class="form-group">
                <label for="toggle-allDay" class="col-md-2 control-label">Todo el día </label>
                <div class="col-md-10">
                  <div class="togglebutton m-t-5">
                    <label>
                      <input type="checkbox" class="toggle-primary" id="toggle-allDay">
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
                        <input type="text" class="form-control datepicker" id="event_start_date" placeholder="Fecha de inicio ">
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-6">
                    <div class="form-group m-0 is-empty">
                      <div class="input-group">
                        <span class="input-group-addon"><i class="zmdi zmdi-time"></i></span>
                        <input type="text" class="form-control datepicker" id="event_start_time" placeholder="Hora de inicio ">
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
                        <input type="text" class="form-control datepicker" id="event_end_date" placeholder="Fecha fin ">
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-6">
                    <div class="form-group m-0 is-empty">
                      <div class="input-group">
                        <span class="input-group-addon"><i class="zmdi zmdi-time"></i></span>
                        <input type="text" class="form-control datepicker" id="event_end_time" placeholder="Hora fin">
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
                        <input type="radio" value="mw-lightBlue" name="event-tag">
                        <i></i>
                      </span>
                      <span class="mw-blue">
                        <input type="radio" value="mw-blue" name="event-tag">
                        <i></i>
                      </span>
                      <span class="mw-turquoise">
                        <input type="radio" value="mw-turquoise" name="event-tag">
                        <i></i>
                      </span>
                      <span class="mw-peach">
                        <input type="radio" value="mw-peach" name="event-tag">
                        <i></i>
                      </span>
                      <span class="mw-salmon">
                        <input type="radio" value="mw-salmon" name="event-tag">
                        <i></i>
                      </span>
                      <span class="mw-green">
                        <input type="radio" value="mw-green" name="event-tag">
                        <i></i>
                      </span>
                      <span class="mw-purple">
                        <input type="radio" value="mw-purple" name="event-tag">
                        <i></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="eventColor" class="col-md-2 control-label">Invitar </label>
                <div class="col-md-10">
                  <div class="form-group m-t-5">
                    <ul class="list-group user-group p-l-10">
                      <li class="list-group-item">
                        <img src="https://st.depositphotos.com/1734074/4662/v/950/depositphotos_46622591-stock-illustration-user-man-icon.jpg" alt="" class="img-circle max-w-40">
                        <span class="remove-guests"><i class="zmdi zmdi-minus-circle"></i></span>
                      </li>
                     
                      <li class="inline-block card-guests">
                        <a href="javascript:void(0)" class="btn btn-add-gray btn-fab btn-fab-sm m-l-5" v-on:click.prevent="openToggle">
                            <i class="zmdi zmdi-plus"></i></a>
                     <div id="popover-guests" v-if="openSearch">
                      <div class="head">
                        Selecciones sus invitados  
                        <a href="" v-on:click.prevent="openToggle"><i class="zmdi zmdi-close"></i></a>
                      </div>
                      <div class="content">
                        <div class="form-group is-empty m-10">
                          <div class="input-group">
                            <input type="text" class="form-control" id="filter_cal_input" placeholder="Filter Members">
                            <span class="input-group-addon"><i class="zmdi zmdi-search"></i></span>
                          </div>
                        </div>
                        <ul class="list-group filter_cal_list">                        
                          <li class="list-group-item">
                            <a href="" class="btn-guests">
                            <img src="https://st.depositphotos.com/1734074/4662/v/950/depositphotos_46622591-stock-illustration-user-man-icon.jpg" alt="" class="img-circle max-w-40">
                            <small>andrewcoleman@materiallab.pro</small>
                            </a>
                          </li>
                          <li class="list-group-item">
                            <a href="" class="btn-guests">
                            <img src="https://st.depositphotos.com/1734074/4662/v/950/depositphotos_46622591-stock-illustration-user-man-icon.jpg" alt="" class="img-circle max-w-40">
                            <small>andrewcoleman@materiallab.pro</small>
                            </a>
                          </li>
                          <li class="list-group-item">
                            <a href="" class="btn-guests">
                            <img src="https://st.depositphotos.com/1734074/4662/v/950/depositphotos_46622591-stock-illustration-user-man-icon.jpg" alt="" class="img-circle max-w-40">
                            <small>andrewcoleman@materiallab.pro</small>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                      </li>
                    </ul>
                   
                  </div>
                </div>
              </div>
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
export default {
    name: 'add-event',
    data(){
        return {
            openSearch: false,
        }
    },
    methods:{
        openToggle(){
            this.openSearch =!this.openSearch;
        }

    },
    mounted(){

    }
}
</script>
<style>
.card-guests{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}
   #popover-guests{
       position: absolute;
       z-index: 100!important;
       bottom: 50%;
       transform: translateY(50%);
       left: 100%;
       margin-left: 10px;
       background: #fff;
       width:260px;
       border-radius: 5px;
     max-width: 300px;
    box-shadow: 0 5px 10px rgba(175,188,206,.6);
    border: 1px solid rgba(175,188,206,.3);
}


     

   
    #popover-guests .head{
      background: #EEF5F9;
      padding: 5px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
     #popover-guests .head a{
             color: #ec407a;
     }
    #popover-guests::after{
        content: "";
         position: absolute;
         left: -20px;
         border: transparent solid 10px;
         top: 50%;
         transform: translateY(-50%);
         border-right: #ccc solid 10px;
    }
  #popover-guests  .list-group-item{
      padding: 5px 20px;
      margin: 3px;
      display: flex;
      align-items: center;
      background: #EEF5F9;
      color: #444;

    }
    .btn-guests{
        color: #444 !important;
    }
    .user-group .list-group-item:not(.dropdown):hover img{
        transform: scale(1.1);
    }
</style>
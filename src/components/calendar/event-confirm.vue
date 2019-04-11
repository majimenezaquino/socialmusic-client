<template>
      <!-- Edit event modal-->
    <div class="modal fade" id="modal_edit_event" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header ">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">Edit event</h4>
          </div>
          <div class="modal-body">
            <form class="form-horizontal edit-event__form">
              <div class="form-group">
                <label for="editTitle" class="col-md-2 control-label">Title</label>
                <div class="col-md-10">
                  <input type="text" class="form-control edit_event_title" id="editTitle" placeholder="Event Title">
                </div>
              </div>
              <div class="form-group">
                <label for="toggle-allDay" class="col-md-2 control-label">All Day</label>
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
                        <input type="text" class="form-control datepicker" id="event_start_date" placeholder="Start Date">
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-6">
                    <div class="form-group m-0 is-empty">
                      <div class="input-group">
                        <span class="input-group-addon"><i class="zmdi zmdi-time"></i></span>
                        <input type="text" class="form-control datepicker" id="event_start_time" placeholder="Start Time">
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
                        <input type="text" class="form-control datepicker" id="event_end_date" placeholder="End Date">
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-6">
                    <div class="form-group m-0 is-empty">
                      <div class="input-group">
                        <span class="input-group-addon"><i class="zmdi zmdi-time"></i></span>
                        <input type="text" class="form-control datepicker" id="event_end_time" placeholder="End Time">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="eventColor" class="col-md-2 control-label">Tag Color</label>
                <div class="col-md-10">
                  <div class="form-group m-t-5">
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
                <label for="eventColor" class="col-md-2 control-label">Guests</label>
                <div class="col-md-10">
                  <div class="form-group m-t-5">
                    <ul class="list-group user-group p-l-10">
                      <li class="list-group-item">
                        <img src="assets/img/profiles/11.jpg" alt="" class="img-circle max-w-40">
                        <span class="remove-guests"><i class="zmdi zmdi-minus-circle"></i></span>
                      </li>
                      <li class="list-group-item">
                        <img src="assets/img/profiles/13.jpg" alt="" class="img-circle max-w-40">
                        <span class="remove-guests"><i class="zmdi zmdi-minus-circle"></i></span>
                      </li>
                      <li class="list-group-item">
                        <img src="assets/img/profiles/03.jpg" alt="" class="img-circle max-w-40">
                        <span class="remove-guests"><i class="zmdi zmdi-minus-circle"></i></span>
                      </li>
                      <li class="list-group-item">
                        <img src="assets/img/profiles/09.jpg" alt="" class="img-circle max-w-40">
                        <span class="remove-guests"><i class="zmdi zmdi-minus-circle"></i></span>
                      </li>
                      <li class="list-group-item">
                        <img src="assets/img/profiles/14.jpg" alt="" class="img-circle max-w-40">
                        <span class="remove-guests"><i class="zmdi zmdi-minus-circle"></i></span>
                      </li>
                      <li class="inline-block">
                        <a href="javascript:void(0)" class="btn btn-add-gray btn-fab btn-fab-sm m-l-5" data-trigger="popover-guests"><i class="zmdi zmdi-plus"></i></a>
                      </li>
                    </ul>
                    <div id="popover-guests">
                      <div class="head hide">
                        Add guests
                      </div>
                      <div class="content hide">
                        <div class="form-group is-empty m-10">
                          <div class="input-group">
                            <input type="text" class="form-control" id="filter_cal_input" placeholder="Filter Members">
                            <span class="input-group-addon"><i class="zmdi zmdi-search"></i></span>
                          </div>
                        </div>
                        <ul class="list-group filter_cal_list">
                          <li class="list-group-item">
                            <img src="assets/img/profiles/15.jpg" alt="" class="img-circle max-w-40">
                            <span>mikejones@materiallab.pro</span>
                          </li>
                          <li class="list-group-item">
                            <img src="assets/img/profiles/06.jpg" alt="" class="img-circle max-w-40">
                            <span>janehill@materiallab.pro</span>
                          </li>
                          <li class="list-group-item">
                            <img src="assets/img/profiles/05.jpg" alt="" class="img-circle max-w-40">
                            <span>emilymoore@materiallab.pro</span>
                          </li>
                          <li class="list-group-item">
                            <img src="assets/img/profiles/02.jpg" alt="" class="img-circle max-w-40">
                            <span>andrewcoleman@materiallab.pro</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="textArea" class="col-md-2 control-label">Desctiption</label>
                <div class="col-md-10">
                  <textarea class="form-control edit-event-description" rows="3" id="textArea" placeholder="Event Desctiption"></textarea>
                </div>
              </div>
              <div class="form-group m-0">
                <div class="col-md-12">
                  <div class="checkbox">
                    <label>
                      <input type="checkbox" value="">
                      Notify people on
                    </label>
                    <img src="assets/img/icons/logos/Slack_RGB.svg" class="max-w-100" alt="slack" />
                  </div>
                </div>
              </div>
              <input type="hidden" class="edit_event_id">
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default btn-flat" data-calendar="delete">Delete</button>
            <button type="button" class="btn btn-default btn-flat" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" data-calendar="update">Update</button>
          </div>
        </div>
        <!-- modal-content -->
      </div>
      <!-- modal-dialog -->
    </div>
</template>
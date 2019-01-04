<template>
  <div class="car-musician">
    <div class="card type--profile m-10">
          <header class="card-heading  card-blue">
            <img src="https://image.afcdn.com/story/20171117/marc-anthony-1134868_w767h767c1cx1510cy849.jpg" alt="" class="img-circle profile-mini">
            <ul class="card-actions icons right-top">
                <li class="dropdown">
                    <a href="" data-toggle="dropdown">
                        <i class="zmdi zmdi-more-vert"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-right btn-info">
                        <li>
                            <a href=""><i class="zmdi zmdi-edit"></i>
                             <span class="m-l-10">Edit Contact</span>
                             </a>
                        </li>
                        <li>
                            <a href="">
                                <i class="zmdi zmdi-block"></i>
                                 <span class="m-l-10">Mute Contact</span>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <i class="zmdi zmdi-delete"></i>
                                 <span class="m-l-10">Remove Contact</span></a>
                         </li>
                    </ul>
                    </li>
                </ul>
         </header>
            <div class="card-body">
                <h3 class="name">Nick	Webster</h3>
                <span class="title">Freelance Designer</span>
                <button type="button" class="btn btn-blue btn-round  btn-sm">Send Message</button>
            </div>
            <div class="card-footer border-top">
                <ul class="card-actions left-bottom">
                    <li>
                        <a href="" class="btn btn-default btn-flat">
                            Action
                        </a>
                    </li>
                </ul>
                <ul class="card-actions icons right-bottom">
                    <li>
                        <a href="">
                            <i class="zmdi zmdi-pin"></i>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <i class="zmdi zmdi-notifications"></i>
                        </a>
                    </li>
                </ul>
            </div>
            </div>
    </div>
</template>
<script>
   
export default {
    name : 'musician',
}
</script>
<style>
    .car-musician{
        width:240px;
        background:#fff;
        margin:0px;
        padding:0px;

    }
</style>
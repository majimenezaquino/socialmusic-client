<template>
 <div class="col-md-3">
    <div class="card-creactor">
      <a class="thumbnil"
      v-bind:style="{ 'background-image': 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXNa3l4lXTNLDvXNQV8uVLLownxElJSu71UItofQAb7vkLh7zj)' }" >
          <div class="content">
        <a href=""> <h1>Miguel Jimenez</h1> </a>
      </div>
        <div class="info-hidden">
          <div class="musician">
              <div class="itme-musician">
                  <span>profection</span>
                   <i class="zmdi zmdi-run"></i>
              </div>
              <div class="itme-musician">
                  <span>profection</span>
                   <i class="zmdi zmdi-run"></i>
              </div>
              <div class="itme-musician">
                  <span>profection</span>
                   <i class="zmdi zmdi-run"></i>
              </div>
          </div>
          <p>Lorem, ipsum dolor sit amet  quasi voluptatum nesciunt cupiditate, animi magni voluptatem!</p>
        </div>
      </a>
      
  </div>
 </div>
</template>
<style>
  .card-creactor{
    margin: 0px;
    padding: 0px;
    width: 100%;
    margin-bottom: 20px;
  }
  .card-creactor .thumbnil{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    background-size: cover;
    min-height: 300px;
    border-radius: 4px;
    position: relative;
  }
  .card-creactor .thumbnil .info-hidden{
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    height: 60px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.5);
    color: #444;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    transition: all ease 3s;
   }
   .card-creactor .thumbnil:hover .info-hidden{
     height: auto;
     transition: all ease 0.3s;
   }
   .card-creactor .thumbnil .info-hidden p{
     font-size: 15px;
     line-height: 16px;
     padding:4px 10px;
     color: #444;
     font-weight: 600px;
   }
  .card-creactor .thumbnil  .musician{
    display: flex;
    justify-content: center;
   }
   .itme-musician{
     display: flex;
     justify-content: center;
     align-items: center;
     flex-direction: column;
     padding:  10px;
     margin: 0px 1px;
     background: #eee;
     height: 60px;
   }
   .itme-musician span{
     font-size: 12px;
   } 
   .card-creactor  .content {
     color: #eee;
   }
   .card-creactor  .content h1{
     font-size: 30px;
     color: #fff;
   }
</style>
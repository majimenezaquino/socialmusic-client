<template>
    <section class="main">
    <header>
        <div class="container-navbar drawer-fixed">
                      <div class="navbar-menu">
                        <div class="logo"><h1>SOCIALMUSIC</h1></div>
                       <div class="navbar">
                           <ul>
                               <li><a href="">Home</a></li>
                               <li><a href="">evente</a></li>
                               <li><a href="">Musics</a></li>
                           </ul>
                       </div>
                      </div>
                  </div>
            <div class="container-festival"  :style="background[0].img">
                  <div class="slider-festival">
                        <div class="item">
                            <h1>Music Festival</h1>
                            <div class="control-date">
                                <div class="item">
                                    <span>00</span>
                                    <i>DAYS</i>
                                </div>
                                <div class="item">
                                    <span>00</span>
                                    <i>HOURS</i>
                                </div>
                                <div class="item">
                                    <span>00</span>
                                    <i>MINUTES</i>
                                </div>
                                <div class="item">
                                    <span>00</span>
                                    <i>SECONDS</i>
                                </div>
                            </div>
                        </div>
                  </div>


                  
            </div>
            
    </header>
    <!-- secion de musica -->
     <section class="container-music">
         <div class="header">
             <h1>Musics Performers</h1>
         </div>
        <div class="musics">
            <div class="item">
                <div class="thumbnails">
                      <img src="https://www.hola.com/imagenes/actualidad/2016112189834/andres-ceballos-dvicio-grammy-latinos/0-404-706/dvicio-getty2-t.jpg" alt=""/>
                    </div>
                    <div class="info">
                        <h3>Miguel Jimenez</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do </p>
                    </div>
                <div class="controls">
                    <a href="" class="btn-player"><i class="zmdi zmdi-play-circle"></i></a>
                </div>
            </div>
            <div class="item">
                <div class="thumbnails">
                      <img src="https://img.elcomercio.pe/files/article_content_ec_fotos/uploads/2017/05/12/5916528eeeb7d.jpeg" alt=""/>
                    </div>
                    <div class="info">
                        <h3>Miguel Jimenez</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do </p>
                    </div>
                <div class="controls">
                    <a href="" class="btn-player"><i class="zmdi zmdi-play-circle"></i></a>
                </div>
            </div>
            <div class="item">
                <div class="thumbnails">
                      <img src="https://static.vix.com/es/sites/default/files/styles/large/public/imj/c/cantantes-portada.jpg?itok=x3cDPC71" alt=""/>
                    </div>
                    <div class="info">
                        <h3>Miguel Jimenez</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do </p>
                    </div>
                 <div class="controls">
                    <a href="" class="btn-player"><i class="zmdi zmdi-play-circle"></i></a>
                </div>
            </div>
            <div class="item">
                <div class="thumbnails">
                      <img src="https://www.superprof.mx/blog/file/2017/06/cantante-autodidacta.jpg" alt=""/>
                    </div>
                    <div class="info">
                        <h3>Miguel Jimenez</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do </p>
                    </div>
                <div class="controls">
                    <a href="" class="btn-player"><i class="zmdi zmdi-play-circle"></i></a>
                </div>
            </div>
            <div class="item">
                <div class="thumbnails">
                      <img src="https://www.hola.com/imagenes/actualidad/2016112189834/andres-ceballos-dvicio-grammy-latinos/0-404-706/dvicio-getty2-t.jpg" alt=""/>
                    </div>
                    <div class="info">
                        <h3>Miguel Jimenez</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do </p>
                    </div>
                <div class="controls">
                    <a href="" class="btn-player"><i class="zmdi zmdi-play-circle"></i></a>
                </div>
            </div>
            <div class="item">
                <div class="thumbnails">
                      <img src="https://img.elcomercio.pe/files/article_content_ec_fotos/uploads/2017/05/12/5916528eeeb7d.jpeg" alt=""/>
                    </div>
                    <div class="info">
                        <h3>Miguel Jimenez</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do </p>
                    </div>
                <div class="controls">
                    <a href="" class="btn-player"><i class="zmdi zmdi-play-circle"></i></a>
                </div>
            </div>
            <div class="item">
                <div class="thumbnails">
                      <img src="https://static.vix.com/es/sites/default/files/styles/large/public/imj/c/cantantes-portada.jpg?itok=x3cDPC71" alt=""/>
                    </div>
                    <div class="info">
                        <h3>Miguel Jimenez</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do </p>
                    </div>
                 <div class="controls">
                    <a href="" class="btn-player"><i class="zmdi zmdi-play-circle"></i></a>
                </div>
            </div>
            <div class="item">
                <div class="thumbnails">
                      <img src="https://www.hola.com/imagenes/actualidad/2016112189834/andres-ceballos-dvicio-grammy-latinos/0-404-706/dvicio-getty2-t.jpg" alt=""/>
                    </div>
                    <div class="info">
                        <h3>Miguel Jimenez</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do </p>
                    </div>
                <div class="controls">
                    <a href="" class="btn-player"><i class="zmdi zmdi-play-circle"></i></a>
                </div>
            </div>
        </div>
     </section>
     <!-- fin secion de musica -->
       <!-- secion de eventos -->
     <section class="container-music container-event">
         <div class="header">
             <h1>Event Performers</h1>
         </div>
        <div class="musics">
            <div class="item">
                <div class="thumbnails">
                      <img src="https://www.hola.com/imagenes/actualidad/2016112189834/andres-ceballos-dvicio-grammy-latinos/0-404-706/dvicio-getty2-t.jpg" alt=""/>
                    </div>
                    <div class="info">
                        <h3>Miguel Jimenez</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do </p>
                    </div>
                <div class="controls">
                    <a href="" class="btn-player"><i class="zmdi zmdi-play-circle"></i></a>
                </div>
            </div>
            <div class="item">
                <div class="thumbnails">
                      <img src="https://img.elcomercio.pe/files/article_content_ec_fotos/uploads/2017/05/12/5916528eeeb7d.jpeg" alt=""/>
                    </div>
                    <div class="info">
                        <h3>Miguel Jimenez</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do </p>
                    </div>
                <div class="controls">
                    <a href="" class="btn-player"><i class="zmdi zmdi-play-circle"></i></a>
                </div>
            </div>
            <div class="item">
                <div class="thumbnails">
                      <img src="https://static.vix.com/es/sites/default/files/styles/large/public/imj/c/cantantes-portada.jpg?itok=x3cDPC71" alt=""/>
                    </div>
                    <div class="info">
                        <h3>Miguel Jimenez</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do </p>
                    </div>
                 <div class="controls">
                    <a href="" class="btn-player"><i class="zmdi zmdi-play-circle"></i></a>
                </div>
            </div>
            <div class="item">
                <div class="thumbnails">
                      <img src="https://www.superprof.mx/blog/file/2017/06/cantante-autodidacta.jpg" alt=""/>
                    </div>
                    <div class="info">
                        <h3>Miguel Jimenez</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do </p>
                    </div>
                <div class="controls">
                    <a href="" class="btn-player"><i class="zmdi zmdi-play-circle"></i></a>
                </div>
            </div>
            
               
            <div class="item">
                <div class="thumbnails">
                      <img src="https://www.hola.com/imagenes/actualidad/2016112189834/andres-ceballos-dvicio-grammy-latinos/0-404-706/dvicio-getty2-t.jpg" alt=""/>
                    </div>
                    <div class="info">
                        <h3>Miguel Jimenez</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do </p>
                    </div>
                <div class="controls">
                    <a href="" class="btn-player"><i class="zmdi zmdi-play-circle"></i></a>
                </div>
            </div>
        </div>
     </section>
     <!-- fin secion de musica -->
    <!-- section player -->
    <section class="container-fuid">
        <ComponentMap :markers='[
        {"lat":35.6432027,"lng":139.6729435},
        {"lat":35.5279833,"lng":139.6989209},
        {"lat":35.6563623,"lng":139.7215211},
        {"lat":35.6167531,"lng":139.5469376},
        {"lat":35.6950961,"lng":139.5037899}
      ]' />
    </section>

    <!--fin  section player -->

    </section>

</template>

<script>
  const axios=require('axios')

    import CardPricing from "@/components/cards/CardPricing.vue"
     import ComponentMap from "@/components/map/map.vue";
    export default {
        name: "musica-fetival",
        data(){
            return{
                background: [
                    {img:  "background-image: url(https://www.superprof.mx/blog/file/2017/06/cantante-autodidacta.jpg);"}
                ]
                    
                
            }
        },
        created(){
           this.getUser()
        },
        methods:{
            getUser(){
                 axios.get("https://es.gravatar.com/205e460b479e2e5b48aec07710c08d50.json").then(data=>{
                     console.log(data)
                 }).catch(err=>{

                 })
            }
        },
        components:{
            ComponentMap,
            CardPricing
        }
    }
</script>
<style scoped src="@/assets/css/layout-festival.css"></style>




  
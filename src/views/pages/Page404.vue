<template>
    <div class="container-auxiliar">
     <Layoutpage> 
        <div slot="content">
          <div class="row">
		    <div class="col-md-12">
			<header>
			 <h1>{{messages.code}}</h1>
			 <h2><span>{{messages.signal}}</span><br/>{{messages.description}}</h2>
			</header>
			<a href="index-2.html" class="btn btn-primary btn-round">{{messages.button}}</a>
		    </div>
	      </div>
        </div>
     </Layoutpage>
    </div>
</template>

<script>
    import Layoutpage from "@/layouts/Layoutpage.vue"
    export default {
        name: "page-404",
        components:{
            Layoutpage
        },
        data(){
            return {
                messages: {
                    code: "404",
                    description: "We couldn't find this page.",
                    button: "Let's go home",
                    signal: "Whoops!"
                }
            }
        }
    }
</script>
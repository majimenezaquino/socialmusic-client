<template>
		 <div slot="content">
        <section id="content_outer_wrapper">
            	<div class="flags-country">
                    <ul>
                    <li v-for="(country,index) in counties" :key="index">
                        <a href=""><img :src="getImageCountryByCode(country.code)" alt=""></a>
                    </li>
                   
                </ul>
                </div>
		
    </section>
		 </div>
</template>

<script>
  

	const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
	const {DBLocal} =require('@/services/data_local')
    const dbLocal= new DBLocal(DB_USER_NAME);
    const axios =require('axios')
	
    export default {
        name: "language",
        data(){
            return{
                counties: [],
            }
        },
        methods:{
            getCountries(){
                let self =this;
                axios.get(`${SERVER_URI}/api/countries`).
                
            then(function(req){
                   self.counties=req.data.countries;
                     //console.log(req.data.countries)
            }).catch(function(err){
                console.log(`error--->${err}`)
            })
            },
            getImageCountryByCode(code){
                return `${document.location.origin}/assets/flags-mini/${code.toLowerCase()}.png`
            }
            
        },
        mounted(){
            this.getCountries();
            console.log(this.counties)
        }
    }

</script>
<style>

.flags-country {
    background: #fff;
    margin: 0px;
    align-self: auto;
}
.flags-country ul{
     list-style: none;
     width: 100%;
     height: auto;
     display: flex;
     justify-content: space-around;
     flex-wrap: wrap;
}
.flags-country ul li a{
    display: flex;
    width: 80px;
    height: 80px;
    border: #ccc solid 1px;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    background: #fff;
    margin: 10px;
}
.flags-country ul li a img{
    width: 70px;
    height: auto;
}

</style>

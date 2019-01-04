<template>
    <div class="container-config">
        <u>
            <li><a href="" v-on:click.prevent="logout">Logout</a></li>
        </u>
    </div>
</template>
<script>
const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
const {DBLocal} =require('@/services/data_local')
const dbLocal= new DBLocal(DB_USER_NAME);

export default {
    name: "confi-logout",
    methods:{
        logout(){
            dbLocal.clearDataLocalStorage();
            if(!dbLocal.checkDataLocalStorageOBject()){
					this.$router.push( '/login');	
			}
            
        }
    }
}
</script>


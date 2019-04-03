<template>
<div>
<div class="card card-transparent m-b-0">
    <header class="card-heading">
        <h2 class="card-title m-t-0">profesiones</h2>
    </header>
    <div class="card-body p-t-0">
        <div class="content-musiciani-about">
                <a href="" class="item-musician"
                 v-for="(mus, index) in musicians"
                 :key="index"
                 >
                    <span>{{mus.musician.name}}</span>
                    <i :class="mus.musician.icon"></i>
                </a>
        </div>
        <p>
            <b>Más sobre mí</b> <br/>
            {{description}}
        </p>
    </div>
</div>
<div class="card card-transparent">
    <header class="card-heading">
        <h2 class="card-title">contactos</h2>
    </header>
    <div class="card-body p-t-0">
        <div class="p-l-30">
            <dl class="dl-horizontal">
                <dt>Location</dt>
                <dd>Little Rock, AR</dd>
            </dl>
            <dl class="dl-horizontal">
                <dt>Phone</dt>
                <dd>+1 888-555-0000</dd>
            </dl>
            <dl class="dl-horizontal">
                <dt>Email Address</dt>
                <dd><a href="mailto:support@authenticgoods.co">support@authenticgoods.co</a></dd>
            </dl>
            <dl class="dl-horizontal">
                <dt>Website</dt>
                <dd><a href="http://www.authenticgoods.co/" target="_blank">http://www.authenticgoods.co</a></dd>
            </dl>
            <dl class="dl-horizontal">
                <dt>Twitter</dt>
                <dd><a href="http://twitter.com/_authenticgoods" target="_blank">@_authenticgoods</a></dd>
            </dl>
        </div>
        <div class="container-reds">
            <div class="social-btns">
                <a class="btn facebook" href="#"> <i class="fa fa-facebook"></i></a>
                <a class="btn twitter" href="#"><i class="fa fa-twitter"></i></a>
                <a class="btn google" href="#"><i class="fa fa-google"></i></a>
                <a class="btn dribbble" href="#"><i class="fa fa-dribbble"></i></a>
                <a class="btn skype" href="#"><i class="fa fa-skype"></i></a>
        </div>
        </div>
    </div>
</div>
</div>
</template>
<script>

        const {SERVER_URI,DB_USER_NAME}=require('@/config/index')
        const {DBLocal} =require('@/services/data_local')
        const dbLocal= new DBLocal(DB_USER_NAME);
        const axios = require('axios');
        const {EventBus} =require('@/eventbus');


        export default {
            name: 'about',
            data(){
                return {
                    user_data :   undefined,
                    musicians: [],
                    musics: [],
                    description: undefined
                }
            },
            methods: {
                redirectUserLogin(){
                if(dbLocal.checkDataLocalStorageOBject())
                this.user_data  =dbLocal.getDataLocalStorageOBject();
                },
                getUserMusicians(user_id){
                        let _this = this;
                        axios.get(`${SERVER_URI}/api/usermusician/${user_id}?token=${this.user_data.token}`).
                        then(function(req){
                        //musicians;
                        _this.musicians=req.data.musicians[0].musicians;
                        _this.description =req.data.musicians[0].description;
                                        
                        }).catch(function(err){
                            console.log(`error--->${err}`)
                        })
                    }
            },
            mounted(){
                let user_id= this.$route.params.id || this.user_data.user.id;
                this.redirectUserLogin();
                this.getUserMusicians(user_id);
            }
        }
</script>
<style>
.content-musiciani-about{
    display: flex;
    flex-wrap: wrap;
}
.content-musiciani-about .item-musician{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
    border: #ccc solid 1px;
    flex-wrap: wrap;
    flex-direction: column;
    border-radius: 4px;
    margin:0px 5px;
    margin-bottom: 10px;
}
.content-musiciani-about .item-musician span {
    display: flex;
    width: 100%;
    justify-content: center;
    margin: 0px;
    font-size: 13px;
}
.content-musiciani-about .item-musician i{
    display: flex;
    font-size: 30px;
}

/*style ddddd*/

.social-btns{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

}

.social-btns a{
    display: flex;
    padding: 5px;
    border: #ccc solid 1px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    margin:5px;
    margin-top: 25px;
}
</style>


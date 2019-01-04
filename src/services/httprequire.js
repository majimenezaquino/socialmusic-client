
const axios=rquire('axios')

 const getData =()=>{
    axios.get('https://es.gravatar.com/205e460b479e2e5b48aec07710c08d50.json').then(data=>{
    console.log(data)
    }).catch(err=>{
        console.log(err)
    })
 }
 module.exports={
    getData
 }
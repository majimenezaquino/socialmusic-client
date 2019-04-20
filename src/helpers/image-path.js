
 import stattic_image from '@/assets/img/music-no-image.png';
 const {SERVER_URI}=require('@/config/index')
 export  const ImgPath=(img)=>{
    if(img===undefined || img == null ){
        return stattic_image
    }
  if(img.includes("https://") || img.includes("http://")){
      return img;
  }
  return `${SERVER_URI}/api/files/image/${img}`;
}






<template>
  <div class="container-fluid">
     <div class="row">
        <div class="col-md-6 col-xs-10">
            <div class="previe-fiele">
                
            </div>
        </div>
        <div class="col-md-6 col-xs-10">

        </div>
     </div>
    <label for="btn-upload" class="btn-upload">
        <i class="fa fa-cloud-upload" aria-hidden="true"></i>
   </label>
    <input type="file" name="" id="btn-upload" style="display:none" accept="audio/*">
  </div>
</template>
<script>
export default {
  name: 'upload-file'
}
</script>
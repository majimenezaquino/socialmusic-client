<template>
    <div class="song-dedicate">
        <button><i class="fa fa-share-square-o"></i> <span>{{count_dedicate}}</span></button>
    </div>
</template>
<script>
export default {
    name: "song-dedicate",
    props:{
        count_dedicate:{
            type: Number,
            required: false
        },

          music_id:{
            type: String,
            required: false
        },
    }
}
</script>

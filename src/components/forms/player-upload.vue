<template>
    <div class="player-load">
        <audio src="https://cdn.zekken.rocks/mp3/nobuo-uematsu-the-promise.mp3" autoplay></audio>
    </div>
</template>
<script>
export default {
    name: 'player-upload',
    props: {
        url: {
            type: String,
            required: false
        }
    }
}
</script>


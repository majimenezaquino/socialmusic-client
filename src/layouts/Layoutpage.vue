<template>
<section id="page-backount">
<div id="wrapper">
	<slot name="content"></slot>
</div>
</section>
</template>
<script>
    export default {
        name: "layout-page"
    }
</script>
<style>
	#page-backount{
		width: 100%;
		margin: 0px;
		padding: 0px;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	#wrapper{
		align-content: center;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

	}
</style>
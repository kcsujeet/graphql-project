<template>
    <div>
        <h1>Error 404: Page not found</h1>
    </div>
</template>

<script>
export default {
    name: 'PostNotFound',
    
mounted: function(){
            this.$router.push({path: '/not-found'})
        }
    
}
</script>

<style>

</style>

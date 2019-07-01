<template>
    <div class="row justify-content-center flex-1">
        <div class="col-md-4">
            <add-post></add-post>
        </div>
    </div>
</template>

<script>
import AddPost from '../components/AddPost.vue'
export default {
    name: 'Profile',
    components:{
        AddPost
    }
}
</script>

<style scoped lang="scss">

</style>

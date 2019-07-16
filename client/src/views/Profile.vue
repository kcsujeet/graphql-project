<template>
    <div class="row justify-content-center">
        <div class="col-md-12">
            <add-post v-on:new_post="add_post($event)"></add-post>
        </div>
        <div class="col-md-10">
            <img v-if="!get_my_posts" class="icon" src="../../public/images/loading.gif">
            <post v-else v-for="(post,index) in get_my_posts" v-bind:post="post" :key="index" @delete_post="delete_post($event)"/>
        </div>
    </div>
</template>

<script>
import AddPost from '../components/AddPost.vue'
import Post from '../components/Post.vue'

export default {
    name: 'Profile',
    components:{
        AddPost,
        Post
    },
    data(){
        return {
            get_my_posts: []
        }
    },
    methods: {
        add_post(post_form){
            this.$apollo.mutate({
            mutation: require('../graphql/mutation/add_post.gql'),
            variables: {
                title: post_form.title,
                description: post_form.description
            }
        }).then((resp) =>{
            this.$toastr.s('i am a toastr success', 'hello')
            this.get_my_posts.unshift(resp.data.add_post)

        }).catch((error) =>{
            this.$toastr.e("Couldn't add new post. Try again.")
        })
        },

        delete_post(post_id){
            this.$apollo.mutate({
                mutation: require('../graphql/mutation/delete_post.gql'),
                variables: {
                    id: post_id
                }
            }).then(resp => {
                this.get_my_posts = this.get_my_posts.filter(item => item.id != resp.data.delete_post.id)
                this.$toastr.s("Post deleted.")
            }).catch( error => {
                this.$toastr.e("Couldn't delete the post. Try again.")
            })
        },
    },
    apollo: {
        $query:  {
                fetchPolicy: 'network-only',
                loadingKey: 'loading',
            },
        get_my_posts: {
            query: require('../graphql/query/get_my_posts.gql')
        }
    }, 
}
</script>

<style scoped lang="scss">

</style>

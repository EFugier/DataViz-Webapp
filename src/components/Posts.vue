<template>
  <div class="posts">
    <h1>Posts</h1>
    This page lists all the posts.<br>
    - - -<br>
    <!-- <router-link v-bind:to="{ name: 'NewPost' }" class="add_post_link">Add Post</router-link> -->
    <br>
    <button class="goto_new_post_btn" @click="gotoNewPost">New Post</button><br>
    <br>
    <br>
    <div v-if="posts.length > 0" class="post-list">
      <div v-for="post in posts" :key="post.title">
        <h3>{{ post.title }}</h3>
        <p>{{ post.description }}</p>
        <router-link v-bind:to="{ name: 'EditPost', params: { id: post._id } }">Edit</router-link> |
        <a href="#">Delete</a>
      </div>
    </div>
    <div v-else>
      There are no posts.. Lets add one now<br>
    </div>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'
export default {
  name: 'posts',
  data () {
    return {
      posts: []
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    async getPosts () {
      const response = await PostsService.fetchPosts()
      this.posts = response.data.posts
    },

    async gotoNewPost () {
      this.$router.push({ name: 'NewPost' })
    }
  }
}
</script>

<style type="text/css">
.goto_new_post_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 10px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 150px;
  border: none;
  cursor: pointer;
}
</style>

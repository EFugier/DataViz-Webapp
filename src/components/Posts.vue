<template>
  <div class="posts">
    <h1>Posts</h1>
    This page lists all the posts.
    <br>- - -<br>

    <div v-for="post in posts" :key="post.tilte">
      <h3>{{ post.title }}</h3>
      <p>{{ post.description }}</p>
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
      this.posts = response.data
    }
  }
}
</script>

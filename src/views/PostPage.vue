<template>
  <v-container fluid>
    
    <div class="post">
    <div>
        <v-icon @click="backToHome" class="post-back-to-home" color="blue">mdi-keyboard-backspace</v-icon>
        <span  class="ml-2 blue--text">Back to home</span>
    </div> 
      <p class="post-title">{{ item.title }}</p>
      <p class="post-time">{{ item.created_at }}</p>
      <v-divider></v-divider>

      <div class="mt-6" v-for="(content,i) in item.content" :key="i">
        <p v-if="content.paragraph">
            {{ content.paragraph }}
        </p>

         <v-img v-if="content.image" class="rounded-lg fill-width" :src="content.image"></v-img>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      item: {},
    };
  },

  methods: {
    getPost(id) {
      this.$axios.get(`/posts/${id}`).then((res) => {
        this.item = res.data;
      });
    },

    backToHome() {
        this.$router.push({ name: 'home'});
    }
  },

  created() {
    this.getPost(this.$route.params.id);
  },
};
</script>

<style lang="scss" scoped>
.post {
  width: 750px;
  margin: 100px auto auto auto;

  .post-back-to-home {
    cursor: pointer;
    &:hover {
        opacity: 0.5;
    }
  }

  .post-title {
    font-size: 30px;
    font-weight: bold;
  }

  .post-time {
    font-size: 13px;
    opacity: 0.5;
  }
}
</style>

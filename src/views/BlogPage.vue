<template>
  <v-container fluid>
    <div class="post">
      <div>
        <v-icon @click="backToHome" class="post-back-to-home" color="blue"
          >mdi-keyboard-backspace</v-icon
        >
        <span @click="backToHome" class="ml-2 blue--text post-back-to-home"
          >Back to home</span
        >
      </div>

      <div class="author mt-6 mb-6 d-flex justify-center align-center">
        <v-img
          v-if="authorInfor.avatar"
          class="rounded-pill mr-4"
          max-height="200px"
          max-width="200px"
          :src="authorInfor.avatar"
        ></v-img>

        <div class="infor ml-4">
          <strong>{{ authorInfor.name }}</strong>
          <p>{{ authorInfor.email }}</p>
        </div>
      </div>

      <p class="post-title">{{ item.title }}</p>
      <p class="post-time">{{ item.created_at }}</p>
      <v-divider></v-divider>

      <div v-html="item.content" class="mt-6"></div>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      item: {},
      authorInfor: {},
    };
  },

  methods: {
    async getPost(id) {
      await this.$axios
        .get(`/blogs/${id}`)
        .then((res) => {
          this.item = res.data;
        })
        .catch((err) => {
          console.error(err);
        });

      this.getAuthor();
    },

    getAuthor() {
      this.$axios
        .get(`/users/${this.item.user_id}`)
        .then((res) => {
          this.authorInfor = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },

    backToHome() {
      this.$router.push({ name: "home" });
    },
  },

  created() {
    this.getPost(this.$route.params.id);
  },
};
</script>

<style lang="scss" scoped>
#app #editorid .ql-editor img {
  width: 100%;
}

.post {
  width: 750px;
  margin: 100px auto auto auto;
  overflow: hidden;

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

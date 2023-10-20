<template>
  <v-container fluid>
    <div class="mt-6 mb-6" style="font-size: 25px; margin-left: 125px">
      See our post
    </div>

    <div style="margin-left: 125px; margin-right: 125px" class="mb-6">
      <v-row>
        <v-col cols="3" class="post" v-for="(item, i) in items" :key="i">
          <div class="post-avatar" @click="viewPost(item.id)">
            <v-img width="100%" height="200" class="rounded-lg" :src="item.avatar"></v-img>
          </div>
          <div class="post-title" @click="viewPost(item.id)">
            <strong>
              {{ item.title }}
            </strong>
          </div>

          <div>
            <p style="opacity: 0.7; font-size: 12px">{{ item.created_at }}</p>
          </div>
        </v-col>
      </v-row>

      <div class="more-post">
        <v-icon
          dark
          v-if="!loading"
          color="#252525"
          class="icon"
          @click="morePost"
        >
          mdi-chevron-down</v-icon
        >

        <v-progress-circular
          v-if="loading"
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      itemsPerPage: 4,
      items: [],
      loading: false,
    };
  },

  methods: {
    loadItems() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.$axios
          .get(`/posts?page=1&limit=${this.itemsPerPage}`)
          .then((res) => {
            this.items = res.data.items;
          });
      }, 1000);
    },

    viewPost(id) {
      this.$router.push({ name: 'post-page', params: { id: id } });

    },

    morePost() {
      this.itemsPerPage += 4;
      this.loadItems();
    },
  },

  created() {
    this.loadItems();
  },
};
</script>

<style lang="scss" scoped>
.post {
  .post-avatar,
  .post-title {
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
  }
}

.more-post {
  text-align: center;

  .icon {
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
  }
}
</style>

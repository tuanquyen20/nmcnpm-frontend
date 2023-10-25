<template>
  <v-container fluid>
    <div
      class="mt-6 mb-6 d-flex justify-space-between"
      style="font-size: 25px; margin-left: 125px"
    >
      See our post

      <v-dialog v-model="createDialog" width="1000">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            dark
            v-bind="attrs"
            v-on="on"
            small
            color="#252525"
            style="right: 125px"
            v-if="isLogged && !isAdmin"
          >
            <v-icon dark> mdi-plus </v-icon>
            Create
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Create Posts
          </v-card-title>

          <v-card-actions>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="createForm.title"
                  label="Title"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="createForm.avatar"
                  label="Avatar Link"
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                v-for="(item, index) in createForm.content"
                :key="index"
              >
                <v-row>
                  <v-col cols="8">
                    <v-textarea
                      name="input-7-1"
                      label="Paragraph"
                      v-model="item.paragraph"
                      filled
                    ></v-textarea>
                  </v-col>

                  <v-col cols="3">
                    <v-textarea
                      name="input-7-1"
                      rows="2"
                      label="Image link"
                      v-model="item.image"
                      filled
                    ></v-textarea>
                  </v-col>

                  <v-col cols="1">
                    <v-btn class="mx-2" small fab dark color="red">
                      <v-icon dark @click="deleteContent(item, 'create')">
                        mdi-minus
                      </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="12">
                <v-row>
                  <v-col cols="8">
                    <v-textarea
                      name="input-7-1"
                      label="Paragraph"
                      v-model="createForm.contentInput.paragraph"
                      filled
                    ></v-textarea>
                  </v-col>

                  <v-col cols="3">
                    <v-textarea
                      name="input-7-1"
                      rows="2"
                      label="Image link"
                      v-model="createForm.contentInput.image"
                      filled
                    ></v-textarea>
                  </v-col>

                  <v-col cols="1">
                    <v-btn
                      class="mx-2"
                      small
                      fab
                      dark
                      color="indigo"
                      @click="
                        addContentToEnd(
                          createForm.contentInput.paragraph,
                          createForm.contentInput.image,
                          'create'
                        )
                      "
                    >
                      <v-icon dark> mdi-plus </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-actions>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#252525" class="white--text" @click="createItem">
              Create
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <v-text-field v-model="search" label="Search" style="margin-left: 125px; margin-right: 125px; width: 200px" class="mb-6" append-icon="mdi-magnify"></v-text-field>

    <div style="margin-left: 125px; margin-right: 125px;" class="mb-6">
      <v-row>
        <v-col cols="3" class="post" v-for="(item, i) in items" :key="i">
          <div class="post-avatar" @click="viewPost(item.id)">
            <v-img
              width="100%"
              height="200"
              class="rounded-lg"
              :src="item.avatar"
            ></v-img>
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
  props: {
    userInfor: Object,
    isLogged: Boolean,
    isAdmin: Boolean,
  },

  data() {
    return {
      search: "",
      itemsPerPage: 4,
      items: [],
      loading: false,
      createForm: {
        title: "",
        avatar: "",
        content: [],

        contentInput: {
          paragraph: "",
          image: "",
        },
      },

      createDialog: false,
    };
  },

  watch: {
    search(newValue) {
      this.loadItems();
    },
  },

  methods: {
    loadItems() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.$axios
          .get(`/posts?page=1&limit=${this.itemsPerPage}&search=${this.search}`)
          .then((res) => {
            this.items = res.data.items || [];
          })
          .catch((err) => {
            console.error(err);
          });
      }, 1000);
    },

    viewPost(id) {
      this.$router.push({ name: "post-page", params: { id: id } });
    },

    morePost() {
      this.itemsPerPage += 4;
      this.loadItems();
    },

    addContentToEnd(paragraph, image, formType) {
      if (formType === "create") {
        this.createForm.content.push({
          paragraph: paragraph,
          image: image,
        });

        this.createForm.contentInput = {
          paragraph: "",
          image: "",
        };
      }
    },

    deleteContent(item, formType) {
      if (formType === "create") {
        this.createForm.content = this.createForm.content.filter(
          (e) => e != item
        );
      }
    },

    createItem() {
      this.$axios
        .post(`/posts`, {
          title: this.createForm.title,
          avatar: this.createForm.avatar,
          content: this.createForm.content,
          user_id: this.userInfor.id,
        })

        .then((res) => {
          this.createDialog = false;
          this.createForm = {
            title: "",
            avatar: "",
            content: [],

            contentInput: {
              paragraph: "",
              image: "",
            },
          };

          this.loadItems();
        })

        .catch((err) => {
          console.error(err);
        });
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

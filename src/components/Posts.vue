<template>
  <v-container fluid>
    <div>
      <v-dialog v-model="createDialog" width="1000">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            dark
            v-bind="attrs"
            v-on="on"
            small
            color="#252525"
            class="mb-4"
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

      <v-text-field v-model="search" label="Search" append-icon="mdi-magnify"></v-text-field>

      <v-data-table
        :headers="headers"
        :items="items"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        class="elevation-1"
        :loading="loading"
      >
        <template v-slot:[`item.title`]="{ item }">
          <strong>{{ item.title }}</strong>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="showUpdateForm(item)">
            mdi-pencil
          </v-icon>

          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>

      <v-pagination
        v-model="page"
        :length="pageCount"
        @next="loadItems"
        @previous="loadItems"
        @input="loadItems"
      ></v-pagination>
    </div>

    <v-dialog v-model="editDialog" width="1000">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Update Post
        </v-card-title>

        <v-card-actions>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="updateForm.title"
                label="Title"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="updateForm.avatar"
                label="Avatar Link"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              v-for="(item, index) in updateForm.content"
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
                    <v-icon dark @click="deleteContent(item, 'update')">
                      mdi-minus
                    </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" v-if="updateForm.content.length > 0">
              <v-row>
                <v-col cols="8">
                  <v-textarea
                    name="input-7-1"
                    label="Paragraph"
                    v-model="updateForm.contentInput.paragraph"
                    filled
                  ></v-textarea>
                </v-col>

                <v-col cols="3">
                  <v-textarea
                    name="input-7-1"
                    rows="2"
                    label="Image link"
                    v-model="updateForm.contentInput.image"
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
                        updateForm.contentInput.paragraph,
                        updateForm.contentInput.image,
                        'update'
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
          <v-btn color="#252525" class="white--text" @click="updateItem">
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      userInfor: {},
      isLogged: false,
      isAdmin: false,
      editDialog: false,
      createDialog: false,
      loading: false,
      page: 1,
      pageCount: null,
      itemsPerPage: 10,
      items: [],
      headers: [
        { text: "ID", value: "id" },
        { text: "Title", value: "title" },
        { text: "Created At", value: "created_at" },
        { text: "Actions", value: "actions", sortable: false },
      ],

      updateForm: {
        id: null,
        created_at: "",
        title: "",
        avatar: "",
        content: [],

        contentInput: {
          paragraph: "",
          image: "",
        },
      },

      createForm: {
        title: "",
        avatar: "",
        content: [],

        contentInput: {
          paragraph: "",
          image: "",
        },
      },
    };
  },

  watch: {
    search(newValue) {
      this.loadItems()
    }
  },

  methods: {
    loadItems() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.$axios
          .get(`/posts?page=${this.page}&limit=${this.itemsPerPage}&search=${this.search}`)
          .then((res) => {
            this.items = res.data.items || [];
            this.pageCount = res.data.page_count;
          })
          .catch((err) => {
            console.error(err);
          });
      }, 1000);
    },

    deleteItem(item) {
      this.$axios
        .delete(`/posts/${item.id}`)
        .then((res) => {
          this.loadItems();
        })
        .catch((err) => {
          console.error(err);
        });
    },

    showUpdateForm(item) {
      this.editDialog = true;
      this.updateForm = {
        id: item.id,
        created_at: item.created_at,
        title: item.title,
        avatar: item.avatar,
        content: item.content,
        user_id: item.user_id,
        contentInput: {
          paragraph: "",
          image: "",
        },
      };
    },

    updateItem() {
      this.$axios
        .put(`/posts/${this.updateForm.id}`, {
          title: this.updateForm.title,
          avatar: this.updateForm.avatar,
          content: this.updateForm.content,
          created_at: this.updateForm.created_at,
          user_id: this.updateForm.user_id,
        })

        .then((res) => {
          this.editDialog = false;
          this.loadItems();
        })
        .catch((err) => {
          console.error(err);
        });
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
      if (formType === "update") {
        this.updateForm.content.push({
          paragraph: paragraph,
          image: image,
        });

        this.updateForm.contentInput = {
          paragraph: "",
          image: "",
        };
      }
    },

    addContentToStart(paragraph, image, formType) {
      if (formType === "create") {
        this.createForm.content.unshift({
          paragraph: paragraph,
          image: image,
        });

        this.createForm.contentInput = {
          paragraph: "",
          image: "",
        };
      }
      if (formType === "update") {
        this.updateForm.content.unshift({
          paragraph: paragraph,
          image: image,
        });

        this.updateForm.contentInput = {
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
      } else {
        this.updateForm.content = this.updateForm.content.filter(
          (e) => e != item
        );
      }
    },
  },

  created() {
    this.userInfor = this.$store.state.userInfor;
    this.isAdmin = this.$store.state.isAdmin;
    this.isLogged = this.$store.state.isLogged;
    this.loadItems();
  },
};
</script>

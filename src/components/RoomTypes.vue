<template>
  <v-container fluid>
    <div>
      <v-dialog v-model="createDialog" width="900">
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
            Create Room Type
          </v-card-title>

          <v-card-actions>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="createForm.name"
                  label="Name"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  v-model="createForm.price"
                  label="Price"
                  hint="VNĐ/hour"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  name="input-7-1"
                  label="Description"
                  v-model="createForm.description"
                  filled
                ></v-textarea>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  name="input-7-1"
                  label="Background Link"
                  v-model="createForm.background_link"
                  filled
                ></v-textarea>
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

      <v-data-table
        :headers="headers"
        :items="items"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        class="elevation-1"
        :loading="loading"
      >
        <template v-slot:[`item.name`]="{ item }">
          <strong>
            {{ item.name }}
          </strong>
        </template>

        <template v-slot:[`item.price`]="{ item }">
          <span>
            {{ formattedPrice(item.price) + " VNĐ/hour" }}
          </span>
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

    <v-dialog v-model="editDialog" width="900">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Update Room Type
        </v-card-title>

        <v-card-actions>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="updateForm.name"
                label="Name"
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                v-model="updateForm.price"
                label="Price"
                hint="VNĐ/hour"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-textarea
                name="input-7-1"
                label="Description"
                v-model="updateForm.description"
                filled
              ></v-textarea>
            </v-col>

            <v-col cols="12">
              <v-textarea
                name="input-7-1"
                label="Background Link"
                v-model="updateForm.background_link"
                filled
              ></v-textarea>
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
import numeral from "numeral";

export default {
  data() {
    return {
      editDialog: false,
      createDialog: false,
      loading: false,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      items: [],
      headers: [
        { text: "ID", value: "id" },
        { text: "Name", value: "name" },
        { text: "Price", value: "price" },
        { text: "Actions", value: "actions", sortable: false },
      ],

      updateForm: {
        id: null,
        name: "",
        price: 0,
        description: "",
        background_link: "",
      },

      createForm: {
        name: "",
        price: 0,
        description: "",
        background_link: "",
      },
    };
  },

  methods: {
    loadItems() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.$axios
          .get(`/room_types?page=${this.page}&limit=${this.itemsPerPage}`)
          .then((res) => {
            this.items = res.data.items;
            this.pageCount = res.data.page_count;
          })
          .catch((err) => {
            console.error(err);
          });
      }, 1000);
    },

    formattedPrice(price) {
      return numeral(price).format("0,0");
    },

    deleteItem(item) {
      this.$axios
        .delete(`/room_types/${item.id}`)
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
        name: item.name,
        price: item.price,
        description: item.description,
        background_link: item.background_link,
      };
    },

    updateItem() {
      this.$axios
        .put(`/room_types/${this.updateForm.id}`, {
          name: this.updateForm.name,
          price: parseInt(this.updateForm.price, 10),
          description: this.updateForm.description,
          background_link: this.updateForm.background_link,
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
        .post(`/room_types`, {
          name: this.createForm.name,
          price: parseInt(this.createForm.price, 10),
          description: this.createForm.description,
          background_link: this.createForm.background_link,
        })

        .then((res) => {
          this.createDialog = false;
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

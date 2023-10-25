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
            Create Staff
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
                  v-model="createForm.phone_number"
                  label="Phone number"
                ></v-text-field>
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
          Update Staff
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
                v-model="updateForm.phone_number"
                label="Phone number"
              ></v-text-field>
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
      search: "",
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
        { text: "Phone number", value: "phone_number" },
        { text: "Actions", value: "actions", sortable: false },
      ],

      updateForm: {
        id: null,
        name: "",
        phone_number: 0,
      },

      createForm: {
        name: "",
        phone_number: "",
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
          .get(`/staffs?page=${this.page}&limit=${this.itemsPerPage}&search=${this.search}`)
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
        .delete(`/staffs/${item.id}`)
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
        phone_number: item.phone_number,
      };
    },

    updateItem() {
      this.$axios
        .put(`/staffs/${this.updateForm.id}`, {
          name: this.updateForm.name,
          phone_number: this.updateForm.phone_number,
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
        .post(`/staffs`, {
          name: this.createForm.name,
          phone_number: this.createForm.phone_number,
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

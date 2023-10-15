<template>
  <v-container fluid>
    <div>
      <v-data-table
        :headers="headers"
        :items="items"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        class="elevation-1"
        :loading="loading"
      >
        <template v-slot:[`item.time`]="{ item }">
          <span>
            {{ item.time_start + " - " + item.time_end }}
          </span>
        </template>

        <template v-slot:[`item.room_type`]="{ item }">
          <span>
            {{ renderRoomType(item.room_type_id) }}
          </span>
        </template>

        <template v-slot:[`item.phone_number`]="{ item }">
          <strong>
            {{ item.phone_number }}
          </strong>
        </template>

        <template v-slot:[`item.status`]="{ item }">
          <v-chip
            :color="item.status === 'unconfirmed' ? 'red' : 'green'"
            text-color="white"
          >
            {{ item.status === "unconfirmed" ? "Unconfirmed" : "Confirmed" }}
          </v-chip>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon v-if="item.status === 'unconfirmed'" small color="green" class="mr-2" @click="updateItem(item)">
            mdi-check-circle
          </v-icon>

          <v-icon v-if="item.status === 'confirmed'" small color="red" class="mr-2" @click="updateItem(item)">
            mdi-close-box
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
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      roomTypesList: [],
      loading: false,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      items: [],
      headers: [
        { text: "ID", value: "id" },
        { text: "Name", value: "name" },
        { text: "Phone Number", value: "phone_number" },
        { text: "Time", value: "time" },
        { text: "Room ID", value: "room_id" },
        { text: "Combo", value: "combo" },
        { text: "Status", value: "status" },
        { text: "Room Type", value: "room_type" },

        { text: "Actions", value: "actions", sortable: false },
      ],

      updateForm: {
        id: null,
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
          .get(`/orders?page=${this.page}&limit=${this.itemsPerPage}`)
          .then((res) => {
            this.items = res.data.items;
            this.pageCount = res.data.page_count;
          });
      }, 1000);
    },

    deleteItem(item) {
      this.$axios.delete(`/orders/${item.id}`).then((res) => {
        this.loadItems();
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

    updateItem(item) {
      this.$axios
        .put(`/orders/${item.id}`, {
          name: item.name,
          phone_number: item.phone_number,
          time_start: item.time_start,
          time_end: item.time_end,
          room_id: item.room_id,
          combo: item.combo,
          room_type_id: item.room_type_id,
          status: item.status === "unconfirmed" ? "confirmed" : "unconfirmed"
        })

        .then((res) => {
          this.loadItems();
        });
    },

   

    async getRoomTypesList() {
      await this.$axios.get("/room_types/all").then((res) => {
        this.roomTypesList = res.data;
      });
    },

    renderRoomType(id) {
      const x = this.roomTypesList.find((i) => i.id === id);
      return x.name;
    },
  },

  async created() {
    await this.getRoomTypesList();
    this.loadItems();
  },
};
</script>

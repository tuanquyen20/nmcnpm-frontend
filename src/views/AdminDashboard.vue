<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item
          :class="{ 'selected-item': $route.name === `${name}` }"
          :to="{ name: `${name}` }"
          v-for="([icon, text, name], i) in items"
          :key="i"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#252525">
      <v-app-bar-nav-icon
        color="#fff"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="white--text mb-3">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="25"
      /></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn @click="logout" text class="white--text">Sign out</v-btn>
    </v-app-bar>

    <v-main class="remove-padding">
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      ["mdi-cart-minus", "Orders", "orders"],
      ["mdi-home-sound-in-outline", "Rooms", "rooms"],
      ["mdi-format-list-bulleted-type", "Room Types", "room-types"],
      ["mdi-account-multiple-outline", "Staffs", "staffs"],
      ["mdi-post", "Posts", "posts"]

    ],
  }),

  methods: {
    logout() {
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style scoped>
.selected-item {
  background-color: #252525;
  color: white;
  font-weight: bold;
}

.remove-padding {
  padding: 0 !important;
}
</style>

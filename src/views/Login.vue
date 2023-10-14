<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-container fluid class="remove-padding custom-background">
        <v-img src="@/assets/picture.jpg" class="fill-height blur"></v-img>

        <v-card :loading="loading" class="float" width="700">
          <v-card-title>Sign In</v-card-title>
          <v-card-actions>
            <v-row>
              <v-col cols="12" class="pl-6 pr-6"
                ><v-text-field
                  v-model="email"
                  label="Email"
                  :rules="emailRules"
                ></v-text-field
              ></v-col>
              <v-col cols="12" class="pl-6 pr-6"
                ><v-text-field
                  v-model="password"
                  type="password"
                  label="Password"
                ></v-text-field
              ></v-col>
              <v-col cols="3">
                <v-btn
                  @click="login"
                  depressed
                  color="#252525"
                  class="white--text ml-3"
                  >Sign In</v-btn
                >
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      emailRules: [(v) => /.+@.+\..+/.test(v) || "E-mail must be valid"],
      password: "",
      loading: false,
      dialog: true,
    };
  },
  methods: {
    login() {
      if (
        this.email === "admin@gmail.com" &&
        this.password === "tuanquyenvidai"
      ) {
        this.loading = true;
        setTimeout(() => {
          this.$router.push({ name: "admin-dashboard" });
        }, 3000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.remove-padding {
  padding: 0 !important;
}

.blur {
  opacity: 0.5;
}

.float {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

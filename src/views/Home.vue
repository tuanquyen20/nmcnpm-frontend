<template>
  <v-app id="inspire">
    <v-app-bar app color="#252525">
      <v-row>
        <v-col md="2">
          <v-img
            :src="require('../assets/logo.svg')"
            class="my-3"
            contain
            height="25"
          />
        </v-col>

        <v-col md="2" offset-md="8" class="mt-3">
          <div><span class="white--text">Sign in</span></div>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main class="grey lighten-3 remove-padding">
      <v-container fluid class="remove-padding">
        <v-row style="min-height: 100vh">
          <v-col cols="6" class="d-flex">
            <div class="align-self-center" style="margin-left: 130px">
              <div style="display: flex; font-size: 16px">
                <div class="mr-6">
                  <svg
                    width="22"
                    height="28"
                    viewBox="0 0 22 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <rect
                      width="22"
                      height="28"
                      fill="url(#pattern0)"
                      fill-opacity="0.5"
                    />
                    <defs>
                      <pattern
                        id="pattern0"
                        patternContentUnits="objectBoundingBox"
                        width="1"
                        height="1"
                      >
                        <use
                          xlink:href="#image0_2_14"
                          transform="matrix(0.0111111 0 0 0.00873016 0 0.107143)"
                        />
                      </pattern>
                      <image
                        id="image0_2_14"
                        width="90"
                        height="90"
                        xlink:href="data:image/png;base64,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"
                      />
                    </defs>
                  </svg>
                </div>

                <div class="ml-6" style="opacity: 50%">Da Nang, Viet Nam</div>
              </div>

              <div class="mt-6" style="font-size: 36px; font-weight: bold">
                Meliã Danang <br />
                Karaoke
              </div>

              <div class="mt-6" style="font-size: 16px; opacity: 50%">
                19 Truong Sa, Hoa Hai, Ngu Hanh Son, Da Nang
              </div>

              <div class="mt-6" style="font-size: 16px; opacity: 50%">
                (+84) 36 666 6250
              </div>

              <div class="mt-6">
                <v-btn
                  @click="openFacebookFanpage"
                  tile
                  color="#252525"
                  class="white--text rounded-lg"
                >
                  Facebook Fanpage
                </v-btn>
              </div>
            </div>
          </v-col>

          <v-col cols="6">
            <v-img src="@/assets/picture.jpg" class="fill-height"></v-img>
          </v-col>
        </v-row>
      </v-container>

      <v-container fluid class="white--text" style="background-color: #252525">
        <div class="mt-6 mb-6" style="font-size: 25px; margin-left: 125px">
          Find your perfect karaoke room
        </div>

        <div style="margin-left: 125px; margin-right: 125px" class="mb-6">
          <v-carousel :show-arrows="false">
            <v-carousel-item contain v-for="(item, i) in slideItems" :key="i">
              <v-row class="fill-height">
                <v-col cols="4">
                  <v-card
                    color="#D9D9D9"
                    style="height: 400px; overflow: scroll"
                  >
                    <v-card-title>{{ item.name }}</v-card-title>
                    <v-card-subtitle>{{ item.price }}</v-card-subtitle>
                    <v-card-text style="text-align: justify" class="mt-1 black--text">{{
                      item.description
                    }}</v-card-text>
                    <v-card-actions>
                      <v-btn
                        color="#252525"
                        class="white--text"
                        height="50px"
                        width="100%"
                      >
                        Book now
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
                <v-col cols="8">
                  <v-img class="rounded-lg" :src="item.src"></v-img>
                </v-col>
              </v-row>
            </v-carousel-item>
          </v-carousel>
        </div>
      </v-container>

      <v-container fluid class="remove-padding">
        <v-img src="@/assets/picture.jpg" class="fill-height"></v-img>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    slideItems: [
      {
        src: "https://royalmhotels.com/uploads/rooms_types/gallery/1170x780/Suite-Premium-2-min.jpg",
        name: "Meliã Guest Room",
        price: "500.000 VNĐ/h",
        description:
          "The Meliã Guest Room is a comfortable and inviting space designed for those looking to enjoy a delightful karaoke experience. This room is perfect for small gatherings of friends or family who want to sing their hearts out in a cozy setting. Featuring modern decor and cozy seating arrangements, the Meliã Guest Room ensures a relaxed and enjoyable atmosphere. Equipped with state-of-the-art karaoke equipment and a wide selection of songs, it's an ideal choice for those seeking a casual and fun karaoke session.",
      },
      {
        src: "https://royalmhotels.com/uploads/rooms_types/gallery/1170x780/Room-min.jpg",
        name: "Meliã Deluxo Room",
        price: "2.000.000 VNĐ/h",

        description:
          "The Meliã Deluxe Room offers a step up in luxury and entertainment for karaoke enthusiasts. This room is designed to provide an upscale karaoke experience with elegant furnishings, stylish décor, and spacious seating. You and your guests will be immersed in a lavish environment that exudes sophistication. The karaoke setup in the Meliã Deluxe Room is top-notch, featuring high-quality sound systems, large screen displays, and an extensive song library to cater to all musical preferences. Whether it's a celebration or a special occasion, this room adds a touch of class to your karaoke night.",
      },
      {
        src: "https://royalmhotels.com/abudhabi/uploads/rooms_types/gallery/1170x780/Room-Premium-min.jpg",
        name: "Meliã Premium Room",
        price: "20.000.000 VNĐ/h",

        description:
          "The Meliã Premium Room represents the pinnacle of karaoke luxury. This room is a haven for those seeking an opulent and unforgettable karaoke experience. Step into a world of extravagance with lavish furnishings, exquisite decorations, and an ambiance that screams luxury. The Meliã Premium Room offers a private and exclusive setting for your karaoke adventures. Equipped with state-of-the-art audio-visual equipment, including premium sound systems and high-definition screens, you can enjoy an immersive and unforgettable karaoke performance. Whether it's a special celebration or a gathering of VIP guests, the Meliã Premium Room ensures a night of pure indulgence and entertainment.",
      },
    ],
  }),

  methods: {
    openFacebookFanpage() {
      const urlToOpen =
        "https://www.facebook.com/profile.php?id=100012623027984";
      window.open(urlToOpen, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
.remove-padding {
  padding: 0 !important;
}
</style>

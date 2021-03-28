<template>
  <v-container fluid>
    <v-layout>
      <v-text-field
            label="일할 장소"
            prepend-icon="mdi-map-marker"
          ></v-text-field>

          <v-text-field
            label="할 일"
          ></v-text-field>
      <v-flex xs3>
        <v-btn color="success" @click="post">출근하기</v-btn>
      </v-flex>
    </v-layout>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      hide-default-footer
    >
      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">
                {{ item.title }}
              </v-card-title>

              <v-divider></v-divider>

              <v-list dense>

                <v-list-item>
                  <v-list-item-content>일한 장소 :</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ item.where }}
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>한 일 :</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ item.what }}
                  </v-list-item-content>
                </v-list-item>

              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>
<script>

export default {
  data: () => ({
    itemsPerPage: 30,
    items: [],
    title: '',
    content: ''
  }),
  mounted () {
  },
  methods: {
    post () {
      const today = new Date()
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
      const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      const dateTime = date + ' ' + time
      this.items.push({
        title: dateTime, where: this.title, what: this.content
      })
    },
    get () {

    },
    update () {

    },
    del () {

    }
  }
}
</script>

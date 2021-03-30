<template>
<v-app>
<v-card :style="backGroundColor">
  <v-container fluid>
    <v-layout margin>
      <v-spacer></v-spacer>
      <v-btn color="primary" width="50%" min-width="200" @click="infoPage">내 정보 입력하기(필수)</v-btn>
      <v-btn color="orange" width="20%" @click="admin">A</v-btn>
      <v-spacer></v-spacer>
    </v-layout>
    <v-layout>
      <v-spacer></v-spacer>
    <h1 v-if="InWork" style="color: black">-출근중-</h1>
    <v-spacer></v-spacer>
    </v-layout>
    <v-card>
    <v-layout>
      <v-text-field
          v-model="title"
          label="일할 장소"
          prepend-icon="mdi-map-marker"
        ></v-text-field>
    </v-layout>
    <v-layout>
        <v-text-field
        v-model="content"
          label="할 일"
          prepend-icon="mdi-note-multiple-outline"
        ></v-text-field>
    </v-layout>
    <v-layout>
      <v-select
          v-model="pay"
          :items= "['100000', '110000', '120000', '130000', '140000', '150000', '160000']"
          menu-props="auto"
          label="하루 일당"
          prepend-icon="mdi-cash"
        ></v-select>
        <v-text-field
        v-model="code"
          label="인증코드"
          prepend-icon="mdi-account-check"
        ></v-text-field>
    </v-layout>
    <v-layout>
      <v-spacer></v-spacer>
    <v-dialog
      v-model="dialog"
      width="70%">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="success"
          v-bind="attrs"
          v-on="on"
          width="45%" height="40"
          @click="nowTime"
        >
          출근하기
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          {{dateTime}}
        </v-card-title>

        <v-card-text
        v-if="VerifyCode == code">
          <h3>출근하시겠습니까?</h3>
          <a>'일할 장소'와 '할 일' 모두 작성하셨나요?</a>
        </v-card-text>
        <v-card-text
        v-if="VerifyCode != code">
          <h3>인증코드가 맞지 않습니다. 담당자에게 문의하세요</h3>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            v-if="VerifyCode == code"
            @click="startWork"
          >
            출근하기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-spacer></v-spacer>
    <v-dialog
      v-model="dialog2"
      width="70%"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red"
          dark
          v-bind="attrs"
          v-on="on"
          width="45%" height="40"
          @click="nowTime"
        >
          퇴근하기
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          {{dateTime}}
        </v-card-title>

        <v-card-text>
          <h3>퇴근하시겠습니까?</h3>
        </v-card-text>
        <v-text-field
        v-model="details"
          label="세부사항 (추가근무내역 등)"
        ></v-text-field>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="finishWork"
          >
            퇴근하기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-spacer></v-spacer>
    </v-layout>
    </v-card>
    <v-spacer></v-spacer>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      hide-default-footer
    >
      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items.slice().reverse()"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">
                {{ item['구분'] }}    [  {{ item["시간"] }} ]
              </v-card-title>

              <v-divider></v-divider>

              <v-list dense>

                <v-list-item  v-if="item['장소'] != null">
                  <v-list-item-content>장소 :</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ item["장소"] }}
                  </v-list-item-content>
                </v-list-item>

                <v-list-item v-if="item['내용'] != null">
                  <v-list-item-content>내용 :</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ item["내용"] }}
                  </v-list-item-content>
                </v-list-item>

                <v-list-item  v-if="item['세부사항'] != null && item['세부사항'] != ''">
                  <v-list-item-content>추가내용 :</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ item["세부사항"] }}
                  </v-list-item-content>
                </v-list-item>

              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</v-card>
</v-app>
</template>

<script>
export default {
  data: () => ({
    itemsPerPage: 30,
    items: [],
    title: '',
    content: '',
    where: '',
    what: '',
    name: '',
    phone: '',
    money: '',
    value: '',
    backGroundColor: {
      backgroundColor: 'white'
    },
    InWork: false,
    dialog: false,
    dialog2: false,
    dateTime: '',
    dateTime2: '',
    code: '',
    VerifyCode: 1234,
    details: '',
    pay: ''
  }),
  created () {
    this.get()
  },
  methods: {
    async startWork () {
      const m = new Date()
      const dateTime = m.getFullYear() + '-' +
      ('0' + (m.getMonth() + 1)).slice(-2) + '-' +
      ('0' + m.getDate()).slice(-2)
      const dateTime2 = ('0' + m.getHours()).slice(-2) + ':' +
      ('0' + m.getMinutes()).slice(-2) + ':' +
      ('0' + m.getSeconds()).slice(-2)
      await this.$firebase.database().ref('users/' + this.$store.state.user.uid + '/출근기록/' + dateTime + '/' + dateTime2).set({
        구분: '출근', 시간: dateTime + ' ' + dateTime2, 장소: this.title, 내용: this.content, 하루일당: this.pay
      })
      this.title = ''
      this.content = ''
      this.code = ''
      this.backGroundColor.backgroundColor = '#99ff1c'
      this.InWork = true
      this.dialog = false
      await this.get()
    },
    async finishWork () {
      const m = new Date()
      const dateTime = m.getFullYear() + '-' +
      ('0' + (m.getMonth() + 1)).slice(-2) + '-' +
      ('0' + m.getDate()).slice(-2)
      const dateTime2 = ('0' + m.getHours()).slice(-2) + ':' +
      ('0' + m.getMinutes()).slice(-2) + ':' +
      ('0' + m.getSeconds()).slice(-2)
      await this.$firebase.database().ref('users/' + this.$store.state.user.uid + '/출근기록/' + dateTime + '/' + dateTime2).set({
        구분: '퇴근', 시간: dateTime + ' ' + dateTime2, 세부사항: this.details
      })
      this.InWork = false
      this.backGroundColor.backgroundColor = 'white'
      this.dialog2 = false
      this.details = ''
      await this.get()
    },
    async get () {
      this.$firebase.database().ref('code').on('value', d => {
        this.VerifyCode = d.val()
      })
      await this.$firebase.database().ref('users/' + this.$store.state.user.uid + '/출근기록').on('value', d => {
        this.items = []
        let tmp = []
        tmp = Object.values(d.val())
        for (const key in tmp) {
          for (const key2 in Object.values(tmp[key])) {
            this.items.push(Object.values(tmp[key])[key2])
          }
        }
      })
    },
    infoPage () {
      this.$router.push('/userInfo')
    },
    admin () {
      this.$router.push('/admin')
    },
    nowTime () {
      const m = new Date()
      const dateTime = m.getFullYear() + '-' +
      ('0' + (m.getMonth() + 1)).slice(-2) + '-' +
      ('0' + m.getDate()).slice(-2) + ' ' +
      ('0' + m.getHours()).slice(-2) + ':' +
      ('0' + m.getMinutes()).slice(-2) + ':' +
      ('0' + m.getSeconds()).slice(-2)
      this.dateTime = dateTime
    }
  }
}
</script>

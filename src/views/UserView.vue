<template>
<div>
<section>
  <div class="userContainer" v-if="!profile">
    <div class="usercontent">
      <h2 class="title">Loading Profile, please wait
      </h2>
    </div>
  </div>
  <div class="userContainer" v-else>
    <div class="usericon" >
        <figure>
          <img :src="profile.avatar" alt="Identicon" style="border-radius: 50%;  width: 100px;">
        </figure>
    </div>
      <div class="usercontent">
        <h2 class="title"> {{profile.nickname}} {{$t('Collect')}} </h2>
        <p class="useraddress"> {{$t('key')}} {{address}}</p>
      </div>
    </div>
    </section>

  <section>
      <div class="columns is-multiline is-mobile section2div">
        <div class="title11">
          <h4>{{$t('His Cards')}}</h4>
        </div>
        <div v-if="loading">
          <pulse-loader></pulse-loader>
        </div>
        <div class="column is-4-desktop is-4-tablet is-12-mobile cardItem card-image"
        v-for="item in cardsInfo" :key="item.code"         
        @mouseover="lightShow(item.code)"
        @mouseout="lightunShow(item.code)"
        @click="gotoCoinProfile(item.tokenId)" style="margin-top: 18px;">
            <div class="smallcardcharas">
              <img class="charaimg" v-lazy="getCardBack()">
            </div>
            <div class="smallcardcharas">
              <img class="charaimg" v-lazy="getCardLightBack()" v-show="!lightisShow[item.code]">
            </div>
          <img class="cardItemImg imageborder8 image is-5by4" alt="" :src="item.front"/>
          <div :style="{ backgroundColor: item.color, height: '50px'}">
            <span>
            <a  class="name" :style="{ lineHeight: '50px', color: item.textcolor, paddingLeft: '20px' }">
              {{item.name}} · {{item.nickname}}</a>
          </span>
          </div>
          <!-- <CardItem :item='item' :hasMouseOver='true'></CardItem> -->
        </div>
      </div>
    </section>

</div>
</template>

<script>
import { mapState } from 'vuex';
import NasId from '@/contract/nasid';
import LinkIdol from '@/contract/cryptohero';
import CardItem from '@/components/CardItem';
import PulseLoader from 'vue-spinner/src/PulseLoader';

export default {
  name: 'MyCollectionPage',
  data: () => ({
    lightisShow: [],
    items: [],
    loading: true,
  }),
  asyncComputed: {
    async profile() {
      const nasId = new NasId();
      const result = await nasId.fetchAccountDetail(this.address);
      return result;
    },
  },
  components: {
    CardItem,
    PulseLoader,
  },
  // async mounted() {
  //   console.log("aaaaaa:"+this.cardsInfo)
  //   if (this.cardsInfo.length >= 6) {
  //     const formData = new FormData();
  //     formData.append('address', this.address);
  //     this.$http.post('http://35.200.102.240/addranknas.php', formData)
  //       .then((response) => {
  //         const res = response.body;
  //         console.log(res);
  //       });
  //   }
  // },
  asyncComputed: {
    async profile() {
      const nasId = new NasId();
      const result = await nasId.fetchAccountDetail(this.address);
      return result;
    },
    async cardsInfo() {
      const idol = new LinkIdol();
      const result = await idol.getUserCards(this.address);
      this.loading = false;
      return result;
    },
  },
  methods: {
    gotoCoinProfile(code) {
      this.$router.push({ path: `/item/${code}` });
    },
    getCardBack(){
      return `http://test.cdn.hackx.org/cardback/cardback_light.png`;
    },
    getCardLightBack(){
      return `http://test.cdn.hackx.org/cardback/cardback.png`;
    },
    lightShow: function(id) {
      // console.log(id+"qwwwww"+this.lightisShow[id])
      this.lightisShow[id] = true;
      this.$forceUpdate();
    },
    lightunShow: function(id) {
      // console.log(id+"qwwwww"+this.lightisShow[id])
      this.lightisShow[id] = false;
      this.$forceUpdate();
    }
  },
  async created() {
    for(var i=0;i<cardsInfo().length;i++){
      this.lightisShow[i] = false;
    }
    console.log('created');
  },
  computed: {
    ...mapState({
      me: state => state.me,
    }),
    address() {
      return this.$route.params.address || this.me;
    },
  },
  watch: {
    cardsInfo(cards) {
      // console.log(`newTypes:${cards}`);
      const cardtypes = cards.map((card) => {
        return card["code"];
      });
      // console.log("newTypes:"+cardtypes)
      const types = Array.from(new Set(cardtypes));
      // console.log("newTypes:"+types.length)
      if (types.length >= 108) {
        const formData = new FormData();
        formData.append('address', this.address);
        this.$http.post('http://35.200.102.240/addrankshuihunas.php', formData)
          .then((response) => {
            const res = response.body;
            console.log(res);
          });
      }
    },
  },
};
</script>

<style scoped>
/*
  section 1
*/
.userContainer {
  background-size: 100%;
  background-repeat: no-repeat;
  width: 100%;
  /*padding-top: 43.5%;*/
  padding-top: 28%;
  position: relative;
  text-align: center;
}
.usericon {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  /* padding-top: 60px; */
}
.iconimg{
  border-radius: 50%;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
.usercontent {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;

}
.usercontent h2{
  padding-top: 15%;
  color: blanchedalmond;
}
.useraddress {

   color: blanchedalmond;
}
.name {

   color: blanchedalmond;
}
.title11{
  width: 100%;
  margin-top: 103px;
  display: flex;
  justify-content: center;
  color: blanchedalmond;
  font-size: 24px;
}
/*
  section 2
*/
.section2div {
  padding-right: 50px;
  padding-left: 50px;
  padding-top: 30px;
  padding-bottom: 50px;
}
.cardItemImg{
  vertical-align:bottom;
  cursor: pointer;
  /* border: 8px solid #ecdaa8;
    border-radius: 8px; */
}
.priceSpan {
  float:right;
  padding-right: 20px;
}
.imageborder8{
  border-top: 36px solid #00000000;
  border-left: 36px solid #00000000;
  border-bottom: 34px solid #00000000;
  border-right: 22px solid #00000000;
}
.smallcardcharas {
  position: absolute;
}
.charaimg{
    width: 100%;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
@media (max-width: 800px) {
  .cardContainer {
    background-size: cover;
    padding-top: 60%;
  }
  .charaimg{
    width: 100%;
  }
  .btnContainer {
    padding-top: 50%;
  }

  .section2div {
    padding-top: 100px;
  }
  .cardItemImg{
    width: 100%;
  }
}
@media (max-width: 420px) {
  .usercontent{
    padding-top: 27%;
}
}
</style>


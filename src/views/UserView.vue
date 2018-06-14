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
          <img :src="getAvatar" alt="Identicon" style="border-radius: 50%;">
        </figure>
    </div>
      <div class="usercontent">
        <h2 class="title"> {{profile.nickname}} 的收藏 </h2>
        <p class="useraddress"> 钱包地址 {{address}}</p>
      </div>
    </div>
    </section>

  <section>
      <div class="columns is-multiline is-mobile section2div">
        <div class="column is-4-desktop is-4-tablet is-12-mobile cardItem"
        v-for="item in cardsInfo" :key="item"
        @click="gotoCoinProfile(item.code)">
          <img class="cardItemImg" alt="" :src="item.front"/>
          <div :style="{ backgroundColor: item.color, height: '50px' }">
            <span>
            <a :style="{ lineHeight: '50px', color: item.textcolor, paddingLeft: '20px' }">
              {{item.name}} · {{item.nickname}}</a>
          </span>
          </div>
          <CardItem :item='item' :hasMouseOver='true'></CardItem>
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
import getAvatarFromAddress from 'dravatar'

export default {
  name: 'MyCollectionPage',
  data: () => ({
    items: [],
  }),
  asyncComputed: {
    async getAvatar() {
      const uri = await getAvatarFromAddress(this.address);
      return uri;
    },
  },  
  components: {
    CardItem,
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
      return result;
    },
  },
  methods: {
    gotoCoinProfile(code) {
      this.$router.push({ path: `/coin/${code}` });
    },
  },
  async created() {
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
      // console.log("cards:"+cards.length)
      if (cards.length >= 6) {
        const formData = new FormData();
        formData.append('address', this.address);
        this.$http.post('http://35.200.102.240/addranknas.php', formData)
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
  padding-top: 60px;
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
  padding-top: 15%;
}
.usercontent h2{
  color: blanchedalmond;
}
.useraddress {

   color: blanchedalmond;
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
}
.priceSpan {
  float:right;
  padding-right: 20px;
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


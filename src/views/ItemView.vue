<template>
  <div>
    <div v-if="loading"
         class="loader-wrapper">
      <pulse-loader></pulse-loader>
    </div>
    <div v-if="item">
      <div class="back_img">
        <div class="title11">
          <div class="line1">{{$t('CardDetails')}}</div>
        </div>
      <div class="back_img2">
        <div class="back_color">
          <div class="title_1">
            <div class="title_2"><b>{{item.nickname}} · {{item.name}}</b></div>
          </div>
          <!-- <h2>{{item.nickname}} · {{item.name}}</h2> -->
          <div class="img card-image"
              @mouseover="lightShow(0)"
              @mouseout="lightunShow(0)">
            <div class="smallcardcharas">
              <img class="charaimg" v-lazy="getCardBack()">
            </div>
            <div class="smallcardcharas">
              <img class="charaimg" v-lazy="getCardLightBack()" v-show="!lightisShow[0]">
            </div>
            <img class="big_img imageborder8 image is-5by4" :src="item.front">
          </div>
          <div class="img card-image"
              @mouseover="lightShow(1)"
              @mouseout="lightunShow(1)">
            <div class="smallcardcharas">
              <img class="charaimg" v-lazy="getCardBack()">
            </div>
            <div class="smallcardcharas">
              <img class="charaimg" v-lazy="getCardLightBack()" v-show="!lightisShow[1]">
            </div>
            <img class="big_img imageborder8 image is-5by4" :src="item.back">
          </div>
          <div class="img">
            <ul style="float: left;margin-top: 32px;">
              <li>
                <div class="text"><p>{{$t('Nature1')}}</p></div>
              </li>
              <li>
                <div class="text"><p>{{$t('Nature2')}}</p></div>
              </li>
              <li>
                <div class="text"><p>{{$t('Nature3')}}</p></div>
              </li>
              <li>
                <div class="text"><p>{{$t('Nature4')}}</p></div>
              </li>
              <li>
                <div class="text"><p>{{$t('Nature5')}}</p></div>
              </li>
              <li>
                <div class="text"><p>{{$t('Nature6')}}</p></div>
              </li>
              <li>
                <div class="text"><p>{{$t('Nature7')}}</p></div>
              </li>
              <li>
                <div class="text">{{$t('NoId')}}</div>
              </li>

              <li>
                <div class="text">{{$t('Owner')}}</div>
              </li>
               <li>
                <div class="text">{{$t('isClaimed')}}</div>
              </li>
              <li>
                <div class="text"> {{$t('Value')}}</div>
              </li>
            </ul>
            <ul style="margin-top: 32px;">
              <li>
                <div class="text1">
                  <p v-bind:style="{ background: 'linear-gradient(to right, #e83016 , #f8a050) ', border: '2px', width: item.attack + 'px',  height: '10px',margin: '6px'}" ></p>
                  <p>{{item.attack}}</p>
                </div>
              </li>
              <li>
                <div class="text1">
                  <p v-bind:style="{ background: 'linear-gradient(to right, #62d1ae , #5db23b)', border: '2px', width: item.range + 'px',  height: '10px',margin: '6px'}" ></p>
                  <p>{{item.range}}</p>
                </div>
              </li>
              <li>
                <div class="text1">
                  <p v-bind:style="{ background: 'linear-gradient(to right, #96789a , #7a86ae)', border: '2px', width: item.defence + 'px',  height: '10px',margin: '6px'}" ></p>
                  <p>{{item.defence}}</p>
                </div>
              </li>

              <li>
                <div class="text1"><p class="text2">{{item.star}}</p></div>
              </li>

              <li>
                <div class="text1"><p class="text2">{{item.position}}</p></div>
              </li>
              <li>
                <div class="text1"><p class="text2">{{item.arms}}</p></div>
              </li>
              <li>
                <div class="text1"><p class="text2">{{item.skills}}</p></div>
              </li>
              <li>
                <div class="text1">{{itemId}}</div>
              </li>
              <li>
                <div class="text">
                  <router-link :to="{ name: 'User', params:{address: carOwner}}">
                    {{carOwner? carOwner.slice(-6).toUpperCase() : ""}}
                  </router-link>

                </div>
              </li>
               <li>
                <div class="text">
                    {{item.claimed?'Yes':'No'}}
                </div>
              </li>

              <li style="top: 20px">
                <div class="text"><input onkeyup="value=value.replace(/[^\d.]/g,'')" style="width: 50px" :disabled="!editFlag" v-model="heroPrice" >Nas
                  <div class="butt">
                    <el-popover
                  placement="top-start"
                  title="微信扫描分享"
                  width="180"
                  trigger="hover">
                      <img id="imgId" :src="uri"/>
                  <el-button slot="reference">微信分享</el-button>
                </el-popover></div></div>
              </li>
            </ul>
            <a>
            <div class="price" @click="buyHero()" v-show="!editFlag">
              <div class="price1">
                {{$t('Buy')}}
              </div>
            </div>
            </a>
            <a>
            <div class="price" @click="upatePrice()" v-show="editFlag">
              <div class="price1">
                {{$t('ModPrice')}}
              </div>
            </div>
            </a>
          </div>
        </div>
       </div>
      </div>
    </div>
    <div v-else>
      Token doesn't exist
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import NasId from '@/contract/nasid';
import Contract from '@/contract/cryptohero';
import { NasTool } from '@/api';
import { toReadablePrice } from '@/util';
import PulseLoader from 'vue-spinner/src/PulseLoader';
import ElPopover from "../../node_modules/element-ui/packages/popover/src/main.vue";

export default {
  name: 'item-view',

  data() {
    return {
      lightisShow: [false, false],
      owner: '',
      price: '',
      editFlag: false,
      loading: true,
      uri: '',
      tkId: '',
      heroNum: ''
    };
  },
  components: {
    ElPopover,
    PulseLoader,
  },
  async created() {
//    this.tkId = this.$route.params.id;
    const contract = new Contract();
    const result = await contract.getCardsByAddress(this.me);
    let num = 0;
    let tkLength = this.$route.params.id;

    if (typeof tkLength === "undefined") {
      var arr = window.location.href.split('/');
      if(arr.length > 5){
        tkLength = arr[5]
        this.tkId = arr[5]
      }
    }
    for(var i in result){
      if(result[i].tokenId <= tkLength ){
        num = num + 1;
      }
    }
    this.createMark(num);
  },
  asyncComputed: {
    async getCardNum() {
      const contract = new Contract();
      const result = await contract.getCardsByAddress(this.me);
      console.error(result)
      var num = 0;
      let tkLength = this.$route.params.tokenId;
      for(var em in result){
        if(em.tokenId <= tkLength ){
          num = num + 1;
        }
      }
      return num;
    },
    async getCardsLeft() {
      const contract = new Contract();
      const result = await contract.getDrawCardsLeft();
      return result;
    },
    /*     async getPrice() {
             const contract = new Contract();
             const result = await contract.getDrawPrice();
             return new BigNumber(result).div(1000000000000000000).toString();
           }, */
    async profile() {
      const nasId = new NasId();
      const result = await nasId.fetchAccountDetail(this.address);
      return result;
    },
    /*    async cardsInfo() {
        const idol = new Contract();
        const result = await idol.getUserCards(this.address);
        return result;
      }, */
    async isTokenClaimed() {
      const idol = new Contract();
      const heroId = this.$route.params.id;
      const result = await idol.isTokenClaimed(heroId);
      return !!result;
    },
    async carOwner() {
      const idol = new Contract();
      const heroId = this.$route.params.id;
      const result = await idol.ownerOf(heroId);
      if (this.address === result) {
        this.editFlag = true;
      } else {
        this.editFlag = false;
      }
      return result;
    },
    async heroPrice() {
      const idol = new Contract();
      const tokenId = this.$route.params.id;
      const result = await idol.priceOf(tokenId);
      return NasTool.fromWeiToNas(result).toString();
    },
    async item() {
      const contract = new Contract();
      const result = await contract.getCardInfoByTokenId(this.$route.params.id);
      console.error(result)
      this.loading = false;
      return result;
    },
  },

  computed: {
    ...mapState({
      me: state => state.me,
    }),
    address() {
      return this.$route.params.address || this.me;
    },
    ownerTag() {
      return this.item.owner ? this.item.owner.slice(-6).toUpperCase() : '';
    },
    itemId() {
      return this.$route.params.id;
    },
    me() {
      return this.$store.state.me || {};
    },
    ownerAddress() {
      return this.item.owner;
    },
    /* item() {
        // console.error("tiemtiemitem:LLL", this.$store.state.items[this.itemId])
//        return this.$store.state.items[this.itemId];
//        console.log(heroJsonFile[this.itemId])
        const contract = new Contract();
        console.log('carInfo')
        const result = await contract.getCarInfo(this.itemId);
        console.log(result)
        return result;
      }, */
    ad() {
      return this.$store.state.ads[this.itemId];
    },
    isConvert() {
      return this.$store.state.items[this.itemId].isLCYClaimed;
    },
    getCardImage() {
      return `http://test.cdn.hackx.org/heros_new/${this.itemId}.jpeg`;
    },
    getCardBackSideImage() {
      return `http://test.cdn.hackx.org/backs_new/${this.itemId}.jpeg`;
    },
    isOwner() {
      return this.item.owner === this.me.address;
    },
    notOwner() {
      return !this.isOwner;
    },
  },

  watch: {
    cardsInfo(cards) {
      // console.log(`newTypes:${cards}`);
      // console.log("cards:"+cards.length)
    /*    if (cards.length >= 6) {
          const formData = new FormData();
          formData.append('address', this.address);
          this.$http.post('http://35.200.102.240/addranknas.php', formData)
            .then((response) => {
              const res = response.body;
              console.log(res);
            });
        } */
    },
  },
 async mounted() {

  },
  methods: {
    createMark(num){
      var QRCode = require('qrcode')
      var thiz = this;
//      const links =window.location.host+'/#/Recommend/'+ this.$route.params.code + '/'+ num  ; //待完善
      const links ='https://nas.cryptohero.pro/#/Recommend/'+ this.$route.params.code + '/'+ num  ;
//      const links = `http://test.cdn.hackx.org/heros_new/${this.$route.params.code}.jpeg`
//      const  links = `https://nas.cryptohero.pro/#/Recommend/42/0`;

      QRCode.toDataURL(links, function (err, url) {
        thiz.uri = url;
        return url;
      })
    },
    async updatePrice() {
      const contract = new Contract();
      const result = await contract.setTokenPrice({ tokenId: this.itemId, value: this.heroPrice });
      return result;
    },
    async draw() {
      const contract = new Contract();
      const result = await contract.draw(this.carOwner, this.heroPrice);
      //        alert(result);
    },
    gotoCoinProfile(code) {
      this.$router.push({ path: `/coin/${code}` });
    },
    async buyHero() {
      const contract = new Contract();
      const result = await contract.buyToken(this.itemId, this.heroPrice);
      return result;
      // this.draw();
    },
    upatePrice() {
      this.updatePrice();
    },
    onBuy(rate) {
      if (this.$store.state.signInError) {
        return this.$router.push({ name: 'Login' });
      }
      const buyPrice = this.item.price.times(rate).toFixed(0);
      buyItem(this.itemId, buyPrice)
        .then(() => {
          alert(this.$t('BUY_SUCCESS_MSG'));
          setNextPrice(this.itemId, buyPrice);
        })
        .catch((e) => {
          alert(this.$t('BUY_FAIL_MSG'));
          console.log(e);
        });
    },
    toDisplayedPrice(priceInWei) {
      const readable = toReadablePrice(priceInWei);
      return `${readable.price} ${readable.unit}`;
    },
    lightShow(id) {
      // console.log(id+"qwwwww"+this.lightisShow[id])
      this.lightisShow[id] = true;
      this.$forceUpdate();
    },
    lightunShow(id) {
      // console.log(id+"qwwwww"+this.lightisShow[id])
      this.lightisShow[id] = false;
      this.$forceUpdate();
    },
    getCardBack() {
      return `http://test.cdn.hackx.org/cardback/cardback_light.png`;
    },
    getCardLightBack() {
      return `http://test.cdn.hackx.org/cardback/cardback.png`;
    },
    async onUpdateAd() {
      const ad = prompt(this.$t('UPDATE_SLOGAN_PROMPT'));
      if (ad !== null) {
        if (ad.length > 100) {
          return alert(this.$t('UPDATE_SLOGAN_FAIL_TOO_LOOG_MSG'));
        }
        setGg(this.itemId, ad)
          .then(() => {
            this.$store.dispatch('FETCH_AD', this.itemId);
          })
          .catch((e) => {
            alert(this.$t('UPDATE_SLOGAN_FAIL_MSG'));
            console.log(e);
          });
      }
      return 0;
    },
    async exchangeToken() {
      // need i18n
      exchangeLuckyToken(this.itemId)
        .then(() => alert('请求已发送 请等待交易结果'))
        .catch(() => {
          alert('交易发送失败');
        });
    },
  },
};

</script>
<style scoped>
  .back_img {
    background: url(/static/assets/card_profile_top.png) no-repeat top;
    background-size: 100%;
    padding: 3% 0% 4%;

  }
.back_img2 {
background: url(/static/assets/card_profile.png) repeat-y ;
  background-size: 100%;
  padding-left:4%;
  padding-right: 4%;
}
  .back_color {
    padding: 20px;
    display: flex;
    align-content: space-between;
    flex-wrap: wrap;
    background-color: blanchedalmond;
    justify-content: center;
  }

  .title11{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center
  }

  .line1 {
     width: 30%;
    height: 40px;
    float: left;
    color: #f8d195;
    font-size: 32px;
    text-align: center;
    line-height: 40px;
  }

  .title_1 {
    margin: 0px auto;
    width: 90%;
    height: 50px;
    border: 3px solid #a48554;
    border-radius: 40px;
    background-color: #e8cc97;
  }

  .title_2 {
    padding: 5px;
    text-align: center;
    font-size: 20px;
    color: #5c3000;
  }

  .img {
    width: 266px;
    height: 340px;
    margin: 2px;

  }

  .big_img {
    width: 100%;
    border-radius: 10px;
  }

  .item-slogan {
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-all;
  }

  .price {
    width: 100%;
    height: 73px;
    display: flex;
    justify-content: center;
  }

  .price1 {
    width: 201px;
    height: 75px;
    background: url(/static/assets/card_profile_price.png) no-repeat center;
    text-align: center;
    line-height: 76px;
    color: #ffffff;
  }

  .text {
    /* overflow-wrap: break-word; */
    display: flex;
    display: -webkit-flex;
     color: #553b11;
  }
  .text1 {
    /* overflow-wrap: break-word; */
    display: flex;
    display: -webkit-flex;
    color: #a10a0a;
    flex-wrap: nowrap;
  }
   .text2 {
    overflow: hidden;
 text-overflow: ellipsis;
 white-space: nowrap;
  }
  .imageborder8{
        padding: 41px;
  }
  .smallcardcharas {
    position: absolute;

  }
 .butt{
    background-color: #f7260b;
    padding: -2px;
    padding-left: 6px;
    padding-right: 6px;
    color: #fde481;
    border: 2px solid #e6c035;
    margin-left: 17px;
}
  .charaimg{
    width: 100%;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  @media screen and (max-width: 574px) {
    .line1 {
      font-size: 19px;
    line-height: 20px;
    }
  }
  @media screen and (max-width: 414px) {
    .title11{
    height: 23px;
  }
}
  @media screen and (max-width: 350px) {
    .line1 {
      font-size: 19px
    }
  }
</style>

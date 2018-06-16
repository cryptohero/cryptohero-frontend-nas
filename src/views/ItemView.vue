<template>
  <div>
    <div v-if="loading"
         class="loader-wrapper">
      <pulse-loader></pulse-loader>
    </div>
    <div v-if="item">
      <div class="back_img">
        <div class="title">
          <div class="line1">{{$t('CardDetails')}}</div>
        </div>
        <div class="back_color">
          <div class="title_1">
            <div class="title_2"><b>{{item.nickname}} · {{item.name}}</b></div>
          </div>
          <!-- <h2>{{item.nickname}} · {{item.name}}</h2> -->
          <div class="img">
            <img class="big_img" :src="item.front">
          </div>
          <div class="img">
            <img class="big_img" :src="item.back">
          </div>
          <div class="img">
            <ul>
              <li>
                <div class="text">{{$t('NoId')}}{{itemId}}</div>
              </li>
              <li>
                <div class="text">{{$t('Owner')}}：
                  <router-link :to="{ name: 'User', params:{address: carOwner}}">
                    {{carOwner}}
                  </router-link>
                </div>
              </li>

              <li>
                <div class="text"> {{$t('Value')}}<input style="width: 50px" :disabled="!editFlag" v-model="heroPrice" >Nas</div>
              </li>
            </ul>
            <div class="price" @click="buyHero()" v-show="!editFlag">
              <div class="price1">
                {{$t('Buy')}}
              </div>
            </div>
            <div class="price" @click="upatePrice()" v-show="editFlag">
              <div class="price1">
                {{$t('ModPrice')}}
              </div>
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
  export default {
    name: 'item-view',

    data() {
      return {
        owner: '',
        price: '',
        editFlag: false,
        loading: true,
      };
    },
    components: {
      PulseLoader
    },
    async created() {
      console.log(this.$route.params.id);
    },
    asyncComputed: {
      async getCardsLeft() {
        const contract = new Contract();
        const result = await contract.getDrawCardsLeft();
        return result;
      },
      /*     async getPrice() {
             const contract = new Contract();
             const result = await contract.getDrawPrice();
             return new BigNumber(result).div(1000000000000000000).toString();
           },*/
      async profile() {
        const nasId = new NasId();
        const result = await nasId.fetchAccountDetail(this.address);
        return result;
      },
  /*    async cardsInfo() {
        const idol = new Contract();
        const result = await idol.getUserCards(this.address);
        return result;
      },*/
      async carOwner() {
        const idol = new Contract();
        var heroId = this.$route.params.id;
        const result = await idol.ownerOf(heroId);
        if( this.address === result) {
          this.editFlag = true;
        }else {
          this.editFlag = false;
        }
        return result;
      },
      async heroPrice() {
        const idol = new Contract();
        var tokenId = this.$route.params.id;
        const result = await idol.priceOf(tokenId);
        return new NasTool.fromWeiToNas(result).toString();
      },
      async item() {
    const contract = new Contract();
    const result = await contract.getCardInfoByTokenId(this.$route.params.id);
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
        return this.item.owner ? this.item.owner.slice(-6).toUpperCase() : "";
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
      },*/
      ad() {
        return this.$store.state.ads[this.itemId];
      },
      isConvert() {
        return this.$store.state.items[this.itemId].isLCYClaimed;
      },
      getCardImage() {
        return `http://test.cdn.hackx.org/heros/${this.itemId}.jpg`;
      },
      getCardBackSideImage() {
        return `/static/assets/back/${this.itemId}.jpeg`;
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
        }*/
      },
    },
    mounted(){

    },
    methods: {
      async updatePrice() {
      const contract = new Contract();
      const result = await contract.setTokenPrice({ tokenId: this.itemId, value: this.heroPrice });
      return result;
    },
      async draw() {
        const contract = new Contract();
        const result = await contract.draw(undefined, this.heroPrice);
//        alert(result);
      },
      gotoCoinProfile(code) {
        this.$router.push({ path: `/coin/${code}` });
      },
      buyHero() {
        this.draw();
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
    background: url(/static/assets/card_profile_top.png) no-repeat top, url(/static/assets/card_profile_end.png) no-repeat bottom, url(/static/assets/card_profile.png) repeat-y;
    background-size: 100%;
    padding: 3% 4% 4%;
  }

  .back_color {
    padding: 20px;
    display: flex;
    align-content: space-between;
    flex-wrap: wrap;
    background-color: blanchedalmond;
    justify-content: center;
  }

  .title {
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
    font-size: 37px;
    text-align: center;
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
    width: 224px;
    height: 340px;
    margin: 20px
  }

  .big_img {
    width: 100%;
    border: 10px solid #ecdaa8;
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
    margin: 10px;
    overflow-wrap: break-word;
  }

  @media screen and (max-width: 574px) {
    .line1 {
      font-size: 27px
    }
  }

  @media screen and (max-width: 350px) {
    .line1 {
      font-size: 19px
    }
  }
</style>

<template>
  <div>
    <div v-if="item">
      <div class="back_img">
        <div class="title">
         <div class="line1">卡牌详情</div>
    </div>
       <div class="back_color">
         <div class="title_1">
                <div class="title_2"><b>{{item.nickname}} · {{item.name}}</b></div>
            </div>
         <!-- <h2>{{item.nickname}} · {{item.name}}</h2> -->
         <div class="img">
           <img class="big_img" :src="getCardImage">
         </div>
         <div class="img">
           <img class="big_img" :src="getCardBackSideImage">
         </div>
         <div class="img">
           <ul>
           <li><div class="text">编号：{{this.$route.params.id}}</div></li>
           <li>{{$t('Owner')}}：
              <router-link :to="{ name: 'User', params:{address: item.owner}}">
                {{item.owner.slice(-6).toUpperCase()}}
              </router-link>
           </li>
             
           <li><div class="text"> 价格：{{heroPrice}} Nas</div></li>
           </ul> 
         <div class="price" @click="buyFun()">
           <div class="price1">
          购买
           </div>
         </div>
         <div class="price" >
           <div class="price1">
             修改价格
           </div>
         </div>
          <div class="price" @click="buyFun()">
           <div class="price1">
          修改价格
           </div>
         </div>
         </div>
         <!-- <div class="column
           is-full-mobile"> -->
          <!-- <div class="content"> -->

            <!-- Experimental Start -->
            <!-- <div class="card">
                <div class="card-image">
                  <figure class="image is-1by1" style="margin: 0">
                    <img :src="getOwnerProfile" alt="Holder image">
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-4">{{$t('Owner')}} {{ownerTag}}</p>
                      <p class="subtitle is-6"> {{$t('Current Price')}}：{{toDisplayedPrice(item.price)}} </p>
                      <p class="subtitle is-6"> {{$t('isLuckyClaim')}}: {{ isConvert ? 'Yes' : 'No'}} </p>
                      <p class="subtitle is-6"> {{$t('Slogan')}}: {{ad}} </p>
                    </div>
                  </div>
                </div>
              </div> -->
            <!-- Experimental End -->

             <!-- <router-link :to="{ name: 'User', params:{address: item.owner}}">
            <figure class="image is-128x128">
              <img class="item-image"
              :src="getOwnerProfile">
            </figure>
            </router-link>
            <ul>
              <li>{{$t('Owner')}}：
                <router-link :to="{ name: 'User', params:{address: item.owner}}">
                  {{ownerTag}}
                </router-link>
              </li>
              <li>{{$t('Current Price')}}：{{toDisplayedPrice(item.price)}}</li>
              <li>{{$t('isLuckyClaim')}}：{{ isConvert ? 'Yes' : 'No'}}</li>
            </ul>
            <p class="item-slogan">{{$t('Slogan')}}: {{ad}}</p> -->
            <!-- <article v-if="notOwner"
                     class="message is-warning">
              <div class="message-body">
                {{$t('EDIT_SLOGAN_TIP')}}
              </div>
            </article> -->
          <!-- </div> -->

          <!-- <template v-if="notOwner">
            <div class="buttons">
              <button class="button is-danger is-outlined"
                      @click="onBuy(1)">{{ $t('BUY_BTN') }}</button>
              <button class="button is-danger is-outlined"
                      @click="onBuy(1.1)">{{ $t('PREMIUM_BUY_BTN', { rate: '10%' }) }}</button>
              <button class="button is-danger is-outlined"
                      @click="onBuy(1.2)">{{ $t('PREMIUM_BUY_BTN', { rate: '20%' }) }}</button>
              <button class="button is-danger is-outlined"
                      @click="onBuy(1.3)">{{ $t('PREMIUM_BUY_BTN', { rate: '30%' }) }}</button>
              <button class="button is-danger is-outlined"
                      @click="onBuy(1.4)">{{ $t('PREMIUM_BUY_BTN', { rate: '40%' }) }}</button>
              <button class="button is-danger is-outlined"
                      @click="onBuy(1.5)">{{ $t('PREMIUM_BUY_BTN', { rate: '50%' }) }}</button>
            </div>
            <article class="message is-danger">
              <div class="message-body">
                {{$t('BUY_PRICE_TIP')}}
              </div>
            </article>
          </template> -->

          <!-- <template v-if="isOwner">
            <div class="buttons">
            <button
                  class="button is-warning"
                  @click="onUpdateAd">{{$t('Edit Slogan')}}</button>
            <button
                  class="button is-info"
                  v-if="!isConvert"
                  @click="exchangeToken">{{$t('Claim Lucky Token')}}</button>

            </div>

          </template>
         </div> -->
       </div>
      </div>
    </div>
    <div v-else-if="item === null">
      Token doesn't exist
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import NasId from '@/contract/nasid';
  import LinkIdol from '@/contract/cryptohero';
  import { buyItem, exchangeLuckyToken, setGg, setNextPrice, NasTool } from '@/api';
  import { toReadablePrice } from '@/util';
  import BigNumber from 'bignumber.js';

  export default {
    name: 'item-view',

    data() {
      return {
        owner: '',
        price: '',
      };
    },
    components: {
    },
    async created() {
      console.log(this.$route.params.id);
    },
    asyncComputed: {
    /*  async getOwnerAvatar() {
        const uri = await Dravatar(this.ownerAddress);
        return uri;
      },*/
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
      async carOwner() {
        const idol = new LinkIdol();
        var heroId = this.$route.params.id;
        const result = await idol.ownerOf(heroId);
        return result;
      },
      async heroPrice() {
        const idol = new LinkIdol();
        var heroId = this.$route.params.id;
        const result = await idol.priceOf(heroId);
        return new NasTool.fromWeiToNas(result).toString();
      }
    },

    computed: {
      ...mapState({
        me: state => state.me,
      }),
      address() {
        return this.$route.params.address || this.me;
      },
      ownerTag() {
        return this.item.owner.slice(-6).toUpperCase();
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
      item() {
        return this.$store.state.items[this.itemId];
      },
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
    methods: {
      gotoCoinProfile(code) {
        this.$router.push({ path: `/coin/${code}` });
      },
      fromWeiToNas(value) {
        if (value instanceof BigNumber) {
          return value.dividedBy('1000000000000000000');
        } else {
          var nas = new BigNumber(value).dividedBy(1000000000000000000)
          return new BigNumber(value).dividedBy(1000000000000000000).toString();
        }
      },
      buyFun() {
        alert(this.address);
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
 .back_img{
    background: url(/static/assets/card_profile_top.png) no-repeat top ,
     url(/static/assets/card_profile_end.png) no-repeat bottom,
     url(/static/assets/card_profile.png) repeat-y ;
    background-size: 100%;
    padding:3% 4% 4%;
}
 .back_color{
  padding: 20px;
  display: flex;
  align-content: space-between;
  flex-wrap: wrap;
  background-color: blanchedalmond;
  justify-content: center;
 }
 .title{
     width: 100%;
     height: 50px;
     display: flex;
    justify-content: center
}

.line1{
     width: 30%;
     height: 40px;
     float: left;
     color:#f8d195;
     font-size: 37px;
     text-align: center;
}
 .title_1{
    margin: 0px auto;
    width: 90%;
    height: 50px;
    border: 3px solid #a48554;
    border-radius: 40px;
    background-color: #e8cc97;
}
.title_2{
    padding: 5px;
    text-align: center;
    font-size: 20px;
    color: #5c3000;
}
 .img{
   width: 224px;
   height: 340px;
   margin: 20px
 }
 .big_img{
   width: 100%;

   border: 10px solid #ecdaa8;
   border-radius: 10px;
 }
.item-slogan {
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;
}
.price{
  width: 100%;
  height: 73px;
  display: flex;
  justify-content: center;
}
.price1{
  width: 201px;
  height: 75px;
  background: url(/static/assets/card_profile_price.png) no-repeat center;
  text-align: center;
  line-height: 76px;
  color: #ffffff;
}
.text{
  margin: 10px;
 overflow-wrap: break-word; 
}
 @media screen and (max-width: 574px) {
  .line1{
     font-size: 27px
   }
 }
 @media screen and (max-width: 350px) {
  .line1{
     font-size: 19px
   }
 }
</style>

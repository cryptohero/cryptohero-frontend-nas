<template>
  <div class="">
    <div v-if="loading"
         class="loader-wrapper">
      <pulse-loader></pulse-loader>
    </div>
    <div class="logo_btn">
  	 <section>
		  <div class="cardContainer">
              <div class="price">
          <div class="price1" id="animated-number-demo">
            <b></b>
          </div>
          <div class="price1">
            <b></b>
          </div>
          <div class="price1">
            <b></b>
          </div>
        </div>
		 	<div class="btnContainer">
          <div class="txt">
        <span>{{$t('Recomment')}}</span>
        </div>
      </div>
		  </div>
     </section>
    </div>
    <!-- <ItemList :itemIds='itemIds' /> -->
     <div class="columns is-multiline is-gapless is-mobile">
    <router-link v-for="item in itemIds"
                 v-if="item"
                 :to="{ name: 'Item', params:{id: item.tokenId,code: item.code}}"
                 :key=item.tokenId.toString()
                 class="column
           is-full-mobile
           is-one-quarter-tablet
           is-one-quarter-desktop
           is-one-quarter-widescreen
           is-one-quarter-fullhd"
           >
      <template v-if="0 <= item.code && item.code <= 114">
        <!-- <div class="card"> -->
          <div class="card-image"
              @mouseover="lightShow(item.code)"
              @mouseout="lightunShow(item.code)"
              >
            <div class="smallcardcharas">
              <img class="charaimg" v-lazy="getCardBack()">
            </div>
            <div class="smallcardcharas">
              <img class="charaimg" v-lazy="getCardLightBack()" v-show="!lightisShow[item.code]">
            </div>
            <div class="imageborder8">
            <figure class="image is-5by4">
              <img v-lazy="getCardImage(item.code)">
            </figure>
            </div>


          </div>
          <div class="card-content">
            <div class="content is-small">
              <h4 :style="{paddingLeft: '10px', paddingRight: '15px'}">{{item.nickname}} · {{item.name}}
                <div>拥有者：333</div>
                <div>序号：333</div>
                <div>价钱：333</div>
                <div class="btnn">购买</div>
              </h4>
              <!-- <ul>
                <li>{{$t('Owner')}}：
                  <router-link v-if="item.owner"
                               :to="{ name: 'User', params:{address: item.owner}}">
                    {{item.owner.slice(-6).toUpperCase()}}
                  </router-link>
                </li>
                <li>{{$t('Current Price')}}: {{toDisplayedPrice(item.price)}}</li>
              </ul>
              <p class="item-slogan">{{$t('Slogan')}}: {{toDisplayedAd(item.id)}}</p>-->
            </div>
          </div>
        <!-- </div> -->
      </template>
    </router-link>
  </div>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader';
import ItemList from '@/components/ItemList';
import { toReadablePrice } from '@/util';
import Contract from '@/contract/cryptohero';

export default {
  name: 'Exchange',
  components: {
    PulseLoader,
    ItemList,
  },

  data() {
    return {
      lightisShow: [],
      loading: true,
      itemIds: [],
      total: null,
    };
  },

  computed: {},
  asyncComputed: {
    // async getBalance() {
    //   const idol = new Contract();
    //   const result = await idol.getBalance();
    //   return JSON.parse(result)||0;
    // },
    // async getTotalEarnByShareAllUser() {
    //   const idol = new Contract();
    //   const result = await idol.getTotalEarnByShareAllUser();
    //   return JSON.parse(result)||0;
    // },
    // async getTotalEarnByReferenceAllUser() {
    //   const idol = new Contract();
    //   const result = await idol.getTotalEarnByReferenceAllUser();
    //   return JSON.parse(result)||0;
    // }

  },
  async created() {
//    this.total = await getTotal();这里去监听了eth合约
//    const itemIds = await getItemIds(0, this.total);
//    const itemIds = await getItemIds(0, 0);
    const contrat = new Contract();
    const  total = await contrat.getTotalSupply();
    if(total === 0 ){
      this.loading = false;
      return ;
    }
    let ids = [];
    let start = total - 12;
    for (let i = total; i >= start ; --i) {
      ids.push(i);
    }
    //通过tokenId图片相关信息
//    const result = await contrat.getCarInfoByTokenId(itemIds);
    const result = await contrat.getCarInfoByTokenId(ids);
    this.itemIds = result;
    this.loading = false;
  },

  methods: {
    toDisplayedPrice(priceInWei) {
      const readable = toReadablePrice(priceInWei);
      return `${readable.price} ${readable.unit}`;
    },
    drawClicked() {
      var href="/#/draw";
      window.location.href = href;
    },
        toDisplayedPrice(priceInWei) {
      const readable = toReadablePrice(priceInWei);
      return `${readable.price} ${readable.unit}`;
    },
    toDisplayedAd(id) {
      const ad = this.$store.state.ads[id];
      if (ad && ad.length >= 45) {
        return `${ad.slice(0, 44)} ...`;
      }
      return ad;
    },
    getCardImage(id) {
      return `http://test.cdn.hackx.org/heros_new/${id}.jpeg`;
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
  watch: { watch: {
    itemIds(newItemIds) {
      newItemIds.forEach((itemId) => {
        // this.$store.dispatch('FETCH_ITEM', itemId);
        // this.$store.dispatch('FETCH_AD', itemId);
      });
    },
  },},
};
</script>
<style scoped>
 .image {
    background : "";
     padding: 16%
    /* border: 8px solid #ecdaa8;
    border-radius: 8px; */
}
.opacitycolumn{
  fill-opacity: 0;
}
.card{
  font-size: 1.2em;
  background-color: initial;
}
.cardcount {
	color: #5495c6;
	font-size: 20px;
}
.item-slogan {
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;
}
.smallcardcharas {
  position: absolute;
}
.btnn{
padding: 3px;
float: right;
background-color: red;
flex-wrap: wrap;

}
.cardContainer {
	background-size: 100%;
	background-repeat: no-repeat;
	width: 100%;
	/*padding-top: 43.5%;*/
	padding-top: 20%;
	position: relative;
	text-align: center;
}
.cardcharas {
  position: absolute;
  top: 0;
  left: 0;
	width: 100%;
}
.content h4 {
  color: #ffc627;
  font-size: 13px;
}
.imageborder8
.charaimg{
  width: 80%;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
.btnContainer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  /*background-color: #ccc;*/
}
.cardbtn {
    display: block;
    margin-left: auto;
    margin-right: auto;
        display: block;
    margin-bottom: 30px;
}

.txt{
  border:  5px solid darkgoldenrod;
  padding: 10px;
  background-color: blanchedalmond;
  margin-top: 70px;
}
.loader-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.price{
  width: 100%;
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.price1{
  border-radius: 8px;
  width: 200px;
  height: 50px;
  background-color: rgba(249, 137, 137, 0.55);
  margin: 20px;
  text-align: center;
  border: 1px solid #ffd67a;
}
.price1 b{
  color: #f7ad89;
  line-height: 50px;
  font-size: 18px;
}

@media screen and (max-width: 500px){
  .cardcharas{
    display: none;
  }
  .btnContainer {
	padding-top: 17%;
  }
  .price1 b{
  line-height: normal;
}
.price1{
   height: 80px;
   padding: 10px;
}
.columns.is-gapless:last-child {

   margin-top: 585px;
}

}

</style>
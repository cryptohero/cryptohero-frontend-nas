<template>
  <div class="">
    <!-- <div v-if="loading"
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
    </div> -->
       <div class="button-search">
     <div class="btn-item Btn_Item"  v-show="actionFlag"><el-button type="primary" plain @click.native="ObjecSort('code')">{{$t('Sort1')}}</el-button></div>
     <div class="btn-item Btn_Item"  v-show="actionFlag"><el-button type="success" plain @click.native="ObjecSort('tokenId')">{{$t('Sort2')}}</el-button></div>
     <div class="btn-item Btn_Item"  v-show="actionFlag"><el-button type="warning" plain @click.native="ObjecSort('price')">{{$t('Sort3')}}</el-button> </div>
     <div class="btn-item " style="display: flex; margin-left: 10px;">
       <el-input :placeholder="$t('Reminder')" prefix-icon="el-icon-search" v-model="heroName" @keyup.enter.native="search()"></el-input>
    <!--<el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>-->
     </div>

  </div>
    <div class="columns is-multiline is-gapless is-mobile">
    <router-link v-for="item in showitemIds"
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
                <div>序号：{{item.tokenId}}</div>
                <div>价钱：{{item.value}}</div>
                <div class="btnn">购买</div>
              </h4>
            </div>
          </div>
      </template>
    </router-link>
  </div>
    <paginate
    :page-count="pagecount"
    :page-range="3"
    :margin-pages="2"
    :click-handler="clickCallback"
    :prev-text="'Prev'"
    :next-text="'Next'"
    :container-class="'pagination'"
    :page-class="'pageitem'"
    :page-link-class="'pageitema'"
    :next-link-class="'pageitema'"
    :prev-link-class="'pageitema'">
  </paginate>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader';
import ItemList from '@/components/ItemList';
import { toReadablePrice } from '@/util';
import Contract from '@/contract/cryptohero';
import superagent from 'superagent';
import Paginate from 'vuejs-paginate';
import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
import ElInput from "../../node_modules/element-ui/packages/input/src/input.vue";
import '../../node_modules/element-ui/lib/theme-chalk/index.css';
import { Message } from 'element-ui';

export default {
  name: 'Exchange',
  components: {
    PulseLoader,
    ItemList,
    Paginate,
    
  },

  data() {
    return {
      lightisShow: [],
      loading: true,
      itemIds: [],
      total: null,
      pagecount: 0,
      showitemIds: [],
      actionFlag: true,
    };
  },

 components: {
    Message,
    ElInput,
    ElButton,
    PulseLoader,
    Paginate,
  },
  asyncComputed: {

  },
  async created() {
    const contract = new Contract();
    var ids = [];

    superagent.get("https://togetthere.cn/nasapi/hero").end(async (err, res) => {
      var heros = JSON.parse(res.text);
      console.log(heros);
      var herodata = heros.data;
      // var i2 = 0; //control
      
      for (let i = 0; i < herodata.length ; i++) {
        ids.push(parseInt(herodata[i].tokenId));
        // i2 += 1; //control
        // if(i2 > 12) break; //control
      }

      const result = [];
      for (var i = 0; i < ids.length ; i++) {
        result.push({});
        result[i] = {};
        // result[i].code = herodata[i].heroId;
        // result[i].tokenId = herodata[i].tokenId;
        result[i] = contract.getCardInfoByHeroId(herodata[i].heroId, herodata[i].tokenId, herodata[i].price);
        result[i].value = herodata[i].price;
      }

      this.itemIds = result;
      this.loading = false;

      this.pagecount = Math.ceil(this.itemIds.length/8);
      this.showitemIds = this.itemIds.slice(0,8);
    });
    
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
      this.lightisShow[id] = true;
      this.$forceUpdate();
    },
    lightunShow: function(id) {
      this.lightisShow[id] = false;
      this.$forceUpdate();
    },
    clickCallback: function(pageNum) {
      this.showitemIds = this.itemIds.slice((pageNum-1)*8,pageNum*8);
    },
    queryResult(name) {
      // var res = [];
      // for(let i = 0; i < this.itemIds.length ; i++) {
      //   if(this.heroName === this.allCardsInfo[i].name) {
      //     res.push(this.allCardsInfo[i]);
      //   }
      // }
      // this.allCardsInfo = res.sort(this.compare(name));
      // this.cardlist = this.allCardsInfo.slice(0,8);
      // this.pagecount = Math.ceil(this.allCardsInfo.length/8);
    },
    ObjecSort(name) {
      // if(!this.heroName) {
      //   this.allCardsInfo = this.saveData;
      // }
      // this.allCardsInfo.sort(this.compare(name));
      // this.cardlist = this.allCardsInfo.slice(0,8);
      // this.pagecount = Math.ceil(this.allCardsInfo.length/8);
    },
  },
};
</script>
<style scoped>
.button-search{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.Btn_Item{
  float: left;
  margin-left: 10px;
}
.pagination {
  width: 50vw;
  background-color: #fdefac;
  margin-left: auto;
  margin-right: auto;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 20px;
  padding-left: 20px;
  border-radius: 30px;
  border: 3px #9a7039 solid;
}
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

<style type="text/css">
@media (max-width: 800px) {
  .pageitem {
    padding-right: 10px;
    padding-left: 10px;
  }
  .pagination {
    width: 90vw;
  }
}
.pageitema {
  color: #9a7039;
}
</style>
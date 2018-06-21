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
      <a href="http://nasid.pro">
        <figure>
          <img :src="profile.avatar" alt="Identicon" style="border-radius: 50%;  width: 100px;">
        </figure>
      </a>
    </div>
      <div class="usercontent">
        <h2 class="title"> {{profile.nickname}} {{$t('Collect')}} </h2>
        <p class="useraddress">{{$t('Content4')}}{{total}} / 108 {{$t('CardUnit')}} <el-button id="btn" type="success" round @click.native="claim()">{{$t('Finished')}}</el-button> </p>
        <p class="useraddress"> {{$t('key')}} {{address}}</p>
      </div>
    </div>
    </section>
  <section>
      <div class="navbar-item">
        <div class="field is-grouped">
          <div class="control">
            <div  style="display: flex;display: -webkit-flex">
            <div class="select" style="margin: 5px" v-show="actionFlag">
              <select v-model="typeFlag" @change="fun(this)">
                <option value="" style="display: none;" disabled selected>卡牌排序选择</option>
                <option value="code">{{$t('Sort1')}}</option>
                <option value="tokenId">{{$t('Sort2')}}</option>
                <option value="price">{{$t('Sort3')}}</option>
              </select>
            </div>
            <el-button  style="margin: 5px" type="error" plain @click.native="NotClection()">{{$t('UnCollected')}}</el-button>
            <el-button  style="margin: 5px" type="info" plain @click.native="HadClection()">{{$t('Collected')}}</el-button>
            </div>
            <div class="btn-item" style="display: flex">
            <el-input placeholder="请输入卡牌名称" prefix-icon="el-icon-search" v-model="heroName" @keyup.enter.native="search()"></el-input>
            </div>
          </div>
        </div>
        <!--<div class="btn-item" style="display: flex">-->
       <!--<el-input placeholder="请输入卡牌名称" prefix-icon="el-icon-search" v-model="heroName" @keyup.enter.native="search()"></el-input>-->
    <!--<el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>-->
     <!--</div>-->
      </div>
   <div class="button-search">
     <div class="btn-item"  v-show="actionFlag"><el-button type="primary" plain @click.native="ObjecSort('code')">{{$t('Sort1')}}</el-button></div>
     <div class="btn-item"  v-show="actionFlag"><el-button type="success" plain @click.native="ObjecSort('tokenId')">{{$t('Sort2')}}</el-button></div>
     <div class="btn-item"  v-show="actionFlag"><el-button type="warning" plain @click.native="ObjecSort('price')">{{$t('Sort3')}}</el-button> </div>
     <div class="btn-item" style="display: flex">
       <el-input :placeholder="$t('Reminder')" prefix-icon="el-icon-search" v-model="heroName" @keyup.enter.native="search()"></el-input>
    <!--<el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>-->
     </div>
     <div class="btn-item"><el-button type="error" plain @click.native="NotClection()">{{$t('UnCollected')}}</el-button></div>
     <div class="btn-item"><el-button type="info" plain @click.native="HadClection()">{{$t('Collected')}}</el-button></div>
     
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

        <div class="column is-3-desktop is-4-tablet is-12-mobile cardItem card-image"
        v-for="item in cardlist"  :key="item.id"
        @mouseover="lightShow(item.code)"
        @mouseout="lightunShow(item.code)"
        @click="gotoCoinProfile(item)" style="margin-top: 18px;">
            <div class="smallcardcharas">
              <img class="charaimg" v-lazy="getCardBack()">
            </div>
            <div class="smallcardcharas">
              <img class="charaimg" v-lazy="getCardLightBack()" v-show="!lightisShow[item.code]">
            </div>
          <img class="cardItemImg imageborder8 image is-5by4" alt="" :src="item.front"/>
          <div class="imageborder3">
            <span>
            <a  class="name" :style="{ lineHeight: '10px', color: item.textcolor, paddingLeft: '30px' }">
              {{item.nickname}} · {{item.name}}</a>
          </span>
          </div>
          <!-- <CardItem :item='item' :hasMouseOver='true'></CardItem> -->
        </div>
      </div>
    </section>

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
import { mapState } from 'vuex';
import NasId from '@/contract/nasid';
import LinkIdol from '@/contract/cryptohero';
import CardItem from '@/components/CardItem';
import PulseLoader from 'vue-spinner/src/PulseLoader';
import Paginate from 'vuejs-paginate';
import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
import ElInput from "../../node_modules/element-ui/packages/input/src/input.vue";
import '../../node_modules/element-ui/lib/theme-chalk/index.css';
import { Message } from 'element-ui';
export default {
  name: 'MyCollectionPage',
  data: () => ({
    lightisShow: [],
    items: [],
    loading: true,
    allCardsInfo: [],
    cardlist: [],
    pagecount: 0,
    heroName: '',
    saveData: [],
    total: '',
    typeFlag: '',
    uniqueNum: [],
    notNum: [],
    unCollectData: [],
    actionFlag: true,
  }),
  asyncComputed: {
    async profile() {
      const nasId = new NasId();
      const result = await nasId.fetchAccountDetail(this.address);
      return result;
    },
  },
  components: {
    Message,
    ElInput,
    ElButton,
    CardItem,
    PulseLoader,
    Paginate,
  },
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
      this.allCardsInfo = result.sort(this.compare('code'));
      this.saveData = this.allCardsInfo;
      this.cardlist = result.slice(0,8);
      this.pagecount = Math.ceil(result.length/8);
      var rsp = []
      for(let i = 0; i < this.allCardsInfo.length ; i++){
         rsp.push(this.allCardsInfo[i].code);
      }
      this.uniqueNum = this.unique(rsp);
     this.total =  this.uniqueNum.length;
      return result;
    },
    async NotClectionCards() {
      const arr = []
      const clNum = this.uniqueNum;
      for(let i = 0; i < 115; i++) {
        if(clNum.indexOf(i) === -1) {
          arr.push(i);
        }
      }
      this.notNum = arr;
      const contract = new LinkIdol();
      const result = await contract.getNotCollectCards(arr);
      this.unCollectData = result;
//       contract.cheat();
      return result;
    },
  },
  methods: {
    NotClection() {
      this.allCardsInfo = this.unCollectData.sort(this.compare('code'));
      this.cardlist = this.allCardsInfo.slice(0,8);
      this.pagecount = Math.ceil(this.allCardsInfo.length/8);
      this.actionFlag = false;
    },
    HadClection(){
      this.allCardsInfo = this.saveData.sort(this.compare('code'));
      this.cardlist = this.allCardsInfo.slice(0,8);
      this.pagecount = Math.ceil(this.allCardsInfo.length/8);
      this.actionFlag = true;
    },
    minusFun(arr1, arr2) {
      return arr1.uniquelize().each(function (o) {
        return arr2.contains(0) ? null : o;
      });
    },
    async claim() {
      if (this.total < 108) {
        alert("尚未集满108种卡牌，无法进行兑换。");
        return
      }
      const contract = new LinkIdol();
      const result = await contract.claim();
      console.error("claimres:"+result);
      if (result != "cancel") {
        this.rankAfterClaim(result);
      }
    },
    fun() {
      this.ObjecSort(this.typeFlag);
    },
    unique(arr) {
  let result = [], hash = {};
  for (let i = 0, elem; (elem = arr[i]) != null; i++) {
    if (!hash[elem]) {
      result.push(elem);
      hash[elem] = true;
    }
  }
  return result;
},
    queryAll() {
      this.allCardsInfo = this.saveData;
      this.cardlist = this.saveData.slice(0, 8);
      this.pagecount = Math.ceil(this.saveData.length / 8);
    },
    queryResult(name) {
      var res = [];
      for(let i = 0; i < this.allCardsInfo.length ; i++) {
        if(this.heroName === this.allCardsInfo[i].name) {
          res.push(this.allCardsInfo[i]);
        }
      }
      this.allCardsInfo = res.sort(this.compare(name));
      this.cardlist = this.allCardsInfo.slice(0,8);
      this.pagecount = Math.ceil(this.allCardsInfo.length/8);
    },
    ObjecSort(name) {
      if(!this.heroName) {
        this.allCardsInfo = this.saveData;
      }
      this.allCardsInfo.sort(this.compare(name));
      this.cardlist = this.allCardsInfo.slice(0,8);
      this.pagecount = Math.ceil(this.allCardsInfo.length/8);
    },
    compare(prop) {
      return function (obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
          val1 = Number(val1);
          val2 = Number(val2);
        }
        if (val1 < val2) {
          return -1;
        } else if (val1 > val2) {
          return 1;
        } else {
          return 0;
        }
      }
    },
    search() {
      if(!this.heroName) {
        this.queryAll();
      } else {
        this.queryResult('code');
      }
    },
    gotoCoinProfile(em) {
      console.error(em);

      if(this.actionFlag){
        this.$router.push({ path: `/item/${em.tokenId}/${em.code}`});
      } else {
        Message.warning({
          message: '请到首页购买，或抽牌，谢谢!',
          type: 'warning'
        });
      }
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
    },
    clickCallback: function(pageNum) {
      this.cardlist = this.allCardsInfo.slice((pageNum-1)*8,pageNum*8);
    },
    rankAfterClaim(snres) {
      // 0 failed, 1 success, 2 pending
      const contract = new LinkIdol();
      setTimeout(async () => {
        const result1 = await contract.checkSerialNumber(snres);
        console.error("claimres:"+result1)
        if (JSON.parse(result1)["data"]["status"] == 1) {
          console.error("claimres:"+JSON.parse(result1)["data"]["status"])
          const formData = new FormData();
          formData.append('address', this.address);
          this.$http.post(this.$store.getters.getServerURL+'addrankshuihunas.php', formData)
            .then((response) => {
              const res = response.body;
              console.log(res);
            });
        }
      }, 30000);
    }
  },
  created() {
   /* for(var i=0;i<cardsInfo().length;i++){
      this.lightisShow[i] = false;
    }*/
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
  // watch: {
  //   cardsInfo(cards) {
  //     // console.log(`newTypes:${cards}`);
  //     const cardtypes = cards.map((card) => {
  //       return card["code"];
  //     });
  //     // console.log("newTypes:"+cardtypes)
  //     const types = Array.from(new Set(cardtypes));
  //     // console.log("newTypes:"+types.length)
  //     if (types.length >= 108) {
  //       const formData = new FormData();
  //       formData.append('address', this.address);
  //       this.$http.post(this.$store.getters.getServerURL+'addrankshuihunas.php', formData)
  //         .then((response) => {
  //           const res = response.body;
  //           console.log(res);
  //         });
  //     }
  //   },
  // },
};
</script>

<style type="text/css">
@media (max-width: 800px) {
  .pageitem {
    padding-right: 10px;
    padding-left: 10px;
  }
}
.pageitema {
  color: #9a7039;
}
</style>

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

.button-search{
  display: flex;
  display: -webkit-flex;
}
.btn-item{
  margin: 10px;
}
.button-search{
    width: 100%;
    height: 77px;
    margin-top: 30px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
.navbar-item{
  display: none;
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
    padding-top: 22px;
  }
  .cardItemImg{
    width: 100%;
  }

  .pagination {
    width: 90vw;
  }
}
@media (max-width: 420px) {
  .select select {
    background-color: #fff1ba;
    color: #606266;
}
  .navbar-item{
  margin-top: 200px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.button-search{
  display:none;
}
  .usercontent{
    padding-top: 27%;
}
}
</style>


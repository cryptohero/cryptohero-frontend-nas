<template>
  <div class="back_img">
    <div class="title11">
      <div class="line1">{{$t('Ranking')}}</div>
    </div>
   <div class="back_img2">
    <div class="back">
      <div class="title-line">

      </div>
      <div class="ranking-ul">
        <ul style=" background-color:#97ceea; height: 50px; border: 3px solid #a48554;border-radius: 40px;background-color: #e8cc97;">
          <li class="rank1" style=" line-height: 25px;">{{$t('ranking')}}</li>
          <li class="key1" > {{$t('KeyAddress')}}</li>
          <li class="key1">{{$t('bonus')}}</li>
          <li class="key1">{{$t('recommendNas')}}</li>
          <li class="time1" >{{$t('Herocoin')}}</li>
        </ul>
      </div>
      <div  v-for="( item, index ) in items" :key="item.holder" class="ranking-ul">
        <ul>
          <li v-bind:id="'ranking'+index" class="rank"> <b>{{ index+1 }}</b></li>
          <li class="key">
            <router-link :to="{ name: 'User', params:{address: item.holder}}">
              {{ item.holder.slice(-6).toUpperCase()}}
            </router-link>
          </li>
          <li class="key"></li>
          <li class="key"></li>
          <li class="time"> {{ item.balance }}</li>
        </ul>
      </div>
    </div>
   </div>
  </div>
</template>
<script>
import Contract from '../contract/cryptohero';
import LinkIdol from '@/contract/cryptohero';

  export default {
    name: 'RankingList',
    data(){
      return{
        title:"排行榜",
        methods :{
          ranking: function(index){
            return "rank_"+ index
          }
        },
        items: []
      }
    },

    async mounted() {
      const  contract = new Contract();
      const  res = await contract.getHoldersStat();
      if(res !== null){
        this.items = res.sort(this.compare('balance'));
      }
    },

  // async getTotalEarnByShare() {
  //   const idol = new LinkIdol();
  //   const result = await idol.getTotalEarnByShare(this.address);
  //   return JSON.parse(result)||0;
  // },
  // async getTotalEarnByReference() {
  //   const idol = new LinkIdol();
  //   const result = await idol.getTotalEarnByReference(this.address);
  //   return JSON.parse(result)||0;
  // },

    methods: {
      compare(prop) {
        return function (obj1, obj2) {
          var val1 = obj1[prop];
          var val2 = obj2[prop];
          if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1);
            val2 = Number(val2);
          }
          if (val1 < val2) {
            return 1;
          } else if (val1 > val2) {
            return -1;
          } else {
            return 0;
          }
        }
      }
    },
  }

</script>



<!--<template>
<div class="back_img">
    <div class="title">
         <div class="line1">{{$t('Ranking')}}</div>
    </div>
    <div class="back">
    <div class="title-line">

    </div>
    <div class="ranking-ul">
     <ul style=" background-color:#97ceea; height: 50px; border: 3px solid #a48554;border-radius: 40px;background-color: #e8cc97;">
        <li class="rank1" style=" line-height: 25px;">{{$t('ranking')}}</li>
        <li class="key1" > {{$t('KeyAddress')}}</li>
        <li class="time1" >{{$t('time')}}</li>
    </ul>
     </div>
    <div  v-for="( item, index ) in items" :key="item.id" class="ranking-ul">
      <ul>
        <li v-bind:id="'ranking'+index" class="rank"> <b>{{ index+1 }}</b></li>
        <li class="key"> {{ item.address }}</li>
        <li class="time"> {{ item.collecttime }}</li>
      </ul>
   </div>
   </div>
</div>
</template>
<script>

export default {
  name: 'RankingList',
  data(){
    return{
      title:"排行榜",
      methods :{
        ranking: function(index){
          return "rank_"+ index
        }
      },
      items: []
   }
  },
  async mounted() {
    this.$http.get(this.$store.getters.getServerURL+'getranklistshuihunas.php')
      .then((response) => {
        this.items = response.body;
      });
  }
}

</script>-->
<style scoped>
*{
     list-style: none;
}
 .back_img{
     /* height: 1200px; */
     background: url(/static/assets/card_profile_top.png) no-repeat top ,
     url(/static/assets/card_profile_end.png) no-repeat bottom;
    background-size: 100%;
  padding: 3% 0% 4%;
}
.back_img2 {
background: url(/static/assets/card_profile.png) repeat-y ;
  background-size: 100%;
  padding-left:4%;
  padding-right: 4%;
}
.back{
    padding: 40px;
    background-color: #ecdaa8;
}
.title-line{
     display: flex;
     justify-content: center;
}
.title11{
     width: 100%;
     height: 50px;
     display: flex;
    justify-content: center
}

.line1{
     width: 30%;
     height: 42px;
     float: left;
     color:#f8d195;
     font-size: 24px;
     text-align: center;
}
.tab{
     width: 100%;
     display: flex;
     justify-content: center;
}
.ranking-ul{
     width: 100%;
     height: 60px;
     display:flex;
     justify-content: center
}
.ranking-ul ul{
     height: 60px;
     margin: 0px auto;
     border-bottom: 1px solid #97ceea;
}
 li{
     text-align: center;
     float:left ;
     font-size: 18px;
}
.rank1, .id1, .key1, .time1{
     margin-top: 16px;
    height: 30px;
}

 .rank, .id ,.key, .time{
     height: 60px;
}
 .id ,.key,.time{
     margin-top: 17px;
}

.rank, .rank1{
     width: 100px;
     margin-left: 50px;
}
.rank{
     line-height: 60px;
}
.id, .id1{
     width: 150px;
}
.id{
     margin-top: 25px;
}
.key, .key1{
     width: 180px;
}
.time, .time1{
     width: 150px;
}
 #back2:nth-child(even){
     background-color: #ccecf8;
 }


#ranking0{
     background: url(/static/assets/Firstplace.png) no-repeat center;
     background-size: 100%;
     font-size: 0;
}
#ranking1{

     background: url(/static/assets/Secondplace.png) no-repeat center;
     font-size: 0;
     background-size: 100%;
}
#ranking2{
      background: url(/static/assets/Thirdplace.png) no-repeat center;
      font-size: 0;
      background-size: 100%;

}

@media screen and (max-width: 1000px) {
    .time1 {
        width: 20vw;
    }
    .rank1 {
        width: 10vw;
    }
    .key1 {
        width: 40vw;
    }
    .time {
        width: 20vw;
        font-size: 12px;
    }
    .ranking {
        width: 20vw;
    }
    .key {
        width: 40vw;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
}

@media screen and (max-width: 800px) {
    .time1 {
        width: 30vw;
    }
    .rank1 {
        width: 10vw;
    }
    .key1 {
        width: 30vw;
    }
    .time {
        width: 30vw;
        font-size: 12px;
    }
    .ranking {
        width: 20vw;
    }
    .key {
        width: 30vw;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
}

@media screen and (max-width: 660px) {
    .time1 {
        width: 20vw;
    }
    .time {
        width: 20vw;
        font-size: 12px;
    }
    .ranking {
        width: 10vw;
    }
}
@media screen and (max-width: 440px) {
    .time1 {
        display: none;
    }
    .time {
        display: none;
    }

}
 @media screen and (max-width: 414px) {
    .title11{
    height: 23px;
  }
  .line1{

     font-size: 17px;
}
 }
/* @media screen and (max-width: 1060px) {
     .time, .time1{
         display: none;
}

 }
  @media screen and (max-width: 770px) {
 .key, .key1{
    width: 325px;
}
.rank, .rank1{
     margin-left: 0px;
}
}
  @media screen and (max-width: 665px) {
      .ranking-ul ul{
         display: flex;
         justify-content:space-around;
}
     .key, .key1{
         display: none;
}
     .title{
         width: 100%;

}
.line{
     width: 14%;
}
}*/
</style>

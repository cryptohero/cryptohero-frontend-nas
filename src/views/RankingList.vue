<template>
<div class="back_img">
    <div class="title">
         <div class="line1"> {{title}}</div>
    </div> 
    <div class="back">
    <div class="title-line">
    
    </div>
    <div class="ranking-ul"> 
     <ul style=" background-color:#97ceea; height: 50px; border: 3px solid #a48554;border-radius: 40px;background-color: #e8cc97;">
        <li class="rank1" style=" line-height: 25px;">名次</li> 
        <li class="id1" > ID</li>
        <li class="key1" > 钱包地址</li>
        <li class="time1" > 合成时间</li>   
    </ul>
     </div>
    <div  v-for="( item, index ) in items" :key="item.id" class="ranking-ul"> 
      <ul>
        <li v-bind:id="'ranking'+index" class="rank"> <b>{{ index+1 }}</b></li> 
        <li class="id"> {{ item.ID }}</li>
        <li class="key"> {{ item.key }}</li>
        <li class="time"> {{ item.time }}</li>   
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
       items: [
      {   ID: 'DanielYang',
      key:'1Eb84h8LnKncKjKLVRztDP2FXE1ixAbXQq',
      time:'2018.0524.18:32' },
      { ID: 'DanielYang',
      key:'1Eb84h8LnKncKjKLVRztDP2FXE1ixAbXQq',
      time:'2018.0524.18:32' },
      { ID: 'DanielYang',
      key:'1Eb84h8LnKncKjKLVRztDP2FXE1ixAbXQq',
      time:'2018.0524.18:32' },
       { ID: 'DanielYang',
      key:'1Eb84h8LnKncKjKLVRztDP2FXE1ixAbXQq',
      time:'2018.0524.18:32' },
       { ID: 'DanielYang',
      key:'1Eb84h8LnKncKjKLVRztDP2FXE1ixAbXQq',
      time:'2018.0524.18:32' },
       { ID: 'DanielYang',
      key:'1Eb84h8LnKncKjKLVRztDP2FXE1ixAbXQq',
      time:'2018.0524.18:32' },
      { ID: 'DanielYang',
      key:'1Eb84h8LnKncKjKLVRztDP2FXE1ixAbXQq',
      time:'2018.0524.18:32' }
    ],
     
   }
 }
}

</script>
<style scoped>
*{
     list-style: none;
}
 .back_img{
     /* height: 1200px; */
     background: url(/static/assets/card_profile_top.png) no-repeat top , 
     url(/static/assets/card_profile_end.png) no-repeat bottom,
     url(/static/assets/card_profile.png) repeat-y ;
    background-size: 100%;
    padding:4% 4% 4%;
}
.back{
    padding: 40px;
    background-color: #ecdaa8;
}
.title-line{
     display: flex;
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
     width: 60px;
     margin-left: 30px;
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
     width: 400px;
}
.time, .time1{
     width: 200px;
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

 @media screen and (max-width: 1060px) {
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
}
</style>

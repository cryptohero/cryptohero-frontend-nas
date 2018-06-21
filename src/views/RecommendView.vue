<template>
<div class="back">  
    <!-- <img src="/static/assets/recommend.png"> -->
<div class="name">  
    <b>某某某・某某某</b>
</div>
<div class="card22">  
    <div class="card1"> 
        <img class="img1"  src="/static/assets/heros/1.jpg">    
　　</div>
</div>
　　<div class="text22">
   <i class="text11"> <b >是我拥有的第<i class="big_img">111</i>张牌</b> </i> 　
　　</div>
</div>
</template>
<script>
export default {
    name: 'RecommendView',
}
</script>

<style  scoped>
.back{ 
    
    background: url(/static/assets/recommend.png) no-repeat center;
    width: 100%;
    height: 600px;
  

}
.name{
    width: 100%;
        display: flex;
    justify-content: center;
}
b{
    width: 200px;
    height: 30px;
    font-size: 13px;
    margin-top: 146px;
    text-align: center;
    color: palegoldenrod;
}
.card22{
    width: 100%;
    display: flex;
    justify-content: center;
}
.card1{
   width: 100%;

    display: flex;
    justify-content: center;
}

.img1 {
    height: auto;
    /* max-width: 52%; */
       height: 272px;
    width: 177px;
    margin-top: 29px;
}
.text22{
    width: 100%;
    display: flex;
    justify-content: center;
}
.text11{
    margin-top: 20px;
}
.text11 b{
    font-size: 17px;
}
.big_img{
    font-size: 30px;
}
</style>

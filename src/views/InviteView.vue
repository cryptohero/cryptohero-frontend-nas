<template>
    <div class="back_img">
        <div class="title11">
         <div class="line1"> {{title}}</div>
    </div>
        <div class="back_color">
            <div class="title_1">
                <div class="title_2"><b>推荐好友玩 星云水浒 可获得 3 % 消费额的奖励!</b></div>
            </div>
            <div class="input1">
            <div class="title is-5 title3">你的邀请链接: </div>
            <div class="input">
                <input type="search" :value="myRefferalLink" disabled>
            </div>
                <div class="btn">复制链接</div>
            </div>
            <div>
                <div class="invite">
                    <div class="line"></div>
                    <div class="title is-6">分享到社交媒体</div>
                    <div class="line"></div>
                </div>
                <div class="app_list">
                    <ul>
                    <li v-for="n in 8" :key="n.id" >
                        <img v-bind:src="'/static/assets/invite/'+index+'.png'"> </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Clipboard from 'clipboard';
import { mapState } from 'vuex';

export default {
  created() {
    const clipboard = new Clipboard('.button');
    clipboard.on('success', (e) => {
      e.clearSelection();
    });
  },
  name: 'InviteView',
  data: () => ({
    title: '邀请好友',
  }),
  computed: {
    ...mapState(['me']),
    myRefferalLink() {
      const website = 'https://cryptohero-nas.etherfen.com/#';
      if (this.me) {
        return `${website}/draw/${this.me}`;
      }
      return '请安装钱包插件再来';
    },
  },
  methods: {
    invite(index) {
      return `Invite_${index}`;
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
    width: 100%;
    padding: 40px;
    background-color: #ecdaa8;
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
.title_1{
    margin: 0px auto;
    width: 90%;
    height: 50px;
    border: 3px solid #a48554;
    border-radius: 40px;
    background-color: #e8cc97;
}
.input1{
    margin: 30px 0px 240px 0px;
    display: flex;
    align-content: space-between;
    justify-content: center;
    flex-wrap: wrap;
}
.title_2{
    padding: 5px;
    text-align: center;
    font-size: 20px;
    color: #5c3000;
}
.title3{
    margin-top: 8px;
    width: 130px;
}
.btn{
    margin-left: 10px;
    width: 111px;
    height: 35px;
    background-color: #90dc5c;
    border: 3px solid #dcf4cc;
    border-radius: 10px;
    text-align: center;
    line-height: 28px;
}
.input{
    width: 60%;
    background-color: #d9b473;
    border-radius: 8px;
}
input{
    width: 100%;
    background:none;
    outline:none;
    border:0px;
    color: #906718;
}
.invite{
    width: 100%;
    display: flex;
    align-content: space-between;
    justify-content: center;
}
.line{
    width: 20%;
    height: 2px;
    margin-top: 3px;
    background-color: #5c3000;
}
.app_list{
    width: 200px;
    height: 50px;
    border: 0px;
    border-radius: 40px;
    background-color: #e0c48f;
    margin: 0px auto;
}
@media screen and (max-width: 450px){
    .input{
    width: 90%;
    }
    .title_2{
    font-size: 13px;
}
 .btn{
    margin-top: 20px;
}
.line1{
    font-size: 19px;
}
}
</style>

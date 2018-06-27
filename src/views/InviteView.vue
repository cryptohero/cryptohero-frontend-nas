<template>
    <div class="back_img">
        <div class="title11">
            <div class="line1">{{$t('inviteFirend')}}</div>
      </div>
       <div class="back_img2">
        <div class="back_color">
            <div class="title_1">
                <div class="title_2"><b>{{$t('title')}}</b></div>
            </div>
            <div class="input1">
                <div class="title is-5 title3">{{$t('firendLink')}} </div>
                <div class="input">
                    <input type="search" :value="myRefferalLink" disabled>
                </div>
                <div class="btn" :data-clipboard-text="myRefferalLink" @click.native="copyFun">{{$t('Linkcpy')}}</div>
            </div>

            <div class="ranking-ul">
              <ul style=" background-color:#97ceea; height: 50px; border: 3px solid #a48554;border-radius: 40px;background-color: #e8cc97;">
                    <li class="rank1" >{{$t('InvitedMan')}}</li>
                    <!-- <li class="ul2">抽卡数量</li> -->
                    <li class="key1" >{{$t('BlockHight')}}</li>
                    <li class="time1">{{$t('RebateAmount')}}</li>
                </ul>
            </div>
                  <!-- <p> Display {{getReferralHistory}} </p> -->

            <div class="ranking-ul" v-for="item in items" :key="item.id">
                  <ul>
                    <!-- <li class="ul2"> {{ item.referer }}</li> -->
                    <li class="rank"> {{ item.to }}</li>
                    <li class="key"> {{ item.blockHeight }}</li>
                    <li class="time"> {{ item.cut }}</li>
                  </ul>

            </div>

            <div  v-show="false">
                <div class="invite">
                    <div class="line"></div>
                    <div class="title is-6">{{$t('shareapp')}}</div>
                    <div class="line"></div>
                </div>
                <div class="app_list">
                    <ul>
                    <li><img src="/static/assets/invite/1.png"> </li>
                    <li><img src="/static/assets/invite/2.png"> </li>
                    <li><img src="/static/assets/invite/3.png"> </li>
                    <li><img src="/static/assets/invite/4.png"> </li>
                    <li><img src="/static/assets/invite/5.png"> </li>
                    <li><img src="/static/assets/invite/6.png"> </li>
                    <li><img src="/static/assets/invite/7.png"> </li>
                    <li><img src="/static/assets/invite/8.png"> </li>
                    </ul>
                </div>
            </div>
        </div>

       </div>

    </div>
</template>
<script>
import Clipboard from 'clipboard';
import Contract from '@/contract/cryptohero';
import { mapState } from 'vuex';

export default {
  created() {
    const clipboard = new Clipboard('.btn');
    clipboard.on('success', (e) => {
      e.clearSelection();
    });
    this.fetchInviteData();
  },
  name: 'InviteView',
  data: () => ({
    title: '邀请好友',
    items: [],
  }),
  asyncComputed: {
    async getReferralHistory() {
      const contract = new Contract();
      const result = await contract.call({
        functionName: 'getReferralHistory',
        args: [this.me],
      });
      return JSON.parse(result);
    },
  },
  computed: {
    ...mapState(['me']),
    myRefferalLink() {
      const website = 'https://nas.cryptohero.pro/#';
      this.getuserinvitelist();
      if (this.me) {
        return `${website}/draw?ref=${this.me}`;
      }
      return '请安装钱包插件再来';
    },
  },
async mounted() {
  const  contract = new Contract();
  const  res = await contract.getTotalEarnByReference();
  if(res !== null){
    this.items = res.sort(this.compare('balance'));
  }
},
  methods: {
    copyFun(){
      var clipboard = new Clipboard('.btn')
      clipboard.on('success', e => {
        console.log('复制成功')
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        console.log('该浏览器不支持自动复制')
        // 释放内存
        clipboard.destroy()
      })
    },
    async fetchInviteData() {
      const contract = new Contract();
      const result = await contract.call({
        functionName: 'getReferralHistory',
        args: [this.me],
      });
      console.log(result)
      this.items = JSON.parse(result);
      console.log(`fetch ok ${this.items}`);
    },
    invite(index) {
      return `Invite_${index}`;
    },

    // },
    // async mounted() {
    async getuserinvitelist() {
      this.$http.get(`${this.$store.getters.getServerURL}inviteshuihulist.php?address=${this.me}&t=0&witchnet=${this.$store.getters.getContractNet}`)
        .then((response) => {
          const addresstypes = {};
          response.body.map(async (addrinfo) => {
            if (addresstypes[addrinfo.address]) {
              addresstypes[addrinfo.address].cardcount += parseInt(addrinfo.cardcount);
              addresstypes[addrinfo.address].paid += parseFloat(addrinfo.paid);
              addresstypes[addrinfo.address].rebate += parseFloat(addrinfo.rebate);
            } else {
              addresstypes[addrinfo.address] = {};
              addresstypes[addrinfo.address].cardcount = parseInt(addrinfo.cardcount);
              addresstypes[addrinfo.address].paid = parseFloat(addrinfo.paid);
              addresstypes[addrinfo.address].rebate = parseFloat(addrinfo.rebate);
            }
          });

          const keys = Object.keys(addresstypes);
          const thisself = this;
          keys.forEach((addr) => {
            const info = addresstypes[addr];
            console.log(info);
            info.address = addr;
            thisself.items.push(info);
          });

          // this.items = response.body;
          // this.updatetx();
        });
    },
  },
};
</script>

<style scoped>
.back_img {
  background: url(/static/assets/card_profile_top.png) no-repeat top,
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
.back_color {
  width: 100%;
  padding: 40px;
  background-color: #ecdaa8;
}
.title11 {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
}
.line1 {
  width: 30%;
  height: 42px;
  float: left;
  color: #f8d195;
  font-size: 24px;
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
.input1 {
  margin: 30px 0px 30px 0px;
  display: flex;
  align-content: space-between;
  justify-content: center;
  flex-wrap: wrap;
}
.title_2 {
  padding: 5px;
  text-align: center;
  font-size: 20px;
  color: #5c3000;
}
.title3 {
  margin-top: 8px;
  width: 130px;
}
.btn {
  margin-left: 10px;
  width: 111px;
  height: 35px;
  background-color: #90dc5c;
  border: 3px solid #dcf4cc;
  border-radius: 10px;
  text-align: center;
  line-height: 28px;
}
.input {
  width: 60%;
  background-color: #d9b473;
  border-radius: 8px;
}
input {
  width: 100%;
  background: none;
  outline: none;
  border: 0px;
  color: #906718;
}
.invite {
  margin-top: 30px;
  width: 100%;
  display: flex;
  align-content: space-between;
  justify-content: center;
}
.line {
  width: 20%;
  height: 2px;
  margin-top: 3px;
  background-color: #5c3000;
}
.app_list {
  width: 300px;
  height: 50px;
  border: 0px;
  border-radius: 40px;
  background-color: #e0c48f;
  margin: 0px auto;
}
.app_list ul li {
  float: left;
}
.app_list ul li img {
  width: 30px;
  height: 30px;
  margin-top: 11px;
  margin-left: 6px;
}

.invitelist ul {
  display: flex;
  height: 30px;
  text-align: center;
}
.ul1 {
  flex: 20%;
}
.ul2 {
  flex: 10%;
}
.ul3 {
  flex: 25%;
}
.ul4 {
  flex: 25%;
}
.ul1addr {
  font-family: monospace;
}

@media screen and (max-width: 450px) {
  .back_color {
    padding: 9px;
  }
  .input {
    width: 90%;
  }
  .title_2 {
    font-size: 13px;
  }
  .btn {
    margin-top: 20px;
  }
  .line1 {
    font-size: 19px;
  }
  .app_list ul li img[data-v-7bd60c08] {
    margin-top: 10px;
    margin-left: 6px;
  }
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
  width: 80px;
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
 @media screen and (max-width: 414px) {
    .title11{
    height: 23px;
  }
  .line1{
     font-size: 16px;
     line-height: 14px;
 }
}
</style>

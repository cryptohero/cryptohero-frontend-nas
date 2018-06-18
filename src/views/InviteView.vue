<template>
    <div class="back_img">
        <div class="title11">
            <div class="line1">{{$t('inviteFirend')}}</div>
        </div>
        <div class="back_color">
            <div class="title_1">
                <div class="title_2"><b>{{$t('title')}}</b></div>
            </div>
            <div class="input1">
                <div class="title is-5 title3">{{$t('firendLink')}} </div>
                <div class="input">
                    <input type="search" :value="myRefferalLink" disabled>
                </div>
                <div class="btn">{{$t('Linkcpy')}}</div>
            </div>

            <div class="invitelist">
                <ul>
                    <li class="ul1">被邀请人</li>
                    <li class="ul2">抽卡数量</li>
                    <li class="ul3">充值金额</li>
                    <li class="ul4">返利金额</li>
                </ul>
            </div>
            <div class="invitelist" v-for="( item, index ) in items" :key="item.id">
                  <ul>
                    <li class="ul1"> {{ item.address }}</li>
                    <li class="ul2"> {{ item.cardcount }}</li>
                    <li class="ul3"> {{ item.paid }}</li>
                    <li class="ul4"> {{ item.rebate }}</li>
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
    items: []
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
    // updatetx() {
    //     var snlist = [];
    //     const thisme = "8888888888899999000000000000000";
    //     this.$http.get(`http://127.0.0.1:8888/inviteshuihulist.php?address=${thisme}&witchnet=test&t=0`)
    //       .then((response) => {
    //         response.body.map(async (addrinfo) => {
    //             snlist.push(addrinfo["serialnum"]);
    //         });
    //       });
    // }
  },
  async mounted() {
    // const thisme = "8888888888899999000000000000000";
    this.$http.get(this.$store.getters.getServerURL+`inviteshuihulist.php?address=${this.me}`)//&t='1'
    // this.$http.get(`http://127.0.0.1:8888/inviteshuihulist.php?address=${thisme}&witchnet=test&t=1`)
      .then((response) => {

        var addresstypes = {}
        response.body.map(async (addrinfo) => {
            if (addresstypes[addrinfo["address"]]) {
                addresstypes[addrinfo["address"]]["cardcount"]+=parseInt(addrinfo["cardcount"]);
                addresstypes[addrinfo["address"]]["paid"]+=parseFloat(addrinfo["paid"]);
                addresstypes[addrinfo["address"]]["rebate"]+=parseFloat(addrinfo["rebate"]);
            } else {
                addresstypes[addrinfo["address"]] = {};
                addresstypes[addrinfo["address"]]["cardcount"]=parseInt(addrinfo["cardcount"]);
                addresstypes[addrinfo["address"]]["paid"]=parseFloat(addrinfo["paid"]);
                addresstypes[addrinfo["address"]]["rebate"]=parseFloat(addrinfo["rebate"]);
            }
        });

        const keys = Object.keys(addresstypes);
        const thisself = this;
          keys.forEach((addr) => {
            var info = addresstypes[addr];
            console.log(info);
            info["address"] = addr;
            thisself.items.push(info);
          });

        // this.items = response.body;
        // this.updatetx();
      });
  }
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
    margin: 30px 0px 30px 0px;
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
    margin-top: 30px;
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
    width: 300px;
    height: 50px;
    border: 0px;
    border-radius: 40px;
    background-color: #e0c48f;
    margin: 0px auto;
}
.app_list ul li{
    float: left;
}
.app_list ul li img{
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
    flex: 40%;
}
.ul2 {
    flex: 10%;
}
.ul3 {
    flex: 15%;
}
.ul4 {
    flex: 15%;
}

@media screen and (max-width: 450px){
    .back_color{

    padding: 9px;
    }
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
.app_list ul li img[data-v-7bd60c08] {
    margin-top: 10px;
    margin-left: 6px;
}
}
</style>

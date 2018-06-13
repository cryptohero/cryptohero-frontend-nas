<template>
  <div>
    <!-- rewrite -->
    <div class="card">
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <figure>
          <img :src="getAvatar" alt="Identicon" style="border-radius: 50%;">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4"> {{$t('User')}}: {{address}} </p>
        <br>
        <!-- <p class="subtitle is-6">的卡片</p> -->
        <!-- <p class="subtitle is-6"><a class="button" :href="getEtherScanURL"> 查看TA的交易记录 </a></p> -->
      </div>
      <div class="media-content">
        卡片：100张
      </div>
    </div>

      </div>
    </div>
    <!-- end of rewrite -->
    <div class="tabs">
      <div class="title11">
          <a v-if="me && me.address.toUpperCase() === address">{{$t('My Cards')}}</a>
          <a v-else>{{$t('His Cards')}}</a>
      </div>
    </div>
    <ItemList :itemIds='itemIds' />
  </div>
</template>

<script>
import ItemList from '@/components/ItemList';
import { getItemsOf } from '@/api';
import getAvatarFromAddress from 'dravatar'
  ;

export default {
  name: 'UserView',
  components: {
    ItemList,
  },
  data: () => ({
    itemIds: [],
  }),
  asyncComputed: {
    async getAvatar() {
      const uri = await getAvatarFromAddress(this.address);
      return uri;
    },
  },
  computed: {
    address() {
      return this.$route.params.address;
    },
    getEtherScanURL() {
      return `https://etherscan.io/address/${this.address}`;
    },
    me() {
      return this.$store.state.me;
    },
  },
  async created() {
    this.itemIds = await getItemsOf(this.$route.params.address);
    if (this.itemIds.length >= 108) {
      const formData = new FormData();
      formData.append('address', this.address);
      this.$http
        .post('http://35.200.102.240/addrankshuihunas.php', formData)
        .then((response) => {
          const res = response.body;
          console.log(res);
        });
    }
  },

  watch: {},

  methods: {},
};
</script>
<style scoped>
.user-info-wrapper {
  border-radius: 5px;
}.media {
  display:block;
    height: 439px;
    margin-top: 122px;
}
.card {
  color: blanchedalmond;
    background-color:inherit;
}
.media-content {
    display: flex;
    justify-content: center;
}
.title11{
 
  font-size: 43px;
}
.title{
  color: blanchedalmond;
}
.tabs a{
   color: blanchedalmond;
}
.tabs{
  
  justify-content: center;
}
@media screen and (max-width: 414px){
figure{
  height: 152px;
    width: 144px;
}
.media[data-v-4d74474a] {
    height: 289px;
    margin-top: 29px;
}
}
</style>
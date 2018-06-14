<template>
  <div :style="navItemFontSize" @mouseover="overShow" @mouseout="outHide">
  <!-- <div @mouseover="onMouseOver()"> -->
    <img class="cardItemImg" alt="" :src="item.img"/>
  <div :style="{ backgroundColor: item.color, height: '50px' }">
  <span>
    <a :style="{ lineHeight: '50px',
    color: item.textcolor, paddingLeft: '20px' }">
    {{ item.name }}{{ item.code }}</a>
      </span>
      <!-- <span class="priceSpan">
          <a :style="{ lineHeight: '50px', color: item.textcolor }">{{ price }} USD</a>
      </span> -->
  </div>
  </div>
</template>

<script>
import request from 'superagent';

export default {
  name: 'card-item',
  props: ['item', 'hasMouseOver'],
  data() {
    return {
      isMouseOver: false,
      price: 0,
    };
  },
  computed: {
    navItemFontSize() {
      if (this.isMouseOver) {
        const boderstr = `${this.item.color} 3px solid`;
        return {
          border: boderstr, borderRadius: '5px',
        };
      }
    },
  },
  async mounted() {
    // await this.getCoinMarketData();
  },
  methods: {
    overShow() {
      if (!this.hasMouseOver) return;
      this.isMouseOver = !this.isMouseOver;
    },
    outHide() {
      if (!this.hasMouseOver) return;
      this.isMouseOver = !this.isMouseOver;
    },
    // async getCoinMarketData() {
    //   // console.log("this.item.idforapi:"+this.item.idforapi)
    //   if (this.item.idforapi != 0) {
    //     const { body } = await request
    //       .get(`https://api.coinmarketcap.com/v2/ticker/${this.item.idforapi}/`);
    //     this.price = body.data.quotes.USD.price;
    //   }
    // },
  },
  watch: {
    $props: {
      handler(val, oldVal) {
        // this.getCoinMarketData();
      },
      deep: true,
    },
  },
};
</script>
<style scoped>
.cardItemImg{
  vertical-align:bottom;
  /*cursor: pointer;*/
}
.priceSpan {
  float:right;
  padding-right: 20px;
}

@media (max-width: 800px) {
  .cardItemImg{
    width: 100%;
  }
}
</style>

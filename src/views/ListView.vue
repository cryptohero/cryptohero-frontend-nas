<template>
  <div class="">
    <div v-if="loading"
         class="loader-wrapper">
      <pulse-loader></pulse-loader>
    </div>
    <div class="logo_btn">
  	 <section>
		  <div class="cardContainer">
			 <div class="cardcharas">
				 <img class="charaimg" alt="" srcset="/static/assets/big_logo.png"/>
			 </div>
		 	<div class="btnContainer">
				 <div class="cardbtn">
				  	<a> <img class="btnimg" @click="drawClicked()" width="150" alt="" srcset="/static/assets/btn.png"/> </a>
				  </div>
			  </div>
		  </div>
     </section>
    </div>
    <ItemList :itemIds='itemIds' />
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader';
import ItemList from '@/components/ItemList';
import { getTotal, getItemIds } from '@/api';
import { toReadablePrice } from '@/util';

export default {
  name: 'item-list',
  components: {
    PulseLoader,
    ItemList,
  },

  data() {
    return {
      loading: true,
      itemIds: [],
      total: null,
    };
  },

  computed: {},

  async created() {
//    this.total = await getTotal();这里去监听了eth合约
//    const itemIds = await getItemIds(0, this.total);
    const itemIds = await getItemIds(0, 0);
    this.itemIds = itemIds;
    this.loading = false;
  },

  methods: {
    toDisplayedPrice(priceInWei) {
      const readable = toReadablePrice(priceInWei);
      return `${readable.price} ${readable.unit}`;
    },
    drawClicked() {
      var href="/#/draw";
      window.location.href = href;
    }
  },
  watch: {},
};
</script>
<style scoped>
.cardContainer {
	background-size: 100%;
	background-repeat: no-repeat;
	width: 100%;
	/*padding-top: 43.5%;*/
	padding-top: 50%;
	position: relative;
	text-align: center;
}
.cardcharas {
  position: absolute;
  top: 0;
  left: 0;
	width: 100%;

}


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
	padding-top: 33%;
  /*background-color: #ccc;*/
}
.cardbtn {
    display: block;
    margin-left: auto;
    margin-right: auto;
}

@media screen and (max-width: 414px){
  .cardcharas{
    display: none;
  }
  .btnContainer {
	padding-top: 17%;
  /*background-color: #ccc;*/
}
}
.loader-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>

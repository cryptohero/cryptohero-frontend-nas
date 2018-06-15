<template>
  <div class="columns is-multiline is-mobile">
    <router-link v-for="item in items"
                 v-if="item"
                 :to="{ name: 'Item', params:{id: item.id, tokenId: item.type}}"
                 :key=item.id.toString()
                 class="column
           is-full-mobile
           is-one-quarter-tablet
           is-one-quarter-desktop
           is-one-quarter-widescreen
           is-one-quarter-fullhd">
      <template v-if="0 <= item.id && item.id <= 114">
        <div class="card">
          <div class="card-image">
              <!-- @mouseover="lightShow(item.id)"
              @mouseout="lightunShow(item.id)"
            <div class="smallcardcharas">
              <img class="charaimg" v-lazy="getCardImage(1)">
            </div>
            <div class="smallcardcharas">
              <img class="charaimg" v-lazy="getCardImage(2)" v-show="!lightisShow[item.id]">
            </div> -->
            <!-- <div class="imageborder8"> -->
            <figure class="image is-5by4">
              <img v-lazy="getCardImage(item.id)">
            </figure>
            <!-- </div> -->
          </div>
          <div class="card-content">
            <div class="content is-small">
              <h4>{{item.nickname}} · {{item.name}}
                <div class="btnn">{{$t('Details')}}</div>
              </h4>
              <!-- <ul>
                <li>{{$t('Owner')}}：
                  <router-link v-if="item.owner"
                               :to="{ name: 'User', params:{address: item.owner}}">
                    {{item.owner.slice(-6).toUpperCase()}}
                  </router-link>
                </li>
                <li>{{$t('Current Price')}}: {{toDisplayedPrice(item.price)}}</li>
              </ul>
              <p class="item-slogan">{{$t('Slogan')}}: {{toDisplayedAd(item.id)}}</p>-->
            </div>
          </div>
        </div>
      </template>
    </router-link>
  </div>
</template>

<script>
import { toReadablePrice } from '@/util';

export default {
  name: 'item-lists',
  props: ['itemIds'],

  data: () => ({
    // lightisShow: [],
  }),

  computed: {
    items() {
      return this.itemIds.map((id) => {
        console.error(id);
        const item = this.$store.state.items[id];
        console.error(item);
        item.id = id;
        const result = item || { id };
        console.error(result)
        return item || { id };
      });
    },
  },

  methods: {
    toDisplayedPrice(priceInWei) {
      const readable = toReadablePrice(priceInWei);
      return `${readable.price} ${readable.unit}`;
    },
    toDisplayedAd(id) {
      const ad = this.$store.state.ads[id];
      if (ad && ad.length >= 45) {
        return `${ad.slice(0, 44)} ...`;
      }
      return ad;
    },
    getCardImage(id) {
      return `http://test.cdn.hackx.org/heros/${id}.jpg`;
    },
    // lightShow: function(id) {
    //   console.log(id+"qwwwww"+this.lightisShow[id])
    //   this.lightisShow[id] = true;
    //   this.$forceUpdate();
    // },
    // lightunShow: function(id) {
    //   console.log(id+"qwwwww"+this.lightisShow[id])
    //   this.lightisShow[id] = false;
    //   this.$forceUpdate();
    // }
  },

  created() {
    // for(var i=0;i<=114;i++){
    //   this.lightisShow[i] = false;
    // }
  },

  watch: {
    itemIds(newItemIds) {
      newItemIds.forEach((itemId) => {
        // this.$store.dispatch('FETCH_ITEM', itemId);
        // this.$store.dispatch('FETCH_AD', itemId);
      });
    },
  },
};
</script>
 <style scoped>
 .image {
    border: 8px solid #ecdaa8;
    border-radius: 8px;
}
.content h4 {
  color: #ffc627;
  font-size: 13px;
}
/* .imageborder8{
  border-top: 12px solid;
  border-left: 8px solid;
  border-bottom: 12px solid;
  border-right: 8px solid;
} */
.card{
  font-size: 1.2em;
  background-color: initial;
}
.cardcount {
	color: #5495c6;
	font-size: 20px;
}
.btnn{
padding: 3px;
float: right;
background-color: red;
flex-wrap: wrap;

}
.item-slogan {
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;
}
/* .smallcardcharas {
  position: absolute;
} */
</style>


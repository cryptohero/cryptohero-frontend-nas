<template lang="pug">
  .containera
    #login(v-if="!me")
      h1| 请使用 MetaMask 登录
      h3| 无法访问你的钱包接口，请登录后抽卡
    #draw(v-if="me")
            section.hero.head
              .hero-body
                  .container
                      h1.title| 幸运抽卡
                      h2.subtitle| 目前卡池可抽数量： {{getCardsLeft}} 张，卡牌限量，先到先得
                      h2.subtitle| 目前抽卡费
                      h1.title| {{ getPrice }} NAS / 张
            .container
                .buttons(style="width: 18rem")
                  a.button.is-primary(@click="setQty(1)")|抽 1 张
                  a.button.is-primary(@click="setQty(3)")|抽 3 张
                  a.button.is-primary(@click="setQty(6)")|抽 6 张
                  a.button.is-primary(@click="setQty(9)")|抽 9 张
                  a.button.is-primary(@click="setQty(12)")|抽 12 张
                  a.button.is-primary(@click="setQty(16)")|抽 16 张
                  a.button.is-primary(@click="setQty(32)")|抽 32 张
                  a.button.is-primary(@click="setQty(64)")|抽 64 张
                  a.button.is-primary(@click="setQty(128)")|抽 128 张
                  a.button.is-primary(@click="setQty(1024)")|抽 1024 张
            //- .container
              .columns
                .column
                  section.hero
                    .hero-body
                        .containers
                            h2.subtitle| 即将耗费你
                            h1.title| {{getDisplayTotal}} NAS
                            h2.subtitle| 你确定要抽取卡牌吗
                .column
                      button.button.is-primary.is-large(@click="draw")| 搏一搏!

</template>

<script>
import Contract from '@/contract/cryptohero';
import { BigNumber } from 'bignumber.js';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      count: 0,
    };
  },
  asyncComputed: {
    async getCardsLeft() {
      const contract = new Contract();
      console.log(contract);
      const result = await contract.getDrawCardsLeft();
      return result;
    },
    async getPrice() {
      const contract = new Contract();
      const result = await contract.getDrawPrice();
      return new BigNumber(result).div(1000000000000000000).toString();
    },
  },
  computed: {
    ...mapState(['me']),
    displayCount() {
      return `${this.count} 张`;
    },
    getDisplayTotal() {
      return new BigNumber(this.getPrice).times(this.count).toNumber();
    },
  },
  methods: {
    setQty(qty) {
      this.count = qty;
      this.draw();
    },
    add(time = 1) {
      this.count += time;
    },
    minus(time = 1) {
      if (this.count > 0) {
        this.count -= time;
      }
    },
    async draw() {
      const contract = new Contract();
      const result = await contract.draw(undefined, this.getDisplayTotal);
      alert(result);
    },
  },
};
</script>

<style scoped>
#draw{
    background: #ecdaa8;
}
.buttons {
    margin: 1rem;
}
</style>

<template lang="pug">
  .containera
    #login(v-if="!me")
      h1| {{$t('Content1')}} （<a href="https://github.com/ChengOrangeJu/WebExtensionWallet" style="color:#FFFF00" target="_blank">{{$t('Content2')}}</a>，<a href="https://nano.nebulas.io/index_cn.html" style="color:#FFFF00" target="_blank">Nas nano</a>）
      h3| {{$t('Content3')}}
    #draw(v-if="me")
            section.hero.head
              .hero-body
                  .container
                      h1.title| {{$t('H1Title1')}}
                      h2.subtitle| {{$t('H2Title1')}} {{getCardsLeft}} {{$t('H2Title2')}}
                      h2.subtitle| {{$t('H2Title3')}}
                      h1.title| {{ getPrice }} NAS / {{$t('CardUnit')}}
            .container
                .buttons(style="width: 18rem")
                  a.button.is-primary(@click="setQty(1)")|{{$t('Draw')}} 1 {{$t('CardUnit')}}
                  a.button.is-primary(@click="setQty(3)")|{{$t('Draw')}} 3 {{$t('CardUnit')}}
                  a.button.is-primary(@click="setQty(6)")|{{$t('Draw')}} 6 {{$t('CardUnit')}}
                  a.button.is-primary(@click="setQty(9)")|{{$t('Draw')}} 9 {{$t('CardUnit')}}
                  a.button.is-primary(@click="setQty(12)")|{{$t('Draw')}} 12 {{$t('CardUnit')}}
                  a.button.is-primary(@click="setQty(16)")|{{$t('Draw')}} 16 {{$t('CardUnit')}}
                  a.button.is-primary(@click="setQty(32)")|{{$t('Draw')}} 32 {{$t('CardUnit')}}
                  a.button.is-primary(@click="setQty(64)")|{{$t('Draw')}} 64 {{$t('CardUnit')}}
                  a.button.is-primary(@click="setQty(128)")|{{$t('Draw')}} 128 {{$t('CardUnit')}}
                  a.button.is-primary(@click="setQty(1024)")|{{$t('Draw')}} 1024 {{$t('CardUnit')}}
            //- .container
              .columns
                .column
                  section.hero
                    .hero-body
                        .containers
                            h2.subtitle| {{$t('H2Content1')}}
                            h1.title| {{getDisplayTotal}} NAS
                            h2.subtitle| {{$t('H2Content2')}}
                .column
                      button.button.is-primary.is-large(@click="draw")| {{$t('Fight')}}

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

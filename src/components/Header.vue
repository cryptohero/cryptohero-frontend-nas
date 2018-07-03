<template>
  <header>
    <img class="logo_big" src="/static/assets/big_logo.png">
    <nav class="navbar is-light">
      <div class="navbar-brand">
        <img  class="logo" src="/static/assets/logo.png">

        <router-link class="navbar-item ff" style={opacity:0.5}
                     :to="{ name: 'Home'}">
         <div class="transform">{{$t('CryptoHero')}}</div>
        </router-link>

        <router-link class="navbar-item"
                     :to="{ name: 'LuckyDraw'}">
          <div class="transform"> {{$t('luckydraw')}} </div>
        </router-link>
        <router-link v-if="!me"
                     class="navbar-item"
                     :to="{ name: 'Login'}">
          <div class="transform">{{$t('Sign In')}}</div>
        </router-link>

        <router-link v-else
                     class="navbar-item"
                     :to="{ name: 'User', params:{address: me}}">
          <div class="transform">{{$t('My Cards')}}</div>
        </router-link>
         <router-link class="navbar-item"
                     :to="{ name: 'AirDrop'}">
          <div class="transform"> {{$t('airdrop')}} </div>
        </router-link>
        <router-link class="navbar-item"
                     :to="{ name: 'InviteVie'}">
          <div class="transform">{{$t('FAQs')}}</div>
        </router-link>

        <router-link class="navbar-item"
                     :to="{ name: 'RankingList'}">
          <div class="transform">{{$t('Ranking')}}</div>
        </router-link>


        <router-link class="navbar-item"
                     :to="{ name: 'Exchange'}">
          <div class="transform"> <!--{{$t('Exchange')}} -->交易所</div>
        </router-link>
        <router-link class="navbar-item"
                     :to="{ name: 'FAQ'}">
          <div class="transform"> {{$t('faq')}} </div>
        </router-link>

        <!-- <router-link class="navbar-item"
                     :to="{ name: 'BirthdayGift'}">
          {{$t('BirthdayGift')}}
        </router-link>         -->
      </div>

      <div class="navbar-end">
        <!-- <div class="navbar-item">
          <div class="field is-grouped">
            <p class="control">
              {{network.name}}
            </p>
          </div>
        </div> -->
        <div class="navbar-item">
          <div class="field is-grouped">

            <div class="control">
              <div class="select">
                <select v-model="locale">
                  <option v-for="(item) in $config.i18n"
                          :key="item.locale"
                          :value="item.locale">
                    {{item.langDisplay}}</option>
                </select>
              </div>
            </div>

          </div>
        </div>
      </div>

    </nav>
    <div v-if="infos.length > 0" class="notification is-danger content" >
        <p v-for="(info,index) in infos" :key="index">{{info}}</p>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      network: {},
      infos: [],
    };
  },
  async created() {
    this.$store.dispatch('initLocale');
    this.$store.dispatch('FETCH_ME');
  },
  computed: {
    locale: {
      get() {
        const locale = this.$store.state.locale;
        const i18n = this.$config ? this.$config.i18n : [];
        const lang = i18n.find(
          item =>
            item.locale === locale ||
            item.aliases.some(alias => alias === locale),
        );
        return lang ? lang.locale : null;
      },
      set(value) {
        this.$store.dispatch('setLocale', value);
      },
    },
    me() {
      return this.$store.state.me;
    },
  },
  watch: {
    locale(val) {
      this.$i18n.locale = val;
    },
  },
};
</script>

<style>
.navbar.is-light, .navbar {
    background-color: transparent;
}
.navbar.is-light .navbar-brand .navbar-link, .navbar.is-light .navbar-brand>.navbar-item {
    color: floralwhite;
    margin-top: 26px;
    margin-left: 20px;
    height: 31px;
    transform: skew(-20deg);
    background: linear-gradient(#dcb84f60, #89540d60);
    font-size: 12px;
}
.transform{
  transform: skew(20deg);
}
@media screen and (min-width: 414px){

.logo_big{
  display: none;
}
}
@media screen and (max-width: 414px){
  .navbar-brand{
    flex-wrap: wrap;
  }
.logo{
  display:none;

}
.logo_big{
  display: block;
}
}
</style>

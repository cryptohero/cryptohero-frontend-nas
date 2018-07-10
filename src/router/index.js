import Vue from 'vue';
import Router from 'vue-router';
import ItemView from '@/views/ItemView';
import ListView from '@/views/ListView';
// import LoginView from '@/views/LoginView';
import FaqView from '@/views/FaqView';
import UserView from '@/views/UserView';
import TermView from '@/views/TermView';
import PrivacyView from '@/views/PrivacyView';
import InviteVie from '@/views/InviteView';
import RankingList from '@/views/RankingList';
import LuckyDraw from '@/views/LuckyDraw';
import Recommend from '@/views/RecommendView';
import ExchangeView from '@/views/ExchangeView';
import AirDrop from '@/views/AirDrop';

Vue.use(Router);

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: ListView,
    },
    {
      name: 'LuckyDraw',
      path: '/draw',
      component: LuckyDraw,
    },
    {
      name: 'LuckyDraw',
      path: '/draw/:address',
      component: LuckyDraw,
    },
    {
      name: 'AirDrop',
      path: 'airdrop',
      component: AirDrop,
    },

    // {
    //   name: 'Login',
    //   path: '/Login',
    //   component: LoginView,
    // },

    {
      name: 'Item',
      path: '/item/:id(\\d+)/:code',
      component: ItemView,
    },
    {
      name: 'User',
      path: '/user/:address',
      component: UserView,
    },
    {
      name: 'FAQ',
      path: '/faq',
      component: FaqView,
    },
    {
      name: 'Exchange',
      path: '/exchange',
      component: ExchangeView,
    },

    {
      name: 'Privacy',
      path: '/privacy-policy',
      component: PrivacyView,
    },
    {
      name: 'Term',
      path: '/terms-of-us',
      component: TermView,
    },
    {
      name: 'InviteVie',
      path: '/InviteVie',
      component: InviteVie,
    },
    {
      name: 'RankingList',
      path: '/RankingList',
      component: RankingList,
    },
    {
      name: 'Recommend',
      path: '/Recommend/:heroId/:num',
      component: Recommend,
    }
  ],
});

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: require('@/components/Index').default,
    },
    {
      path: '/editor',
      name: 'editor',
      component: require('@/components/Index/Editor').default,
    },
    {
      path: '/visual',
      name: 'visual',
      component: require('@/components/Index/Visual').default,
    },
    {
      path: '/preferences',
      component: require('@/components/Index/Preferences').default,
      children: [
        {
          path: '',
          name: 'pref-theming',
          component: require('@/components/Index/Preferences/Theming').default,
        },
        {
          path: 'typography',
          name: 'pref-typography',
          component: require('@/components/Index/Preferences/Typography').default,
        },
        {
          path: 'saves',
          name: 'pref-saves',
          component: require('@/components/Index/Preferences/Saves').default,
        },
        {
          path: 'languages',
          name: 'pref-languages',
          component: require('@/components/Index/Preferences/Languages').default,
        },
        {
          path: 'developers',
          name: 'pref-developers',
          component: require('@/components/Index/Preferences/Developers').default,
        },
      ],
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});

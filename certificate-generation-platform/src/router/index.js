import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';

const Home = () => import(/* webpackChunkName: "home" */ '../views/Home.vue');
const Competitions = () =>
  import(/* webpackChunkName: "competitions" */ '../views/Competitions.vue');
const Rights = () =>
  import(/* webpackChunkName: "rights" */ '../views/Rights.vue');

const Users = () =>
  import(/* webpackChunkName: "users" */ '../views/Users.vue');

const Roles = () =>
  import(/* webpackChunkName: "roles" */ '../views/Roles.vue');

  
const EventItem = () =>
  import(/* webpackChunkName: "eventItem" */ '../views/EventItem.vue');

  const CertCreate = () =>
    import(/* webpackChunkName: "certCreate" */ '../views/eventItem/CertCreate.vue');

 const CertManage = () =>
   import(
     /* webpackChunkName: "certManage" */ '../views/eventItem/CertManage.vue'
   );

   const EventManage = () =>
     import(
       /* webpackChunkName: "eventManage" */ '../views/eventItem/EventManage.vue'
     );
const DataVersion = () =>
  import(
    /* webpackChunkName: "dataVersion" */ '../views/eventItem/DataVersion.vue'
  );

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (location) {

return originalPush.call(this, location).catch(err => err)

}


Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/competitions',
        name: 'Competitions',
        component: Competitions,
      },
      {
        path: '/rights',
        name: 'Rights',
        component: Rights,
      },
      {
        path: '/users',
        name: 'Users',
        component: Users,
      },
      {
        path: '/roles',
        name: 'Roles',
        component: Roles,
      },
      {
        path: '/eventItem',
        name: 'EventItem',
        component: EventItem,
        children: [
          {
            path: '/certcreate',
            name: 'CertCreate',
            component: CertCreate,
          },
          {
            path: '/certmanage',
            name: 'CertManage',
            component: CertManage,
          },
          {
            path: '/eventmanage',
            name: 'EventManage',
            component: EventManage,
          },
          {
            path: '/dataversion',
            name: 'DataVersion',
            component: DataVersion,
          },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

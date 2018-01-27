import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import videoLink from '@/components/videoLink';
const home = ()=>  import('@/components/home');
const root = ()=> import('@/components/bodyTemplate');
const contact = ()=> import('@/components/contact');
const bug = ()=> import('@/components/bug');
const notFound = ()=> import('@/components/notFound');
const error = ()=> import('@/components/error');

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      component: root,
      children:[
      	{path:'',component:home,meta: { scrollToTop: true }},
      	{path:'/get/:id',component:videoLink,meta: { scrollToTop: true }},
      	{path:'/contact',component:contact,meta: { scrollToTop: true }},
      	{path:'/bug',component:bug,meta: { scrollToTop: true }},
      	{path:'/error/:id',component:error,meta: { scrollToTop: true }}
      ],
      meta: { scrollToTop: true }
    },
    {path:'*', component:root, children:[{path:'',component:notFound,meta: { scrollToTop: true }}]}
  ],
  scrollBehavior (to, from, savedPosition) {
  	return { x: 0, y: 0 }
  }
})

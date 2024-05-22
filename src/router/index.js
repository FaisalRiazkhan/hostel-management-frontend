import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import LoginComp from '../views/LoginComp.vue'
import LoginPage from '../views/LoginPage.vue'
import store from '../store';
import RegistrationPage from '@/views/RegistrationPage.vue';
import ListStudents from '@/components/Students/ListStudents.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/dashboard',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/signup',
      name: 'signup',
      component: RegistrationPage
    },
    {
      path: '/studentlist',
      name: 'studentlist',
      component: ListStudents
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  // const isAuthenticated = store.getters.isAuthenticated;
  const isAuthenticated = store.getters['auth/isAuthenticated'];

  if (requiresAuth && !isAuthenticated) {
    next('/');
  } else {
    next();
  }
});
export default router

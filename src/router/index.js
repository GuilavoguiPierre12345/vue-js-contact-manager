import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactManagerVue from '@/views/ContactManager.vue'
import AddContactVue from '@/views/AddContact.vue'
import EditContactVue from '@/views/EditContact.vue'
import ViewContactVue from '@/views/ViewContact.vue'
import PageNotFoundVue from '@/views/PageNotFound.vue'


const routes = [
  {
    path: '/', 
    name: 'home',
    redirect : "/contact", // le chemin de redirection de la route
    component: HomeView
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactManagerVue
  },
  {
    path: '/contact/add',
    name: 'addContact',
    component: AddContactVue
  },
  {
    path: '/contact/edit/:contactId',
    name: 'editContact',
    component: EditContactVue
  },
  {
    path: '/contact/view/:contactId',
    name: 'viewContact',
    component: ViewContactVue
  },
  {
    path: '/:patchMatch(.*)*', // n'importe lequel des chemins qui est emprunter
    name: 'PageNotFound',
    component: PageNotFoundVue
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

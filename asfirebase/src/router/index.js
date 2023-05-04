import { createRouter, createWebHistory } from 'vue-router'

import register from '../views/Register.vue'
import Login from '../views/Login.vue'
import axios from 'axios'
import Edit from '../views/Edit.vue'
import Ssa2 from '../components/Ssa2.vue'
import NascidosVIvos from '../components/NascidosVivos.vue'
import PowerBiDashboard from '../components/PowerBiDashboard.vue'
import home from '../views/Home'

import FormDeTeste from '../components/FormDeTeste.vue'

/////////////dashBoard///////////
import EditObitos from '../views/EditObitos'
import dashboard from '../pages/master/dashboard'
import adminpainel from '../pages/adminpainel'
import editarObitos from '../pages/editarObitos'
import Obitos from '../pages/Obitos'

//////////////////////////////


function AdminAuth(to, from, next){
  if(localStorage.getItem('token') != undefined){

    var req = {
      headers:{
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    }
    axios.post("http://localhost:8686/validate",{},req).then(res =>{
      console.log(res);
      next();

    }).catch(err =>{
      console.log(err.response);
      next("/login");
    });

  }else{
    next("/login");
  }
}


const routes = [
  
  {
    path: '/formteste',
    name: 'FormDeTeste',
    component: FormDeTeste
  }, 
  {
    path: '/home',
    name: 'home',
    component: home
  }, 
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path:'/',
    name: 'Login',
    component: Login
  },  
  {
    path: '/admin/users/edit/:id',
    name: 'UserEdit',
    component: Edit,
    beforeEnter: AdminAuth
  },
  {
    name: 'Dashboard',
    path: '/admin/users/Dashboard',
    component: dashboard,
    
    children: [
       {
        name: 'adminpainel',
        path: '/adminpainel',
        component:adminpainel
      },
      {
        name: 'obitos',
        path: '/obitos',
        component:Obitos
      },
      {
        name: 'editarObitos',
        path: '/editarObitos',
        component:editarObitos
      },
      {
        path: '/admin/users/editObitos/:id',
        name: 'EditObitos',
        component: EditObitos,
       //// beforeEnter: AdminAuth
      },
      {
      path: '/Ssa2',
      name: 'ssa2',
      component: Ssa2
      },
      {
      path: '/Nascidosvivos',
      name: 'nascidosvivos',
      component: NascidosVIvos
      },
      {
        path: '/powerbi',
        name: 'powerbi',
        component: PowerBiDashboard
      },
    ],
    ////beforeEnter: AdminAuth
  },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes

})

export default router



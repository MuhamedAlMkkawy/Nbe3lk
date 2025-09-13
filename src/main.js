import { createApp } from 'vue'


// import bootstrap ---------------------------------
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// import Default css File --------------------------
import './style.css'

// import firebase ----------------------------------
import './firebase';

// import auth function -----------------------------
import { isAuthenticated , isProfileCompleted } from './auth';

// import Vue Router3 -------------------------------
import { createRouter, createWebHashHistory  } from 'vue-router'


// import Store File(Vuex) --------------------------
import store from '../store/index.js'


// import Pages -------------------------------------
import App from './App.vue'


// -----------login -------------
import Login from './pages/Login/Login.vue'


// -----------signup ------------
import CreateAccount from './pages/Signup/createAccount.vue'
import activationCode from './pages/Signup/activationCode.vue'
import storeDetails from './pages/Signup/StoreDetails.vue'


// ------password recover --------
import PasswordRecover from './pages/Password/PasswordRecover.vue'
import passwordActivationCode from './pages/Password/passwordActivationCode.vue'
import CreateNewPassword from './pages/Password/CreateNewPassword.vue'


// ------Home page ---------------
import HomePage from './pages/Home/HomePage.vue'


// import nested pages ----------------
import HomeStatistics from './pages/Home/HomeStatistics/HomeStatistics.vue'
import Orders from './pages/Home/Orders/Orders.vue'
import OrdersDetails from './pages/Home/OrdersDetails/OrdersDetails.vue'
import Products from './pages/Home/Products/Products.vue'
import SingleProduct from './pages/Home/Products/SingleProduct.vue'
import AddSimpleProduct from './pages/Home/Products/AddSimpleProduct.vue'
import AddMultiThemeProduct from './pages/Home/Products/AddMultiThemeProduct.vue'
import SelectProductThemes from './pages/Home/Products/Multi-Themes Process/SelectProductThemes.vue'
import AddProductVaiants from './pages/Home/Products/Multi-Themes Process/AddProductVaiants.vue'
import MultiThemeProductsVariants from './pages/Home/Products/MultThemeProductsVariants/MultiThemeProductsVariants.vue';
import EditProduct from './pages/Home/Products/Edit-Product/EditProduct.vue';
import EditVariants from './pages/Home/Products/Edit-Variants/EditVariants.vue';
import ShowThemes from './pages/Home/Products/ShowThemes/ShowThemes.vue';
import ProductsReports from './pages/Home/ProductsReports/ProductsReports.vue'
import Ratings from './pages/Home/Ratings/Ratings.vue'
// import Delivery from './pages/Home/Delivery/Delivery.vue'
import FinancialTransactions from './pages/Home/FinancialTransactions/FinancialTransactions.vue'
import SettlementApps from './pages/Home/SettlementApps/SettlementApps.vue'
import SettlementSingleApp from './pages/Home/SettlementApps/SettlementSingleApp.vue'
import Users from './pages/Home/Users/Users.vue'
import EditUserValids from './pages/Home/Users/EditUserValids.vue'
import AddUser from './pages/Home/Users/AddUser.vue'
import Contact from './pages/Home/Contact/Contact.vue'
import Settings from './pages/Home/Settings/Settings.vue'
import UpdateInfoDetails from './pages/Home/Settings/UpdateInfoDetails.vue'
import UpdatePhone from './pages/Home/Settings/UpdatePhone.vue'
import ActivationCode from './pages/Home/Settings/ActivationCode.vue'
import UpdatePassword from './pages/Home/Settings/UpdatePassword.vue'
import Notifications from './pages/Home/Notifications/Notifications.vue'
import NotFound from './pages/NotFound/NotFound.vue';


// import Prime Vue Library ------------------------
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css'; 
import 'primeflex/primeflex.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import MultiSelect from 'primevue/multiselect';
import Calendar from 'primevue/calendar';
import ToastService from 'primevue/toastservice';


// import vue google maps --------------------------
import VueGoogleMaps from '@fawmi/vue-google-maps';
import * as deepEqual from 'fast-deep-equal';
import SettlementsOrders from './pages/Home/SettlementApps/SettlementsOrders.vue';



// Setup the Routes ---------------------------------
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/login' },


    // -----------login Route ------------------
    { 
      path: '/login', 
      name : 'Login' , 
      component: Login,
      // beforeEnter: (to, from, next) => {
      //   isAuthenticated() ? '' : next();
      // },
    },


    // -----------sign up Routes ---------------
    { 
      path: '/create-account', 
      name : 'CreateAccount' , 
      component: CreateAccount 
    },
    { 
      path: '/activation-code', 
      name : 'activationCode' , 
      component: activationCode
    },
    { 
      path: '/store-details', 
      name : 'storeDetails' , 
      component: storeDetails 
    },



    // -----------password recover -------------
    { 
      path: '/password-recover', 
      name : 'PasswordRecover' , 
      component: PasswordRecover ,
    },
    { 
      path: '/password-activation-code', 
      name : 'passwordActivationCode' , 
      component: passwordActivationCode ,
    },
    { 
      path: '/new-password', 
      name : 'CreateNewPassword' , 
      component: CreateNewPassword 
    },



    // ----------Home with nested Routes --------
    { path: '/home',
      name : 'HomePage' ,
      component: HomePage,
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          if (isProfileCompleted()) {
            next();
          }else {
            next({ name: 'storeDetails' });
          }
        } else {
          next({ name: 'Login' });
        }
      },
      children: [
        // ----------------- Home Statistics Of Last Orders -----------------
        {
          path: 'last-orders',
          name: 'HomeStatistics',
          component: HomeStatistics
        },
        // ----------------- Home Statistics Of All Orders ------------------
        {
          path: 'orders',
          name: 'Orders',
          component: Orders
        },
        // ----------------- Orders Details Page -----------------------------
        {
          path: 'orders-details/:id',
          name: 'OrderDetails',
          component: OrdersDetails
        },
        // --------------------------  Products ------------------------------
        {
          path: 'products',
          name: 'Products',
          component: Products
        },
        // -------------------------- Single Product --------------------------
        {
          path: 'product/:id',
          name: 'SingleProduct',
          component: SingleProduct
        },
        // -------------------------- Add Simple Product --------------------------
        {
          path: 'add-simple-product/',
          name: 'AddSimpleProduct',
          component: AddSimpleProduct
        },
        // ------------------------ Add MultiTheme Product ------------------------
        {
          path: 'add-multi-theme-product/',
          name: 'AddMultiThemeProduct',
          component: AddMultiThemeProduct
        },
        // ------------------------ Add MultiTheme Product ------------------------
        {
          path: 'select-product-themes/',
          name: 'SelectProductThemes',
          component: SelectProductThemes
        },
        // ------------------------ Add MultiTheme Product ------------------------
        {
          path: 'select-product-variants/',
          name: 'AddProductVaiants',
          component: AddProductVaiants
        },
        // ---------------------- MultiTheme Variants Product ---------------------
        {
          path: 'show-product-variants/:id',
          name: 'MultiThemeProductsVariants',
          component: MultiThemeProductsVariants
        },
        // ----------------------------- Edit Product -----------------------------
        {
          path: 'edit-product/:id',
          name: 'EditProduct',
          component: EditProduct
        },
        // ----------------------------- Edit Variants -----------------------------
        {
          path: 'edit-variants/:id',
          name: 'EditVariants',
          component: EditVariants
        },
        // ----------------------------- Show Themes -----------------------------
        {
          path: 'show-themes/:id',
          name: 'ShowThemes',
          component: ShowThemes
        },
        // -------------------------- Products Reports -------------------------
        {
          path: 'reports',
          name: 'ProductsReports',
          component: ProductsReports
        },
        // ----------------------- Delivery Of Products -----------------------
        // {
        //   path: 'delivery',
        //   name: 'Delivery',
        //   component: Delivery
        // },
        // ----------------------- Ratings Of Products -------------------------
        {
          path: 'ratings',
          name: 'Ratings',
          component: Ratings
        },
        // ------------ Finanicial Transictions => Reports ---------------------
        {
          path : 'financial-transactions',
          name: 'FinancialTransactions',
          component:FinancialTransactions
          },
        // ------------ Finanicial Transictions => Settlements -----------------
        {
          path : 'settlement-applications',
          name: 'SettlementApps',
          component:SettlementApps
        },
        // ------------ Finanicial Transictions => Settlements Single -----------------
        {
          path : 'settlement-single-app/:id',
          name: 'SettlementSingleApp',
          component:SettlementSingleApp
        },
        // ------------ Finanicial Transictions => Settlements Single -----------------
        {
          path : 'settlement-orders/',
          name: 'SettlementsOrders',
          component:SettlementsOrders
        },
        // ------------------------- Users Page --------------------------------
        {
          path :'users',
          name:'Users',
          component:Users
        },
        // ---------------------Edit User Valids Page --------------------------
        {
          path:'edit-user/:id',
          name: 'EditUserValids',
          component:EditUserValids
        },
        // --------------------------Add User Page ------------------------------
        {
          path:'add-user',
          name: 'AddUser',
          component:AddUser
        },
        // --------------------------- Contact Page ------------------------------
        {
          path:'contact',
          name: 'Contact',
          component:Contact
        },
        // --------------------------- Settings Page ------------------------------
        {
          path:'settings',
          name: 'Settings',
          component:Settings
        },
        // ---------------------- Edit Info Details Page ---------------------------
        {
          path:'update-info-details',
          name: 'UpdateInfoDetails',
          component:UpdateInfoDetails
        },
        // -------------------------- Update Phone Page -------------------------------
        {
          path:'update-phone',
          name: 'UpdatePhone',
          component:UpdatePhone
        },
        // ------------------- Activation New Phone Code Page --------------------------
        {
          path:'activation-newPhone',
          name: 'ActivationCode',
          component:ActivationCode
        },
        // ------------------------ Update Password Page -------------------------------
        {
          path:'update-password',
          name: 'UpdatePassword',
          component:UpdatePassword
        },
        // ------------------------- Notifications Page --------------------------------
        {
          path:'notifications',
          name: 'Notifications',
          component:Notifications
        },
      ]
    },
    { path: '/:catchAll(.*)', component: NotFound },
  ],
  scrollBehavior() {
    // Always scroll to the top after routing-------------
    return { top: 0 };
  },
})

const app = createApp(App);

app
.use(router)
.use(PrimeVue)
.component('MultiSelect', MultiSelect)
.component('Calendar', Calendar)
.use(ToastService)
.use(store)
.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAxKbPRJYB8-OtRces1p6kqhvk2NtAdJMQ', 
  },
})
.mount('#app')

import { createWebHistory, createRouter } from "vue-router";

import ProductsListView from "../views/ProductsListView.vue";
import ProductDetailsView from "@/views/ProductDetailsView.vue";

import CustomersListView from "../views/CustomersListView.vue";
import CustomerDetailsView from "@/views/CustomerDetailsView.vue";

import OrdersListView from "../views/OrdersListView.vue";
import OrderDetailsView from "@/views/OrderDetailsView.vue";

const routes = [
  { path: "/", redirect: "/products" },

  { path: "/products", component: ProductsListView },
  { path: "/products/:id", component: ProductDetailsView },

  { path: "/customers", component: CustomersListView },
  { path: "/customers/:id", component: CustomerDetailsView },

  { path: "/orders", component: OrdersListView },
  { path: "/orders/:id", component: OrderDetailsView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

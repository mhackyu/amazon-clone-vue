<template>
  <div class="orderItem">
    <h2>Order</h2>
    <p>{{ order.data.created | date }}</p>
    <p class="orderItem__id">
      <small>{{ order.id }}</small>
    </p>

    <CheckoutProduct
      v-for="(product, index) in order.data.basket"
      :key="index"
      :id="product.id"
      :title="product.title"
      :price="product.price"
      :rating="product.rating"
      :image="product.image"
      :hideRemoveButton="true"
    />

    <div class="orderItem__total">
      <h3>Total Order: ${{ (order.data.amount / 100) | currency }}</h3>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CheckoutProduct from '@/components/Product/Checkout';

export default {
  name: 'OrderItem',
  props: ['order'],
  computed: {
    ...mapGetters(['basketTotal'])
  },
  components: {
    CheckoutProduct
  }
};
</script>

<style lang="scss" scoped>
.orderItem {
  padding: 40px;
  margin: 20px 0;
  border: 1px solid lightgrey;
  background-color: white;
  position: relative;

  &__id {
    position: absolute;
    top: 40px;
    right: 20px;
  }

  &__total {
    font-weight: 500;
    text-align: right;
  }
}
</style>

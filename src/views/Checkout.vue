<template>
  <section class="checkout">
    <div class="checkout__left">
      <img
        src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
        alt="ads"
        class="checkout__ad"
      />
      <div>
        <h2 class="checkout__title">Your Shopping Basket</h2>

        <CheckoutProduct
          v-for="(product, index) in basket"
          :key="index"
          :id="product.id"
          :title="product.title"
          :price="product.price"
          :rating="product.rating"
          :image="product.image"
          :hideRemoveButton="false"
          @onRemove="handleRemove(index)"
        />
      </div>
    </div>
    <div class="checkout__right">
      <CheckoutSubTotal />
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import CheckoutProduct from '@/components/Product/Checkout';
import CheckoutSubTotal from '@/components/Checkout/SubTotal';

export default {
  name: 'Checkout',
  computed: {
    ...mapState(['basket'])
  },
  components: {
    CheckoutProduct,
    CheckoutSubTotal
  },
  methods: {
    handleRemove(idx) {
      this.$store.dispatch('removeProduct', idx);
    }
  }
};
</script>

<style lang="scss" scoped>
.checkout {
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  max-width: 1500px;
  padding: 20px;
  background-color: white;
  height: max-content;

  &__title {
    margin-right: 10px;
    padding: 10px 0;
    border-bottom: 1px solid lightgrey;
  }

  &__ad {
    width: 100%;
    margin-bottom: 10px;
  }

  & p {
    margin-top: 10px;
  }
}
</style>

<template>
  <div class="payment">
    <div class="payment__container">
      <h1>
        Checkout (<router-link to="/checkout"
          >{{ basket.length }} items</router-link
        >)
      </h1>
      <div class="payment__section">
        <div class="payment__title">
          <h3>Delivery Address</h3>
        </div>
        <div class="payment__address">
          <p>{{ user.email }}</p>
          <p>123 Awesome St.</p>
          <p>San Pedro City, Laguna, Philippines</p>
        </div>
      </div>
      <div class="payment__section">
        <div class="payment__title">
          <h3>Review items and delivery</h3>
        </div>
        <div class="payment__items">
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
      <div class="payment__section">
        <div class="payment__title">
          <h3>Payment Method</h3>
        </div>
        <div class="payment__details">
          <PaymentForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CheckoutProduct from '@/components/Product/Checkout';
import PaymentForm from '@/components/Payment/PaymentForm';

export default {
  name: 'Payment',
  computed: {
    ...mapState(['user', 'basket'])
  },
  data() {
    return {
      isLoading: false,
      stripe: null
    };
  },
  components: {
    CheckoutProduct,
    PaymentForm
  },
  methods: {
    handleRemove(idx) {
      this.$store.dispatch('removeProduct', idx);
    },
    async handleSubmit() {
      // console.log(this.stripe);
    }
  }
};
</script>

<style lang="scss" scoped>
.payment {
  background-color: white;

  &__container {
    & > h1 {
      text-align: center;
      padding: 10px;
      font-weight: 400;
      background-color: rgb(243, 237, 237);
      border-bottom: 1px solid lightgrey;

      & a {
        text-decoration: none;
      }
    }
  }

  &__section {
    display: flex;
    padding: 20px;
    margin: 0 20px;
    border-bottom: 1px solid lightgrey;
  }

  &__title {
    flex: 0.2;
  }

  &__address,
  &__items,
  &__details {
    flex: 0.8;
  }

  &__details {
    max-width: 400px;

    & > div > button {
      background: #f0c14b;
      border: 1px solid;
      border-radius: 2px;
      width: 100%;
      height: 30px;
      font-weight: bolder;
      margin-top: 10px;
      border-color: #a88734 #9c7e31 #846a29;
      color: #111;
      font-size: 18px;
    }
  }
}
</style>

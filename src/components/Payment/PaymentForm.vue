<template>
  <form @submit.prevent="handleSubmit" id="paymentForm">
    <div ref="card" id="card-element">
      <!--Stripe.js injects the Card Element-->
    </div>
    <small class="paymentForm__note"
      >Check available test cards
      <a href="https://stripe.com/docs/testing" target="_blank" rel="noreferrer"
        >here</a
      ></small
    >

    <div class="paymentForm__price">
      <button type="submit" :disabled="isLoading">
        <span v-if="isLoading">Please wait...</span>
        <span v-else> Pay $ {{ basketTotal | currency }} </span>
      </button>
    </div>
  </form>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { loadStripe } from '@stripe/stripe-js';
import { db } from '../../lib/firebase';
let stripe;
let card;

export default {
  name: 'PaymentForm',
  computed: {
    ...mapState(['basket', 'user', 'stripeClientSecret']),
    ...mapGetters(['basketTotal'])
  },
  data() {
    return {
      isLoading: false,
      card: null,
      cardError: null
    };
  },
  async mounted() {
    stripe = await loadStripe(process.env.VUE_APP_STRIPE_KEY);
    const elements = stripe.elements();
    const style = {
      base: {
        iconColor: 'black',
        color: 'black',
        fontWeight: 500,
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '18px',
        fontSmoothing: 'antialiased',
        ':-webkit-autofill': { color: '#fce883' },
        '::placeholder': { color: 'grey' }
      },
      invalid: {
        iconColor: 'red',
        color: 'red'
      }
    };
    card = elements.create('card', { style });
    card.mount(this.$refs.card);
    card.on('change', event => {
      this.cardError = event.error;
    });
  },
  methods: {
    async handleSubmit() {
      if (this.cardError) {
        return;
      }

      this.isLoading = true;

      // paymentIntent = payment confirmation
      const { paymentIntent } = await stripe.confirmCardPayment(
        this.stripeClientSecret,
        {
          payment_method: {
            card
          }
        }
      );

      db.collection('users')
        .doc(this.user.uid)
        .collection('orders')
        .doc(paymentIntent.id)
        .set({
          basket: this.basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created
        });

      this.$store.dispatch('emptyBasket');
      this.isLoading = false;
      this.$router.push('/orders');
    }
  },
  beforeDestroy() {
    card.destroy();
  }
};
</script>

<style lang="scss" scoped>
.paymentForm {
  &__price {
    & > h3 {
      padding-bottom: 20px;
    }

    & > button {
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

  &__note {
    margin-top: 10px;
  }
}
</style>

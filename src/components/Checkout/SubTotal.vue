<template>
  <div class="subtotal">
    <p>
      Subtotal ({{ basket.length }} items):
      <strong>${{ basketTotal | currency }}</strong>
    </p>
    <small class="subtotal__gift">
      <input type="checkbox" /> This order contains a gift
    </small>

    <button :disabled="basket.length === 0" @click="handleProceedToCheckout">
      Proceed to Checkout
    </button>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
  name: 'CheckoutSubTotal',
  computed: {
    ...mapState(['user', 'basket']),
    ...mapGetters(['basketTotal'])
  },
  methods: {
    handleProceedToCheckout() {
      if (this.user) {
        this.$router.push('/payment');
      } else {
        this.$router.push('login');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.subtotal {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 100px;
  padding: 20px;
  background-color: #f3f3f3;
  border: 1px solid #dddddd;
  border-radius: 3px;

  &__gift {
    display: flex;
    align-items: center;
  }

  &__gift > input {
    margin-right: 5px;
  }

  & > button {
    background-color: #f0c14b;
    border-radius: 2px;
    width: 100%;
    height: 30px;
    border: 1px solid;
    margin-top: 10px;
    border-color: #a88734 #9c7e31 #846a29;
    color: #111;

    &:disabled {
      background-color: #eecc77;
    }
  }
}
</style>

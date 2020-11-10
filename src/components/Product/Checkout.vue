<template>
  <div class="checkoutProduct">
    <img :src="image" alt="cover" class="checkoutProduct__image" />

    <div class="checkoutProduct__info">
      <p class="checkoutProduct__title">{{ title }}</p>
      <p class="checkoutProduct__price">
        <small>$</small>
        <strong>{{ price }}</strong>
      </p>
      <div class="checkoutProduct__rating">
        <p v-for="index in rating" :key="index">🌟</p>
      </div>
      <button @click="handleRemove" v-if="!hideRemoveButton">
        Remove from basket
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutProduct',
  props: ['id', 'title', 'price', 'rating', 'image', 'hideRemoveButton'],
  methods: {
    handleRemove(idx) {
      this.$emit('onRemove', idx);
    }
  }
};
</script>

<style lang="scss" scoped>
.checkoutProduct {
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;

  &__image {
    object-fit: contain;
    width: 180px;
    height: 180px;
  }

  &__info {
    padding-left: 20px;

    & > button {
      background: #f0c14b;
      border: 1px solid;
      margin-top: 10px;
      border-color: #a88734 #9c7e31 #846a29;
      color: #111;
    }
  }

  &__title {
    font-size: 17px;
    font-weight: 800;
  }

  &__rating {
    display: flex;
  }
}
</style>

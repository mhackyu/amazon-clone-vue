<template>
  <div class="product">
    <div class="product__info">
      <p>{{ title }}</p>
      <p class="product__price">
        <small>$</small>
        <strong>{{ price }}</strong>
      </p>
      <div class="product__rating">
        <p v-for="index in rating" :key="index">🌟</p>
      </div>
    </div>

    <img class="product__cover" :src="image" alt="cover" />

    <button @click="addToBasket">Add to Basket</button>
  </div>
</template>

<script>
export default {
  name: 'Product',
  props: ['id', 'title', 'price', 'rating', 'image'],
  methods: {
    addToBasket() {
      this.$store.dispatch('addProduct', {
        id: this.id,
        title: this.title,
        image: this.image,
        price: this.price,
        rating: this.rating
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.product {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  margin: 10px;
  padding: 20px;
  width: 100%;
  max-height: 400px;
  min-width: 100px;
  background-color: white;
  z-index: 1;

  &__info {
    height: 100px;
    margin-bottom: 15px;
  }

  &__cover {
    max-height: 200px;
    width: 100%;
    object-fit: contain;
    margin-bottom: 15px;
  }

  &__rating {
    display: flex;
  }

  & > button {
    background: #f0c14b;
    border: 1px solid;
    margin-top: 10px;
    border-color: #a88734 #9c7e31 #846a29;
    color: #111;
  }
}
</style>

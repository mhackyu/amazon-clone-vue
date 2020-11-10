<template>
  <div class="header">
    <router-link to="/">
      <img
        class="header__logo"
        src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        alt="logo"
      />
    </router-link>

    <div class="header__search">
      <input type="text" class="header__searchInput" />
      <SearchIcon class="header__searchIcon" />
    </div>

    <div class="header__nav">
      <a @click="handleUserSession" style="cursor: pointer;">
        <div class="header__option">
          <span class="header__optionLineOne">
            Hello, {{ user ? user.email : 'Guest' }}
          </span>
          <span class="header__optionLineTwo">
            {{ user ? 'Sign Out' : 'Sign In' }}
          </span>
        </div>
      </a>
      <router-link to="/orders">
        <div class="header__option">
          <span class="header__optionLineOne">Returns</span>
          <span class="header__optionLineTwo">& Orders</span>
        </div>
      </router-link>
      <a
        href="https://github.com/mhackyu/amazon-clone-vue"
        target="_blank"
        rel="noreferrer"
      >
        <div class="header__option">
          <span class="header__optionLineOne">Github</span>
          <span class="header__optionLineTwo">Repository</span>
        </div>
      </a>
      <router-link to="/checkout">
        <div class="header__optionBasket">
          <ShoppingBasketIcon />
          <span class="header__optionLineTwo header__basketCount">
            {{ basket.length }}
          </span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SearchIcon from 'vue-material-design-icons/Magnify';
import ShoppingBasketIcon from 'vue-material-design-icons/Basket';

export default {
  name: 'TheNavBar',
  components: {
    SearchIcon,
    ShoppingBasketIcon
  },
  computed: {
    ...mapState(['user', 'basket'])
  },
  methods: {
    handleUserSession() {
      if (this.user) {
        this.$store.dispatch('logout');
      }

      this.$router.push('/login');
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  display: flex;
  align-items: center;
  background-color: #131921;
  position: sticky;
  top: 0;
  z-index: 100;

  &__logo {
    width: 100px;
    margin: 0 20px;
    margin-top: 18px;
    object-fit: contain;
  }

  &__search {
    display: flex;
    flex: 1;
    align-items: center;
    border-radius: 24px;
  }

  &__searchInput {
    height: 12px;
    padding: 10px;
    border: none;
    width: 100%;
  }

  &__searchIcon {
    padding: 5px;
    height: 22px !important;
    background-color: #cd9042;
  }

  &__nav {
    display: flex;
  }

  &__basketCount {
    margin-left: 10px;
    margin-right: 10px;
  }

  &__option {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    margin-right: 10px;
    color: white;
  }

  &__optionLineOne {
    font-size: 10px;
  }

  &__optionLineTwo {
    font-size: 13px;
    font-weight: 800;
  }

  &__optionBasket {
    display: flex;
    align-items: center;
    color: white;
  }
}
</style>

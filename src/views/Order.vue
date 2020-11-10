<template>
  <section class="order">
    <h1>Your Orders</h1>
    <div class="orders__order">
      <OrderItem v-for="order in orders" :key="order.id" :order="order" />
    </div>
  </section>
</template>

<script>
import OrderItem from '@/components/Order/OrderItem';
import { mapState } from 'vuex';
import { db } from '../lib/firebase';
export default {
  name: 'Order',
  computed: {
    ...mapState(['user'])
  },
  components: {
    OrderItem
  },
  data() {
    return {
      orders: []
    };
  },
  mounted() {
    db.collection('users')
      .doc(this.user.uid)
      .collection('orders')
      .orderBy('created', 'desc')
      .onSnapshot(snapshot => {
        this.orders = snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }));
      });
  }
};
</script>

<style lang="scss" scoped>
.order {
  padding: 20px 80px;

  & > h1 {
    margin: 30px 0;
  }
}
</style>

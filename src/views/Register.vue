<template>
  <section class="login">
    <router-link to="/">
      <img
        class="login__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        alt="logo"
      />
    </router-link>

    <div class="login__container">
      <h1>Sign-up</h1>

      <form @submit.prevent="handleSubmit">
        <h5>Email</h5>
        <input type="email" v-model="email" :disabled="isLoading" />
        <p class="login__errorMessage" v-if="!$v.email.required && $v.$dirty">
          This is required.
        </p>
        <p class="login__errorMessage" v-if="!$v.email.email && $v.$dirty">
          Invalid email format.
        </p>
        <h5>Password</h5>
        <input type="password" v-model="password" :disabled="isLoading" />
        <p
          class="login__errorMessage"
          v-if="!$v.password.required && $v.$dirty"
        >
          This is required.
        </p>
        <p
          class="login__errorMessage"
          v-if="!$v.password.minLength && $v.$dirty"
        >
          Password must have at least
          {{ $v.password.$params.minLength.min }} letters.
        </p>
        <button class="login__signInButton" type="submit">
          {{ isLoading ? 'Please wait...' : 'Sign Up' }}
        </button>
      </form>

      <p>
        By signing-up you agree to the AMAZON CLONE Conditions of Use & Sale.
        Please see our Privacy Notice, our Cookies Notice and our Interest-Based
        Ads Notice.
      </p>

      <button
        class="login__registerButton"
        @click="() => this.$router.push('/login')"
        :disabled="isLoading"
      >
        Already have an account? Sign-in here
      </button>
    </div>
  </section>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators/';
export default {
  name: 'Register',
  data() {
    return {
      email: '',
      password: '',
      isLoading: false
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  methods: {
    handleSubmit() {
      this.$v.$touch();
      if (!this.$v.$error) {
        this.isLoading = true;
        this.$store
          .dispatch('register', { email: this.email, password: this.password })
          .then(() => {
            alert('You are now registered!');
            this.$router.push('/login');
            this.isLoading = false;
          })
          .catch(error => {
            alert(error.message);
            this.isLoading = false;
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  height: 100vh;
  background-color: white;
  flex-direction: column;
  align-items: center;

  &__logo {
    margin-top: 20px;
    margin-bottom: 20px;
    object-fit: contain;
    width: 100px;
    margin-right: auto;
    margin-left: auto;
  }

  &__container {
    display: flex;
    flex-direction: column;
    width: 300px;
    height: fit-content;
    border: 1px solid lightgrey;
    border-radius: 5px;
    padding: 20px;

    & > h1 {
      font-weight: 500;
      font-size: 28px;
      margin-bottom: 20px;
    }

    & > p {
      margin-top: 15px;
      font-size: 12px;
    }

    & > form > h5 {
      margin-bottom: 5px;
      margin-top: 5px;
    }

    & > form > input {
      height: 30px;
      margin-bottom: 10px;
      background-color: white;
      width: 98%;
    }
  }

  &__signInButton {
    background-color: #f0c14b;
    border-radius: 2px;
    width: 100%;
    height: 30px;
    border: 1px solid;
    margin-top: 10px;
    border-color: #a88734 #9c7e31 #846a29;
    color: #111;
  }

  &__registerButton {
    border-radius: 2px;
    width: 100%;
    height: 30px;
    border: 1px solid;
    margin-top: 10px;
    border-color: darkgray;
  }

  &__errorMessage {
    font-size: 14px;
  }
}
</style>

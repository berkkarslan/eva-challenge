<template>
  <b-row class="mt-5">
    <b-col md="8" class="m-auto">
      <h3 class="text-center">Sign In</h3>
      <b-form-group label="Email address" class="mt-3">
        <b-form-input type="email" v-model="email" autocomplete="off" />
      </b-form-group>
      <b-form-group label="Password">
        <b-form-input type="password" v-model="password"  autocomplete="off"/>
      </b-form-group>
      <b-button class="btn-lg btn-block" @click="login">Sign In</b-button>
    </b-col>
  </b-row>
</template>

<script>
export default {
  data () {
    return {
      email: 'homework@eva.guru',
      password: 'Homeworkeva1**'
    }
  },
  methods: {
    login () {
      this.$store.dispatch('loginAttemp', { email: this.email, password: this.password })
        .then((response) => {
          if (response.userId) {
            this.$router.push('/')
          } else {

          }
        })
    }
  }
}
</script>

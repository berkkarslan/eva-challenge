<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>

<template>
  <b-container class="mt-3 position-relative">
    <b-row class="border-bottom">
      <b-col>
        <b-row>
          <b-col
            class="d-flex justify-content-center justify-content-md-start col-sm-12 col-md-6"
          >
            <router-link to="/"> Home </router-link>
          </b-col>
          <b-col
            class="d-flex justify-content-md-end justify-content-center col-sm-12 col-md-6"
          >
            <div v-if="$store.getters.isLoggedIn">
              <b-button @click="logout" variant="link">Logout</b-button>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row class="d-flex justify-content-center mt-3">
      <b-col class="col-md-12 col-lg-10">
        <router-view />
      </b-col>
    </b-row>
  </b-container>
</template>

<style lang="scss">
@import "./assets/style.css";
</style>

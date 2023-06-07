<template>
  <div class="container">
    <my-header></my-header>
    <router-view></router-view>
  </div>
</template>

<script>
import MyHeader from './components/Header.vue'
export default {
  name: 'App',
  components: {
    'my-header': MyHeader
  }
}
</script>

<style>

</style>

<template>
<nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="/board">CoockCoock</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Manage
          </a>
          <div class="dropdown-menu">
            <div class="dropdown-item" v-for="link in links" :key="link.id">
              <router-link :to="'${link.page}'" class="link-secondary" style=text-decoration:none;>{{ link.text}}</router-link>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
export default {
    name: "MyHeader",
    data() {
      return {
        links: [
          {
            id: 1,
            page: '/ingredients',
            text: 'Ingredient'
        },
        {
            id: 2,
            page: '/logout',
            text: 'Logout'
        }]
      }
    }
}
</script>

<style scoped>
</style>
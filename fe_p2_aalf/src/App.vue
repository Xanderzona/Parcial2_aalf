<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="100" height="100" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/programas">Programas</RouterLink>
        <RouterLink to="/niveles-academicos">Niveles Académicos</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  padding-left: 1rem;
}

.logo {
  display: block;
  margin: 0 0 2rem 0;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: left;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    /* Apilar el contenido del header y centrarlo */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: calc(var(--section-gap) / 2);
    padding-left: 1rem;
  }

  .logo {
    /* logo centrado encima del contenido */
    margin: 0 0 1rem 0;
  }

  header .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: nowrap;
    text-align: center;
  }

  nav {
    text-align: center;
    margin-left: 0;
    font-size: 1rem;
    padding: 0.5rem 0;
    margin-top: 0.75rem;
  }

  /* Quitar la línea vertical y espaciar los enlaces cuando están centrados */
  nav a {
    border-left: 0;
    margin: 0 0.5rem;
  }
}
</style>

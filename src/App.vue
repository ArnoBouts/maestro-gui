<template>
  <div id="app">
  <section class="container grid-1280">
    <header class="navbar">
      <section class="navbar-section">
        <a class="btn btn-lg btn-link btn-action show-sm" v-on:click="showSidebar()"><i class="icon icon-menu"></i></a>
        <a href="#" class="navbar-brand mr-10">Maestro</a>
        <a href="#/applications" class="btn btn-link">Applications</a>
        <a href="#/users" class="btn btn-link">Users</a>
      </section>
      <section class="navbar-section">
        <a href="#" class="btn btn-link">Logout</a>
      </section>
    </header>
  </section>
  <section class="container grid-1280">
    <section class="columns">
      <div class="sidebar column col-3 col-sm-12" v-bind:class="{ 'sidebar-visible': isSidebarVisible }">
        <ul class="sidebar-nav nav">
          <li class="nav-item active">
            <a href="index.html#introduction">Getting started</a>
            <ul class="nav">
              <li class="nav-item">
                <a href="index.html#introduction">Introduction</a>
              </li>
              <li class="nav-item">
                <a href="index.html#installation">Installation</a>
              </li>
              <li class="nav-item">
                <a href="index.html#compiling">Custom version</a>
              </li>
              <li class="nav-item">
                <a href="index.html#browsers">Browser support</a>
              </li>
              <li class="nav-item">
                <a href="index.html#whatsnew">What's new</a>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <a href="elements.html">Elements</a>
          </li>
          <li class="nav-item">
            <a href="layout.html">Layout</a>
          </li>
          <li class="nav-item">
            <a href="components.html">Components</a>
          </li>
          <li class="nav-item">
            <a href="utilities.html">Utilities</a>
          </li>
          <li class="nav-item">
            <a href="experimentals.html">Experimentals</a>
          </li>
        </ul>
      </div>
      <a class="nav-clear" v-on:click="sowSidebar()"></a>

      <div class="column col-9 col-sm-12">
        <router-view></router-view>
      </div>
    </section>
  </section>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      isSidebarVisible: false
    }
  },
  methods: {
    showSidebar: function () {
      this.isSidebarVisible = !this.isSidebarVisible
    }
  }
}
</script>

<style>
@media screen and (min-width: 601px) {
  .section-header .navbar-section {
    padding: 0 .5rem;
  }
  .sidebar {
    padding: 7rem 1rem 5rem 1rem;
  }
  .sidebar .sidebar-nav {
    position: relative;
  }
  @supports ((position: -webkit-sticky) or (position: sticky)) {
    .sidebar .sidebar-nav {
      position: sticky;
      position: -webkit-sticky;
      top: 8rem;
    }
    .sidebar .sidebar-nav .nav-item a:focus {
      box-shadow: none;
    }
  }
}
.nav-clear {
  display: none;
}
@media screen and (max-width: 600px) {
  .sidebar {
    background: #fff;
    height: 100%;
    left: 0;
    overflow-y: auto;
    padding: 6rem 3rem;
    position: fixed;
    top: 0;
    -webkit-transform: translateX(-100%);
    -ms-transform: translateX(-100%);
    transform: translateX(-100%);
    transition: transform .2s ease, -webkit-transform .2s ease;
    transition: transform .2s ease;
    transition: -webkit-transform .2s ease;
    width: 24rem;
    z-index: 400;
  }
  .sidebar .sidebar-visible {
    -webkit-transform: translateX(0);
    -ms-transform: translateX(0);
    transform: translateX(0);
    transition: transform .2s ease, -webkit-transform .2s ease;
    transition: transform .2s ease;
    transition: -webkit-transform .2s ease;
  }
  .sidebar .sidebar-visible + .nav-clear {
    display: block;
  }
  .nav-clear {
    background: rgba(0, 0, 0, .15);
    display: none;
    height: 100%;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    width: 100%;
    z-index: 300;
  }
}
</style>

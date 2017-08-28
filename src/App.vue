<template>
  <div id="app">
    <nav class="navbar ">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <h1 class="title">Maestro</h1>
        </a>

        <div class="navbar-burger burger" v-bind:class="{'is-active': isSidebarVisible}" data-target="navMenubd-example" v-on:click="showSidebar">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navMenubd-example" class="navbar-menu" v-bind:class="{'is-active': isSidebarVisible}">
        <div class="navbar-start">
          <a class="navbar-item " href="#/applications">
            Applications
          </a>
          <a class="navbar-item " href="#/users">
            Users
          </a>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <a class="button is-primary" href="#">
                  <span class="icon">
                    <i class="fa fa-download"></i>
                  </span>
                  <span>Logout</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <router-view></router-view>
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

</style>

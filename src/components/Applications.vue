<template>
  <div>
    <div class="card" v-for="(app, name) in catalog.Apps">
      <div class="card-header">
        <h4 class="card-title">{{app.DisplayName}}</h4>
        <h6 class="card-subtitle">Software and hardware</h6>
      </div>
      <div class="card-body">
        Empower every person and every organization on the planet to achieve more.
      </div>
      <div class="card-footer">
        <span v-if="services.Services[name]">Installed</span>
        <span v-if="services.Services[name] && services.Services[name].Enable">Active</span>
        <button class="btn btn-primary" v-if="!services.Services[name]" v-on:click="install(name)">Install</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'applications',
  data () {
    return {
      catalog: {
        Apps: []
      },
      services: {
        Services: []
      }
    }
  },
  mounted: function () {
    this.$http.get('/catalog').then(response => {
      this.catalog = JSON.parse(response.body)
      // this.catalog = response.body
    })
    this.$http.get('/services').then(response => {
      this.services = JSON.parse(response.body)
      // this.services = response.body
    })
  },
  methods: {
    install: function (service) {
      // Open pop-up to confirm and provide parameters
      this.$resource('services{/service}/install').save({service: service}, {}).then(response => {
      })
    },
    enable: function () {
    },
    disable: function () {
    },
    uninstall: function () {
    }
  }
}
</script>

<style>
</style>

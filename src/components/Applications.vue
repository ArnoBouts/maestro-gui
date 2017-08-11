<template>
  <div>
    <div v-for="(app, name) in catalog.Apps">
      <span>
        {{app.DisplayName}}
        <span v-if="services.Services[name]">Installed</span>
        <span v-if="services.Services[name] && services.Services[name].Enable">Active</span>
        <button v-if="!services.Services[name]" v-on:click="install(name)">Install</button>
      </span>
    </div>
  <div>
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
      this.catalog = response.body
    })
    this.$http.get('/services').then(response => {
      this.services = response.body
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

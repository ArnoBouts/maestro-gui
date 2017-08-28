<template>
  <div class="container">
  <div class="columns is-multiline">
    <div class="column is-4" v-for="(app, name) in catalog.Apps">
      <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img src="http://bulma.io/images/placeholders/96x96.png" alt="Image">
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{{app.DisplayName}}</p>
            <p class="subtitle is-6">Subtitle</p>
          </div>
        </div>
        <div class="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus nec iaculis mauris. <a>@bulmaio</a>.
          <a>#css</a> <a>#responsive</a>
          <br>
          <small>11:09 PM - 1 Jan 2016</small>
          <span class="tag" v-if="services.Services[name]">Installed</span>
          <span class="tag is-success" v-if="services.Services[name] && services.Services[name].Enable">Enabled</span>
        </div>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item" v-if="!services.Services[name]" v-on:click="install(name)">Install</a>
        <a class="card-footer-item" v-if="services.Services[name]" v-on:click="uninstall(name)">Uninstall</a>
        <a class="card-footer-item" v-if="services.Services[name] && !services.Services[name].Enable">Enable</a>
        <a class="card-footer-item" v-if="services.Services[name] && services.Services[name].Enable">Disable</a>
      </footer >
    </div>
  </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'applications',
  data () {
    return {
      catalog: JSON.parse('{"Workdir":"/maestro","Apps":{"jsxc":{"DisplayName":"Jsxc","Updater":"","Required":false,"Params":null,"LdapGroup":"","Install":null},"kresus":{"DisplayName":"Kresus","Updater":"","Required":false,"Params":null,"LdapGroup":"","Install":null},"ldap":{"DisplayName":"Ldap","Updater":"","Required":true,"Params":null,"LdapGroup":"","Install":null},"maestro":{"DisplayName":"maestro","Updater":"maestro-updater","Required":true,"Params":{"LDAP_ADMIN_PASSWORD":{"Required":true,"Default":""},"MAESTRO_DOMAIN":{"Required":true,"Default":""}},"LdapGroup":"","Install":null},"mail":{"DisplayName":"Mail Server","Updater":"","Required":false,"Params":null,"LdapGroup":"mail","Install":[{"Service":"mail","Command":["maestro-generate-dkim-config"]}]},"nextcloud":{"DisplayName":"Nextcloud","Updater":"","Required":false,"Params":{"ADMIN_PASSWORD":{"Required":true,"Default":""},"ADMIN_USER":{"Required":true,"Default":""}},"LdapGroup":"nextcloud","Install":[{"Service":"nextcloud","Command":["occ","app:enable","user_ldap"]}]},"prosody":{"DisplayName":"Prosody","Updater":"","Required":false,"Params":null,"LdapGroup":"","Install":null},"traefik":{"DisplayName":"Traefik","Updater":"","Required":true,"Params":null,"LdapGroup":"","Install":null}}}'),
      services: JSON.parse('{"Services":{"jsxc":{"Name":"jsxc","Enable":true,"Checksum":"a49b27894b8b68ed1df3bbb37b82e139a6143605028b61edf2046633799038b5","Params":{}},"ldap":{"Name":"ldap","Enable":true,"Checksum":"e90e1f6a92f531b4053ed2178650ffa61b5ad9cca74a3424bea16168c73ae6ee","Params":{}},"maestro":{"Name":"maestro","Enable":true,"Checksum":"9ffeb87d8767806683dd6bb67fc1ac4a74464467e18bd52ce1dab47770442416","Params":{"LDAP_ADMIN_PASSWORD":"admin","MAESTRO_DOMAIN":"bouts.me"}},"maestro-updater":{"Name":"maestro-updater","Enable":false,"Checksum":"4564172f55766f6c648f50fbef65a850ddb0703f4a61be7387b89df6eba67a0c","Params":{}},"mail":{"Name":"mail","Enable":true,"Checksum":"ac013c9e743b9883be58d47a696f6188ce52d2ea6723f7795101514a17e189c3","Params":{}},"nextcloud":{"Name":"nextcloud","Enable":true,"Checksum":"76a224493faa5a299315836e772ca1c264b6f19ebec8d376474c5f56b4ee3c24","Params":{"ADMIN_PASSWORD":"admin","ADMIN_USER":"admin"}},"prosody":{"Name":"prosody","Enable":false,"Checksum":"229692acdf8037f4c8d371c79c6d9a8370dd38f50fd35cfa2482ee15020d510f","Params":{}},"traefik":{"Name":"traefik","Enable":true,"Checksum":"2411ee6f56e5327fda2b692c41f07ecf6f1d44b934b521a27c36776befd36050","Params":{}}}}')
    }
  },
  mounted: function () {
    this.$http.get('/catalog').then(response => {
      // this.catalog = JSON.parse(response.body)
      this.catalog = response.body
    })
    this.$http.get('/services').then(response => {
      // this.services = JSON.parse(response.body)
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

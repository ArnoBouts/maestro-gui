<template>
  <div class="container">
    <div class="columns col-oneline">
      <div class="column col-2">cn</div>
      <div class="column col-2">sn</div>
      <div class="column col-2">mail</div>
      <div class="column col-6">
        <div class="text-center">Services</div>
        <div class="columns">
          <div class="column col-3" v-for="group in groups">{{group.cn}}</div>
        </div>
      </div>
    </div>

    <div class="columns col-oneline" v-for="user in users">
      <div class="column col-2">{{user.cn}}</div>
      <div class="column col-2">{{user.sn}}</div>
      <div class="column col-2">{{user.mail}}</div>
      <div class="column col-6">
        <div class="columns">
          <div class="column col-3" v-for="(grant, service) in grants[user.dn]">
            <label class="form-checkbox">
              <input type="checkbox" v-model="grant.granted" v-on:change.stop="grantService(service, user.dn)" />
              <i class="form-icon"></i>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'users',
  data () {
    return {
      users: JSON.parse('[{"dn":"cn=home,ou=people,dc=home","cn":"home","sn":"home","mail":"","gidNumber":0,"uidNumber":0},{"dn":"cn=arnaud,ou=people,dc=home","cn":"arnaud","sn":"Arnaud Bouts","mail":"arnaud@bouts.me","gidNumber":901,"uidNumber":901}]'),
      groups: JSON.parse('[{"dn":"cn=mail,ou=groups,dc=home","cn":"mail","members":["","cn=arnaud,ou=people,dc=home"]},{"dn":"cn=nextcloud,ou=groups,dc=home","cn":"nextcloud","members":[""]}]')
    }
  },
  mounted: function () {
    this.$http.get('/person').then(response => {
      this.users = response.body
    })
    this.$http.get('/groups').then(response => {
      this.groups = response.body
    })
  },
  computed: {
    grants: function () {
      var gts = {}
      for (var user in this.users) {
        console.log('user:')
        console.log(user)
        gts[this.users[user].dn] = {}
        for (var group in this.groups) {
          gts[this.users[user].dn][this.groups[group].dn] = { granted: this.isServiceGranted(this.users[user], this.groups[group]) }
        }
      }
      console.log('grants:')
      console.log(gts)
      return gts
    }
  },
  methods: {
    isServiceGranted: function (user, group) {
      console.log(user.dn)
      console.log(group.members)
      for (var member in group.members) {
        if (group.members[member] === user.dn) {
          return true
        }
      }
      return false
    },
    grantService: function (service, user) {
      this.$http.patch('/persons/' + user + '/services/' + service, this.grants[user][service].granted).then(response => {
      }, response => {
        this.grants[user][service].granted = !this.grants[user][service].granted
      })
    }
  }
}
</script>

<style>
</style>

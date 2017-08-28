<template>
  <div class="container">
    <div class="columns">

      <div class="column is-6">

        <div class="columns">
          <div class="column is-4">Login</div>
          <div class="column is-4 is-hidden-touch">Name</div>
          <div class="column is-4 is-hidden-touch">Email</div>
        </div>
        <div class="columns" v-for="user in users">
          <div class="column is-4">{{user.cn}}</div>
          <div class="column is-4 is-hidden-touch">{{user.sn}}</div>
          <div class="column is-4 is-hidden-touch">{{user.mail}}</div>
        </div>
        <div class="columns">
          <div class="column is-4"><input type="text" v-model="newUser.cn" /></div>
          <div class="column is-4 is-hidden-touch"><input type="text" v-model="newUser.sn" /></div>
          <div class="column is-4 is-hidden-touch"><input type="text" v-model="newUser.mail" /></div>
        </div>

      </div>
      <div class="column is-5">

        <div class="columns">
          <div class="column is-6" v-for="group in groups">{{group.cn}}</div>
        </div>
        <div class="columns" v-for="user in users">
          <div class="column is-6" v-for="(grant, service) in grants[user.dn]">
            <label class="checkbox">
              <input type="checkbox" v-model="grant.granted" v-on:change.stop="grantService(service, user.dn)" />
            </label>
          </div>
        </div>
      </div>
      <div class="column is-1">

        <div class="columns">
          <div class="column is-1">
          </div>
        </div>
        <div class="columns" v-for="user in users">
          <div class="column is-12">
            <button class="button is-small" v-on:click="deleteUser(user.dn)"><i class="fa fa-user-times"></i></button>
          </div>
        </div>
        <div class="columns">
          <div class="column is-1">
            <button class="button is-small" v-on:click="addUser(newUser.cn, newUser.sn, newUser.mail)"><i class="fa fa-user-plus"></i></button>
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
      groups: JSON.parse('[{"dn":"cn=mail,ou=groups,dc=home","cn":"mail","members":["","cn=arnaud,ou=people,dc=home"]},{"dn":"cn=nextcloud,ou=groups,dc=home","cn":"nextcloud","members":[""]}]'),
      newUser: {}
    }
  },
  mounted: function () {
    this.$http.get('/persons').then(response => {
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
    },
    addUser: function (cn, sn, mail) {
      this.$http.post('/persons', {dn: 'cn=' + cn + ',ou=people,dc=home', cn: cn, sn: sn, mail: mail, uidNumber: 0, gidNumber: 0}).then(response => {
      })
    },
    deleteUser: function (user) {
      this.$http.delete('/persons/' + user).then(response => {
        alert('deleted')
      })
    }
  }
}
</script>

<style>
</style>

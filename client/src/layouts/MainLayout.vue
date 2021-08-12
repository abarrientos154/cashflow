<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-primary"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
        <div class="column items-center justify-center">
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar.png">
          </q-avatar>
          <div class="q-mt-md text-white">NOMBRE DE EMPRESA</div>
        </div>

        </q-item-label>
        <side-bar />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import SideBar from 'components/SideBar.vue'
export default {
  name: 'MainLayout',
  components: { SideBar },
  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>

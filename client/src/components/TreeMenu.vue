<template>
  <div>
    <template v-for="item in menu">
      <q-expansion-item v-model="expand[index]" v-if="can(item.permission) && item.children" expand-separator :icon="item.icon" :label="item.label" :content-inset-level="0.25" :key="item.label" :default-opened="item.defaultOpened" :to="item.to"
        expand-icon-class="text-white" :header-class="expand[index] ? 'bg-red text-white' : 'bg-primary text-white'">
        <tree-menu v-if="item.children" :menu="item.children" :children="item" :key="item.label"/>
      </q-expansion-item>
      <q-item v-if="can(item.permission) && !item.children" clickable v-ripple :key="item.label" :to="item.to" @click="active_link_menu = item.to" :active="active_link_menu === item.to" active-class="my-menu-link">
        <q-item-section avatar v-if="item.icon">
          <q-icon :name="item.icon" :color="active_link_menu === item.to ? 'white' : 'black'"/>
        </q-item-section>
        <q-item-section class="text-white">
          {{ item.label }}
        </q-item-section>
      </q-item>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TreeMenu',
  props: ['menu', 'children', 'index'],
  data () {
    return {
      isOpen: false,
      active_link_menu: '',
      expand: []
    }
  },
  computed: {
    ...mapGetters('generals', ['can'])
  }
}
</script>

<style lang="scss">
.my-menu-link {
  color: white;
  background-color: rgba(255,255,255, 0.2);
  border-right: 3px solid #FF8585;
}
</style>

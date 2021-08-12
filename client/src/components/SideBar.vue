<template>
  <q-list bordered class="rounded-borders">
    <template v-for="item in profile">
      <q-item
        v-if="can(item.permission)"
        :key="item.label"
        clickable
        v-ripple
        :to="item.to"
        @click="active_link_menu = item.to"
        :active="active_link_menu === item.to"
        active-class="item-menu--active"
      >
        <q-item-section avatar>
          <q-icon
            :name="item.icon"
            :color="active_link_menu === item.to ? 'white' : 'black'"
          />
        </q-item-section>
        <q-item-section>
          <span class="text-red">{{ item.label }}</span>
        </q-item-section>
      </q-item>
    </template>
    <q-item-label header>
      <span class="text-white">Menu</span>
    </q-item-label>
    <template v-for="(item, index) in menu">
      <q-expansion-item
      v-model="expand[index] "
        v-if="can(item.permission) && item.children"
        expand-separator
        :icon="item.icon"
        :label="item.label"
        :content-inset-level="0.25"
        :key="item.label"
        :default-opened="item.defaultOpened"
        :to="item.to"
        :header-class="expand[index] ? 'bg-red text-white' : 'bg-primary text-white'"
        expand-icon-class="text-white"
      >
        <tree-menu
          v-if="item.children"
          :menu="item.children"
          :children="item"
          :key="item.label"
        />
      </q-expansion-item>
      <q-item
        v-if="can(item.permission) && !item.children"
        clickable
        v-ripple
        :to="item.to"
        :key="item.label"
        @click="active_link_menu = item.to"
        :active="active_link_menu === item.to"
        active-class="item-menu--active"
      >
        <q-item-section avatar v-if="(item.icon)">
          <q-icon
            :name="item.icon"
            :color="active_link_menu === item.to ? 'white' : 'black'"
          />
        </q-item-section>
        <q-item-section class="text-white">
          {{ item.label }}
        </q-item-section>
      </q-item>
    </template>
  </q-list>
</template>

<script>
import TreeMenu from './TreeMenu'
import { mapGetters } from 'vuex'
export default {
  name: 'SideBar',
  components: { TreeMenu },
  data () {
    return {
      expand: [],
      profile: [
      ],
      menu: [
        {
          label: 'Dasboard',
          icon: '',
          to: '',
          permission: 2,
          children: [
            {
              label: 'Dasboard',
              icon: '',
              to: '',
              permission: 2,
              children: [
                {
                  label: 'Dasboard',
                  icon: '',
                  to: '',
                  permission: 2,
                  children: [
                    {
                      label: 'Dasboard',
                      icon: '',
                      to: '/inicio',
                      permission: 2
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label: 'Pos',
          icon: '',
          to: '',
          permission: 2
        },
        {
          label: 'Ventas',
          icon: '',
          to: '',
          permission: 2
        },
        {
          label: 'Compras',
          icon: '',
          to: '',
          permission: 2
        },
        {
          label: 'Inventario',
          icon: '',
          to: '',
          permission: 2
        },
        {
          label: 'Bancos',
          icon: '',
          to: '',
          permission: 2
        },
        {
          label: 'Contabilidad',
          icon: '',
          to: '',
          permission: 2
        },
        {
          label: 'Proyectos',
          icon: '',
          to: '',
          permission: 2
        },
        {
          label: 'Maestros',
          icon: '',
          to: '',
          permission: 2
        },
        {
          label: 'Herramientas',
          icon: '',
          to: '',
          permission: 2
        }
      ],
      active_link_menu: ''
    }
  },
  computed: {
    ...mapGetters('generals', ['can'])
  },
  mounted () {
    this.active_link_menu = this.$router.currentRoute.path
  },
  methods: {}
}
</script>

<style lang="scss">
.item-menu--active {
  color: white;
  background-color: rgba(255,255,255, 0.2);
  border-right: 3px solid #FF8585;
}
</style>

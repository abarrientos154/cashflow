<template>
  <div class="window-width">
    <div class="column items-start q-mt-md">
      <div class="q-pl-md q-pt-md row items-center">
        <q-img src="favicon.ico" width="70px" height="70px" />
        <div class="q-pl-sm text-primary text-bold text-h6"> CashFlow </div>
      </div>
      <div class="row full-width justify-between">
        <div class="col-xs-grow col-sm-6 col-md-6 q-pa-md">
          <q-card class="q-pa-xl" style="border-radius:12px">
            <div class="text-bold text-h5">Iniciar sesión</div>
            <div class="column q-mt-lg">
              <div class="column">
                <div class="column">
                  <div class="text-grey text-bold q-pb-sm text-uppercase"> Empresa </div>
                  <q-input v-model="form.company" placeholder="Empresa" outlined dense />
                </div>

                <div class="column q-mt-lg">
                  <div class="text-grey text-bold q-pb-sm text-uppercase"> Usuario </div>
                  <q-input v-model="form.email" placeholder="Usuario" outlined dense />
                </div>

                <div class="column q-mt-lg">
                  <div class="text-grey text-bold q-pb-sm text-uppercase"> Contraseña </div>
                  <q-input v-model="form.password" placeholder="Contraseña" outlined dense :type="isPwd ? 'password' : 'text'">
                    <template v-slot:append>
                      <q-icon class="cursor-pointer" :name="isPwd ? 'lock' : 'lock_open'" color="primary" @click="isPwd = !isPwd" />
                    </template>
                  </q-input>
                </div>
              </div>
              <div class="row q-mt-md items-center justify-center">
                <q-checkbox v-model="olv" label="Mantenerme registrado" />
                <q-space />
                <div class="text-blue cursor-pointer"> ¿Olvidó su contraseña? </div>
              </div>
              <div class="q-mt-sm">
                <q-btn label="Login" color="primary" class="full-width q-py-xs" push @click="logueo()" />
              </div>
              <div class="row items-center justify-center q-mt-md">
                <div>¿No posees una cuenta?</div>
                <div class="text-blue cursor-pointer q-pl-md" @click="$router.push('registro')">Regístrate</div>
              </div>
            </div>
          </q-card>
        </div>
        <div class="col-xs-grow col-sm-6 col-md-6 q-pa-lg">
          <div class="column ">
            <div class="text-caption text-grey">RECIENTE</div>
            <div class="q-mt-sm text-bold" style="font-size:20px"> 4 consejos para facilitar el registro de ingresos en tu empresa. </div>
            <br>
            <p>
              Tiempo de lectura: 2 minutos
              El ingreso se puede definir como la cantidad de efectivo que recibe una empresa por la venta de sus productos o servicios.
              La información es la base fundamental en la que debe estar apoyada la toma de decisiones.
              Registrar los ingresos de tu empresa no solo te permitirá contribuir a llevar una contabilidad organizada....
            </p>
            <a class="cursor-pointer text-blue">LEER MAS</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      form: {},
      isPwd: true,
      olv: false
    }
  },
  methods: {
    ...mapMutations('generals', ['login']),
    async logueo () {
      this.$q.loading.show()
      await this.$api.post('login', this.form).then(res => {
        this.$q.loading.hide()
        if (res) {
          console.log(res, 'login res')
          this.login(res)
          this.$router.push('inicio')
        }
      })
    }
  }
}
</script>

<style>

</style>

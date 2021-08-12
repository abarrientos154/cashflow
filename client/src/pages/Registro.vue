<template>
  <div>
    <q-card class="column items-center justify-center">
      <q-card class="column items-start justify-center">
        <div class="q-pl-md q-pt-md row items-center">
          <q-img src="favicon.ico" width="50px" height="50px" />
          <div class="q-pl-sm text-primary text-bold text-h6"> CashFlow </div>
        </div>
          <div class="column items-center justify-center">
            <q-card class="q-pa-xl" style="border-radius:12px">
              <div class="text-bold text-h5">Iniciate en CashFlow</div>
              <div class="column q-mt-lg">
                <div class="column">

                  <div class="row">
                    <div class="column q-mr-md">
                      <div class="text-grey text-bold q-pb-sm text-uppercase"> Nombre </div>
                      <q-input v-model="form.name" placeholder="Nombre" outlined dense :error="$v.form.name.$error" @blur="$v.form.name.$touch()" />
                    </div>
                    <div class="column">
                      <div class="text-grey text-bold q-pb-sm text-uppercase"> Apellido </div>
                      <q-input v-model="form.last_name" placeholder="Apellido" outlined dense :error="$v.form.last_name.$error" @blur="$v.form.last_name.$touch()" />
                    </div>
                  </div>

                  <div class="column q-mr-md q-mt-lg">
                    <div class="text-grey text-bold q-pb-sm text-uppercase"> Email </div>
                    <q-input v-model="form.email" placeholder="Email" type="email" outlined dense :error="$v.form.email.$error" @blur="$v.form.email.$touch()" />
                  </div>

                  <div class="column q-mt-lg">
                    <div class="text-grey text-bold q-pb-sm text-uppercase"> Contraseña </div>
                    <q-input v-model="password" placeholder="Contraseña" outlined dense :type="isPwd ? 'password' : 'text'" :error="$v.password.$error" @blur="$v.password.$touch()" >
                      <template v-slot:append>
                        <q-icon class="cursor-pointer" :name="isPwd ? 'lock' : 'lock_open'" color="primary" @click="isPwd = !isPwd" />
                      </template>
                    </q-input>
                  </div>

                  <div class="column q-mt-lg">
                    <div class="text-grey text-bold q-pb-sm text-uppercase"> Empresa </div>
                    <q-input v-model="form.company" placeholder="Empresa" outlined dense  :error="$v.form.company.$error" @blur="$v.form.company.$touch()"/>
                  </div>

                  <div class="column q-mr-md q-mt-lg">
                    <div class="text-grey text-bold q-pb-sm text-uppercase"> Dominio </div>
                    <q-input v-model="form.dominio" placeholder="Dominio" type="email" suffix="@cashflow.do" outlined dense :error="$v.form.dominio.$error" @blur="$v.form.dominio.$touch()"/>
                  </div>

                </div>
                <div class="column items-center justify-center">
                <div class="row q-mt-md items-center justify-center">
                  <q-checkbox class="text-grey" v-model="terminos" label="Yo acepto los" :error="$v.terminos.$error" @blur="$v.terminos.$touch()"/>
                  <div class="text-blue cursor-pointer q-pl-xs" @click="$router.push('')">Terminos de usos</div>
                  <div class="q-ml-xs">&</div>
                  <div class="text-blue cursor-pointer q-pl-xs" @click="$router.push('')">Politica de privacidad</div>
                  </div>
                  <div v-if="!terminos && aviso" >
                    <div class="text-negative text-h7" > Debe Aceptar los terminos </div>
                  </div>
                </div>
                <div class="q-mt-sm">
                  <q-btn label="Crear cuenta" color="primary" class="full-width q-py-xs" push @click="registrarse()" />
                </div>
                <div class="row items-center justify-center q-mt-md">
                  <div>¿Desea iniciar sesion?</div>
                  <div class="text-blue cursor-pointer q-pl-md" @click="$router.push('/login')">Iniciar sesión</div>
                </div>
              </div>
            </q-card>
          </div>
      </q-card>
    </q-card>
  </div>
</template>
<script>
import { required, email, maxLength, minLength } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      form: {},
      terminos: false,
      isPwd: true,
      password: '',
      aviso: false
    }
  },
  validations: {
    form: {
      name: { required },
      last_name: { required },
      email: { email, required },
      company: { required },
      dominio: { required }
    },
    password: { required, maxLength: maxLength(256), minLength: minLength(6) },
    terminos: { required }

  },
  methods: {
    async registrarse () {
      this.$v.form.$touch()
      this.$v.terminos.$touch()
      if (!this.$v.form.$error && !this.$v.password.$error && this.terminos) {
        this.form.password = this.password
        this.form.dominio = this.form.dominio + '@cashflow.do'
        this.$api.post('register', this.form).then(res => {
          if (res) {
            this.$q.notify({
              message: 'Usuario Creado con Exito',
              color: 'positive'
            })
            this.form = {}
            this.password = ''
            this.$router.go(-1)
          }
        })
      } else {
        this.$q.notify({
          message: 'Faltan campos por llenar',
          color: 'negative'
        })
      }
    },
    async registrarse2 () {
      this.$v.form.$touch()
      this.$v.terminos.$touch()
      if (!this.terminos) {
        this.aviso = true
      }
      if (!this.$v.form.$error && !this.$v.password.$error && this.terminos) {
        this.form.password = this.password
        this.form.dominio = this.form.dominio + '@cashflow.do'
        console.log(this.form, 'datos')
      }
    }
  }
}
</script>

<style>

</style>

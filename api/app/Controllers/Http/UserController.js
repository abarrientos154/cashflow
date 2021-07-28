"use strict";

const User = use("App/Models/User")
const Role = use("App/Models/Role")
const Email = use('App/Functions/Email')
const fs = require('fs')
const Helpers = use('Helpers')
const mkdirp = use('mkdirp')
const { validate } = use("Validator")
const Hash = use('Hash')
const Env = use('Env')
const View = use('View')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class UserController {

  async logueoSinContrasena ({ auth, response, params, request }) {
    let body = request.only(['email'])
    let user = await User.findBy(body.email)
    let token = await auth.generate(user)
    let data = {}
    data.HEV_SESSION_INFO = token
    return data
  }

  async recuperacion({ request, response, params }) {
    if (((await User.where({email: params.email}).fetch()).toJSON()).length) {
      let codigo = randomize('Aa0', 30)
      await User.query().where({email: params.email}).update({codigoRecuperacion: codigo})
      let user = (await User.query().where({email: params.email}).first()).toJSON()
      console.log(user, 'user')
      let mail = await Email.sendMail(params.email, 'Recuperacion de Correo', `
          <h1 style="text-align:left">
            Tu Contrasena
          </h1>
          <p>
            Hola ${user.name ? user.name : user.full_name}
            Quieres cambiar tu contrasena vinculada a esta cuenta? si es asi
            confirmar la sociedad. Este enlace es temporal y caduca a las 24 horas
          </p>
          <p>
            Si no tienes intencion de cambiar tu contrasena, ignorar este email. No
            te preocupes. Tu cuenta esta segura.
          </p>
          <p>
            Un saludo de parte del equipo de Hevent.
          </p>
          <div>
            <button style="width:200px;height:45px;background:#009CFF;color:white;border-radius:12px;border:0px solid red"
            >
            <a style="color:white" href="${Env.get('FRONT_URL', '')}login_cliente/${codigo}">CONFIRMAR</a>
            </button>
          </div>
      `)
      console.log(mail)
      response.send(user)
    } else {
      response.unprocessableEntity([{
        message: 'El correo ingresado no existe'
      }])
    }
  }



  async editarPCliente ({ request, response, auth }) {
    // get currently authenticated user
    const user = auth.current.user
    console.log(user, 'ser')

    // verify if current password matches
    const verifyPassword = await Hash.verify(
        request.input('oldPassword'),
        user.password
    )

    // display appropriate message
    if (!verifyPassword) {
      console.log('asd')
      response.unprocessableEntity([{
        message: 'Contraseña Actual Incorrecta'
      }])
    } else {
      console.log('asasdd')
      user.password = request.input('password')
      await user.save()
      response.send(user)
    }

  }

  async index({ request, response, view }) {
    let users = await User.all();
    response.send(users);
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async register({ request, response }) {
    let requestAll = request.all()
    const validation = await validate(request.all(), User.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else if (((await User.where({email: requestAll.email}).fetch()).toJSON()).length) {
      response.unprocessableEntity([{
        message: 'Correo ya registrado en el sistema!'
      }])
    } else {
      let body = request.only(User.fillable)
      const rol = body.roles
      body.roles = [rol]
      const user = await User.create(body)
      // const user = body
      // Email.sendMail(body.email, 'Bienvenido a hevent', 'A partir de Ahora Formas Parte De Nuestra Plataforma')
      // const user = body
      response.send(user)
    }
  }

  async validateEmail({ request, response, params }) {
    if (((await User.where({email: params.email}).fetch()).toJSON()).length) {
      response.unprocessableEntity([{
        message: 'Correo ya registrado en el sistema!',
        error: true
      }])
    } else {
      response.send({error: false})
    }
  }

  async userInfo({ request, response, auth }) {
    const user = (await auth.getUser()).toJSON()
    response.send(user)
  }



  async login({ auth, request }) {
    const { email, password } = request.all();
    let token = await auth.attempt(email, password)
    const user = (await User.findBy('email', email)).toJSON()
    let isUser = false
    token.roles = user.roles.map(roleMap => {
      if (roleMap === 3) {
        isUser = true
      }
      return roleMap
    })
    let userRoles = await Role.whereIn('id', token.roles).fetch()
    let permissions = userRoles.toJSON()
    token.permissions = []
    permissions.forEach(element => {
      element.permissions.forEach(element2 => {
        token.permissions.push(element2)
      })
    })

    console.log(permissions, 'permissions')
    token.email = user.email
    let data = {}
    data.CASHFLOW_SESSION_INFO = token
    return data
  }


}

module.exports = UserController;

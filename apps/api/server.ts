/*
|--------------------------------------------------------------------------
| AdonisJs Server
|--------------------------------------------------------------------------
|
| The contents in this file is meant to bootstrap the AdonisJs application
| and start the HTTP server to accept incoming connections. You must avoid
| making this file dirty and instead make use of `lifecycle hooks` provided
| by AdonisJs service providers for custom code.
|
*/

import 'reflect-metadata'
import sourceMapSupport from 'source-map-support'
import { Ignitor } from '@adonisjs/core/build/standalone'
import i18next from 'i18next'
import { z } from 'zod'
import { zodI18nMap } from 'zod-i18n-map'
import translation from 'zod-i18n-map/locales/pt/zod.json'

i18next.init({
  lng: 'pt',
  resources: {
    pt: { zod: translation },
  },
})

z.setErrorMap(zodI18nMap)

sourceMapSupport.install({ handleUncaughtExceptions: false })

new Ignitor(__dirname).httpServer().start()

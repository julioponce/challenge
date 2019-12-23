import Vue from 'vue'
import Vuex from 'vuex'
import storage from 'vuejs-storage'

import People from '@/store/modules/peopleStore'
import Species from '@/store/modules/speciesStore'
import Films from '@/store/modules/filmsStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    People,
    Species,
    Films
  },
  plugins: [
    storage({
      namespace: 'localStore',
      storage: window.localStorage,
      keys: [
        'People.rawData',
        'People.people',
        'Species.rawData',
        'Species.species',
        'Films.charactersFilms'
      ]
    })
  ]
})

import Vue from 'vue'
import Vuex from 'vuex'

import admin from './modules/admin'
import identification from './modules/identification'
import pawnRecords from './modules/pawnRecords'
import coinRecords from './modules/coinRecords'
import coins from './modules/coins'
import hold from './modules/hold'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		admin,
		identification,
		pawnRecords,
		coinRecords,
		coins,
		hold
	}
})

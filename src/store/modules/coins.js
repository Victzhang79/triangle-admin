const state = {
	progressDlgVisible: false,
	fundItem: null
};

const getters = {
	progressDlgVisible: state => state.progressDlgVisible,
	fundItem: state => state.fundItem
};

const mutations = {
	changeProgressDlgVisible(state, value) {
		state.progressDlgVisible = value;
	},
	changeFundItem(state, value) {
		// console.log('value:', value)
		state.fundItem = value;
	}
};

export default {
	state,
	getters,
	mutations
};

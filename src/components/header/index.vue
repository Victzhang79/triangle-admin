<template>
	<div class="header">
		<img src="../../assets/imgs/logo_2x.png" alt="aoabank">
		<span class="logoTxt">波点钱包</span>
		<p class="user">
			<span>欢迎，{{username}}</span>
			<el-button v-if="username!=='请登录'" @click="logout" class="logoutBtn" size="mini">退出</el-button>
		</p>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	computed: {
		...mapGetters(['username'])
	},
	methods: {
		logout() {
			this.$store.commit('logout');
			this.$router.push('/');
		}
	}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>

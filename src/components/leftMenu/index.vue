<template>
	<ul class="menu-list">
		<li v-for="item in menuList" :key="item.index" :class="{chosed: item.path == choseMenu}" v-if="item.authLevel<=userAuth" @click="pageTrans(item.path)" class="item">{{item.name}}</li>
	</ul>
</template>

<script>
import { mapGetters } from 'vuex';
import menuList from './menu.config.js';
export default {
	computed: {
		...mapGetters(['userType']),
		userAuth() {
			return this.userType === 'super' ? 2 : 1; //管理员权限等级
		}
	},
	data() {
		return {
			menuList: menuList,
			choseMenu: ''
		};
	},
	watch: {
		$route() {
			// 对路由变化作出响应...
			this.choseMenu = this.$route.path.split('/')[1];
		}
	},
	methods: {
		pageTrans(path) {
			this.$router.push(path);
			this.choseMenu = path;
		}
	},
	created() {
		// 根据初始路由初始化菜单选中项
		this.choseMenu = this.$route.path.split('/')[1];
	}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>

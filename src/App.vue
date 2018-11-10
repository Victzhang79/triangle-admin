<template>
	<div id="app">
		<el-container style="height: 100%;">
			<el-header style="padding: 0;">
				<Header></Header>
			</el-header>
			<el-container>
				<el-aside style="box-shadow: 4px 2px 5px 0px #eee;" width="180px">
					<left-menu></left-menu>
				</el-aside>
				<el-main>
					<router-view/>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>
<script>
import Header from './components/header';
import LeftMenu from './components/leftMenu';
export default {
	components: {
		Header,
		LeftMenu
	}
};
</script>


<style lang="scss">
@import './assets/css/reset.scss';
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	// position: fixed;
	// top: 0;
	// bottom: 0;
	// left: 0;
	// right: 0;
}
#nav {
	padding: 30px;
	a {
		font-weight: bold;
		color: #2c3e50;
		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>

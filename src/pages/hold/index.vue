<template>
	<div class="user-page">
		<div v-if="userType==='super'">
			<h1 class="title">代持管理</h1>
			<p class="query">
				<span>手机：</span>
				<el-input v-model="searchMobile" placeholder="请输入内容" style="width: 200px" maxlength="11" size="small"></el-input>
				<el-button @click="search" style="margin-left: 20px;" size="small" type="primary">搜索</el-button>
				<el-button @click="reset" style="margin-left: 20px;" size="small">重置</el-button>
			</p>
			<el-table size="small" :data="holdInfoList" border style="width: 100%">
				<el-table-column fixed prop="userMobile" label="用户手机" width="120">
				</el-table-column>
				<el-table-column prop="userName" label="姓名" width="100">
				</el-table-column>
				<el-table-column label="币种" width="100">
					<template slot-scope="scope">{{coinTypes[scope.row.holdCoinCode]}}</template>
				</el-table-column>
				<el-table-column prop="totalNum" label="代持数量" width="150">
				</el-table-column>
				<el-table-column prop="cansellNum" label="可售代持" width="100">
				</el-table-column>
				<el-table-column prop="soldNum" label="已售代持" width="100">
				</el-table-column>
				<el-table-column prop="entrustNum" label="委托出售代持" width="100">
				</el-table-column>
				<el-table-column prop="lastOpTime" label="上一次操作时间" width="130">
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="300">
					<template slot-scope="scope">
						<el-button @click="sendHold(scope)" type="primary" size="small" plain>发放代持</el-button>
						<el-button @click="unlockHold(scope)" type="primary" size="small" plain>解锁代持</el-button>
						<el-button @click="sellHold(scope)" type="primary" size="small" plain>出售代持</el-button>
					</template>
				</el-table-column>
			</el-table>
			<operate-hold :visible="operateHoldVisible" :params="operateParam" @close="operateHoldVisible=false"></operate-hold>
		</div>
		<div v-else>
			无权限
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import operateHold from '../../components/operateHold';
export default {
	computed: {
		...mapGetters(['holdInfoList', 'userType'])
	},
	data() {
		return {
			coinTypes: {
				'8': 'AOK'
			},
			searchMobile: '',
			operateHoldVisible: false,
			operateParam: {} //userId, opType
		};
	},
	created() {
		this.refreshList();
	},
	methods: {
		refreshList(mobile) {
			if (mobile) {
				this.$store.dispatch('changeHoldInfoList', {
					userMobile: mobile
				});
			} else {
				this.$store.dispatch('changeHoldInfoList', {
					userMobile: undefined
				});
			}
		},
		search() {
			if (!this.searchMobile) {
				this.refreshList();
				return false;
			}
			if (
				/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/.test(
					this.searchMobile
				)
			) {
				this.refreshList(this.searchMobile);
			} else {
				this.$message.error('您输入的号码格式有误！');
			}
		},
		reset() {
			this.searchMobile = '';
			this.refreshList();
		},
		sendHold(scope) {
			this.operateParam = {
				userId: scope.row.userId,
				opType: '1'
			};
			this.operateHoldVisible = true;
		},
		unlockHold(scope) {
			this.operateParam = {
				userId: scope.row.userId,
				opType: '2'
			};
			this.operateHoldVisible = true;
		},
		sellHold(scope) {
			this.operateParam = {
				userId: scope.row.userId,
				opType: '3'
			};
			this.operateHoldVisible = true;
		}
	},
	components: {
		operateHold
	}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>

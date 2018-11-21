<template>
	<div class="user-page">
		<h1 class="title">定存明细</h1>
		<p class="query">
			<span>手机号： </span>
			<el-input size="small" style="width: 150px;" v-model="searchMobile" placeholder="请输入内容"></el-input>
			<el-button style="margin-left: 20px;" size="small" type="primary" @click="search">查询</el-button>
			<el-button style="margin-left: 20px;" size="small" type="primary" icon="el-icon-refresh" @click="refresh"></el-button>
		</p>
		<el-table size="small" :data="depositDetailList" border style="width: 100%">
			<el-table-column fixed prop="depositId" label="定存记录ID">
			</el-table-column>
			<el-table-column label="定存类型">
				<template slot-scope="scope">{{depositTypes[scope.row.depositType]}}</template>
			</el-table-column>
			<el-table-column prop="depositNum" label="定存数量">
			</el-table-column>
			<el-table-column prop="createTime" label="定存时间">
			</el-table-column>
		</el-table>
		<div class="pagination">
			<el-pagination layout="prev, pager, next" :page-size="ddPageSize" :total="ddTotalNum" :current-page="ddPageNo" @current-change="changePage" background>
			</el-pagination>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	computed: {
		...mapGetters([
			'depositDetailList',
			'ddPageSize',
			'ddPageNo',
			'ddTotalNum'
		])
	},
	data() {
		return {
			searchMobile: '', // 手机号查询
			depositTypes: [
				'',
				'5天',
				'10天',
				'30天',
				'90天',
				'180天',
				'360天',
				'1000天'
			]
		};
	},
	created() {
		this.$store.dispatch('updateDepositDetailList');
	},
	methods: {
		// 分页页码变化
		changePage(val) {
			this.$store.commit('changeDepositDetailQuerys', {
				ddPageNo: val
			});
			this.$store.dispatch('updateDepositDetailList');
		},
		// 根据号码查询
		search() {
			if (!this.searchMobile) {
				this.$store.commit('changeDepositDetailQuerys', {
					ddPageNo: 1,
					ddMobile: 0
				});
				this.$store.dispatch('updateDepositDetailList');
				return false;
			}
			if (
				/^((13[0-9])|(14[5-9])|(15[0-3,5-9])|(16[5,6])|(17[0-8])|(18[0-9])|(19[8,9]))\d{8}$/.test(
					this.searchMobile
				)
			) {
				this.$store.commit('changeDepositDetailQuerys', {
					ddPageNo: 1,
					ddMobile: this.searchMobile
				});
				this.$store.dispatch('updateDepositDetailList');
			} else {
				this.$message.error('您输入的号码格式有误！');
			}
		},
		refresh() {
			this.searchMobile = '';
			this.search();
		}
	}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>

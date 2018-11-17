<template>
	<div class="user-page">
		<h1 class="title">用户管理</h1>
		<p class="query">
			<!-- <span>排序： </span>
			<el-select size="small" style="margin-right: 30px;" v-model="orderTypeModel" placeholder="请选择">
				<el-option v-for="item in orderTypeOps" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select> -->
			<span>手机号： </span>
			<el-input size="small" style="width: 150px;" v-model="searchMobile" placeholder="请输入内容"></el-input>
			<el-button style="margin-left: 20px;" size="small" type="primary" @click="search">查询</el-button>
		</p>
		<el-table size="small" :data="userList" border style="width: 100%">
			<el-table-column fixed prop="userMobile" label="用户手机" width="120">
			</el-table-column>
			<el-table-column prop="createTime" label="注册时间" width="150">
			</el-table-column>
			<el-table-column label="身份级别" width="100">
				<template slot-scope="scope">{{scope.row.isLeader==='1'?'领导人': '普通用户'}}</template>
			</el-table-column>
			<el-table-column prop="firstSubNum" label="一级下级" width="80">
			</el-table-column>
			<el-table-column prop="totalSubNum" label="总下级" width="100">
			</el-table-column>
			<el-table-column prop="firstAPerformance" label="一级业绩" width="120">
			</el-table-column>
			<el-table-column prop="totalPerformance" label="总业绩" width="120">
			</el-table-column>
			<el-table-column prop="withdrawableNum" label="可提数量" width="120">
			</el-table-column>
			<el-table-column prop="lockedNum" label="锁仓数量" width="120">
			</el-table-column>
			<el-table-column prop="canReleaseNum" label="可释放" width="120">
			</el-table-column>
			<el-table-column label="账号状态" width="120">
				<template slot-scope="scope">{{scope.row.userStatus==='1'?'可用':'停用'}}</template>
			</el-table-column>
			<el-table-column label="提币状态" width="120">
				<template slot-scope="scope">{{scope.row.withdrawStatus==='1'?'可提':'禁止'}}</template>
			</el-table-column>
			<el-table-column fixed="right" label="账户操作" width="100">
				<template slot-scope="scope">
					<el-button :class="{disalbedOp:scope.row.userStatus==='0'}" @click="operateCount(scope, '0')" type="text" size="small">停用</el-button>
					<el-button :class="{disalbedOp:scope.row.userStatus==='1'}" @click="operateCount(scope, '1')" type="text" size="small">启用</el-button>
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="提币操作" width="100">
				<template slot-scope="scope">
					<el-button :class="{disalbedOp:scope.row.withdrawStatus==='1'}" @click="operateStatus(scope, '1')" type="text" size="small">允许</el-button>
					<el-button :class="{disalbedOp:scope.row.withdrawStatus==='0'}" @click="operateStatus(scope, '0')" type="text" size="small">禁止</el-button>
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="锁仓管理" width="120">
				<template slot-scope="scope">
					<el-button type="text" @click="operateHolds(scope, '1')" size="small">发放</el-button>
					<el-button type="text" @click="operateHolds(scope, '2')" size="small">锁定</el-button>
					<el-button type="text" @click="operateHolds(scope, '3')" size="small">解锁</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination">
			<el-pagination layout="prev, pager, next" :page-size="uPageSize" :total="uTotalNum" :current-page="uPageNo" @current-change="changePage" background>
			</el-pagination>
		</div>
		<operate-hold :visible="operateHoldVisible" :params="operateParam" @close="operateHoldVisible=false"></operate-hold>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import operateHold from '../../components/operateHold';
import { updateUserStatus, updateWithdrawStatus } from '@/apis/user.js';
export default {
	computed: {
		...mapGetters([
			'uOrderType',
			'userList',
			'uPageSize',
			'uPageNo',
			'uTotalNum'
		]),
		orderTypeModel: {
			get() {
				return this.uOrderType;
			},
			set(val) {
				this.$store.commit('changeUserQuerys', {
					uOrderType: val,
					uMobile: 0
				});
				this.$store.dispatch('updateUserList');
			}
		}
	},
	data() {
		return {
			orderTypeOps: [
				{
					value: '0',
					label: '待审核'
				},
				{
					value: '1',
					label: '已通过'
				},
				{
					value: '2',
					label: '已拒绝'
				},
				{
					value: '-1',
					label: '全部'
				}
			],
			credentTypes: {
				'1': '居民身份证',
				'2': '护照',
				'3': '士官证',
				'4': '港澳通行证',
				'9': '其他'
			},
			searchMobile: '', // 手机号查询
			operateHoldVisible: false,
			operateParam: {} //userId, opType
		};
	},
	created() {
		this.$store.dispatch('updateUserList');
	},
	methods: {
		// 分页页码变化
		changePage(val) {
			this.$store.commit('changeUserQuerys', {
				uPageNo: val
			});
			this.$store.dispatch('updateUserList');
		},
		// 根据号码查询
		search() {
			if (!this.searchMobile) {
				this.$store.commit('changeUserQuerys', {
					uPageNo: 1,
					uMobile: 0
				});
				this.$store.dispatch('updateUserList');
				return false;
			}
			if (
				/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/.test(
					this.searchMobile
				)
			) {
				this.$store.commit('changeUserQuerys', {
					uPageNo: 1,
					uMobile: this.searchMobile
				});
				this.$store.dispatch('updateUserList');
			} else {
				this.$message.error('您输入的号码格式有误！');
			}
		},
		// 锁仓管理 opType: 1-发放，2-锁定，3-解锁
		operateHolds(scope, opType) {
			this.operateParam = {
				userId: scope.row.userId,
				opType: opType
			};
			this.operateHoldVisible = true;
		},
		// 账户操作 opType: 0-停用，1-启用
		operateCount(scope, opType) {
			this.$notify.info({
				title: '功能开发中',
				message: '账户操作功能开发中，请耐心等待。'
			});
			return;
			//
			if (scope.row.userStatus === opType) {
				return;
			}
			this.$confirm(
				'确定要' + (opType === '0' ? '停用' : '启用') + '此账号?',
				'提示',
				{
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}
			)
				.then(() => {
					updateUserStatus(scope.row.userId, opType);
				})
				.catch(() => {
					// console.log('')
				});
		},
		// 提币操作 opType: 0-禁止，1-允许
		operateStatus(scope, opType) {
			this.$notify.info({
				title: '功能开发中',
				message: '提币操作功能开发中，请耐心等待。'
			});
			return;
			//
			if (scope.row.withdrawStatus === opType) {
				return;
			}
			this.$confirm(
				(opType === '0' ? '禁止' : '允许') + '此账号提币?',
				'提示',
				{
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}
			)
				.then(() => {
					updateWithdrawStatus(scope.row.userId, opType);
				})
				.catch(() => {
					// console.log('')
				});
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

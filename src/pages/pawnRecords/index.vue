<template>
	<div class="pawnRecord-page">
		<h1 class="title">用户典当记录</h1>
		<ul class="querys">
			<li class="item">
				<span>币种选择：</span>
				<el-select style="width: 120px;" size="small" v-model="coinTypeModel" placeholder="请选择">
					<el-option v-for="item in coinTypeOps" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</li>
			<li class="item">
				<span>用户选择：</span>
				<el-select style="width: 120px;" size="small" v-model="userTypeModel" placeholder="请选择">
					<el-option v-for="item in userTypeOps" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</li>
			<li class="item">
				<el-date-picker value-format="yyyy-MM-dd" size="small" v-model="dateRangeModel" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="dateRangeOps">
				</el-date-picker>
			</li>
		</ul>
		<el-table size="small" :data="pawnRecordsList" border style="width: 100%">
			<el-table-column fixed type="index" label="序号" width="50">
			</el-table-column>
			<el-table-column prop="userMobile" label="用户手机" width="120">
			</el-table-column>
			<el-table-column prop="pawnDate" label="抵押时间" width="100">
			</el-table-column>
			<el-table-column label="抵押币种" width="100">
				<template slot-scope="scope">{{pawnCoinTypes[scope.row.pawnCoinCode]}}</template>
			</el-table-column>
			<el-table-column prop="pawnNum" label="抵押数量" width="100">
			</el-table-column>
			<el-table-column prop="pawnPrice" label="抵押价格" width="120">
			</el-table-column>
			<el-table-column prop="closePrice" label="平仓价格" width="120">
			</el-table-column>
			<el-table-column prop="currentPrice" label="币种现价" width="150">
			</el-table-column>
			<el-table-column label="状态" width="80">
				<template slot-scope="scope">
					{{pawnStatuTypes[scope.row.status]}}
				</template>
			</el-table-column>
			<el-table-column prop="addNum" label="补仓数量" width="80">
			</el-table-column>
			<el-table-column prop="pawnAddr" fixed="right" label="用户典当地址" width="200">
			</el-table-column>
		</el-table>
		<div class="pagination">
			<el-pagination layout="prev, pager, next" :page-size="prPageSize" :total="prTotalNum" :current-page="prPageNo" @current-change="changePage" background>
			</el-pagination>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	computed: {
		...mapGetters([
			'prCoinCode',
			'prStatus',
			'prStartDate',
			'prEndDate',
			'prPageNo',
			'prPageSize',
			'prTotalNum',
			'pawnRecordsList'
		]),
		coinTypeModel: {
			get() {
				return this.prCoinCode;
			},
			set(val) {
				this.$store.commit('changeQueryCondition', {
					prCoinCode: val
				});
				this.$store.dispatch('updatePawnRecordList');
			}
		},
		userTypeModel: {
			get() {
				return this.prStatus;
			},
			set(val) {
				this.$store.commit('changeQueryCondition', {
					prStatus: val
				});
				this.$store.dispatch('updatePawnRecordList');
			}
		},
		dateRangeModel: {
			get() {
				return [this.prStartDate, this.prEndDate];
			},
			set(val) {
				this.$store.commit('changeQueryCondition', {
					prStartDate: val[0],
					prEndDate: val[1]
				});
				this.$store.dispatch('updatePawnRecordList');
			}
		}
	},
	data() {
		return {
			pawnCoinTypes: {
				//抵押币种代码
				'2': 'BTC',
				'3': 'ETH',
				'4': 'TTF',
				'7': 'PARK'
			},
			pawnStatuTypes: {
				'1': '正常',
				'2': '已平仓',
				'3': '已赎回',
				'4': '已补仓',
				'5': '需补仓'
			},
			refuseUser: '', //当前拒绝用户的userId
			remarkUser: '', //当前备注用户的userId
			remarkList: [], //当前用户的备注
			coinTypeOps: [
				{
					value: '0',
					label: '全部'
				},
				{
					value: '1',
					label: 'USDT'
				},
				{
					value: '2',
					label: 'BTC'
				},
				{
					value: '3',
					label: 'ETH'
				},
				{
					value: '4',
					label: 'TTF'
				},
				{
					value: '5',
					label: 'SEXC'
				},
				{
					value: '6',
					label: 'XMX'
				},
				{
					value: '7',
					label: 'PARK'
				}
			],
			userTypeOps: [
				{
					value: '1',
					label: '所有用户'
				},
				{
					value: '2',
					label: '已平仓用户'
				},
				{
					value: '3',
					label: '已赎回用户'
				},
				{
					value: '4',
					label: '已补仓用户'
				},
				{
					value: '5',
					label: '需补仓用户'
				}
			],
			dateRangeOps: {
				shortcuts: [
					{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(
								start.getTime() - 3600 * 1000 * 24 * 7
							);
							picker.$emit('pick', [start, end]);
						}
					},
					{
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(
								start.getTime() - 3600 * 1000 * 24 * 30
							);
							picker.$emit('pick', [start, end]);
						}
					},
					{
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(
								start.getTime() - 3600 * 1000 * 24 * 90
							);
							picker.$emit('pick', [start, end]);
						}
					}
				]
			},
			value6: '',
			value7: ''
		};
	},
	created() {
		this.$store.dispatch('updatePawnRecordList');
	},
	methods: {
		// 分页页码变化
		changePage(val) {
			this.$store.commit('changeQueryCondition', {
				prPageNo: val
			});
			this.$store.dispatch('updatePawnRecordList');
		}
	},
	components: {}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>

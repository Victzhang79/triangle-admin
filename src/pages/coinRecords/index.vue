<template>
	<div class="pawnRecord-page">
		<h1 class="title">币生币购买记录</h1>
		<ul class="querys">
			<li class="item">
				<span>基金选择：</span>
				<el-select style="width: 120px;" size="small" v-model="fundTypeModel" placeholder="请选择">
					<el-option v-for="item in fundCoinTypes" :key="item.fundId" :label="item.fundName" :value="item.fundId">
					</el-option>
				</el-select>
			</li>
			<li class="item">
				<el-date-picker value-format="yyyy-MM-dd" size="small" v-model="dateRangeModel" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="dateRangeOps">
				</el-date-picker>
			</li>
		</ul>
		<el-table size="small" :data="coinRecordsList" border style="width: 100%">
			<!-- <el-table-column fixed prop="orderNo" label="序号" width="50">
			</el-table-column> -->
			<el-table-column type="index" fixed label="序号" width="50">
			</el-table-column>
			<el-table-column prop="userMobile" label="用户手机" width="200">
			</el-table-column>
			<el-table-column prop="purchaseDate" label="购买时间" width="200">
			</el-table-column>
			<el-table-column prop="fundName" label="购买基金" width="300">
			</el-table-column>
			<el-table-column prop="purchaseNum" label="购买数量" width="100">
			</el-table-column>
			<el-table-column prop="purchaseAddr" label="购买地址" width="400">
			</el-table-column>
		</el-table>
		<div class="pagination">
			<el-pagination layout="prev, pager, next" :page-size="crPageSize" :total="crTotalNum" :current-page="crPageNo" @current-change="changePage" background>
			</el-pagination>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	computed: {
		...mapGetters([
			'crStartDate',
			'crEndDate',
			'crFundId',
			'crPageNo',
			'crPageSize',
			'crTotalNum',
			'crFundList',
			'coinRecordsList'
		]),
		dateRangeModel: {
			get() {
				return [this.crStartDate, this.crEndDate];
			},
			set(val) {
				this.$store.commit('changeCrQueryCondition', {
					crStartDate: val[0],
					crEndDate: val[1]
				});
				this.$store.dispatch('updateCoinRecordList');
			}
		},
		fundTypeModel: {
			get() {
				return this.crFundId;
			},
			set(val) {
				console.log(val);
				this.$store.commit('changeCrQueryCondition', {
					crFundId: val
				});
				this.$store.dispatch('updateCoinRecordList');
			}
		},
		fundCoinTypes() {
			let list = this.crFundList.slice();
			list.unshift({
				fundId: '0',
				fundName: '全部'
			});
			return list;
		}
	},
	data() {
		return {
			// pawnCoinTypes: {
			// 	//抵押币种代码
			// 	'2': 'BTC',
			// 	'3': 'ETH',
			// 	'4': 'TTF',
			// 	'7': 'PARK'
			// },
			// pawnStatuTypes: {
			// 	'1': '正常',
			// 	'2': '已平仓',
			// 	'3': '已赎回',
			// 	'4': '已补仓',
			// 	'5': '需补仓'
			// },
			refuseUser: '', //当前拒绝用户的userId
			remarkUser: '', //当前备注用户的userId
			remarkList: [], //当前用户的备注
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
		this.$store.dispatch('initFundList');
		this.$store.dispatch('updateCoinRecordList');
	},
	methods: {
		// 分页页码变化
		changePage(val) {
			this.$store.commit('changeCrQueryCondition', {
				crPageNo: val
			});
			this.$store.dispatch('updateCoinRecordList');
		}
	}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>

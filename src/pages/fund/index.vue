<template>
	<div class="coins-page">
		<h1 class="title">资金流向</h1>
		<div class="choose-date">
			<el-date-picker v-model="dateRangeModel" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" size="small">
			</el-date-picker>
			<span class="name">排序：</span>
			<el-select v-model="orderBy" placeholder="请选择" size="small">
				<el-option v-for="item in orderByList" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-button class="search-btn" type="primary" size="mini" @click="search">查询</el-button>
		</div>
		<div class="coin-list">
			<el-table :data="performanceList" border style="width: 100%">
				<el-table-column label="序号" width="80" type="index" :index="indexMethod">
				</el-table-column>
				<el-table-column prop="countDate" label="日期" width="120">
				</el-table-column>
				<el-table-column prop="truePerformance" label="真实业绩">
				</el-table-column>
				<el-table-column prop="withdrawableNum" label="可提数量">
				</el-table-column>
				<el-table-column prop="lockedNum" label="锁仓数量">
				</el-table-column>
				<el-table-column prop="unLockedNum" label="已解锁数量">
				</el-table-column>
				<el-table-column prop="timeDepositNum" label="定存数量">
				</el-table-column>
			</el-table>
			<div class="pagers">
				<el-pagination layout="prev, pager, next" page-size.sync="10" :pager-count="pageCount" :total="totalNum" prev-text='上一页' next-text='下一页' @current-change="gotoPage" @prev-click='prevPage' @next-click='nextPage' :current-page.sync="currPage">
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
import Api from '../../apis/deposit.js';
export default {
	data() {
		return {
			performanceList: [
				{
					date: '2018-11-11',
					lockNum: 10000,
					unlockNum: 100,
					amount: 100000
				}
			],
			currFundId: 0,
			totalNum: 0,
			pageCount: 7,
			currPage: 1,
			pageSize: 10,
			orderByList: [
				{
					value: '1',
					label: '真实业绩'
				},
				{
					value: '2',
					label: '可提数量'
				},
				{
					value: '3',
					label: '锁仓数量'
				}
			],
			orderBy: '1',
			dateRangeModel: '',
			pickerOptions: {
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
			duration: 1500
		};
	},
	created() {
		this.gotoPage(this.currPage);
	},
	watch: {
		dateRangeModel() {
			this.search();
		},
		orderBy() {
			this.search();
		}
	},
	methods: {
		indexMethod(index) {
			return (this.currPage - 1) * this.pageSize + index + 1;
		},
		search() {
			this.gotoPage(1);
		},
		prevPage() {
			let page = this.currPage + 1;
			this.gotoPage(page);
		},
		nextPage() {
			let page = this.currPage - 1;
			this.gotoPage('gotoPage', page);
		},
		gotoPage(val) {
			Api.getPerformanceList({
				pageNo: val,
				pageSize: this.pageSize,
				startDate: this.dateRangeModel[0],
				endDate: this.dateRangeModel[1],
				orderBy: this.orderBy
			}).then(res => {
				if (res.code == 200) {
					this.performanceList = res.data;
					this.totalNum = res.totalNum;
					this.currPage = val;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>

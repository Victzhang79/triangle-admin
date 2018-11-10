<template>
	<div class="coins-page">
		<h1 class="title">币生币项目管理</h1>
		<div class="right-top">
			<span class="add-btn" @click="addFund">增加币生币</span>
		</div>
		<div class="coin-list">
			<table>
				<tr class="table-header">
					<th>序号</th>
					<th>名称</th>
					<th>编号</th>
					<th>收益率</th>
					<th>基金周期</th>
					<th>认购进度</th>
					<th>状态</th>
					<th class="handle">操作</th>
				</tr>
				<tr class="table-body" v-for="(item, index) in fundList" :key="index">
					<td>{{lastOrderNo + index}}</td>
					<td>{{item.fundName}}</td>
					<td>{{item.fundNo}}</td>
					<td class="red">年化{{item.returnRate * 365 * 100}}%</td>
					<td>{{item.fundDays}}</td>
					<td>{{item.purchaseProgress * 100}}%</td>
					<td>{{fundStatusName[item.fundStatus]}}</td>
					<td class="oprate">
						<span :class="{disable: item.fundStatus == '1' ? true : false }" @click="online(item)">上线</span>
						<span :class="{disable: item.fundStatus == '0' ? true : false}" @click="offline(item)"> 下线</span>
						<span @click="editFund(item)">修改</span>
						<span @click="changeProgress(item)">调进度</span>
					</td>
				</tr>
			</table>
			<div class="pagers">
				<el-pagination layout="prev, pager, next" page-size.sync="10" :pager-count="pageCount" :total="totalNum" prev-text='上一页' next-text='下一页' @current-change="gotoPage" @prev-click='prevPage' @next-click='nextPage' :current-page.sync="currPage">
				</el-pagination>
			</div>
		</div>
		<add-fund-dialog v-model="showAddFundBox" :editInfo="fundInfo" @close="closeAddDialog" @saveSuccss="saveSuccss"></add-fund-dialog>
		<operate-fund v-model="showOperate" :operate="operateType" :fundId="currFundId" @close="closeOperate"></operate-fund>
		<change-progress></change-progress>
	</div>
</template>
<script>
import Api from '../../apis/coinsList';
import Util from '../../../util';
import addFundDialog from '../../components/addFundDialog';
import operateFund from '../../components/operateFund';
import changeProgress from '../../components/changeProgess';
// import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			fundList: [],
			showAddFundBox: false,
			showOperate: false,
			currFundId: 0,
			operateType: '1', // 0：下线，1：上线
			totalNum: 0,
			pageCount: 7,
			currPage: 1,
			pageSize: 10,
			fundStatusName: ['未上线', '已上线'],
			fundStatus: '', // 基金状态，不填默认全部
			fundInfo: {},
			lastOrderNo: 1,
			duration: 1500
		};
	},
	created() {
		this.gotoPage(this.currPage);
	},
	watch: {
		currPage(val) {
			this.lastOrderNo = (val - 1) * this.pageSize;
		}
	},
	methods: {
		addFund() {
			this.fundInfo = {};
			this.showAddFundBox = true;
		},
		editFund(item) {
			// 已上线，且项目申购已开始
			if (item.fundStatus == '1' && Util.compareDate(item.startDate)) {
				this.$message.error({
					message: '项目已开始申购，不能进行修改',
					duration: this.duration
				});
				return false;
			}
			this.fundInfo = item;
			this.showAddFundBox = true;
		},
		saveSuccss() {
			this.closeAddDialog();
			this.gotoPage(this.currPage);
		},
		closeAddDialog() {
			this.showAddFundBox = false;
		},
		online(item) {
			// 未上线状态
			if (item.fundStatus == '0') {
				// 起息日期是否已过,若已过不能上线
				if (Util.compareDate(item.interestsDate)) {
					this.$message.error({
						message: '已过起息时间，不能上线',
						duration: this.duration
					});
					return false;
				}
				this.currFundId = item.fundId;
				this.operateType = '1';
				this.showOperate = true;
			}
		},
		offline(item) {
			if (item.fundStatus == '1') {
				// 申购日期是否已过，若已过不能下线
				if (
					Util.compareDate(item.startDate) &&
					!Util.compareDate(item.settleDate)
				) {
					this.$message.error({
						message: '该基金正在进行中，不能进行下线',
						duration: this.duration
					});
					return false;
				}
				this.currFundId = item.fundId;
				this.operateType = '0';
				this.showOperate = true;
			}
		},
		closeOperate(result) {
			this.showOperate = false;
			if (result) {
				this.gotoPage(this.currPage);
			}
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
			Api.getFundInfoList({
				pageNo: val,
				pageSize: this.pageSize,
				fundStatus: this.fundStatus
			}).then(res => {
				if (res.code == 200) {
					this.fundList = res.data;
					this.totalNum = res.totalNum;
					this.currPage = val;
				}
			});
		},
		// 调整基金进度
		changeProgress(item) {
			// console.log(item);
			this.$store.commit('changeFundItem', {
				fundId: item.fundId,
				fundProgress:
					item.isUse === '1'
						? item.fundProgress
						: item.purchaseProgress,
				isUse: item.isUse
			});
			this.$store.commit('changeProgressDlgVisible', true);
		}
	},
	components: { addFundDialog, operateFund, changeProgress }
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>

<template>
	<div class="pawn-page">
		<h1 class="title">典当管理</h1>
		<el-form :model="pawnForm" :rules="rules" ref="pawnForm" label-width="95px" class="pawn-form">
			<el-form-item label="典当币：" class="required">
				<div class="coin-list">
					<div class="coin-item" v-for="(item, index) in pawnForm.coinList" :key="index">
						<el-select class="coinCode" v-model="item.coinCode" placeholder="典当币码">
							<el-option v-for="(item, index) in coinCodeList" :key="item" :label="item" :value="index" v-show="[0,5,6,7].indexOf(index) < 0">
							</el-option>
						</el-select>
						<el-input class="coin-addr" placeholder="典当地址" v-model="item.pawnAddr" maxlength="32"></el-input>
						<el-button type="primary" @click="deleteItem(index)">删除</el-button>
						<el-button type="primary" @click="addItem(index)">增加</el-button>
					</div>
				</div>
			</el-form-item>
			<el-form-item label="典当率：" prop="pawnRate">
				<el-input v-model="pawnForm.pawnRate" type="number" />
				<span class="unit">%</span>
			</el-form-item>
			<el-form-item label="日利率：" prop="dayRate">
				<el-input v-model="pawnForm.dayRate" type="number" />
				<span class="unit">%</span>
			</el-form-item>
			<el-form-item label="平仓线：" prop="closeRate">
				<el-input v-model="pawnForm.closeRate" type="number" />
				<span class="unit">%</span>
			</el-form-item>
			<el-form-item label="典当周期：" prop="pawnCycle">
				<el-input v-model="pawnForm.pawnCycle" type="number" />
				<span class="unit">天</span>
			</el-form-item>
			<el-form-item label="赎回方式：" prop="redeemType">
				<el-select v-model="pawnForm.redeemType" placeholder="请选择">
					<el-option v-for="(item, index) in redeemTypeList" :key="item" :label="item" :value="index">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item class="dialog-footer">
				<!-- <el-button @click="resetForm('pawnForm')">重置</el-button> -->
				<el-button type="primary" @click="submit('pawnForm')">保存</el-button>
			</el-form-item>
		</el-form>

	</div>
</template>

<script>
import Api from '../../apis/coinsList';
import Util from '../../../util';
export default {
	data() {
		return {
			redeemTypeList: ['定期'],
			coinCodeList: Util.coinNameList,
			pawnForm: {
				coinList: [{ coinCode: 2, pawnAddr: '' }],
				pawnRate: '',
				dayRate: '', // 日利率
				closeRate: '',
				pawnCycle: 30,
				redeemType: 0
			},
			rules: {
				pawnRate: [
					{
						required: true,
						message: '请输入典当率',
						trigger: 'blur'
					}
				],
				dayRate: [
					{
						required: true,
						message: '请输入日利息',
						trigger: 'blur'
					}
				],
				closeRate: [
					{
						required: true,
						message: '请输入平仓线',
						trigger: 'blur'
					}
				],
				pawnCycle: [
					{
						required: true,
						message: '请输入典当周期',
						trigger: 'blur'
					}
				],
				redeemType: [
					{
						required: true,
						message: '请选择赎回方式',
						trigger: 'blur'
					}
				]
			},
			duration: 1500
		};
	},
	created() {
		Api.getPawnInfoList().then(res => {
			if (res.code == 200) {
				// 返回的data是个数组
				let pawnList = res.data;
				let coinList = [];
				for (let index in pawnList) {
					coinList.push({
						coinCode: pawnList[index].coinCode,
						pawnAddr: pawnList[index].pawnAddr
					});
				}
				this.pawnForm = {
					coinList: coinList,
					pawnRate: pawnList[0].pawnRate * 100,
					dayRate: pawnList[0].dayRate * 100,
					closeRate: pawnList[0].closeRate * 100,
					pawnCycle: pawnList[0].pawnCycle,
					redeemType: pawnList[0].redeemType - 1
				};
			} else {
				return false;
			}
		});
	},

	methods: {
		deleteItem(index) {
			this.$confirm('确定要删除该典当币吗?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.pawnForm.coinList.splice(index, 1);
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',
						duration: this.duration
					});
				});
		},
		addItem(index) {
			this.pawnForm.coinList.splice(index + 1, 0, {
				coinCode: '',
				pawnAddr: ''
			});
		},
		submit(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					// 需要将提交数据转为数组
					let pawnArr = [];
					for (let item of this.pawnForm.coinList) {
						if (item.coinCode == '' || item.pawnAddr == '') {
							this.$message.error({
								message: '请输入所有典当币的币种码和对呀地址',
								duration: this.duration
							});
							return false;
						}
						pawnArr.push({
							coinCode: item.coinCode,
							pawnAddr: item.pawnAddr,
							dayRate: this.pawnForm.dayRate / 100,
							pawnRate: this.pawnForm.pawnRate / 100,
							pawnCycle: this.pawnForm.pawnCycle,
							closeRate: this.pawnForm.closeRate / 100,
							redeemType: this.pawnForm.redeemType + 1
						});
					}
					Api.savePawnInfoList(pawnArr).then(res => {
						if (res.code == 200) {
							this.$message({
								message: '典当更新成功',
								type: 'success',
								duration: this.duration
							});
							this.$emit('saveSuccss');
						} else {
							let error = res.msg || '点档信息更新失败，请重试';
							this.$message.error({
								message: error,
								duration: this.duration
							});
						}
					});
				} else {
					this.$message.error({
						message: '请输入所有必填项',
						duration: this.duration
					});
					return false;
				}
			});
		}
	}
};
</script>

<style lang="scss">
@import './index.scss';
</style>

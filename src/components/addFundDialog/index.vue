<template>
	<el-dialog :title="title" v-if="show" :visible.sync="show" :close-on-click-modal="showCloseBtn" width="600px" @close="close">
		<el-form :model="fundForm" :rules="rules" ref="fundForm" label-width="95px" class="content">
			<el-form-item label="基金币种：" prop="coinCode">
				<el-select v-model="fundForm.coinCode" placeholder="请选择">
					<el-option v-for="(item, index) in coinCodeList" :key="item" :label="item" :value="index" v-show="[0,5,6,7].indexOf(index) < 0">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="基金名称：" prop="fundName">
				<el-input v-model="fundForm.fundName" maxlength='16' />
			</el-form-item>
			<el-form-item label="基金天数：" prop="fundDays">
				<el-input v-model="fundForm.fundDays" type="number" />
			</el-form-item>
			<el-form-item label="起购数量：" prop="leastPurchaseNum">
				<el-input v-model="fundForm.leastPurchaseNum" type="number" />
			</el-form-item>
			<el-form-item label="申购日期：" prop="startDate">
				<el-date-picker v-model="fundForm.startDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="起息日期：" prop="interestsDate">
				<el-date-picker v-model="fundForm.interestsDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="日收益率：" prop="returnRate">
				<el-input v-model="fundForm.returnRate" type="number" />
				<span class="unit">%</span>
			</el-form-item>
			<el-form-item label="产品额度：" prop="fundAmount">
				<el-input v-model="fundForm.fundAmount" type="number" />
			</el-form-item>
			<!-- <el-form-item label="基金地址：" prop="fundAddr">
				<el-input v-model="fundForm.fundAddr" />
			</el-form-item> -->
			<el-form-item label="基金类型：" prop="fundType">
				<el-select v-model="fundForm.fundType" placeholder="请选择">
					<el-option v-for="(item, index) in fundTypeList" :key="item" :label="item" :value="index">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="利息币种：" prop="rateCode" class="rateCode">
				<el-select v-model="fundForm.interestCoincode" placeholder="请选择">
					<el-option v-for="(item, index) in coinCodeList" :key="item" :label="item" :value="index" v-show="[0,5,6,7].indexOf(index) < 0">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="保险价格：" prop="minPrice" class="min-price">
				<el-input v-model="fundForm.minPrice" type="number" />
				<el-select v-model="fundForm.priceCoincode" placeholder="请选择保险币种">
					<el-option v-for="(item, index) in coinCodeList" :key="item" :label="item" :value="index" v-show="[0,5,6,7].indexOf(index) < 0">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="保险费率：" prop="feeRate" v-show="showFeeRate">
				<el-input v-model="fundForm.feeRate" type="number" />
				<span class="unit">%</span>
			</el-form-item>
			<el-form-item label="产品简介：" prop="fundDesc">
				<el-input type="textarea" maxlength="256" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="fundForm.fundDesc"> </el-input>
			</el-form-item>
			<el-form-item></el-form-item>
		</el-form>
		<div class="dialog-footer">
			<el-button @click="close">取 消</el-button>
			<el-button type="primary" @click="submit('fundForm')">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
import Api from '../../apis/coinsList';
import Util from '../../../util';
export default {
	props: {
		value: Boolean,
		editInfo: Object
	},
	data() {
		var checkRate = (rule, value, callback) => {
			if (value <= 0) {
				callback(new Error('日收益率必须大于0'));
			} else {
				callback();
			}
		};
		return {
			title: '增加币生币基金',
			showCloseBtn: false,
			show: this.value,
			fundTypeList: ['固收保本'],
			coinCodeList: Util.coinNameList,
			showFeeRate: false,
			fundForm: {
				coinCode: 3,
				fundName: '',
				fundDays: 30,
				leastPurchaseNum: '',
				startDate: '',
				interestsDate: '',
				// settleDate: '',
				returnRate: '',
				fundAmount: '',
				// fundAddr: '',
				fundType: 0,
				interestCoincode: '',
				minPrice: '',
				priceCoincode: '',
				feeRate: '',
				fundDesc: ''
			},
			rules: {
				coinCode: [
					{
						required: true,
						message: '请选择基金币种',
						trigger: 'blur'
					}
				],
				fundName: [
					{
						required: true,
						message: '请输入基金名称',
						trigger: 'blur'
					}
				],
				fundDays: [
					{
						required: true,
						message: '请输入基金周期',
						trigger: 'blur'
					}
				],
				leastPurchaseNum: [
					{
						required: true,
						message: '请输入起购数量',
						trigger: 'blur'
					}
				],
				startDate: [
					{
						required: true,
						message: '请选择申购日期',
						trigger: 'blur'
					}
				],
				interestsDate: [
					{
						required: true,
						message: '请选择起息日期',
						trigger: 'blur'
					}
				],
				returnRate: [
					{
						required: true,
						message: '请输入日收益率',
						trigger: 'blur'
					},
					{
						validator: checkRate,
						trigger: 'blur'
					}
				],
				fundAmount: [
					{
						required: true,
						message: '请输入产品额度',
						trigger: 'blur'
					}
				],
				// fundAddr: [
				// 	{
				// 		required: true,
				// 		message: '请输入基金地址',
				// 		trigger: 'blur'
				// 	}
				// ],
				fundType: [
					{
						required: true,
						message: '请选择基金类型',
						trigger: 'blur'
					}
				],
				fundDesc: [
					{
						required: true,
						message: '请输入产品简介',
						trigger: 'blur'
					}
				]
			},
			duration: 1500
		};
	},
	watch: {
		value(val) {
			if (val) {
				if (this.editInfo.fundId) {
					this.title = '修改币生币基金';
				}
				Object.assign(this.fundForm, this.editInfo);
				if (this.fundForm.returnRate) {
					this.fundForm.returnRate = this.fundForm.returnRate * 100;
				}
				if (this.fundForm.fundType) {
					this.fundForm.fundType = this.fundForm.fundType - 1;
				}
				if (this.fundForm.priceCoincode === 0) {
					this.fundForm.priceCoincode = '';
				}
				if (this.fundForm.feeRate) {
					this.fundForm.feeRate = this.fundForm.feeRate * 100;
				}
			} else {
				// 关闭时恢复修改

				this.fundForm = {
					coinCode: 3,
					fundDays: 30,
					leastPurchaseNum: '',
					startDate: '',
					interestsDate: '',
					returnRate: '',
					fundAmount: '',
					// fundAddr: '',
					fundType: 0,
					interestCoincode: '',
					minPrice: '',
					priceCoincode: '',
					feeRate: '',
					fundDesc: ''
				};
			}
			this.show = val;
		},
		'fundForm.minPrice'(val) {
			if (val === '' || val === 0) {
				this.showFeeRate = false;
			} else {
				this.showFeeRate = true;
			}
		}
	},
	methods: {
		close() {
			this.show = false;
			this.$emit('close');
		},
		submit(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					let params = {
						fundType: this.fundForm.fundType + 1, // 从1开始计数
						fundName: this.fundForm.fundName, // 服务端生成
						coinCode: this.fundForm.coinCode, // 从1开始计数
						fundDays: this.fundForm.fundDays,
						leastPurchaseNum: this.fundForm.leastPurchaseNum,
						startDate: this.fundForm.startDate,
						interestsDate: this.fundForm.interestsDate,
						returnRate: this.fundForm.returnRate / 100,
						fundAmount: this.fundForm.fundAmount,
						interestCoincode: this.fundForm.interestCoincode,
						minPrice: Number(this.fundForm.minPrice),
						priceCoincode: this.fundForm.priceCoincode,
						feeRate: Number(this.fundForm.feeRate) / 100,
						fundDesc: this.fundForm.fundDesc.replace(/%/g, '％')
						// fundAddr: this.fundForm.fundAddr
					};
					if (this.fundForm.fundId) {
						Object.assign(params, { fundId: this.fundForm.fundId });
						Api.updateFundInfo(params).then(res => {
							if (res.code == 200) {
								this.$message({
									message: '基金修改成功',
									type: 'success',
									duration: this.duration
								});
								this.$emit('saveSuccss');
							} else {
								let error =
									res.msg || '基金信息修改失败，请重试';
								this.$message.error({
									message: error,
									duration: this.duration
								});
							}
						});
					} else {
						Api.savePurchaseFund(params).then(res => {
							if (res.code == 200) {
								this.$message({
									message: '基金添加成功',
									type: 'success',
									duration: this.duration
								});
								this.$emit('saveSuccss');
							} else {
								let error =
									res.msg || '基金信息添加失败，请重试';
								this.$message.error({
									message: error,
									duration: this.duration
								});
							}
						});
					}
				} else {
					return false;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
<template>
	<!-- 拒绝理由 -->
	<el-dialog title="" :visible="visible" style="text-align: center;" width="30%">
		<b>拒绝原因：</b>
		<el-select style="margin-left: 20px;" v-model="value" placeholder="请选择">
			<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
			</el-option>
		</el-select>
		<span slot="footer" class="dialog-footer">
			<el-button @click="visible = false">取 消</el-button>
			<el-button type="primary" @click="refuse">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
import { auditCredent, addCredentNote } from '../../apis/identification.js';
import { mapGetters } from 'vuex';
export default {
	computed: {
		...mapGetters(['refuseDialogVisible']),
		visible: {
			get() {
				return this.refuseDialogVisible;
			},
			set(val) {
				this.$store.commit('changeRefuseDialogVisible', val);
			}
		}
	},
	props: {
		userId: {
			type: String,
			default() {
				return '';
			}
		}
	},
	data() {
		return {
			options: [
				{
					value: '身份证照片不清晰',
					label: '身份证照片不清晰'
				},
				{
					value: '身份证信息和输入信息不匹配',
					label: '身份证信息和输入信息不匹配'
				},
				{
					value: '未按要求上传',
					label: '未按要求上传'
				}
			],
			value: ''
		};
	},
	methods: {
		refuse() {
			if (!this.value) {
				this.$notify({
					title: '警告',
					message: '请选择拒绝理由',
					type: 'warning'
				});
				return false;
			}
			if (!this.userId) {
				this.$notify.error({
					title: '错误',
					message: '用户ID丢失，请重试'
				});
			}
			auditCredent(this.userId, '2', this.value)
				.then(data => {
					if (data.code === 200) {
						this.$notify({
							title: '成功',
							message: '操作成功',
							type: 'success'
						});
						addCredentNote(
							this.userId,
							'',
							'拒绝认证：' + this.value
						).catch(() => {
							console.log('添加备注失败');
						});
						this.$store.dispatch('updateCredentList');
					} else {
						this.$notify.error({
							title: '错误',
							message: data.msg
						});
					}
				})
				.catch(() => {
					this.$notify.error({
						title: '错误',
						message: '网络异常，稍后重试'
					});
				});
			this.visible = false;
		}
	}
};
</script>

<style lang="scss" scoped>
</style>

<template>
	<el-dialog title="提示" :visible.sync="visible" width="50%">
		<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="newRemark">
		</el-input>
		<p style="text-align: center;margin-top: 20px;margin-bottom: 20px;">
			<el-button type="primary" @click="addRemark">确 定</el-button>
		</p>
		<h3>历史备注：</h3>
		<ul class="remark-list">
			<li style="border-top: 1px solid #ccc;padding:10px 20px;" v-for="(remark,index) in remarks" :key="index" class="remark">
				<p>
					<b>客服：</b>{{remark.custName}}</p>
				<p>
					<b>描述：</b>{{remark.noteContent}}</p>
				<p>
					<b>时间：</b>{{remark.noteTime}}</p>
			</li>
		</ul>
	</el-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import { addCredentNote } from '../../apis/identification.js';
export default {
	props: {
		userId: String,
		remarks: Array
	},
	computed: {
		...mapGetters(['noteDialogVisible']),
		visible: {
			get() {
				return this.noteDialogVisible;
			},
			set(val) {
				this.$store.commit('changeNoteDialogVisible', val);
			}
		}
	},
	data() {
		return {
			newRemark: ''
		};
	},
	methods: {
		addRemark() {
			if (!this.newRemark) {
				this.$notify({
					title: '警告',
					message: '请填写备注信息',
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
			addCredentNote(this.userId, '', this.newRemark)
				.then(data => {
					if (data.code === 200) {
						this.$notify({
							title: '成功',
							message: '操作成功',
							type: 'success'
						});
						this.$store.dispatch('updateCredentList');
					} else {
						this.$notify.error({
							title: '错误',
							message: data.msg
						});
					}
				})
				.catch(err => {
					this.$notify.error({
						title: '错误',
						message: '网络异常，稍后重试'
					});
					console.log('err:', err);
				});
			this.visible = false;
		}
	}
};
</script>

<style>
</style>

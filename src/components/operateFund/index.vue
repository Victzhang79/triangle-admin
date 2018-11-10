<template>
	<el-dialog v-if="show" :title="operate == '1' ? '上线' : '下线'" :visible.sync="show" :close-on-click-modal="showCloseBtn" @close="close" center width="500px">
		<div class="content">
			<span>{{operate == '1' ? '确定要上线该基金吗？' : '确定要下线该基金吗？'}}</span>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button @click="close(false)">取 消</el-button>
			<el-button type="primary" @click="submit">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
import Api from '../../apis/coinsList.js';
export default {
	props: {
		value: Boolean,
		fundId: Number,
		operate: String
	},
	data() {
		return {
			showCloseBtn: false,
			show: this.value,
			duration: 1500
		};
	},
	watch: {
		value(val) {
			this.show = val;
		}
	},
	methods: {
		submit() {
			Api.updateFundStatus({
				fundId: this.fundId,
				fundStatus: this.operate
			}).then(res => {
				if (res.code == 200) {
					let msg = '基金下线成功';
					if (this.operate == '1') {
						msg = '基金上线成功';
					}
					this.$message({
						message: msg,
						type: 'success',
						duration: this.duration
					});
					this.close(true);
				} else {
					let msg = '基金下线失败，请重试';
					if (this.operate == '1') {
						msg = '基金上线失败，请重试';
					}
					let error = res.msg || msg;
					this.$message.error({
						message: error,
						duration: this.duration
					});
				}
			});
		},
		close(result) {
			this.show = false;
			this.$emit('close', result);
		}
	}
};
</script>

<style lang="scss" scoped>
@import url('./index.scss');
</style>

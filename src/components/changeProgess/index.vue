<template>
	<el-dialog class="progress" title="调整基金进度" :visible.sync="visible" width="400px">
		<!-- 进度： <el-input v-model="progress" placeholder="请输入内容"></el-input> -->
		<p>
			进度：
			<!-- <el-input v-model="progress" placeholder="请输入内容"></el-input> -->
			<el-input-number v-model="progress" :min="0" :max="100" label="描述文字"></el-input-number>
			%
		</p>
		<p>
			使用手动设置：<el-switch v-model="isUse" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
		</p>
		<p>
			<el-button @click="changeProgress()" type="primary">确认</el-button>
		</p>
	</el-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import coinApis from '../../apis/coinsList';
export default {
	computed: {
		...mapGetters(['fundItem']),
		visible: {
			get() {
				return this.$store.state.coins.progressDlgVisible;
			},
			set(val) {
				this.$store.commit('changeProgressDlgVisible', val);
			}
		}
	},
	data() {
		return {
			progress: 0,
			isUse: 0
		};
	},
	watch: {
		fundItem: function(value) {
			this.progress = value ? value.fundProgress * 100 : 0;
			this.isUse = value ? !!Number(value.isUse) : false;
		}
	},
	methods: {
		changeProgress() {
			if (!this.fundItem) {
				this.$message('未找到基金信息，请重试');
				return false;
			}
			let fundId = this.fundItem.fundId,
				fundProgress = parseInt(this.progress),
				isUse = this.isUse ? '1' : '0';
			// console.log('data progress:', fundId, fundProgress, isUse);
			// this.$store.dispatch('changeProgress', {
			// 	fundId,
			// 	fundProgress,
			// 	isUse
			// })
			coinApis
				.setProgress(fundId, fundProgress, isUse)
				.then(data => {
					if (data.code === 200) {
						this.visible = false;
						this.$store.commit('changeFundItem', null);
						this.$message.success('设置认购进度成功！');
						window.location.reload();
					} else {
						this.$message.error('设置认购进度失败：', data.msg);
					}
				})
				.catch(() => {
					this.$message.error('设置认购进度失败。');
				});
		}
	}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>

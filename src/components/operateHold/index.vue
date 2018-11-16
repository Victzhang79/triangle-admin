<template>
	<el-dialog :title="types[params.opType]" :visible.sync="show" center width="400px">
		<span>{{types[params.opType]}}数量：</span>
		<el-input v-model="opNum" type="number" placeholder="请输入数量" style="width:220px"></el-input>
		<span slot="footer" class="dialog-footer">
			<el-button @click="show = false">取 消</el-button>
			<el-button type="primary" @click="operate">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
import { opLockedCoin } from '../../apis/user.js';
export default {
	props: {
		params: {
			type: Object,
			default() {
				return {
					userId: '',
					opType: '0' //1：发放代持，2：解锁代持，3：出售代持
				};
			}
		},
		visible: Boolean
	},
	computed: {
		show: {
			get() {
				return this.visible;
			},
			set(val) {
				this.$emit('close', val);
			}
		}
	},
	data() {
		return {
			types: ['', '发放代持', '解锁代持', '出售代持'],
			opNum: undefined
		};
	},
	methods: {
		operate() {
			// console.log('11111');
			if (!this.opNum) {
				this.$message.error('请输入操作代持的数量');
				return false;
			}
			// console.log(this.params.userId, this.opNum, this.params.opType);
			opLockedCoin(this.params.userId, this.opNum, this.params.opType)
				.then(data => {
					if (data.code === 200) {
						this.$message.success('操作成功！');
						window.location.reload();
					} else {
						this.$message.error(data.msg);
					}
				})
				.catch(err => {
					this.$message.error('网路异常');
					console.log(err);
				});
		}
	}
};
</script>

<style lang="scss" scoped>
</style>

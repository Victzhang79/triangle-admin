<template>
	<div class="user-page">
		<h1 class="title">认证管理</h1>
		<p class="query">
			<span>认证状态： </span>
			<el-select size="small" v-model="auditStatusModel" placeholder="请选择">
				<el-option v-for="item in auditStatusOps" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-button style="margin-left: 20px;" size="small" type="primary" icon="el-icon-refresh" @click="()=>this.$store.dispatch('updateCredentList')"></el-button>
		</p>
		<el-table size="small" :data="credentList" border style="width: 100%">
			<el-table-column fixed prop="userMobile" label="用户手机" width="120">
			</el-table-column>
			<el-table-column prop="submitTime" label="提交时间" width="150">
			</el-table-column>
			<el-table-column prop="familyName" label="姓" width="80">
			</el-table-column>
			<el-table-column prop="givenName" label="名字" width="100">
			</el-table-column>
			<el-table-column prop="nationName" label="国籍" width="120">
			</el-table-column>
			<el-table-column label="证件类型" width="120">
				<template slot-scope="scope">{{credentTypes[scope.row.credentType]}}</template>
			</el-table-column>
			<el-table-column prop="credentNo" label="证件" width="200">
			</el-table-column>
			<el-table-column label="证件照" width="80">
				<template slot-scope="scope">
					<div :key="scope.row.credentNo" @click="showPic(scope.row.credentPic, scope.row.credentNo)" class="authPic">
						<img :src="'http:'+picServerPath+scope.row.credentPic" alt="查看">
					</div>
					<!-- <el-button v-if="scope.row.credentNo" type="text" size="small" @click="showPic(scope.row.credentPic, scope.row.credentNo)">查看</el-button> -->
				</template>
			</el-table-column>
			<el-table-column label="备注" width="80">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="showRemarks(scope)">显示</el-button>
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="认证状态/操作" width="150">
				<template slot-scope="scope">
					<p v-if="!scope.row.credentNo" class="unknowed">未认证</p>
					<p class="command" v-else-if="scope.row.auditStatus == '0'">
						<el-button type="success" size="small" @click="credentAdmit(scope)" plain>通过</el-button>
						<el-button type="danger" size="small" @click="refuseClick(scope)" plain>拒绝</el-button>
					</p>
					<p v-else-if="scope.row.auditStatus == '1'" class="success">已通过</p>
					<p v-else-if="scope.row.auditStatus == '2'" class="failed">已拒绝</p>
					<p v-else class="unknowed">未知状态</p>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination">
			<el-pagination layout="prev, pager, next, jumper" :page-size="pageSize" :total="totalNum" :current-page="pageNo" @current-change="changePage" background>
			</el-pagination>
		</div>
		<el-dialog :title="'证件号：'+identificationNum" :width="'940px'" :visible.sync="identifPicVisible">
			<!-- <p>证件号：{{identificationNum}}</p> -->
			<img :src="identificationImg" width="900" alt="认证照片">
		</el-dialog>

		<refuse-dialog :userId="refuseUser"></refuse-dialog>
		<note-dialog :userId="remarkUser" :remarks="remarkList"></note-dialog>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { auditCredent, addCredentNote } from '../../apis/identification.js';
import refuseDialog from '../../components/refuseDialog/index';
import noteDialog from '../../components/noteDialog/index';
import picServerPath from '../../assets/config/picServer.js';
export default {
	computed: {
		...mapGetters([
			'auditStatus',
			'credentList',
			'pageSize',
			'pageNo',
			'totalNum'
		]),
		auditStatusModel: {
			get() {
				return this.auditStatus;
			},
			set(val) {
				this.$store.commit('changeAuditStatus', val);
				this.$store.dispatch('updateCredentList');
			}
		}
	},
	data() {
		return {
			auditStatusOps: [
				{
					value: '0',
					label: '待审核'
				},
				{
					value: '1',
					label: '已通过'
				},
				{
					value: '2',
					label: '已拒绝'
				},
				{
					value: '-1',
					label: '全部'
				}
			],
			credentTypes: {
				'1': '居民身份证',
				'2': '护照',
				'3': '士官证',
				'4': '港澳通行证',
				'9': '其他'
			},
			refuseUser: '', //当前拒绝用户的userId
			remarkUser: '', //当前备注用户的userId
			remarkList: [], //当前用户的备注
			identificationImg: '', //认证照片链接
			identificationNum: '', //认证证件号
			identifPicVisible: false, //弹窗展示认证照片
			picServerPath: picServerPath
		};
	},
	created() {
		this.$store.dispatch('updateCredentList');
	},
	methods: {
		// 查看认证图片
		showPic(src, number) {
			let path = window.location.protocol + picServerPath + src;
			this.identificationImg = path;
			this.identificationNum = number;
			this.identifPicVisible = true;
		},
		showRemarks(scope) {
			this.remarkUser = scope.row.userId;
			this.remarkList = scope.row.noteList;
			this.$store.commit('changeNoteDialogVisible', true);
		},
		// 分页页码变化
		changePage(val) {
			this.$store.commit('changePageNo', val);
			this.$store.dispatch('updateCredentList');
		},
		// 认证通过
		credentAdmit(scope) {
			auditCredent(scope.row.userId, '1')
				.then(data => {
					if (data.code == 200) {
						// scope.row.auditStatus = 1;
						addCredentNote(
							scope.row.userId,
							'',
							'通过认证。'
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
						message: '网路异常，刷新重试'
					});
				});
		},
		// 认证拒绝
		credentDeny() {
			// auditCredent(scope.row.userId, '1')
			// 	.then(data => {
			// 		if (data.code == 200) {
			// 			scope.row.auditStatus = 2;
			// 		} else {
			// 			this.$notify.error({
			// 				title: '错误',
			// 				message: data.msg
			// 			});
			// 		}
			// 	})
			// 	.catch(err => {
			// 		this.$notify.error({
			// 			title: '错误',
			// 			message: '网路异常，刷新重试'
			// 		});
			// 	});
		},
		// 选择拒绝原因
		refuseClick(scope) {
			this.refuseUser = scope.row.userId;
			this.$store.commit('changeRefuseDialogVisible', true);
		}
	},
	components: {
		refuseDialog,
		noteDialog
	}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>

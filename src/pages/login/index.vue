<template>
	<div class="login-page">
		<h3 class="dlg-title">登录</h3>
		<el-form :model="ruleForm" :rules="rules" :inline="false" ref="loginForm" label-position="left" class="form-wrap">
			<el-form-item label="手机" prop="phone">
				<el-input v-model="ruleForm.phone" placeholder="请输入手机号"></el-input>
			</el-form-item>
			<el-form-item label="验证码" prop="authCode">
				<el-input class="authCode" v-model="ruleForm.authCode" placeholder="请输入验证码">
					<el-button slot="append" class="authBtn" @click="getAuthCode" :disabled="authBtnState===0">{{authBtnText}}</el-button>
				</el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input type="password" v-model="ruleForm.password" placeholder="输入登录密码">
					<!-- <template slot="prepend"><img src="../../assets/imgs/lock.png" style="padding-top:4px;"></template> -->
				</el-input>
			</el-form-item>
			<el-form-item class="btn-line">
				<el-button @click="login('loginForm')" class="btn" type="primary" round>登录</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import Cookie from 'js-cookie';
import { chkAdminLogPass, getVeriCode } from '../../apis/admin';
import encryptPassword from '../../../util/rsaEncrypt'; //密码rsa加密
export default {
	data() {
		return {
			ruleForm: {
				phone: '',
				authCode: '',
				password: ''
			},
			rules: {
				phone: [
					{
						required: true,
						message: '请输入号码',
						trigger: 'blur'
					},
					{
						pattern: /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/,
						message: '号码格式不正确',
						trigger: 'blur'
					}
				],
				authCode: [
					{
						required: true,
						message: '请输入验证码',
						trigger: 'blur'
					},
					{
						pattern: /^\d{6}$/,
						message: '验证码格式不正确',
						trigger: 'blur'
					}
				],
				password: [
					{
						required: true,
						message: '密码不能为空',
						trigger: 'blur'
					},
					{
						pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
						message: '密码格式错误(8-16位，不能全是数字或字母)',
						trigger: 'blur'
					}
				]
			},
			authBtnState: 1, //获取验证码按钮状态：0-不可点击，1-可点击
			authBtnText: '获取验证码',
			countDownTimmer: null //倒计时循环timmer
		};
	},
	methods: {
		login(formName) {
			this.$refs[formName].validate(valid => {
				if (!valid) {
					return false;
				}
				chkAdminLogPass(
					this.ruleForm.phone,
					this.ruleForm.authCode,
					encryptPassword(this.ruleForm.password)
				)
					.then(data => {
						if (data.code === 200) {
							this.$message({
								message: '登录成功！',
								type: 'success'
							});
							Cookie.set('adminToken', data.data.token);
							this.$store.commit(
								'chagneUserName',
								this.ruleForm.phone
							);
							this.$store.commit(
								'changeUserType',
								data.data.adminRole
							);
							this.$router.push('/user');
						} else {
							this.$message({
								message: data.msg,
								type: 'error'
							});
						}
					})
					.catch(err => {
						console.log('log err:', err);
					});
			});
		},
		// 发送短信验证码
		getAuthCode() {
			if (
				this.authBtnState === 0 ||
				!/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/.test(
					this.ruleForm.phone
				)
			) {
				return false;
			}
			getVeriCode(this.ruleForm.phone).then(data => {
				console.log(data);
				if (data.code === 200) {
					this.countDown();
				}
			});
		},
		// 发送短信验证码按钮倒计时
		countDown() {
			this.authBtnState = 0;
			let count = 60;
			this.countDownTimmer = setInterval(() => {
				if (count === 0) {
					clearInterval(this.countDownTimmer);
					this.authBtnText = '获取验证码';
					this.authBtnState = 1;
					return false;
				}
				this.authBtnText = count + '秒后重试';
				count--;
			}, 1000);
		}
	}
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>

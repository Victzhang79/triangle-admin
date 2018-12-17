<template>
  <div class="withdraw-page">
    <h1 class="title">提现明细</h1>
    <p class="query">
      <span>手机号： </span>
      <el-input
        size="small"
        style="width: 150px;"
        v-model="searchMobile"
        placeholder="请输入手机号"
      ></el-input>
      <el-button
        style="margin-left: 20px;"
        size="small"
        type="primary"
        @click="search"
      >查询</el-button>
      <el-button
        style="margin-left: 20px;"
        size="small"
        type="primary"
        icon="el-icon-refresh"
        @click="refresh"
      ></el-button>
    </p>
    <div class="table-info">
      <el-table
        size="small"
        :data="withdrawDetailList"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="userMobile"
          label="用户手机"
        >
        </el-table-column>
        <el-table-column
          prop="txAmount"
          label="提现数量"
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="提现时间"
        >
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          layout="prev, pager, next"
          page-size.sync="10"
          :pager-count="pageCount"
          :total="totalNum"
          @current-change="gotoPage"
          :current-page.sync="currPage"
          background
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "../../apis/withdrawDetail.js";
export default {
  data() {
    return {
      withdrawDetailList: [],
      searchMobile: "", // 手机号查询
      totalNum: 0,
      pageCount: 7,
      currPage: 1,
      pageSize: 10
    };
  },
  created() {
    this.gotoPage(1);
  },
  methods: {
    // 分页页码变化
    gotoPage(val) {
      Api.getWithdrawList({
        txType: 2, // 1：充值，2：提现
        pageNo: val,
        pageSize: this.pageSize,
        userMobile: this.searchMobile
      }).then(res => {
        if (res.code == 200) {
          this.withdrawDetailList = res.data;
          this.totalNum = res.totalNum;
          this.currPage = val;
        } else {
          this.$message.error(res.msg || "用户提现明细查询失败，请稍后重试");
        }
      });
    },
    // 根据号码查询
    search() {
      if (
        /^((13[0-9])|(14[5-9])|(15[0-3,5-9])|(16[5,6])|(17[0-8])|(18[0-9])|(19[8,9]))\d{8}$/.test(
          this.searchMobile
        )
      ) {
        this.gotoPage(1);
      } else {
        this.$message.error("您输入的号码格式有误！");
      }
    },
    refresh() {
      this.searchMobile = "";
      this.gotoPage(1);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>

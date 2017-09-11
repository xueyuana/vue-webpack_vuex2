<template>
  <div class="login-container">
    <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="100px">
      <h3 class="login-title" v-text="appName"></h3>
      <el-form-item prop="accName">
        <el-input placeholder="请输入账号" size="large" v-model="loginForm.accName">
          <template slot="prepend">账号</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="accPassword">
        <el-input placeholder="请输入密码" size="large" type="password" @keyup.native.enter ="submitForm('loginForm')" v-model="loginForm.accPassword">
          <template slot="prepend">密码</template>
        </el-input>
      </el-form-item>
      <div class="login-form login-btngroup">
        <el-button type="primary" size="large" @click="submitForm('loginForm')">登录</el-button>
        <el-button size="large" @click="resetForm('loginForm')">重置</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
  import Cookies from 'js-cookie'
  import * as utils from 'utils/comm'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    data() {
      return {
        appName:'',
        loginForm: {
          accName: 'admin',
          accPassword: ''
        },
        loginRules:{
          accName: [
            { required: true, message: '请输入用户名', trigger: 'change' }
          ],
          accPassword: [
            { required: true, message: '请输入密码', trigger: 'change' },
            { pattern: utils.codingPattern,  message: '密码只能输入字母或数字', trigger: 'change' }
          ],
        }
      }
    },
    created() {
      this.appName = utils.appName;
    },
    computed: {
      ...mapGetters([
        // 'appTitle'
      ])
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            Cookies.set('accName','admin')
            this.$router.push({path: 'overview'})
          } else {
            this.$notify.error({
              title: '错误',
              message: '表单校验失败'
            });
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      ...mapMutations({
        'isFirLogin': 'IS_FIRST_LOGIN'
      })
    },
    components: {}
  }
</script>

<style lang="less">
  .login-container {
    position: relative;
    width: 100%;
    height: auto;
    min-height: 100%;
    display: flex;
    margin: 0;
    background: ~"url('../../assets/images/bj.jpg')" no-repeat;
    background-size: 100% 100%;
    .el-form {
      width: 360px;
      min-width: 360px;
      padding: 15px 25px 35px;
      margin: auto;
      background-color: rgba(255, 255, 255, .5);
      box-shadow: 0 0 25px #cac6c6;
      .el-form-item__content{
        margin-left: 0!important;
      }
      .login-title {
        text-align: center;
        padding: 15px 0;
        margin-bottom: 35px;
        font-weight: bold;
      }
      .login-form {
        margin-bottom: 25px;
      }
      .login-btngroup {
        .el-button {
          width: 47.8%;
        }
      }
    }
  }
</style>

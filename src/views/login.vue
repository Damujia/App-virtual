<template>
  <div class="loginsty">
    <div class="log_logo"></div>
    <div class="log_tit">苏州以利亚智能科技有限公司</div>
    <div class="formsty">
      <div class="log_text">用户登录</div>
      <van-form @submit="onSubmit">
        <van-field v-model="form.workerNo" name="用户名" label="" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]">
          <template slot="left-icon">
            <img class="label_icon" src="../assets/xingming.png" alt="">
          </template>
        </van-field>
        <van-field v-model="form.psw" type="password" name="密码" label="" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]">
          <template slot="left-icon">
            <img class="label_icon" src="../assets/mima.png" alt="">
          </template>
        </van-field>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">
            登 录
          </van-button>
        </div>
      </van-form>
    </div>
    <div class="font_sty">苏州以利亚智能科技有限公司</div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      form: {
        workerNo: '',
        psw: '',
      },
      submin: false
    }
  },
  methods: {
    onSubmit () {
      this.submin = true
      this.loginbtn()
    },
    loginbtn () {
      if (this.submin) {
        this.$api.login(qs.stringify(this.form))
          .then(res => {
            if (res.data.status === 401) {
              this.$notify({
                message: '用户名或密码错误',
                background: '#ee0a24',
                duration: 1000
              })
            } else if (res.data.status === 200) {
              sessionStorage.setItem('tapeclass', JSON.stringify(res.data.msg))
              localStorage.setItem('addform', JSON.stringify(this.form))
              this.$router.push({ name: 'home' })
            }
          })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.loginsty {
  width: 100%;
  height: 100vh;
  background-color: #ebecf0;
  background: url("../assets/loginback.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .label_icon {
    width: 12px;
  }
  .log_tit {
    margin-top: 8%;
    color: #fff;
    font-size: 18px;
    letter-spacing: 3px;
  }
  .log_logo {
    margin-top: 10%;
    background: url("../assets/logotit.png") no-repeat;
    background-size: 100%;
    width: 60px;
    height: 70px;
  }
  .formsty {
    width: 85%;
    margin-top: 8%;
    height: auto;
    padding: 6% 11%;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 2px 2px 2px #9c9c9c;
    border-radius: 30px;
    .log_text{
      font-size: 24px;
      font-weight: 600;
      text-align: center;
      color: #333;
      margin-bottom: 10px;
    }
  }
  .font_sty {
    font-size: 12px;
    color: #b3b3b3;
    display: flex;
    flex: 1;
    align-items: flex-end;
    margin-bottom: 20px;
  }
}
</style>
<template>
  <div class="login">
      登录
      <Input type="text" placeholder="亲输入用户名" v-model="username" style="width:300px"/>
      <Button type="primary" @click="login" >登录</Button>
  </div>
</template>

<script>
import store from '../store'
export default {
  name: 'login',
  data(){
    return{
      username: ''
    }
  },
  methods:{
    login(){
      console.log(this.username)
      store.dispatch('toLogin',this.username).then(err=>{
        console.log(err);
      })
    }
  }
}
</script>
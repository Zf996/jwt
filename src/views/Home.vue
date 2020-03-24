<template>
  <div class="home">
    当前用户登录名{{$store.state.username}}
  </div>
</template>

<script>
// @ is an alias to /src
// import {getUser} from '../api/user.js';
export default {
  name: 'Home',
  // async mounted(){
  //   // alert(1);
  //   // let res = await getUser();
  //   console.log(await getUser());
  // }
}
</script>

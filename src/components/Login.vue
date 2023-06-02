<template>
<form @submit="onSubmit">
  <div class="mb-3">
    <label for="input-loginId" class="form-label">ID</label>
    <input type="text" id="input-loginId" class="form-control" v-model="form.loginId">
  </div>

  <div class="mb-3">
    <label for="input-password" class="form-label">Password</label>
    <input type="password" id="input-password" class="form-control" v-model="form.password">
  </div>

  <button type="submit" class="btn btn-primary">로그인</button>
</form>
</template>

<script>
export default {
  name: "MyLogin",
  data() {
    return {
      form: {
        loginId: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      if(this.checkLoginId()) {
        alert('로그인 아이디를 입력해주세요');
        return;
      }

      if(this.form.password === '') {
        alert('비밀번호를 입력해주세요.');
        return;
      }

      this.$axios({
        method: "post",
        url: "http://localhost:8080/v1/members/login",
        data: JSON.stringify(this.form),
        headers: {
          "Content-Type" : "application/json; charset=utf-8"
        },
        timeout: 5000
      })
          .then(function (response) {
            if(response.data.success === true) {
              console.log(response.data.data.token);
              this.$store.commit('login', response.data.data.token);
            }
          })
          .catch(function (error) {
            alert(error);
      })
    },
    checkLoginId() {
      return this.form.loginId === '';
    },
    checkPassword() {
      return this.form.password === '';
    }
  }
}
</script>

<style scoped>

</style>
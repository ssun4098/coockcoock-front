<template>
  <form @submit="onSubmit">
    <div class="mb-3">
      <label for="input-loginId" class="form-label">LoginId</label>
      <input type="text" class="form-control" id="input-loginId" v-model="form.loginId" required>
    </div>

    <div class="mb-3">
      <label for="input-password" class="form-label">Password</label>
      <input type="password" class="form-control" id="input-password" v-model="form.password" required>
    </div>

    <div class="mb-3">
      <label for="input-password-confirm" class="form-label">Password Confirm</label>
      <input type="password" class="form-control" v-bind:class="{'is-invalid': confirmPassword}" id="input-password-confirm" v-model="passwordConfirm" required>
      <div v-show="confirmPassword" v-bind:class="{'invalid-feedback': confirmPassword}">
        <span>입력한 비밀번호와 일치하지 않습니다.</span>
      </div>
    </div>
    <button type="submit">회원가입</button>
  </form>
</template>

<script>
export default {
  name: "MySignup",
  data() {
    return {
      form: {
        loginId: '',
        password: ''
      },
      passwordConfirm: '',
      loginIdDuplicationConfirm: true
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      if(this.loginIdDuplicationConfirm === false) {
        alert(`로그인아이디: ${this.form.loginId}는 사용할 수 없습니다.`);
        return;
      }
      if(this.passwordConfirm !== this.form.password) {
        alert('비밀번호를 올바르게 입력한지 확인해주세요.');
        return;
      }
      this.$axios({
        method: "post",
        url: 'http://localhost:8080/v1/members',
        data: JSON.stringify(this.form),
        headers: {
          "Content-Type" : "application/json; charset=utf-8"
        },
        timeout: 5000
      })
          .then(function() {
            alert("회원가입에 성공하셨습니다. 로그인 창으로 이동합니다.");
            window.location = '/login'
          })
          .catch(function (error) {
        alert("Error: " + error)
      })
    }
  },
  computed: {
    confirmPassword() {
      if(this.passwordConfirm === '') {
        return false;
      }
      return this.passwordConfirm !== this.form.password;
    }
  }
}
</script>

<style scoped>

</style>
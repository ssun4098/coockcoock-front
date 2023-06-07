<template>
  <form @submit="onSubmit">
    <div class="mb-3">
      <label for="input-loginId" class="form-label">LoginId</label>
      <div class="input-group">
        <input type="text" class="form-control" ref="loginId" id="input-loginId" v-bind:readonly="this.loginIdDuplicationConfirm" v-model="form.loginId" required>
        <div class="input-group-append">
          <button @click="checkLoginIdDuplication" class="btn btn-outline-secondary" type="button">ID 중복 검사</button>
        </div>
      </div>
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
      loginIdDuplicationConfirm: false
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
          .then(function(response) {
            if(response.data.success === true){
              alert("회원가입에 성공하셨습니다. 로그인 창으로 이동합니다.");
              window.location = '/login'
              return;
            }
            alert("회원가입에 실패하였습니다. 다시 시도해주세요.");
          })
          .catch(function (error) {
        alert("Error: " + error)
      })
    },
    checkLoginIdDuplication() {
      if(this.form.loginId === '') {
        alert('로그인 아이디를 입력해주세요.');
        return;
      }

      if(this.form.loginId.length < 2 && this.form.loginId.length > 12) {
        alert('로그인 아이디는 최소 2글자부터 최대 12글자까지 입니다.');
        return;
      }

      const t = this;

      this.$axios({
        method: 'GET',
        url: 'http://localhost:8080/v1/members/duplicability?loginId=' + this.form.loginId,
        timeout: 5000
      })
          .then(function (response) {
            if(response.data.data.check === false) {
              t.loginIdDuplicationConfirm = true;
              alert("해당 닉네임은 사용할 수 있습니다.");
              return;
            }
            t.loginIdDuplicationConfirm = false;
            alert("해당 닉네임은 사용할 수 없습니다.");
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
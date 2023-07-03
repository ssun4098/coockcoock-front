<template>
  <h1>Recipe</h1>
  <hr class="line bg-primary"/>

  <table class="table table-bordered">
    <thead>
      <tr>
        <th scope="col">글번호</th>
        <th scope="col" class="table_head_title">제목</th>
        <th scope="col">작성자</th>
        <th scope="col">작성날짜</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(recipe, index) in recipes" :key="index">
        <th scope="row">{{index}}</th>
        <td scope="row" class="table_body_title">
            <a :href="'/recipe/' + recipe.id">
              {{recipe.title}}
            </a>
        </td>
        <td scope="row">{{recipe.writer}}</td>
        <td scope="row">{{parseDate(recipe.createAt)}}</td>
      </tr>
    </tbody>
  </table>

  <a id="write_btn" class="btn btn-primary" href="/write">Write</a>
</template>

<script>
export default {
  data() {
    return {
      recipes: []
    }
  },
  methods: {
    getRecipes(page, title) {
      const headers = {
        "Content-Type" : "application/json; charset=utf-8",
        "Authorization" : 'Bearer ' + this.$cookies.get('token')
      }
      const params = {
        page: page,
        size: 10,
        title: title
      }

      const t = this;
      this.$axios({
        methods: 'GET',
        url: "http://localhost:8080/v1/recipes",
        headers: headers,
        params: params,
      })
      .then(function(response) {
        console.log(response);
        t.recipes = response.data.data.content;
      })
    },
    parseDate(value) {
      // 들어오는 value 값이 공백이면 그냥 공백으로 돌려줌
          if(value == '') return '';
      
          // 현재 Date 혹은 DateTime 데이터를 javaScript date 타입화
          let js_date = new Date(value);

          // 연도, 월, 일 추출
          let year = js_date.getFullYear();
          let month = js_date.getMonth() + 1;
          let day = js_date.getDate();

          // 월, 일의 경우 한자리 수 값이 있기 때문에 공백에 0 처리
          if(month < 10){
            month = '0' + month;
          }

          if(day < 10){
            day = '0' + day;
          }

          // 최종 포맷 (ex - '2021-10-08')
          return year + '-' + month + '-' + day;
    }
  },
  mounted() {
    this.getRecipes(0, null);
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}
a:hover {
  text-decoration: underline; /* 마우스가 올라갈 때 밑줄 생성 */
}
#write_btn {
  float: right;
}
.table_head_title {
  width: 50%;
}
.table_body_title {
  width: 50%;
  text-align: start;
}
.line {
  height: 3px;
}
.table {
  text-align: center;
}
</style>
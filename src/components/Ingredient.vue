<template>
  <h1>재료 리스트</h1>
    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">번호</th>
                <th scope="col" class="name">이름</th>
                <th scope="col" class="text-danger">삭제</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(ingredient, index) in ingredients" :key="index">
                <th scope="row">{{ index + 1 }}</th>
                <td scope="row">{{ingredient.name}}</td>
                <td scope="row"><button class="btn btn-danger" style='width:100%; height:100%;' @click.stop="deleteIngredient(ingredient)">삭제</button></td>
            </tr>
        </tbody>
    </table>

<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Insert
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Save to Ingredient</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form class="">
            <label for="input-name" class="form-label">Ingredient's Name</label>
            <input id="input-name" v-model="this.form.name" class="form-control"/>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
    name: 'MyIngredient',
    data() {
        return {
            ingredients: [{id: 1, name: "이름"}],
            input: null,
            page: 0,
            size: 10,
            form: {
                name: ''
            }
        }
    },
    methods: {
        deleteIngredient(ingredient) {
            if(confirm(ingredient.name + '을 삭제하겠습니까?')) {
                console.log(ingredient);
            }
        },
        getIngredients() {
            const array = this;
            array.$axios({
                methods: "get",
                data: JSON.stringify(array.input),
                url: 'http://localhost:8080/v1/ingredients' + '?page=' + array.page + '&size='+ array.size,
                headers: {
                    "Content-Type" : "application/json; charset=utf-8",
                    "Authorization" : 'Bearer ' + array.$cookies.get('token')
                },
                timeout: 5000
            }).then(function(response) {
                console.log(response)
            })
        }
    }
}
</script>

<style scoped>
.name{
    width: 70%
}
body {
    text-align: center;
}
</style>
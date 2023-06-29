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
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Create</button>
  <nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li class="page-item" v-if="page > 10" @click="getIngredients(page-1)">Previous</li>
    <li class="page-item" v-for="page in pageable.totalPages" :key="page">
        <a class="page-link" href="#" @click="getIngredients(page-1)">{{page}}</a>
    </li>
  </ul>
</nav>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
            <label for="input-name" class="form-label">Ingredient's Name</label>
            <input id="input-name" v-model="this.form.name" class="form-control"/>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button @click="createIngredient" type="button" class="btn btn-primary">Save</button>
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
            pageable: '',
            form: {
                name: ''
            }
        }
    },
    methods: {
        createIngredient(event) {
            event.preventDefault();
            const t = this;
            const dd = this.form;
            const headers = {
                "Content-Type" : "application/json; charset=utf-8",
                "Authorization" : 'Bearer ' + t.$cookies.get('token')
            }
            t.$axios.post("http://localhost:8080/v1/ingredients", JSON.stringify(dd), {headers})
            .then(function () {
                t.getIngredients(0);
            })
            .catch(function (error) {
                alert(error);
            }) 
        },
        deleteIngredient(ingredient) {
            if(confirm(ingredient.name + '을 삭제하겠습니까?')) {
                console.log(JSON.stringify({id: ingredient.id}));
                const t = this;
                const headers = {
                "Content-Type" : "application/json; charset=utf-8",
                "Authorization" : 'Bearer ' + t.$cookies.get('token')
            }
                const body = {
                    id: ingredient.id
                }
                this.$axios.delete("http://localhost:8080/v1/ingredients", {
                    data: JSON.stringify(body),
                    headers: headers
                })
                .then(function() {
                    t.getIngredients(t.page-1);
                })
                
            }
        },
        getIngredients(page) {
            const t = this;
            const headers = {
                "Content-Type" : "application/json; charset=utf-8",
                "Authorization" : 'Bearer ' + t.$cookies.get('token')
            }
            const url = "http://localhost:8080/v1/ingredients";
            this.$axios({
                url: url,
                methods: 'GET',
                headers: headers,
                params: {
                    page: page,
                    size: t.size
                }
            })
            .then(function(response) {
                console.log(response);
                t.ingredients = response.data.data.content;
                t.page = response.data.data.pageable.pageNumber + 1;
                t.pageable = response.data.data;
            })
            .catch(function (error) {
                alert(error);
            })
        }
    },
    created() {
        this.getIngredients(0)
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
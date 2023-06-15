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
<my-pagination></my-pagination>
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
import  MyPagination from '@/components/Pagination.vue'
export default {
    name: 'MyIngredient',
    components: {
        'my-pagination': MyPagination
    },
    data() {
        return {
            ingredients: [{id: 1, name: "이름"}],
            input: null,
            page: 0,
            size: 10,
            pageable: null,
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
                t.getIngredients();
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
                    t.getIngredients();
                })
                
            }
        },
        getIngredients() {
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
                    page: t.page,
                    size: t.size
                }
            })
            .then(function(response) {
                console.log(response);
                t.ingredients = response.data.data.content;
                t.page = response.data.data.pageable.pageNumber + 1;
                t.pageable = response.data.data.pageable;
            })
            .catch(function (error) {
                alert(error);
            })
        }
    },
    mounted() {
        this.getIngredients()
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
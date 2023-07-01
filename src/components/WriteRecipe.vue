<template>
  <form @submit="onSubmit" enctype="multipart/form-data">
    <div class="mb-3">
        <label for="title" class="form-label">제목</label>
        <input id="title" name="title" class="form-control" v-model="form.title"/>
    </div>
    <div id="editor"></div>
    <div class="mb-3">
    <editor/>
    </div>
    <div class="mb-3">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            재료 등록
        </button>
    </div>

    <div>
        <input type="file" id="upLoadFile" ref="upLoadFile" @change="inputFile" multiple><br><br>
    </div>

    <button type="submit" @click="onSubmit">작성완료</button>
  </form>

<!--  Ingredient Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">재료 등록</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="input-group mb-3">
            <input type="text" class="form-control" aria-label="Recipient's username" aria-describedby="button-addon2">
            <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="findsByIngredient(0)">Search</button>
        </div>
        <div class="mb-3">
            <div v-for="(ingredient, index) in ingredientArray" :key="index">
                <input type="radio" class="form-check-input" :id='ingredient.id' v-model="pickIngredient" :value="ingredient"/>
                <label :for="ingredient.id" class="form-check-label">{{ingredient.name}}</label>
            </div>
        </div>
        <input class="form-control" placeholder="재료양" v-model="inputAmount"/>
        <button class="btn btn-primary" @click="insertIngredient">등록</button>
      </div>
      <div class="modal-body">
        <h2 class="mb-3">등록된 재료</h2>
        <ul v-for="(name, index) in form.ingredientNameList" :key="index">
            <li>
                {{name}}
                <button class="btn btn-danger" @click="deleteSelectedIngredient(index)">제거</button>
            </li>
        </ul>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import '@toast-ui/editor/dist/toastui-editor.css';
import Editor from '@toast-ui/editor';


export default {
    data() {
        return {
            form: {
                title: '',
                upLoadFile: [],
                ingredientList: [],
                ingredientNameList: [],
                amounts: []
            },
            editor: '',
            ingredientArray: [],
            inputIngredientName: '',
            inputAmount: '',
            pickIngredient: null
        }
    },
    methods: {
        onSubmit(e) {
            e.preventDefault();

            if(this.form.title === '') {
                alert('제목을 입력해주세요.');
                return;
            }

            if(this.editor.getMarkdown().length === 0) {
                alert('내용을 작성해주세요.');
                return;
            }

            const headers = {
                "Authorization" : 'Bearer ' + this.$cookies.get('token'),
                'Content-Type': 'multipart/form-data'
            }

            const formData = new FormData();
            formData.append('title', this.form.title);
            formData.append('cookery', this.editor.getMarkdown());
            for(let i = 0; i < this.form.upLoadFile.length; i++) {
                formData.append('upLoadFile', this.form.upLoadFile[i]);
            }
            for(let i = 0; i < this.form.ingredientList.length; i++) {
                formData.append('ingredientList', this.form.ingredientList[i]);
                formData.append('amounts', this.form.amounts[i]);
            }
            const t = this;
            this.$axios.post("http://localhost:8080/v1/recipes", formData, {headers})
            .then(function() {
                t.$router.push('/board');
            })
            return;
        },
        inputFile(e) {
            this.form.upLoadFile = e.target.files;
        },
        insertIngredient(e) {
            e.preventDefault();
            if(this.form.ingredientList.includes(this.pickIngredient.id)) {
                alert("이미 등록된 재료입니다.");
                return;
            }
            if(this.pickIngredient != null && this.inputAmount !== "") {
                this.form.ingredientList.push(this.pickIngredient.id);
                this.form.amounts.push(this.inputAmount);
                this.form.ingredientNameList.push(this.pickIngredient.name);
            }
        },
        findsByIngredient(page) {
            const headers = {
                "Content-Type" : "application/json; charset=utf-8",
                "Authorization" : 'Bearer ' + this.$cookies.get('token')
            }

            const t = this;
            this.$axios({
                url: "http://localhost:8080/v1/ingredients",
                methods: 'GET',
                headers: headers,
                params: {
                    name: this.inputIngredientName,
                    page: page
                }
            }).then(function(response) {
                t.ingredientArray = response.data.data.content;
            }).catch(function(e) {
                alert(e);
            })
        },
        deleteSelectedIngredient(index) {
            this.form.amounts.remove(index-1);
            this.form.ingredientList.remove(index-1);
            this.form.ingredientNameList.remove(index-1);
        }
    },
    mounted() {
        this.editor = new Editor({
            el: document.querySelector('#editor'),
            previewStyle: 'vertical',
            height: '400px',
            initialEditType: 'markdown',
            useCommandShortcut: true,
            extendedAutolinks: true,
            frontMatter: true
      });
    }
}
</script>

<style>

</style>
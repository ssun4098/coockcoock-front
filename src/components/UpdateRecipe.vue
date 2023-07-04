/<template>
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
    mounted() {
        const headers = {
            "Authorization" : 'Bearer ' + this.$cookies.get('token')
        }
        const t = this;
        this.$axios({
        methods: 'GET',
        url: "http://localhost:8080/v1/recipes/" + this.$route.params.id,
        headers: headers,
      })
        .then(function(response) {
            t.form.title = response.data.data.title;
            t.form.writer = response.data.data.writer;
            this.editor = new Editor({
                el: document.querySelector('#editor'),
                previewStyle: 'vertical',
                height: '400px',
                initialEditType: 'markdown',
                useCommandShortcut: true,
                extendedAutolinks: true,
                frontMatter: true,
                initialValue: response.data.data.cookery
            });
        })
    }
}
</script>

<style>

</style>
<template>
  <form @submit="onSubmit" enctype="multipart/form-data">
    <div class="mb-3">
        <label for="title" class="form-label">제목</label>
        <input id="title" name="title" class="form-control" v-model="form.title"/>
    </div>
    <div id="editor"></div>
    <editor/>

    <div>
        <input type="file" id="upLoadFile" ref="upLoadFile" @change="inputFile" multiple><br><br>
    </div>

    <button type="submit" @click="onSubmit">작성완료</button>
  </form>
</template>

<script>
import '@toast-ui/editor/dist/toastui-editor.css';
import Editor from '@toast-ui/editor';


export default {
    data() {
        return {
            form: {
                title: '',
                cookery: '',
                upLoadFile: []
            },
            editor: ''
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
            this.form.cookery = this.editor.getMarkdown();
            const headers = {
                "Authorization" : 'Bearer ' + this.$cookies.get('token'),
                'Content-Type': 'multipart/form-data'
            }
            const formData = new FormData();
            formData.append('title', this.form.title);
            formData.append('cookery', this.editor.getMarkdown());
            console.log(this.form.cookery);
            for(let i = 0; i < this.form.upLoadFile.length; i++) {
                formData.append('upLoadFile', this.form.upLoadFile[i]);
            }
            this.$axios.post("http://localhost:8080/v1/recipes", formData, {headers})
            .then(function() {
                this.$myRouter.push('/board');
            })
            return;
        },
        inputFile(e) {
            this.form.upLoadFile = e.target.files;
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
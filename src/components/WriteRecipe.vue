<template>
  <form @submit="onSubmit">
    <div class="mb-3">
        <label for="title" class="form-label">제목</label>
        <input id="title" name="title" class="form-control" v-model="form.title"/>
    </div>
    <div id="editor"></div>
    <editor/>

    <div>
        <input type="file" id="upLoadFile" name="upLoadFile" @change="inputFile" multiple><br><br>
    </div>

    <button type="submit">작성완료</button>
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
                upLoadFile: null
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
            this.cookery = this.editor.getMarkdown();
            this.form.upLoadFile = this.$refs.Myfiles.files;
            return;
        },
        inputFile(e) {
            console.log(e.target.files.length)
            // for(let i = 0; i < e.target.files.length; i++) {
            //     // this.form.upLoadFile.push(i);
            //     console.log(e.target.files[i]);
            // }
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
<template>
  <h1>{{title}}</h1>
  <hr class="bg-primary" />
  <div class="mt-5">
    <div id="viewer"></div>
  </div>
  <div id="writer_btn" v-if="checkWriter()">
    <a class="btn btn-primary" @click="update()">수정하기</a>
    <a class="btn btn-danger" @click="this.delete()">삭제하기</a>
  </div>
</template>

<script>
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
export default {
    name: 'MyRecipe',
    data() {
        return {
            title: '',
            cookery: '',
            writer: '',
            viewer: ''
        }
    },
    mounted() {
    },
    created() {
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
            t.title = response.data.data.title;
            t.writer = response.data.data.writer;
            t.viewer = new Viewer({
                el: document.querySelector('#viewer'),
                height: '600px',
                initialValue: response.data.data.cookery
            })
        })
    },
    methods: {
        checkWriter() {
        const payload = this.$cookies.get('token').split('.')[1];
        const jsonPayload = JSON.parse(window.atob(payload));
            return this.writer === jsonPayload.sub;
        },
        update() {
            this.$router.push('/write/' + this.$route.params.id);
        },
        delete() {
            if(confirm("삭제하시겠습니까?")) {
                const headers = {
            "Authorization" : 'Bearer ' + this.$cookies.get('token')
            }
            this.$axios.delete("http://localhost:8080/v1/recipes/" + this.$route.params.id, headers)
            .then(function(response) {
                if(!response.data.success){
                    alert('삭제에 실패하였습니다. 자신의 글인지 확인해주시고 관리자에게 문의 부탁드립니다.');
                }
                this.$route.push('/board');
            })
            }
        }
    }
}
</script>

<style>
hr {
    height: 3px;
}

#writer_btn {
    float: right;
}
</style>
<template>
  <h1>{{title}}</h1>
  <hr class="bg-primary" />
  <div class="mt-5">
    <div id="viewer"></div>
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
            t.viewer = new Viewer({
                el: document.querySelector('#viewer'),
                height: '600px',
                initialValue: response.data.data.cookery
            })
        })
    },
    methods: {
        getCookery() {
            return this.cookery;
        }
    }
}
</script>

<style>
hr {
    height: 3px;
}
</style>
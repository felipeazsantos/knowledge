<template>
    <div class="article-admin">
        <b-form>
            <input type="hidden" id="article-id" v-model="article.id">
            <b-form-group label="Nome:" label-for="article-name">
                <b-form-input id="article-name"
                    v-model="article.name"
                    placeholder="Informe o Nome do Artigo"
                    :readonly="mode === 'remove'" />
            </b-form-group>
            <b-form-group label="Descrição:" label-for="article-description">
                <b-form-input id="article-description"
                    v-model="article.description"
                    placeholder="Informe a Descrição do Artigo"
                    :readonly="mode === 'remove'" />
            </b-form-group>
            <b-form-group v-if="mode === 'save'" label="Imagem (URL):" label-for="article-imageUrl">
                <b-form-input id="article-imageUrl"
                    v-model="article.imageUrl"
                    placeholder="Informe a URL da Imagem"
                    :readonly="mode === 'remove'" />
            </b-form-group>
            <b-form-group v-if="mode === 'save'" label="Categoria:" label-for="article-categoryId">
                <b-form-select 
                    id="article-categoryId"
                    :options="categories"
                    v-model="article.categoryId" />
            </b-form-group>
            <b-form-group v-if="mode === 'save'" label="Autor:" label-for="article-userId">
                <b-form-select 
                    id="article-userId"
                    :options="users"
                    v-model="article.userId" />
            </b-form-group>
            <b-form-group v-if="mode === 'save'" label="Conteúdo" label-for="article-content">
                <VueEditor v-model="article.content"
                    placeholder="Informe o Conteúdo do Artigo" />
            </b-form-group>
            <b-form-group>
                <b-button v-if="mode === 'save'" class="mr-2" 
                    variant="primary"
                    @click="save">Salvar
                </b-button>
                <b-button v-if="mode === 'remove'" class="mr-2"
                    variant="danger"
                    @click="remove">Excluir
                </b-button>
                <b-button @click="reset">Cancelar</b-button>
            </b-form-group>
        </b-form>
        <hr>
        <b-table hover striped :items="articles" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" class="mr-2"
                    @click="loadArticle(data.item)">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger"
                    @click="loadArticle(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: 'ArticleAdmin',
    components: { VueEditor },
    data() {
        return {
            mode: 'save',
            article: {},
            articles: [],
            categories: [],
            users: [],
            page: 1,
            limit: 0,
            count: 0,
            fields: [
                { key: "id", label: "Código", sortable: true },
                { key: "name", label: "Nome", sortable: true },
                { key: "description", label: "Descrição", sortable: true },
                { key: "actions", label: "Ações" }
            ]
        }
    },
    methods: {
        loadArticles() {
            axios.get(`${baseApiUrl}/articles`)
                .then(res => {
                    //this.articles = res.data
                    this.articles = res.data.data
                    this.count = res.data.count
                    this.limit = res.data.limit   
                })
        },
        loadCategories() {
            axios.get(`${baseApiUrl}/categories`)
                .then(res => {
                    this.categories = res.data.map(category => {
                        return { value: category.id, text: category.path }
                    })
                })
        },
        loadUsers() {
            axios.get(`${baseApiUrl}/users`)
                .then(res => {
                    this.users = res.data.map(user => {
                        return { value: user.id, text: `${user.name} - ${user.email}` }
                    })
                })
        },
        reset() {
            this.mode = 'save'
            this.article = {}
            this.loadArticles()
            this.loadCategories()
            this.loadUsers()
        },
        save() {
            const method = this.article.id ? 'put' : 'post'
            const id = this.article.id ? `/${this.article.id}` : ''
            axios[method](`${baseApiUrl}/articles${id}`, this.article)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            axios.delete(`${baseApiUrl}/articles/${this.article.id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadArticle(article, mode = 'save') {
            this.mode = mode
            axios.get(`${baseApiUrl}/articles/${article.id}`)
                .then(res => this.article = res.data)
        }
    },
    mounted() {
        this.loadArticles()
        this.loadCategories()
        this.loadUsers()
    }
}
</script>

<style>

</style>
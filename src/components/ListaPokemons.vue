<template>
    <v-main id="ListaPokemons">
        <v-container class="main-container">
            <v-row class="row-busca">
                <v-col>
                    <v-btn @click="logStore()">
                        Log Store {{page}}
                    </v-btn>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    class="d-flex"
                >
                    <v-text-field
                        v-model="searchValue"
                        solo
                        label="Digite o nome do pokemon que procura"
                        clearable
                        hide-details
                    ></v-text-field>
                    <v-btn @click="buscaPokemon(searchValue)">
                        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                        </svg>
                    </v-btn>
                </v-col>
                <v-col
                    cols="12"
                    sm="3"
                    class="div-btns-change-view-style"
                >
                    <div class="wrapper-exibir">
                        <v-menu
                            bottom
                            offset-y
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    class="ma-2"
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    {{$store.getters.limit}}
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item
                                    v-for="item in qtdeExibir"
                                    :key="item.value"
                                    @click="atualizaLista(item.value)"
                                >
                                    <v-list-item-title>{{ item.text }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                        <v-menu
                            bottom
                            offset-y
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    class="ma-2"
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    Ordenacao
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item
                                    v-for="item in tipoOrdenacao"
                                    :key="item.value"
                                    @click="atualizaLista(item.value)"
                                >
                                    <v-list-item-title>{{ item.text }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
                    <div class="wrapper-list-style-change">
                        <v-btn @click="liViewType = 'view-grid'">
                            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M3,11H11V3H3M3,21H11V13H3M13,21H21V13H13M13,3V11H21V3" />
                            </svg>
                        </v-btn>
                        <v-btn @click="liViewType = 'view-list'">
                            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M9,5V9H21V5M9,19H21V15H9M9,14H21V10H9M4,9H8V5H4M4,19H8V15H4M4,14H8V10H4V14Z" />
                            </svg>
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
            <v-row class="row-lista-pokemons">
                <v-col md="12" class="div-lista-pokemons">
                    <ul>
                        <li 
                            :class="'li-pokemon ' + liViewType" 
                            v-for="pokemon in pokemon_list" 
                            :key="pokemon.name" 
                            @click="openModal(pokemon.name)"
                        >
                            <CardPokemon
                                :name="pokemon.name"
                                :url="pokemon.url"
                            />
                        </li>
                    </ul>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                    cols="12"
                    class="div-pagination"
                >
                    <v-pagination
                        :length="pageTotal"
                        :total-visible="7"
                        v-model="page"
                        prev-icon="mdi-menu-left"
                        next-icon="mdi-menu-right"
                        @input="handlePageChange"
                    ></v-pagination>
                </v-col>
            </v-row>
        </v-container>
        <ModalPokemon
            v-if="showModalPokemonInfo"
            :name="pokemonName"
            :show="showModalPokemonInfo"
            @handleClose="()=>{
                showModalPokemonInfo = false
            }"
        />
    </v-main>
</template>

<script>
    import store from "@/store"
    import ModalPokemon from '@/components/ModalPokemon.vue';
    import CardPokemon from '@/components/CardPokemon.vue';

    export default {
        name: "ListaPokemons",
        components: {
            ModalPokemon,
            CardPokemon,
        },
        data: () => ({
            msg: null,
            img_: null,
            searchValue: '',
            pokemon_list: [],
            pokemonUrl: '',
            liViewType: 'view-grid',
            pokemonInfo: null,
            showModalPokemonInfo: false,
            pokemonName: '',
            page: 1,
            qtdePerPage: 12,
            qtdeExibir: [
                {
                    text: '12',
                    value: 12,
                },
                {
                    text: '24',
                    value: 24,
                },
                {
                    text: '36',
                    value: 36,
                },
            ],
            tipoOrdenacao: [
                {
                    text: 'Numero Asc',
                    value: 'numeroAsc',
                },
                {
                    text: 'Numero Dec',
                    value: 'numeroDec',
                },
                {
                    text: 'Alfa Asc',
                    value: 'alfaAsc',
                },
                {
                    text: 'Alfa Des',
                    value: 'alfaDes',
                },
            ],
        }),
        methods: {
            async init(url = null) {
                await store.dispatch('getListaPokemons', url)
                this.pokemon_list = store.getters.pokemons_list
                console.log(store.getters.pokemons_list ,'asdasdasdawsdasdawewdafrefae')
            },
            async buscaPokemon(){
                await store.dispatch('setSearch', this.searchValue)
                this.pokemon_list = await store.getters.pokemons_list
            },
            async atualizaLista(limit){
                // console.log(limit, 'atualiza limite')
                await store.dispatch('setLimit', limit)
                this.init()
            },
            async openModal(name){
                this.pokemonName = await name
                this.showModalPokemonInfo = true
            },
            handlePageChange(){
                console.log(store.getters.limit, 'handlePageChange')
                if (this.page == 1) {
                    store.dispatch('setLimit', store.getters.limit)
                    store.dispatch('setOffset', 0)
                }else{
                    store.dispatch('setLimit', store.getters.limit)
                    store.dispatch('setOffset', store.getters.limit*(this.page-1))
                }
                this.init()
            },
            logStore(){
                console.log(this.$store.getters, 'this.$store.getters - logStore()')
            },
        },
        computed: {
            pageTotal: function () {
                console.log(store.getters.pokemons_list, 'estoyaqui')
                console.log(store.getters.detailed_pokemon_list, 'querendote')
                return Math.ceil(store.getters.list_total/store.getters.limit)
            }
        },
        mounted() {
            this.init();
        },
    };
</script>

<style lang="scss">
    #ListaPokemons{
        .main-container{
            background-color: #f2b62099;
            border-radius: 5px;
        }
        .row-busca{
            display: flex;
            justify-content: center;
            .div-btns-change-view-style{
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
                text-align: center;
                .wrapper-exibir{
                    .v-menu{
                        display: block;
                    }
                }
            }
        }
        .row-lista-pokemons{
            .div-lista-pokemons{
                ul{
                    display: flex;
                    flex-wrap: wrap;
                    list-style: none;
                    li{
                        padding: 10px;
                        min-width: 270px;
                        display: flex;
                        &.view-grid{
                            width: 25%;
                        }
                        &.view-list{
                            width: 100%;
                            .btn-ver-pokemon{
                                flex-direction: row;
                                justify-content: start;
                                .image{
                                    width: 20%;
                                    margin-right: 10px;
                                }
                            }
                        }
                    }
                }
            }
        }
        .div-pagination{
            .v-pagination{
                li{
                    .v-pagination__item--active{
                        background-color: blue;
                    }
                }
            }
        }
    }
</style>
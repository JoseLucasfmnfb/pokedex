<template>
    <v-main id="ListaPokemons">
        <v-container class="main-container">
            <v-row class="row-busca">
                <v-col
                    sm="12"
                    cols="12"
                    class="d-flex div-wrapper-types"
                >
                    <ul
                        v-if="mostraFiltroTipo"
                    >
                        <li
                            v-for="type in type_list"
                            :key="type.name"
                            :class="[('li-type type-color-' + type.name), ((type.name == $store.getters.type_selected) ? 'ativo' : '')]"
                            @click="filtraTipo(type.url, type.name)"
                        >
                            {{type.name}}
                        </li>
                    </ul>
                    <v-btn @click="mostraFiltroTipo = !mostraFiltroTipo">
                        Mostrar filtro de tipo
                        <svg style="width:24px;height:24px" viewBox="0 0 24 24" v-if="mostraFiltroTipo == false">
                            <path fill="currentColor" d="M22,4V2H2V4H11V18.17L5.5,12.67L4.08,14.08L12,22L19.92,14.08L18.5,12.67L13,18.17V4H22Z" />
                        </svg>
                        <svg style="width:24px;height:24px" viewBox="0 0 24 24" v-if="mostraFiltroTipo == true">
                            <path fill="currentColor" d="M4.08,11.92L12,4L19.92,11.92L18.5,13.33L13,7.83V22H11V7.83L5.5,13.33L4.08,11.92M12,4H22V2H2V4H12Z" />
                        </svg>
                    </v-btn>
                </v-col>
                <v-col
                    md="6"
                    sm="12"
                    cols="12"
                    class="d-flex"
                >
                    <v-text-field
                        v-model="searchValue"
                        solo
                        label="Digite o nome do pokemon que procura"
                        clearable
                        hide-details
                        v-on:keyup.enter="buscaPokemon(searchValue)"
                    ></v-text-field>
                    <v-btn @click="buscaPokemon(searchValue)">
                        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                        </svg>
                    </v-btn>
                </v-col>
                <v-col
                    md="6"
                    sm="12"
                    cols="12"
                    class="div-btns-change-view-style d-flex"
                >
                    <div class="wrapper-exibir">
                        <div class="inner-wrapper exibicao">
                            Exibição: 
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
                        </div>
                        <div class="inner-wrapper ordenacao">
                            Ordenação: 
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
                                        {{textOrdenacao}}
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item
                                        v-for="item in tipoOrdenacao"
                                        v-model="textOrdenacao"
                                        :key="item.value"
                                        @click="ordenaLista(item)"
                                    >
                                        <v-list-item-title>{{ item.text }}</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </div>
                    </div>
                    <div class="wrapper-list-style-change">
                        <div class="wrapper-limpar">
                            <v-btn @click="clear()">
                                Limpar
                            </v-btn>
                        </div>
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
            type_selected: '',
            searchValue: '',
            pokemon_list: [],
            type_list: [],
            liViewType: 'view-grid',
            pokemonInfo: null,
            showModalPokemonInfo: false,
            pokemonName: '',
            page: 1,
            textOrdenacao: 'Numero ↓',
            mostraFiltroTipo: false,
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
                    text: 'Numero ↓',
                    value: 'numeroAsc',
                },
                {
                    text: 'Numero ↑',
                    value: 'numeroDec',
                },
                {
                    text: 'Nome ↓',
                    value: 'alfaAsc',
                },
                {
                    text: 'Nome ↑',
                    value: 'alfaDes',
                },
            ],
        }),
        methods: {
            async init(url = null) {
                console.log('clicked')
                await store.dispatch('getListaPokemons', url)
                await store.dispatch('getTypes')
                this.pokemon_list = store.getters.pokemons_list
                this.type_list = store.getters.type_list
            },
            async buscaPokemon(){
                if (this.searchValue) {
                    await store.dispatch('setSearch', this.searchValue.toLowerCase())
                    this.pokemon_list = await store.getters.pokemons_list
                    console.log(this.searchValue, 'if')
                }else{
                    await store.dispatch('setClear')
                    this.init()
                    console.log(this.searchValue, 'else')
                }
                this.page = await 1
                this.handlePageChange()
            },
            async atualizaLista(limit){
                await store.dispatch('setLimit', limit)
                this.init()
            },
            async ordenaLista(ordenacao){
                this.textOrdenacao = ordenacao.text
                if (ordenacao.value == 'numeroAsc') {
                    this.init()
                }
                if (ordenacao.value == 'numeroDec') {
                    await this.init()
                    await store.dispatch('setOrdenacao', ordenacao.value)
                    this.init()
                }
                await store.dispatch('setOrdenacao', ordenacao.value)
                this.init()
            },
            async filtraTipo(type, nome){
                await store.dispatch('getPokemonsByType', type)
                await store.dispatch('setTypeFilter', nome)
                this.type_selected = await nome
                await this.init()
                this.page = await 1
                this.handlePageChange()
            },
            async openModal(name){
                this.pokemonName = await name
                this.showModalPokemonInfo = true
            },
            handlePageChange(){
                if (this.page == 1) {
                    store.dispatch('setLimit', store.getters.limit)
                    store.dispatch('setOffset', 0)
                }else{
                    store.dispatch('setLimit', store.getters.limit)
                    store.dispatch('setOffset', store.getters.limit*(this.page-1))
                }
                this.init()
            },
            async clear(){
                await store.dispatch('setClear')
                this.init()
            }
        },
        computed: {
            pageTotal: function () {
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
            .div-wrapper-types{
                background-color: #232c36;
                border-radius: 5px;
                ul{
                    display: flex;
                    flex-wrap: wrap;
                    list-style: none;
                    justify-content: space-around;
                    width: 100%;
                    .li-type{
                        border-radius: 5px;
                        margin: 0 5px 5px 0;
                        padding: 5px 8px;
                        text-transform: capitalize;
                        opacity: 0.5;
                        transition: all ease .3s;
                        cursor: pointer;
                        &.type-color-fairy{
                            margin-right: 0;
                        }
                        &:hover{
                            opacity: 1;
                        }
                        &.type-color-unknown,
                        &.type-color-shadow{
                            display: none;
                        }
                        &.ativo{
                            opacity: 1;
                        }
                    }
                }
                button{
                    border: none;
                    box-shadow: none;
                    width: 100%;
                    svg{
                        margin-left: 10px;
                    }
                }
            }
            .d-flex{
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                .v-input__slot{
                    .v-input__append-inner{
                        button{
                            min-height: auto;
                            border-radius: 100%;
                            padding: 5px;
                            background-color: red;
                        }
                    }
                }
                button{
                    min-height: 48px;
                    background-color: #232c36;
                    color: #fff;
                }
            }
            .div-btns-change-view-style{
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                align-items: center;
                text-align: center;
                .wrapper-exibir{
                    display: flex;
                    justify-content: space-around;
                    flex: 2;
                    .inner-wrapper{
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: center;
                        align-items: center;
                        text-align: center;
                        font-size: 18px;
                        font-weight: 700;
                        color: #000;
                        .v-menu{
                            display: block;
                        }
                    }
                    @media (max-width: $xs){
                        width: 100%;
                    }
                }
                .wrapper-list-style-change{
                    flex: 1;
                    display: flex;
                    justify-content: space-around;
                    @media (max-width: $xs){
                        margin-bottom: 15px;
                        width: 100%;
                        justify-content: flex-end;
                        button{
                            margin-left: 10px;
                        }
                    }
                }
                button{
                    min-width: auto;
                    padding: 0 12px;
                    min-height: 48px;
                }
                @media (max-width: $xs){
                    flex-direction: column-reverse;
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
                        // min-width: 270px;
                        display: flex;
                        cursor: pointer;
                        &.view-grid{
                            width: 25%;
                            @media (max-width: $sm){
                                width: 50%;
                            }
                        }
                        &.view-list{
                            width: 100%;
                            .btn-ver-pokemon{
                                flex-direction: row;
                                justify-content: start;
                                .image{
                                    width: 20%;
                                    margin-right: 10px;
                                    @media (max-width: $sm){
                                        width: 100%;
                                        margin-right: 0;
                                    }
                                }
                                @media (max-width: $sm){
                                    flex-direction: column;
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
                        background-color: #232c36;
                    }
                }
            }
        }
    }
</style>
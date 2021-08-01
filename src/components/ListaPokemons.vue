<template>
    <v-main id="ListaPokemons">
        <v-container class="main-container">
            <v-row class="row-busca">
                <v-col>
                    <v-btn @click="logStore()">
                        Log Store
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
                        <v-select
                            :items="['Foo', 'Bar', 'Fizz', 'Buzz']"
                            label="Fizzbuzz"
                        >
                            <template v-slot:item="{ item, attrs, on }">
                                <v-list-item
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    <v-list-item-title
                                    :id="attrs['aria-labelledby']"
                                    v-text="item"
                                    ></v-list-item-title>
                                </v-list-item>
                            </template>
                        </v-select>
                        <v-select
                            :items="qtdeExibir"
                            v-model="filtros.limit"
                            label="Items"
                            hide-details
                        >
                        </v-select>
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
                        <li class="li-pokemon" :class="liViewType" v-for="pokemon in $store.getters.pokemons.results" :key="pokemon.name">
                            <button @click="getPokemonInfo(pokemon.url)" class="btn-ver-pokemon">
                                <span>
                                    {{pokemon.name}}
                                </span>
                                <span class="svg-icon">
                                    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4C7.92,4 4.55,7.05 4.06,11H8.13C8.57,9.27 10.14,8 12,8C13.86,8 15.43,9.27 15.87,11H19.94C19.45,7.05 16.08,4 12,4M12,20C16.08,20 19.45,16.95 19.94,13H15.87C15.43,14.73 13.86,16 12,16C10.14,16 8.57,14.73 8.13,13H4.06C4.55,16.95 7.92,20 12,20M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z" />
                                    </svg>
                                </span>
                            </button>
                        </li>
                    </ul>
                </v-col>
            </v-row>
        </v-container>
        <ModalPokemon
            v-if="showModalPokemonInfo"
            :getter="$store.getters.pokemon_info"
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

    export default {
        name: "ListaPokemons",
        components: {
            ModalPokemon,
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
            filtros: {
                limit: 20,
                offset: 0,
            },
            qtdeExibir: [
                {
                    text: '20',
                    value: 20,
                },
                {
                    text: '50',
                    value: 50,
                },
                {
                    text: '100',
                    value: 100,
                },
            ]
        }),
        methods: {
            async init() {
                await this.listaPokemon();
                // console.log(this.$store.getters.pokemons, 'store.getters.pokemons - init()')
            },
            listaPokemon(){
                store.dispatch('getListaPokemons', this.filtros)
            },
            buscaPokemon(){
                store.dispatch('getListaPokemons', this.searchValue)
            },
            async getPokemonInfo(url){
                console.log(url, 'getPokemonInfo url');
                await store.dispatch('getPokemon', url)
                this.pokemonInfo = await store.getters.pokemon_info
                // await console.log(this.$store.getters, 'store.getters - getPokemonInfo()')
                await console.log(this.pokemonInfo, 'this.pokemonInfo - getPokemonInfo()')
                this.showModalPokemonInfo = await true
            },
            logStore(){
                console.log(this.$store.getters, 'this.$store.getters - logStore()')
            }
        },
        computed: {},
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
                        .btn-ver-pokemon{
                            // border: solid 1px #000;
                            background-color: #000;
                            border-radius: 35px;
                            color: #fff;
                            padding: 12px 20px;
                            display: inline-flex;
                            text-transform: capitalize;
                            width: 100%;
                            position: relative;
                            transition: all ease .3s;
                            align-items: center;
                            justify-content: space-between;
                            font-size: 18px;
                            font-weight: 700;
                            span{
                                z-index: 1;
                            }
                            &:before{
                                content: '';
                                clip-path: polygon(60% 0, 100% 0%, 100% 100%, 0% 100%);
                                background-color: #e4700b;
                                right: -1.5px;
                                top: -1px;
                                bottom: -1px;
                                width: 40%;
                                display: flex;
                                position: absolute;
                                border-radius: 0 35px 35px 0;
                                transition: all ease .3s;
                            }
                            &:hover{
                                &:before{
                                    clip-path: polygon(0% 0, 100% 0%, 100% 100%, 0% 100%);
                                    width: 101%;
                                    border-radius: 35px;
                                }
                            }
                        }
                        &.view-grid{
                            width: 25%;
                        }
                        &.view-list{
                            width: 100%;
                        }
                    }
                }
            }
        }
    }
</style>
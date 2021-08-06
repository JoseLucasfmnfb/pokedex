<template>
    <div class="btn-ver-pokemon" v-if="pokemon">
        <div class="image">
            <figure>
                <img class="img-responsive" :src="pokemon.sprites.front_default" alt="">
            </figure>
        </div>
        <div class="conteudo">
            <div class="name">
                <span>
                    Nº{{(pokemon.id.toString().length == 1) ? '00'+pokemon.id : (pokemon.id.toString().length == 2) ? '0'+pokemon.id : pokemon.id}}
                </span>
                <h2>
                    {{pokemon.name}}
                </h2>
            </div>
            <div class="types">
                <div class="div-type" :class="'type-color-'+type.type.name" v-for="type in pokemon.types" :key="type.type.name">
                    {{type.type.name}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import store from "@/store"

    export default {
        props: ['name', 'url'],
        name: "CardPokemon",
        data: () => ({
            pokemon: null,
        }),
        methods: {
            init(){
                store.dispatch('getPokemon', this.url).then(async () => {
                    this.pokemon = await store.getters.detailed_pokemon_list(this.name)
                })
            }
        },
        mounted(){
            this.init()
        }
    }
</script>

<style lang="scss" scoped>
    .btn-ver-pokemon{
        // border: solid 1px #000;
        // background-color: #cdcdcd;
        border-radius: 35px;
        color: #000;
        display: inline-flex;
        flex-direction: column;
        text-transform: capitalize;
        width: 100%;
        position: relative;
        transition: all ease .3s;
        align-items: center;
        justify-content: space-between;
        font-size: 18px;
        font-weight: 700;
        .image{
            width: 100%;
            background-color: #F2F2F2;
            border-radius: 5px;
            min-height: 230px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            figure{
                width: 100%;
                img{
                    width: 80%;
                }
            }
            @media (max-width: $sm){
                min-height: 168px;
            }
        }
        .name{
            padding: 12px 0;
            h2{
                @media (max-width: $sm){
                    font-size: 16px;
                }
            }
        }
        .types{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            .div-type{
                margin: 0 5px;
                font-size: 14px;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 5px 10px;
                border-radius: 5px;
                @media (max-width: $sm){
                    padding: 5px;
                    margin: 0 2px;
                }
            }
        }
        &:hover{
            &:before{
                clip-path: polygon(0% 0, 100% 0%, 100% 100%, 0% 100%);
                width: 101%;
                border-radius: 35px;
            }
        }
    }
</style>
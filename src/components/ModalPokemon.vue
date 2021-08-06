<template>
    <v-row justify="center" v-if="showModal">
        <v-dialog
            v-model="showModal"
            margin="0"
            id="modalPokemon"
        >
            <v-card>
                <v-card-actions>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="closeInfo()"
                    >
                        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />
                        </svg>
                    </v-btn>
                </v-card-actions>
                <v-card-title class="text-h5">
                    <h2>
                        {{dados.name}}
                    </h2>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col
                            sm="6"
                            cols="12"
                        >
                            <figure>
                                <img class="img-responsive" v-if="dados.sprites.other.dream_world.front_default" :src="dados.sprites.other.dream_world.front_default" alt="">
                                <img class="img-responsive" v-else :src="dados.sprites.front_default" alt="">
                            </figure>
                            <div class="types">
                                <div class="div-type" :class="'type-color-'+type.type.name" v-for="type in dados.types" :key="type.type.name">
                                    {{type.type.name}}
                                </div>
                            </div>
                        </v-col>
                        <v-col
                            sm="6"
                            cols="12"
                        >
                            <ul class="ul-pokemon-stats">
                                <li :class="'li-stats-'+stats.stat.name" v-for="stats in dados.stats" :key="stats.stat.name">
                                    <h3>
                                        <span>
                                            {{stats.stat.name}}:
                                        </span>
                                        <span>
                                            {{stats.base_stat}}
                                        </span>
                                    </h3>
                                    <div class="wrapper-statsBar">
                                        <span class="statsBar" :style="'width: calc(100% *' + stats.base_stat +'/255);'"></span>
                                    </div>
                                </li>
                            </ul>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    import store from "@/store"

    export default {
        props: ["show", "name"],
        name: 'ModalPokemon',
        data:() => ({
            showModal: false,
            dados: null,
        }),
        methods:{
            async init(){
                await this.getPokemonInfo()
            },
            async getPokemonInfo(){
                this.showModal = await this.show
                this.dados = store.getters.detailed_pokemon_list(this.name)
                let elHtml = document.getElementsByTagName('html')[0]
                if (this.modalAtiva == true) {
                    elHtml.style.overflowY = 'hidden'
                }
            },
            async closeInfo(){
                let elHtml = await document.getElementsByTagName('html')[0]
                elHtml.style.overflowY = await 'auto'
                this.showModal = await false
                this.$emit('handleClose')
            }
        },
        mounted(){
            this.init()
        },
        watch: {
        },
        computed: {
        }
    }
</script>

<style lang="scss">
    #modalPokemon{
        display: flex;
        .v-dialog__content{
            &.v-dialog__content--active{
                background-color: #00000099;
            }
            .v-dialog{
                max-width: 80%;
                .v-card{
                    .v-card__actions{
                        justify-content: flex-end;
                    }
                }
                .v-card__title{
                    justify-content: center;
                    padding-bottom: 24px;
                    h2{
                        text-transform: capitalize;
                    }
                }
                .v-card__text{
                    .types{
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: center;
                        align-items: center;
                        text-align: center;
                        padding-top: 15px;
                        .div-type{
                            min-width: 125px;
                            text-transform: uppercase;
                            padding: 8px 20px;
                            margin: 0 10px;
                            border-radius: 5px;
                            font-size: 16px;
                            font-weight: 700;
                        }
                    }
                    .ul-pokemon-stats{
                        list-style: none;
                        list-style: none;
                        display: flex;
                        flex-wrap: wrap;
                        flex-direction: column;
                        background-color: #cdcdcd;
                        border-radius: 10px;
                        padding: 10px;
                        background: #0e5409;
                        li{
                            display: flex;
                            border: 2px solid #119e07;
                            background: #0dca00;
                            padding: 10px;
                            border-radius: 10px;
                            h3{
                                text-transform: capitalize;
                                min-width: 200px;
                                display: flex;
                                justify-content: space-between;
                                padding: 5px;
                                @media (max-width: $md){
                                    min-width: 155px;
                                    font-size: 14px;
                                }
                            }
                            .wrapper-statsBar{
                                width: 255px;
                                display: flex;
                                margin-left: 5px;
                                padding: 2px;
                                @media (max-width: 1350px){
                                    width: 100%;
                                }
                            }
                            &.li-stats-hp{
                                h3{
                                    background: #FF5959;
                                }
                                .wrapper-statsBar{
                                    background: #FF5959;
                                    .statsBar{
                                        background-color: #FF0000;
                                        border: 1px solid #A60000;
                                    }
                                }
                            }
                            &.li-stats-attack{
                                h3{
                                    background: #F5AC78;
                                }
                                .wrapper-statsBar{
                                    background: #F5AC78;
                                    .statsBar{
                                        background-color: #F08030;
                                        border: 1px solid #9C531F;
                                    }
                                }
                            }
                            &.li-stats-defense{
                                h3{
                                    background: #FAE078;
                                }
                                .wrapper-statsBar{
                                    background: #FAE078;
                                    .statsBar{
                                        background-color: #F8D030;
                                        border: 1px solid #A1871F;
                                    }
                                }
                            }
                            &.li-stats-special-attack{
                                h3{
                                    background: #9DB7F5;
                                }
                                .wrapper-statsBar{
                                    background: #9DB7F5;
                                    .statsBar{
                                        background-color: #6890F0;
                                        border: 1px solid #445E9C;
                                    }
                                }
                            }
                            &.li-stats-special-defense{
                                h3{
                                    background: #a08ddb;
                                }
                                .wrapper-statsBar{
                                    background: #a08ddb;
                                    .statsBar{
                                        background-color: #7350c8;
                                        border: 1px solid #4e3482;
                                    }
                                }
                            }
                            &.li-stats-speed{
                                h3{
                                    background: #FA92B2;
                                }
                                .wrapper-statsBar{
                                    background: #FA92B2;
                                    .statsBar{
                                        background-color: #F85888;
                                        border: 1px solid #A13959;
                                    }
                                }
                            }
                        }
                    }
                    @media (max-width: $xs){
                        padding: 0 10px 20px;
                    }
                }
                @media (max-width: $xs){
                    max-width: 95%!important;
                    margin: 0!important;
                }
            }
        }
    }
</style>

<template>
    <v-dialog
        id="modalMessage"
        v-model="showModal"
    >
        <v-card>
            <v-card-title class="text-h5">
                <h2>
                    Nenhum Pokemon encontrado!
                </h2>
            </v-card-title>
            <v-card-actions>
                <v-btn
                    color="green darken-1"
                    text
                    @click="closeModal()"
                >
                    OK!
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props:['showModalMessage'],
        name: 'ModalMessage',
        data:() => ({
            showModal: false,
        }),
        methods:{
            async closeModal(){
                this.showModal = await false
                this.$emit('hadleCloseMessage')
            }
        },
        mounted(){
            this.showModal = true
        },
    }
</script>

<style lang="scss">
    #modalMessage{
        display: flex;
        .v-dialog__content{
            &.v-dialog__content--active{
                background-color: #00000099;
            }
            .v-dialog{
                max-width: 80%;
                .v-card{
                    .v-card__actions{
                        justify-content: center;
                        button{
                            min-height: 48px;
                            background-color: #232c36;
                            color: #fff;
                        }
                    }
                }
                .v-card__title{
                    justify-content: center;
                    padding-bottom: 24px;
                    h2{
                        text-transform: capitalize;
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

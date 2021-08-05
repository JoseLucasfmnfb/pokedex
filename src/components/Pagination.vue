<template>
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
</template>

<script>
    import store from "@/store"

    export default {
        name: "Pagination",
        data: () => ({
            page: 1,
        }),
        methods: {
            handlePageChange(){
                console.log(store.getters.limit, 'handlePageChange')
                if (this.page == 1) {
                    store.dispatch('setLimit', store.getters.limit)
                    store.dispatch('setOffset', 0)
                }else{
                    store.dispatch('setLimit', store.getters.limit)
                    store.dispatch('setOffset', store.getters.limit*(this.page-1))
                }
                // this.init()
            },
        },
        computed: {
            pageTotal: function () {
                console.log(store.getters.pokemons_list, 'estoyaqui')
                console.log(store.getters.detailed_pokemon_list, 'querendote')
                return Math.ceil(store.getters.list_total/store.getters.limit)
            }
        },
    }
</script>
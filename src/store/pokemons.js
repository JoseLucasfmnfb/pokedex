import axios from 'axios'

const url_api_pokemon = 'https://pokeapi.co/api/v2/'

export default ({
	state: {
		status: null,
		pokemons_list: [],
        pokemon_by_type: [],
        detailed_pokemon_list: {},
        limit: 12,
        offset: 0,
        next: null,
        prev: null,
        search: '',
        list_total: null,
        ordenacao: null,
        type_list: null,
        type_selected: null,
	},
	mutations: {
		// SET_STATUS(state, status) {
		// 	state.status = status
		// },
		SET_LISTA_POKEMONS(state, pokemons_list) {
			state.pokemons_list = pokemons_list
		},
        SET_INFO_POKEMON(state, info_pokemon){
            state.detailed_pokemon_list[info_pokemon.name] = info_pokemon
        },
        SET_LIST_TYPE(state, type_list){
            state.type_list = type_list
        },
        SET_LIMIT(state, limit){
            state.limit = limit
        },
        SET_OFFSET(state, offset){
            state.offset = offset
        },
        SET_PREV(state, url){
            state.prev = url
        },
        SET_NEXT(state, url){
            state.next = url
        },
        SET_SEARCH(state, search){
            state.search = search
        },
        SET_LIST_TOTAL(state, list_total){
            state.list_total = list_total
        },
        SET_ORDENACAO(state, ordenacao){
            state.ordenacao = ordenacao
        },
        SET_TYPE(state, type_selected){
            state.type_selected = type_selected
        },
        SET_POKEMON_BY_TYPE(state, pokemon_by_type){
            state.pokemon_by_type = pokemon_by_type
        }
	},
	actions: {
		async getListaPokemons({ commit }, url = null) {
            if (!url) {
                url = url_api_pokemon + 'pokemon?limit=-1&offset=0'
            }
            var resp = await axios({
                url: url,
                method: 'GET'
            })
            if (resp.status == 200) {
                await commit('SET_LIST_TOTAL', resp.data.results.length)
                await commit('SET_LISTA_POKEMONS', resp.data.results)
                await commit('SET_PREV', resp.data.previous)
                await commit('SET_NEXT', resp.data.next)
            }
            return resp.data
		},
        async getPokemon({commit}, urlPokemon){
            var resp = await axios({
                url: urlPokemon,
                method: 'GET'
            })
            if (resp.status == 200) {
                await commit('SET_INFO_POKEMON', resp.data)
            }
            return resp.data
        },
        async getTypes({ commit }){
            var resp = await axios({
                url: url_api_pokemon + 'type',
                method: 'GET'
            })
            if (resp.status == 200) {
                await commit('SET_LIST_TYPE', resp.data.results)
            }
            return resp.data
        },
        async getPokemonsByType({ commit }, url){
            var resp = await axios({
                url: url,
                method: 'GET'
            })
            if (resp.status == 200) {
                await commit('SET_POKEMON_BY_TYPE', resp.data.pokemon)
            }
            return resp.data
        },
        async setLimit({ commit }, limit){
            commit('SET_LIMIT', limit)
            return true
        },
        async setOffset({ commit }, offset){
            commit('SET_OFFSET', offset)
            return true
        },
        async setSearch({ commit }, search){
            commit('SET_SEARCH', search)
            return true
        },
        async setOrdenacao({ commit }, ordenacao){
            commit('SET_ORDENACAO', ordenacao)
            return true
        },
        async setTypeFilter({ commit }, type_selected){
            commit('SET_TYPE', type_selected)
            return true
        },
        async setClear({ commit }){
            let clear_pokemons_list = []
            let clear_pokemon_by_type = []
            let clear_detailed_pokemon_list = {}
            let clear_limit = 12
            let clear_offset = 0
            let clear_next = null
            let clear_prev = null
            let clear_search = ''
            let clear_list_total = null
            let clear_ordenacao = null
            let clear_type_list = null
            let clear_type = null
            commit('SET_LISTA_POKEMONS', clear_pokemons_list)
            commit('SET_INFO_POKEMON', clear_detailed_pokemon_list)
            commit('SET_LIST_TYPE', clear_type_list)
            commit('SET_LIMIT', clear_limit)
            commit('SET_OFFSET', clear_offset)
            commit('SET_PREV', clear_next)
            commit('SET_NEXT', clear_prev)
            commit('SET_SEARCH', clear_search)
            commit('SET_LIST_TOTAL', clear_list_total)
            commit('SET_ORDENACAO', clear_ordenacao)
            commit('SET_TYPE', clear_type)
            await commit('SET_POKEMON_BY_TYPE', clear_pokemon_by_type)
            return true
        }
	},
	modules: {
	},
	getters: {
        type_selected: (state) => state.type_selected,
        prev: (state) => state.prev,
        next: (state) => state.next,
        limit: (state) => state.limit,
        list_total: (state) => state.list_total,
		pokemons_list: (state) => {
            var pokemons = JSON.parse(JSON.stringify(state.pokemons_list))
            var pokemons_by_type = JSON.parse(JSON.stringify(state.pokemon_by_type))
            if (state.ordenacao == 'alfaAsc') {
                pokemons.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
            }
            if (state.ordenacao == 'alfaDes') {
                pokemons.sort((a,b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0))
            }
            if (state.ordenacao == 'numeroDec') {
                pokemons.reverse()
            }
            if (pokemons_by_type.length != 0) {
                pokemons = pokemons.filter(array => pokemons_by_type.some(filter => filter.pokemon.name === array.name));
            }
            if (state.search) {
                pokemons = pokemons.filter((pokemon)=>{
                    return pokemon.name.match(state.search)
                })
            }
            state.list_total = pokemons.length
            return pokemons.splice(state.offset, state.limit)
        },
        detailed_pokemon_list: (state) => (name) => state.detailed_pokemon_list[name],
        type_list: (state) => state.type_list,
        pokemon_by_type: (state) => state.pokemon_by_type
	}
})
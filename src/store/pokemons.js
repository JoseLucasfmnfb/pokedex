import axios from 'axios'

const url_api_pokemon = 'https://pokeapi.co/api/v2/'

export default ({
	state: {
		status: null,
		pokemons_list: [],
        detailed_pokemon_list: {},
        limit: 12,
        offset: 0,
        next: null,
        prev: null,
        search: '',
        list_total: null,
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
                console.log(resp.data.results.length, 'entrefuetos')
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
        }
	},
	modules: {
	},
	getters: {
        prev: (state) => state.prev,
        next: (state) => state.next,
        limit: (state) => state.limit,
        list_total: (state) => state.list_total,
		pokemons_list: (state) => {
            var pokemons = JSON.parse(JSON.stringify(state.pokemons_list))
            console.log(pokemons, 'pokemons init')
            if (state.search) {
                pokemons = pokemons.filter((pokemon)=>{
                    return pokemon.name.match(state.search)
                })
                console.log(pokemons.length, 'ahogandome')
                state.list_total = pokemons.length
                console.log(state.list_total, 'asdasd')
                // commit('SET_LIST_TOTAL', pokemons.length)
            }
            return pokemons.splice(state.offset, state.limit)
        },
        detailed_pokemon_list: (state) => (name) => state.detailed_pokemon_list[name],
	}
})
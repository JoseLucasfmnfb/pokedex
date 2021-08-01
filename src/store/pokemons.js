import axios from 'axios'

const url_api_pokemon = 'https://pokeapi.co/api/v2/'

export default ({
	state: {
		status: null,
		pokemons: null,
        pokemon_info: null,
	},
	mutations: {
		// SET_STATUS(state, status) {
		// 	state.status = status
		// },
		SET_POKEMONS(state, pokemons) {
			state.pokemons = pokemons
		},
        SET_INFO_POKEMON(state, pokemon_info){
            state.pokemon_info = pokemon_info
        }
	},
	actions: {
		async getListaPokemons({ commit }, filters, nomePokemon) {
            var resp = ''
            console.log(nomePokemon, 'nomePokemon store')
            console.log(filters, 'filters store')
            if (nomePokemon) {
                resp = await axios({
                    url: url_api_pokemon + 'pokemon/' +
                        nomePokemon,
                    method: 'GET'
                })
            }else{
                resp = await axios({
                    url: url_api_pokemon + 'pokemon?' +
                        'limit=' + filters.limit +
                        '&offset=' + filters.offset,
                    method: 'GET'
                })
            }
            await commit('SET_POKEMONS', resp.data)
            // console.log(resp, 'estoyaqui')
            return resp.data
		},
        async getPokemon({commit}, urlPokemon){
            var resp = await axios({
                url: urlPokemon,
                method: 'GET'
            })
            await commit('SET_INFO_POKEMON', resp.data)
            console.log(resp.data, 'resp.data no store')
            return resp.data
        }
	},
	modules: {
	},
	getters: {
		pokemons: state => state.pokemons,
        pokemon_info: state => state.pokemon_info,
	}
})
// const vm = new Vue({
// 	el: '#app',
// 	data: {
// 		pokemons: []
// 	},
// 	methods: {
// 		init() {
// 			fetch('.api/pokemons.json')
// 			.then(resp => resp.json())
// 			.then(resp => {
// 				this.pokemons = resp;
// 			})
// 		}
// 	},
// 	created() {
// 		this.init
// 	}
// })
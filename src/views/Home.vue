<template>
    <v-main class="home" :style="{backgroundImage: 'url('+selectedBG+')'}">
        <div class="logo">
            <figure>
                <img class="img-responsive" alt="Vue logo" src="@/assets/logo.png" />
            </figure>
        </div>
        <ListaPokemons />
    </v-main>
</template>

<script>
    // @ is an alias to /src
    // import HelloWorld from "@/components/HelloWorld.vue";
    import ListaPokemons from '@/components/ListaPokemons.vue';
    import KantoMap from '@/assets/LGPE_Kanto_Map.webp';
    import JohtoMap from '@/assets/JohtoMap.webp';
    import HoennMap from '@/assets/Hoenn_ORAS.webp';
    import SinnohMap from '@/assets/Pt_Sinnoh.webp';
    import UnovaMap from '@/assets/Unova_B2W2_alt.webp';
    import KalosMap from '@/assets/Kalos_alt.webp';
    import AlolaMap from '@/assets/Alola_USUM_artwork.webp';
    import GalarMap from '@/assets/Galar_artwork.webp';

    export default {
        name: 'Home',
        components: {
            // HelloWorld,
            ListaPokemons,
        },
        data:() => ({
            selectedBG: '',
            bgs: [
                KantoMap,
                JohtoMap,
                HoennMap,
                SinnohMap,
                UnovaMap,
                KalosMap,
                AlolaMap,
                GalarMap,
            ],
        }),
        methods:{
            randomBG(){
                let idx = Math.floor(Math.random() * this.bgs.length)
                this.selectedBG = this.bgs[idx]
            }
        },
        mounted(){
            this.randomBG()
        }
    };
</script>

<style lang="scss" scoped>
    .home{
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        height: auto;
        min-height: 100vh;
        padding: 20px 0!important;
        .logo{
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 5px;
            figure{
                width: 5%;
            }
        }
    }
</style>

<template>
    <div id="app">
        <div class="app" :class="period">
           <!-- <WeatherApp :class="period"></WeatherApp>
            <AppCredits :year="year" :class="period"></AppCredits>-->
        </div>
    </div>
</template>

<script>
    import HelloWorld from '../components/HelloWorld.vue'
    export default {
        name: 'app',
        components: {
            HelloWorld
        }
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Roboto');
    .app{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .location{
        text-transform: uppercase;
        font-weight: bold;
        margin-left: 10%;
        margin-right: 10%;
        text-align: center;
    }
    .weather_description{
        margin-left: 10%;
        margin-right: 10%;
        text-align: center;
    }
    .icon{
        width: 15em;
        padding-botton: 10em;
    }
    body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        box-sizing: border-box;
    }
    .app-day{
        background-color: #ffcc00;
    }
    .app-night{
        background-color: ##3d65b5;
    }
</style>
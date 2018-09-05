<template>
    <v-container>
        <v-card>
            <v-card-text>
                <v-subheader class="pa-0">Look up weather for specific location</v-subheader>
                <v-autocomplete
                        v-model="model"
                        hint="Search for location"
                        :items="items"
                        :search-input.sync="location"
                        label="Location"
                        persistent-hint
                        return-object
                        :loading="loading"
                        prepend-icon="location_city"
                >
                    <v-slide-x-reverse-transition
                            slot="append-outer"
                            mode="out-in"
                    >
                    </v-slide-x-reverse-transition>
                </v-autocomplete>
            </v-card-text>
        </v-card>
        <v-card dark class="pa-4 mt-4" v-if="isSelected">
            <v-layout row wrap justify-center align-center>
                <v-flex xs4 class="align-content-center justify-center" style="text-align: center;">
                    <span class="body-1 white--text">Direction: {{getDirection}}</span>
                    <p class="display-1 font-weight-bold white--text mt-3">{{getTemperature()}}</p>
                    <span class="body-1 white--text">Speed: {{getSpeed}}</span>
                </v-flex>
                <v-flex xs4 class="align-content-center justify-center" style="text-align: center;">
                    <p class="display-1 font-weight-bold white--text mt-3">{{getCondition}}</p>
                </v-flex>
                <v-flex xs4 class="align-content-center justify-center" style="text-align: center;">
                    <p class="display-1 " style="color: #EEEEEE">{{formatDate(this.weather.lastBuildDate)}}</p>
                    <span class="body-1 white--text">{{getCity}}</span>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs12 class="text-xs-center">
                    <p class="title white--text mt-5">Forecasts:</p>
                </v-flex>
            </v-layout>
            <v-layout row wrap justify-center align-center class="mt-4">
                <v-flex xs3 v-for="item in getForecasts" class="align-content-center justify-center mt-3 pa-3"
                        style="text-align: center; border: 1px dashed #CCC">
                    <p class="title white--text mt-2">{{formatDate(item.date)}}</p>
                    <p class="body-1 white--text mt-5">High: {{item.high }} °F</p>
                    <p class="title font-weight-bold white--text mt-3">{{item.text}}</p>
                    <span class="body-1 white--text">low: {{item.low}} °F</span>
                </v-flex>
            </v-layout>
        </v-card>
    </v-container>
</template>

<script>
    import _ from 'lodash'
    import axios from 'axios'
    import moment from 'moment'
    import HelloWorld from '../components/HelloWorld.vue'

    const api_url = 'https://weatherapp-cs4261.herokuapp.com/'
    const weather_api = "https://query.yahooapis.com/v1/public/yql"
    export default {
        name: 'app',
        data() {
            return {
                loading: false,
                items: [],
                model: null,
                location: '',
                weather: {}
            }
        },
        methods: {
            formatDate(date) {
                if (date) {
                    return moment(date).format('MMM DD')
                }
            },
            getTemperature() {
                if (!_.isEmpty(this.weather)) {
                    return this.weather.item.condition.temp + '°F'
                }
            },
            async getLocationName(location) {
                try {
                    const res = await axios.get(api_url + 'location/' + location)
                    let data = []
                    _.map(res.data.predictions, (item) => {
                        let obj = {}
                        obj.value = item.description
                        obj.text = item.description
                        obj.place_id = item.place_id
                        data.push(obj)
                    })
                    this.items = data
                    this.loading = false
                } catch (e) {
                    this.loading = false
                }
            },
            async getPlaceID(place_id) {
                try {
                    const res = await axios.get(api_url + 'place/' + place_id)
                    let data = res.data.result.geometry.location
                    const res2 = await this.getWeatherByLatitude(data.lat, data.lng)
                    this.weather = res2.query.results.channel;
                } catch (e) {
                    console.log(e)
                }
            },
            async getWeatherByLatitude(latitude, longitude) {
                const sql = `select * from weather.forecast where u='f' and woeid in (SELECT woeid FROM geo.places WHERE text="(${latitude}, ${longitude})")`
                try {
                    const res = await axios.get(weather_api, {
                        params: {
                            q: sql,
                            lang: 'es',
                            format: 'json'
                        }
                    })
                    return res.data
                } catch (e) {
                    throw e.response
                }
            }
        },
        watch: {
            'model'(newVal, oldVal) {
                if (!_.isEmpty(newVal) && newVal !== oldVal) {
                    this.getPlaceID(newVal.place_id)
                }
            },
            'location'(newVal) {
                if (!_.isEmpty(newVal)) {
                    this.loading = true
                    this.getLocationName(newVal)
                }
            }
        },
        computed: {
            getForecasts() {
                if (!_.isEmpty(this.weather)) {
                    return this.weather.item.forecast.slice(0, 4)
                } else {
                    return ''
                }
            },
            getCondition() {
                if (!_.isEmpty(this.weather)) {
                    return this.weather.item.condition.text
                } else {
                    return ''
                }
            },
            getCity() {
                if (!_.isEmpty(this.weather)) {
                    return this.weather.location.city + ', ' + this.weather.location.region
                } else {
                    return ''
                }
            },
            getDirection() {
                if (!_.isEmpty(this.weather)) {
                    return this.weather.wind.direction + ' mi'
                } else {
                    return ''
                }
            },
            getSpeed() {
                if (!_.isEmpty(this.weather)) {
                    return this.weather.wind.speed + ' mph'
                } else {
                    return ''
                }
            },
            isSelected() {
                if (_.isEmpty(this.model)) {
                    if (this.loading) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    return true
                }
            },
            isDataAvailable() {
                if (this.loading) {
                    return 'Getting Location Data'
                } else {
                    if (_.isEmpty(this.items)) {
                        return 'No Data Available'
                    }
                }
            }
        },
        components: {
            HelloWorld
        }
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Roboto');

    .app {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .location {
        text-transform: uppercase;
        font-weight: bold;
        margin-left: 10%;
        margin-right: 10%;
        text-align: center;
    }

    .weather_description {
        margin-left: 10%;
        margin-right: 10%;
        text-align: center;
    }

    .icon {
        width: 15em;
        padding-botton: 10em;
    }

    body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        box-sizing: border-box;
    }

    .app-day {
        background-color: #ffcc00;
    }

    .app-night {
        background-color: # #3d65b5;
    }
</style>
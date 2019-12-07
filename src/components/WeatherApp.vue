<template>
    <div>
        <NavBar></NavBar>
        <div class="container-fluid mt-5">
            <div class="row">
                <div class="col-md-4">
                    <CityMap v-if="current_weather_data" :lat="current_weather_data.lat"
                             :lon="current_weather_data.lon"></CityMap>
                    <div class="card mt-5" v-if="predication_temps && current_weather_data">
                        <div class="card-body">
                            <MyChart :dates="predication_dates" :temps="predication_temps"></MyChart>
                        </div>
                    </div>
                </div>
                <div class="col-md-8 ">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="card" style="height: 200px">
                                <div class="card-body">

                                    <div class="form-group">
                                        <label for="exampleInputEmail1">City name</label>
                                        <input type="text" class="form-control" id="exampleInputEmail1"
                                               v-model="city_name">
                                    </div>


                                    <div class="row text-center">
                                        <div class="col-6">
                                            <button :disabled="city_name==null" @click="getCurrentWeather" type="submit"
                                                    class="btn btn-outline-primary btn-block">current weather
                                            </button>
                                        </div>
                                        <div class="col-6">
                                            <button :disabled="city_name==null" @click="getPredicationWeather"
                                                    type="submit"
                                                    class="btn btn-outline-info  btn-block">weather prediction
                                            </button>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>


                        <div class="col-md-6">
                            <div v-if="current_weather_data">
                                <div class="card " style="height: 200px">
                                    <div class="card-body">


                                        <div class="row mt-4">

                                            <div class="col-3">
                                                <img
                                                        v-bind:src="`http://openweathermap.org/img/wn/${current_weather_data.icon}@2x.png`">
                                            </div>



                                            <div class="col-9">


                                                <div class="row">
                                                    <div class="col-6">
                                                        <p class="mt-3">
                                                            {{current_weather_data['current_temp']}} &deg; in     {{current_weather_data['city']}}
                                                        </p>
                                                        <p class="mt-3">
                                                            {{current_weather_data['weather']}}
                                                        </p>
                                                    </div>


                                                    <div class="col-6">
                                                        <p class="mt-3">

                                                            <i class="fas fa-temperature-low"></i>{{current_weather_data['min_temp']}} &deg;    <i class="fas fa-temperature-high"></i>{{current_weather_data['max_temp']}}

                                                        </p>

                                                        <button :disable="!current_weather_data" @click="publishPostOnFaceBook"
                                                                class="btn btn-info">


                                                    <span v-if="!publishing">
                                                        <i class="fab fa-facebook-square"></i>
                                                    Share it
                                                    </span>

                                                            <span v-else class="spinner-border text-light" role="status">
                                                        <span class="sr-only">Loading...</span>
                                                    </span>

                                                        </button>

                                                    </div>
                                                </div>


                                            </div>





                                            <!--                                    <div class="col-6 mt-2"><i class="fas fa-compress"></i>{{current_weather_data.current.pressure.value}}</div>-->
                                            <!--                                    <div class="col-6 mt-2"><i class="fas fa-wind"></i> {{current_weather_data.current.wind.speed.value}}  {{current_weather_data.current.wind.speed.unit}}</div>-->
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>


                    </div>


                    <ForecastList v-if="predication_weather_data"
                                  :forecast="predication_weather_data.list"></ForecastList>
                </div>


            </div>


        </div>


    </div>
</template>

<script>
    import {WeatherProvider} from "../services/WeatherProvider";
    // import parser from 'xml2json-light';
    // import Loading from 'vue-loading-overlay';
    // Import stylesheet
    // import 'vue-loading-overlay/dist/vue-loading.css';
    import {gmapApi} from 'vue2-google-maps'
    import MyChart from "./MyChart";

    import c_moment from 'moment';
    import NavBar from "./NavBar";
    import ForecastList from "./ForecastList";
    import CityMap from "./CityMap";


    export default {
        name: 'WeatherApp',
        components: {CityMap, ForecastList, NavBar, MyChart},
        computed: {
            google: gmapApi,

        },
        data() {
            //predication_weather_err
            return {

                city_name: null,
                publishing: false,
                current_weather_err: null,
                current_weather_data: null,
                predication_weather_err: null,
                predication_weather_data: null,
                predication_temps: null,
                predication_dates: null,
                isLoading: false,
                fullPage: true
            }
        },
        props: {
            msg: String
        },
        methods: {


            publishPostOnFaceBook() {
                this.publishing = true;
                WeatherProvider.publishPostOnFaceBook(`The temperature in  ${this.current_weather_data.current.city.name} is ${this.current_weather_data.current.temperature.value}  celsius time : ${c_moment.now()}`).then(() => {
                    this.$toasted.success("Weather information published successfully thank you for contribution", {
                        duration: 60 * 60,
                        position: 'top-center'
                    })

                    this.publishing = false;
                }).catch(() => {
                    this.publishing = false;
                })
            },
            getCurrentWeather() {
                let loader = this.$loading.show({
                    // Optional parameters
                    container: this.fullPage ? null : this.$refs.formContainer,
                    canCancel: true,
                    onCancel: this.onCancel,
                });

                WeatherProvider.getCurrentData(this.city_name).then((xmlObject) => {
                    loader.hide();

                    var xmlDoc = xmlObject;
                    var res = xmlDoc.getElementsByTagName("current")[0].childNodes;
                    var city = res[0].attributes[1].value;
                    var lat = res[0].childNodes[0].attributes['lat'].value;
                    var lon = res[0].childNodes[0].attributes['lon'].value;
                    var weather = res[8].attributes[1].value;
                    var icon = res[8].attributes[2].value;
                    var currentTemp = res[1].attributes[0].value;
                    var minc = res[1].attributes[1].value;
                    var maxc = res[1].attributes[2].value;

                    this.current_weather_data = {
                        "city": city,
                        "lat": lat,
                        "lon": lon,
                        "icon": icon,
                        "weather": weather,
                        "current_temp": currentTemp,
                        "min_temp": minc,
                        "max_temp": maxc
                    };


                }).catch((err) => {
                    loader.hide();

                    this.current_weather_err = err;

                    // console.log(err);
                })
            },
            getPredicationWeather() {
                this.predication_temps = null;
                this.predication_dates = null;
                let loader = this.$loading.show({
                    // Optional parameters
                    container: this.fullPage ? null : this.$refs.formContainer,
                    canCancel: true,
                    onCancel: this.onCancel,
                });

                WeatherProvider.getPredication(this.city_name).then((res) => {
                    loader.hide();

                    this.predication_weather_data = res;
                    this.predication_dates = res.list.map(list => {
                        return c_moment(list.dt_txt).format('dddd:h:m');
                    });

                    this.predication_temps = res.list.map(list => {
                        return list.main.temp;
                    });

                }).catch((err) => {
                    loader.hide();


                    this.predication_weather_err = err;
                    // console.log(err);
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    div {
        font-size: 18px;
    }

</style>

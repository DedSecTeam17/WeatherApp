<template>

    <div>
        <div class="row mt-5">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row m-1">
                            <div class=" col-md-2" v-for="weather in this.forecast" v-bind:key="weather">
                                <div>

                                    <p><i class="far fa-clock"></i>{{ weather.dt_txt | moment("ddd, hA") }}
                                    </p>
                                    <p style="font-size: 10px; color: grey">{{ weather.weather[0].main }}
                                    </p>
                                    <img v-bind:src="`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`">

                                    <div class="row">
                                        <p class="m-1" style="font-size: 16px; color: gray"><i
                                                class="fas fa-temperature-low"></i>{{weather.main.temp_min}}&deg;
                                        </p>
                                        <p class="m-1" style="font-size: 16px"><i
                                                class="fas fa-temperature-high"></i>{{weather.main.temp_max}}&deg;
                                        </p>
                                    </div>

                                    <hr>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>

</template>

<script>
    export default {
        name: "ForecastList",
        props: {
            forecast: Array
        },

    }
</script>

<style scoped>

</style>

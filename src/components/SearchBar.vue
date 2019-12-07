<template>
    <div class="col-md-6">
        <div class="card" style="height: 200px">
            <div class="card-body">

                <div class="form-group">
                    <label for="exampleInputEmail1">City name</label>
                    <input type="text" class="form-control" id="exampleInputEmail1"
                           v-model="city_name"  :onchange="getCityName">
                </div>


                <div class="row text-center">
                    <div class="col-6">
                        <button :disabled="city_name==null" @click="this.$emit('onGetCurrentWeatherData')" type="submit"
                                class="btn btn-outline-primary btn-block">current weather
                        </button>
                    </div>
                    <div class="col-6">
                        <button :disabled="city_name==null" @click="this.$emit('onGetForeCastWeatherData')"
                                type="submit"
                                class="btn btn-outline-info  btn-block">weather prediction
                        </button>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SearcBar",
        data(){
            return {
                city_name: null
            }
        },
        methods:{
            getCityName(){
                this.$emit('getCityName', this.city_name);
            }
        }
    }
</script>

<style scoped>

</style>

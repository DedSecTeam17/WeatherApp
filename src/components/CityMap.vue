<template>
    <div class="card ">
        <div class="card-body">
            <GmapMap
                    :center="{lat:parseFloat(lat), lng:parseFloat(lon)}"
                    :zoom="15"
                    map-type-id="terrain"
                    style=" height: 400px"
            >
            </GmapMap>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CityMap",
        props: {
            lat: String,
            lon: String
        }
    }
</script>

<style scoped>

</style>

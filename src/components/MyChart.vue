

<script>
    import { Line } from 'vue-chartjs'

    export default {
        name: "MyChart",
        props: {
            dates: Array,
            temps: Array,
            width: {
                default: 100,
                type: Number
            },
            height: {
                default: 100,
                type: Number
            },

        },
        data (){
          return {
              chart_dates : this.dates,
              chart_temps : this.temps
          }
        },
        extends: Line,
        mounted () {

            // Overwriting base render method with actual data.
            this.renderChart({


                labels: this.chart_dates,

                datasets: [
                    {
                        label: 'celsius',
                        backgroundColor: '#f87979',
                        data: this.chart_temps
                    }
                ]
            })
        }
    }
</script>

<style scoped>

</style>

import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(require('vue-moment'));
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
// Init plugin
Vue.use(Loading);
import Toasted from 'vue-toasted';



//


import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAYKGSQp99XR9BNeFYfVinw--4f4vRy0ZE',
    libraries: 'places', // This is required if you use the Autocomplete plugin
  },

})


// register VueFusionCharts component
Vue.use(VueFusionCharts);

import VueFusionCharts from 'vue-fusioncharts';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';

//import the theme
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'

// register VueFusionCharts component
Vue.use(VueFusionCharts, FusionCharts, Charts, FusionTheme)

Vue.use(Toasted)


new Vue({
  render: h => h(App),
}).$mount('#app')





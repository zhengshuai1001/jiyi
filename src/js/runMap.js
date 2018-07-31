import Vue from "vue";
import RunMap from "../components/RunMap4.vue";

import { Row, Col } from 'iview';
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false

Vue.component('Row', Row);
Vue.component('Col', Col);

/* eslint-disable no-new */
new Vue({
	el: '#runMap',
	components: { RunMap },
	template: '<RunMap/>'
})
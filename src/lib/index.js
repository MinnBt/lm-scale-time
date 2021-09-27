
import lmScaleTime from './lmScaleTime'
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import moment from 'moment'

const lmcustom = {
  install(Vue, options) {
    Vue.component(lmScaleTime.name, lmScaleTime)
    Vue.component('vue-draggable-resizable', VueDraggableResizable)
    Vue.prototype.$moment = moment;
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(lmcustom);
}
export default lmcustom

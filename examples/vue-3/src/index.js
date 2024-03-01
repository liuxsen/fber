import { createApp } from 'vue'
import moment from 'moment'
import App from './App.vue'

const app = createApp(App)

function myAdd() {
  moment()
}
app.mount('#root')

export default { myAdd }

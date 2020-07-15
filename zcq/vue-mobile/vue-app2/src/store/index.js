import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var state={
    isLoading:false
}

var mutations={
    updateLoadingStatus(state, payload) {
        state.isLoading = payload.isLoading
    },
}

var actions={
    updateLoadingStatus(context, payload ) {
        context.commit('updateLoadingStatus', payload);
    }
}

const moduleA={
    state,mutations,actions
}


const store = new Vuex.Store({
    modules:{
      a:moduleA
    }
})

export default store
import { fetchNewsList, fetchJobList, fetchAskList, fetchUserInfo, fetchCommentItem} from '../api/index.js';

export default {
    FETCH_NEWS({ commit }){
        fetchNewsList()
        .then(({ data }) => {
            console.log(data);
            commit('SET_NEWS', data);
        })
        .catch(error => {
            console.log(error);
        });
    },
    FETCH_JOBS({ commit }){
        fetchJobList()
        .then(({ data })=>{
            console.log(data);
            commit('SET_JOBS', data);
        })
        .catch(error => {
            console.log(error);
        });
    },
    FETCH_ASK({ commit }){
        fetchAskList()
        .then(({ data })=>{
            console.log(data);
            commit('SET_ASK', data);
        })
        .catch(error => {
            console.log(error);
        });
    },
    FETCH_USER({ commit}, name){
        fetchUserInfo(name)
        .then(({ data }) =>{
            console.log(data);
            commit('SET_USER', data)
        })
        .catch( error => {
            console.log(error);
        });
    },
    FETCH_ITEM({ commit }, id) {
        fetchCommentItem(id)
        .then(({ data }) => {
            commit('SET_ITEM', data);
        })
        .catch( error => {
            console.log(error)
        });
    },
}
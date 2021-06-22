import { fetchNewsList, fetchJobList, fetchAskList, fetchUserInfo, fetchCommentItem, fetchList} from '../api/index.js';

export default {
    //promise
    // FETCH_NEWS(context){
    //     return fetchNewsList()
    //     .then(response => {
    //         context.commit('SET_NEWS', response.data);
    //         return response;
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });
    // },

    //async
    async FETCH_NEWS(context){
        try{
            const response = await fetchNewsList();

            context.commit('SET_NEWS', response.data);
            return response;
        
        }catch(error){
            console.log(error);
        }
    },

    async FETCH_JOBS({ commit }){
        try{
            const response = await fetchJobList();
            
            commit('SET_JOBS', response.data);
            return response;

        }catch(error){
            console.log(error);
        }
    },

    async FETCH_ASK({ commit }){
        // API 단에서 ERROR 처리
        const response = await fetchAskList();
        commit('SET_ASK', response.data);
        return response;
    },

    // FETCH_USER({ commit}, name){
    //     return fetchUserInfo(name)
    //     .then(({ data }) =>{
    //         commit('SET_USER', data)
    //     })
    //     .catch( error => {
    //         console.log(error);
    //     });
    // },

    async FETCH_USER({ commit}, name){
        try{
            const response = await fetchUserInfo(name);

            commit('SET_USER', response.data);
            return response;

        }catch(error){
            console.log(error);
        }
    },

    // FETCH_ITEM({ commit }, id) {
    //     return fetchCommentItem(id)
    //     .then(({ data }) => {
    //         commit('SET_ITEM', data);
    //     })
    //     .catch( error => {
    //         console.log(error)
    //     });
    // },

    async FETCH_ITEM({ commit }, id){
        try{
            const response = await fetchCommentItem(id);
            
            commit('SET_ITEM', response.data);
            return response;

        }catch(error){
            console.log(error);
        }
    },
    // #2
    // FETCH_LIST({ commit }, pageName){
    //     // #3
    //     return fetchList(pageName)
    //     .then( response => {
    //         // #4
    //         console.log(4);
    //         commit('SET_LIST', response.data);
    //         return response;
    //     }) 
    //     .catch(error => console.log(error));
    // },
    async FETCH_LIST({ commit }, pageName){
        try{
            const response = await fetchList(pageName);

            commit('SET_LIST', response.data);
            return response;
        
        }catch(error){
            console.log(error);
        }
    }
}
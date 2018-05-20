export default {
    getConversation(id){
        return new Promise((resolve,reject)=>{
            axios.get('/webapi/conversation/' + id).then((response) => {
                resolve(response)
            })
        })
    },
    getConversations(page){
        return new Promise((resolve,reject)=>{
            axios.get('/webapi/conversations?page=' + page).then((response) => {
                resolve(response)
            })
        })
    },

    storeConversationReply(id, {body}){
        return new Promise((resolve,reject)=>{
            axios.post('/webapi/conversations/' + id + '/reply ', {
                body: body
            }).then((response) => {
                resolve(response)
            })
        })
    }

}
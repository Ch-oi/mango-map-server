const knex = require('./config')

async function getChatroom(id){
    let results = 
    await knex('chatrooms')
    .select('*')
    .where('id',id)
    .catch(err=>console.log(err))

    return results
    
}


getChatroom(1)
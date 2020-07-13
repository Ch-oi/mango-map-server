require('dotenv').config()

import knex from '../config'

class UserService {
    constructor(){
        this.user=[]
        

    }

    async listUsers(){
        let results = 
        await knex('users')
        .select('*')
        .catch(err=>console.log(err))

        return results
    }

    async getUser(id){
        let results = 
        await knex('users')
        .select('*')
        .where('id',id)
        .catch(err=>console.log(err))

        return results
    }

    async addUser(user){
        let results = 
        await knex('users')
        .insert(user)
        .returning('*')
        .catch(err=>console.log(err))

        await this.getUser(results[0].id)

        return this.user
    }

    async deleteUser (){
        let results = 
        await knex('users')
        .del()
    }

}
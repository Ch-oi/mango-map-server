const express = require('express')
const port = process.env.PORT || 8000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const knex = require('./database/config')

app.get('/', async (req, res) => {
    let new_charRecord={
        body:"i love my pepe",
        images:"https://picsum.photos/200/300"
    }
    let chatroomUser = await knex('chatrooms-users')
            .select('*')
            .where('chatroom_id', 1)
            .andWhere('user_id', 1)
            .catch(err => console.log(err))
            await knex.raw('SELECT setval(\'"chatRecords_id_seq"\', (SELECT MAX(id) from "chatRecords"));')
        let newChatRecord =
            await knex('chatRecords')
                .insert({ ...new_charRecord, chatroomUser_id: chatroomUser[0].id })
                .returning('*')
                .catch(err => console.log(err))
    res.send(newChatRecord)

})

app.listen(port, function () {
    console.log('listening on port' + port)
})


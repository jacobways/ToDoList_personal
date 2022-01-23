const { ToDoList } = require('../../models')
require("dotenv").config();

module.exports = async (req, res) => {

    const {userId, date} = req.query;

    if(!userId || !date) {
      res.status(400).send('유저 정보 또는 날짜 정보가 필요합니다')
    } else {

        const findData = await ToDoList.findOne({where: {userId, date}})

        if(!findData) {
          res.status(404).send('해당 날짜에 유저의 To Do List 정보가 없습니다.')
        } else {

        const listInfo = await ToDoList.findAll({
            where: {
                userId,
                date
            }
        })
        res.status(200).json({message: 'ok', data: listInfo})
       }
    }
}
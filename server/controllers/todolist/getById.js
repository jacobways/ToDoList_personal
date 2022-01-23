const { ToDoList } = require('../../models')
require("dotenv").config();

module.exports = async (req, res) => {

    const {id} = req.params;

    if(!id) {
      res.status(400).send('id 정보가 없습니다.')
    } else {
        const listInfo = await ToDoList.findOne({where: {id}})
        if(!listInfo) {
          res.status(404).send('To Do List 정보가 없습니다.')
        } else {
        res.status(200).json({message: 'ok', data: listInfo})
       }
    }
}
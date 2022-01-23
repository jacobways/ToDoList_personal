const { ToDoList } = require('../../models')
require("dotenv").config();

module.exports = (req, res) => {

    const {id} = req.query;

    if (!id) {
      res.status(400).send('id 정보가 없습니다')
    } else {
  
    ToDoList.destroy(
      {where: {
          id
      }}
    )
    .then((data)=> {
      if(!data) {
        res.status(404).send('일치하는 To Do List가 없습니다')
      } else {
        res.status(202).send('deleted')
      }
    })
    .catch((err)=> {
      console.log(err);
      res.sendStatus(500)
    })
  }
}
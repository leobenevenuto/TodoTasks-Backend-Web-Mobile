const TaskModel = require("../models/TaskModel");
const {startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear} = require("date-fns");

const current = new Date();


class TaskController{



    async create(req, res){
        
        const task = new TaskModel(req.body);
        
        await task.save().then(response => {
            return res.status(200).json(response);
        }).catch(error => {
            return res.status(500).json(error);
        })

    }// Cria uma nova tarefa no banco de dados



    async update(req, res){

        await TaskModel.findByIdAndUpdate({'_id': req.params.id}, req.body, {new: true}).then(response => {
            return res.status(200).json({response});
        }).catch(error => {
            return res.status(500).json({error});
        })

    }// função update



    async all(req, res){
        await TaskModel.find({macaddress: {'$in': req.params.macaddress}}).sort('when').then(response =>{
            return res.status(200).json(response);
        }).catch(err => {
            return res.status(500).json(err);
        })
    }//Lista todas as tarefas do banco de dados



    async show(req, res){
        await TaskModel.findById(req.params.id).then(response => {

            if(response){
                return res.status(200).json({response})
            }else{
                return res.status(404).json({error: "A tarefa não existe"})
            }

        }).catch(error => {
            return res.status(500).json({error})
        })
    }//Lista uma unica tarefa pelo ID



    async delete(req, res){
        await TaskModel.deleteOne({'_id': req.params.id}).then(response => {
            return res.status(200).json(response);
        }).catch(error=> {
            return res.status(500).json(error)
        })
    }//Deleta uma tarefa



    async done(req, res){
        await TaskModel.findByIdAndUpdate({'_id': req.params.id}, {'done': req.params.done}, {new: true}).then(response => {
            return res.status(200).json({response});
        }).catch(err => {
            return res.status(404).json(err);
        })
    }//ALtera o status da tarefa de concluido para não concluido/vice-versa


    async late(req, res){
        await TaskModel.find({
            'when': {'$lt': current},
            'macaddress': {$in: req.params.macaddress}
        })
        .sort('when')
        .then(response => {
            res.status(200).json(response)
        }).catch(error => {
            res.status(404).json(error);
        })
    }


    async today(req, res){
        await TaskModel.find({
            'macaddress': {'$in': req.params.macaddress},
            'when': {'$gte': startOfDay(current), '$lte': endOfDay(current)}
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response)
        }).catch(error => {
            res.status(500).json(error)
        })
    }




    async week(req, res){
        await TaskModel.find({
            'macaddress': {'$in': req.params.macaddress},
            'when': {'$gte': startOfWeek(current), '$lte': endOfWeek(current)}
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response)
        }).catch(error => {
            res.status(500).json(error)
        })
    }



    async month(req, res){
        await TaskModel.find({
            'macaddress': {'$in': req.params.macaddress},
            'when': {'$gte': startOfMonth(current), '$lte': endOfMonth(current)}
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response)
        }).catch(error => {
            res.status(500).json(error)
        })
    }



    async year(req, res){
        await TaskModel.find({
            'macaddress': {'$in': req.params.macaddress},
            'when': {'$gte': startOfYear(current), '$lte': endOfYear(current)}
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response)
        }).catch(error => {
            res.status(500).json(error)
        })
    }

}

module.exports = new TaskController();
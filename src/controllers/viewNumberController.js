const controller = require('./controller');
const currentWeekNumber = require('current-week-number');
const model = require('../models/model')
const { body, validationResult } = require('express-validator');

module.exports = new class userController extends controller{

    async getAllViewNumber(req , res){

        const { ViewType , productId } = req.body

        const view = await model.find({ ProductId : productId}).exec();

        if (!view) {
            res.json({
                message : "not found!",
                success : false 
            })
        }

        const day = await new Date();
        const year = await new Date().getFullYear()
        const month = await new Date().getMonth();
        const weekNumber = await currentWeekNumber(new Date());
        let viewNumber = 0;

        switch (ViewType) {

            case 'daily':
                view.map(element =>{
                    for (let index = 0; index < element.ViewDate.length; index++) {

                        if (element.ViewDate[index].getFullYear() == year 
                        && element.ViewDate[index].getMonth() == month 
                        && element.ViewDate[index].getDate() == day.getDate()) {
                            viewNumber += 1;
                        }
                    }
                })

                res.json({ result : viewNumber})

                break;

            case 'weekly':
                view.map(element =>{
                    for (let index = 0; index < element.ViewDate.length; index++) {

                        if (element.ViewDate[index].getFullYear() == year 
                        && currentWeekNumber(element.ViewDate[index]) == weekNumber) {
                            viewNumber += 1;
                        }
                    }
                })

                res.json({ result : viewNumber})

                break;

            case 'monthy':
                view.map(element =>{
                    for (let index = 0; index < element.ViewDate.length; index++) {

                        if (element.ViewDate[index].getFullYear() == year 
                        && element.ViewDate[index].getMonth() == month) {
                            viewNumber += 1;
                        }
                    }
                })

                res.json({ result : viewNumber})

                break;

            case 'custom':
                const { startDate , endDate } = req.body;
                view.map(element =>{
                    for (let index = 0; index < element.ViewDate.length; index++) {

                        if ( new Date(startDate) 
                        <= new Date(element.ViewDate[index]) && new Date(element.ViewDate[index])
                        <= new Date(endDate) ) {
                            viewNumber += 1;
                        }
                    }
                })
    
                res.json({ result : viewNumber})

                break;
            default:
                res.json({
                    message : "ViewDate is incorrect!",
                    success : false
                })
                break;
        }

    }

    async getUniqueViewNumber(req , res){
        const { ViewType , productId } = req.body

        const view = await model.find({ ProductId : productId}).exec();

        if (!view) {
            res.json({
                message : "not found!",
                success : false 
            })
        }

        const day = await new Date();
        const year = await new Date().getFullYear()
        const month = await new Date().getMonth();
        const weekNumber = await currentWeekNumber(new Date());
        let viewNumber = 0;

        switch (ViewType) {

            case 'daily':
                view.map(element =>{
                    for (let index = 0; index < element.ViewDate.length; index++) {

                        if (element.ViewDate[index].getFullYear() == year 
                        && element.ViewDate[index].getMonth() == month 
                        && element.ViewDate[index].getDate() == day.getDate()) {
                            viewNumber += 1;
                            index = element.ViewDate.length;
                        }
                    }
                })

                res.json({ result : viewNumber})

                break;

            case 'weekly':
                view.map(element =>{
                    for (let index = 0; index < element.ViewDate.length; index++) {

                        if (element.ViewDate[index].getFullYear() == year 
                        && currentWeekNumber(element.ViewDate[index]) == weekNumber) {
                            viewNumber += 1;
                            index = element.ViewDate.length;
                        }
                    }
                })

                res.json({ result : viewNumber})

                break;

            case 'monthy':
                view.map(element =>{
                    for (let index = 0; index < element.ViewDate.length; index++) {

                        if (element.ViewDate[index].getFullYear() == year 
                        && element.ViewDate[index].getMonth() == month) {
                            viewNumber += 1;
                            index = element.ViewDate.length;
                        }
                    }
                })

                res.json({ result : viewNumber})

                break;

            case 'custom':
                const { startDate , endDate } = req.body;
                view.map(element =>{
                    for (let index = 0; index < element.ViewDate.length; index++) {

                        if ( Date.parse(startDate) 
                        <= Date.parse(element.ViewDate[index].toLocaleDateString()) 
                        <= Date.parse(endDate)) {
                            viewNumber += 1;
                            index = element.ViewDate.length;
                        }
                    }
                })
    
                res.json({ result : viewNumber})

                break;
            default:
                res.json({
                    message : "ViewDate is incorrect!",
                    success : false
                })
                break;
        }
    }
}
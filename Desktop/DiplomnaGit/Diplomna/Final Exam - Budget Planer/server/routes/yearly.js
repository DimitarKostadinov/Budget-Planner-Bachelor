const planner = require('../data/planner');
var fs = require('fs');
module.exports = {
    getCurrent: (req, res) => {
        const user = req.user.email;
        const year = (new Date()).getFullYear();
        const result = planner.all(user, year);

        res.status(200).json(result);
    },
    getYear: (req, res) => {
        const user = req.user.email;
        const year = req.params.year;
        const result = planner.all(user, year);
        fs.writeFile("clearDataBase.txt",JSON.stringify(result), function(err) {
            if(err) {
                return console.log(err);
            }
        
            console.log("Clear Database was saved!");
            
        }); 
        res.status(200).json(result);
        
    },
}
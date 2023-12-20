const mongoose = require("mongoose");
const validator = require("validator");


const criteriaSchema = mongoose.Schema(
    {
        
        criteria:{
            type: Enum,
            values:[criteria1,criteria2]

        }

    }
);

const Criteria=('Criteria',criteriaSchema);
module.exports=Criteria;
import mongoose from "mongoose";

const mealTypeSchema = new mongoose.Schema({
   
    name:{
        type:String,
        required: true,
    },
    content:{
        type:String,
        required: true,
    },
    image:{
        type:String,
        required: true,
    },
    meal_type:{
        type:Number,
        required: true,
    },
});

const Meals = mongoose.model('meal',mealTypeSchema);

export default Meals;
import Meals from "../model/mealType-schema.js";


export const getAllMeals = async (request,response) => {
    try{
        const meals = await Meals.find();
        response.status(200).json(meals);
    }catch(error){
        response.status(500).json({message:error.message});
    }
}
import Restaurants from "../model/restaurant-schema.js";

export const getAllRestaurants = async(request,response) => {
    try{
        const restaurantList = await Restaurants.find();
        response.status(200).json(restaurantList);
    }catch(error){
        response.status(500).json({message:error.message});
    }
}

export const getRestaurantByName = async(request,response)=> {
    try{
    const RestaurantByName = await Restaurants.find({name:request.params.name});
    response.status(200).json(RestaurantByName);

    }catch(error){
        response.status(500).json({message:error.message});
    }
}

export const restaurantByLocationId = async(request,response) => {
    try{
     const RestaurantByLocation = await Restaurants.find({location_id:request.params.locationId});
     response.status(200).json(RestaurantByLocation);
    }catch(error){
        response.status(500).json({message:error.message});
    }
}


export const restaurantByLocation = async(request,response) => {
    try{
     const RestaurantByLocation = await Restaurants.find({locality:request.params.location});
     response.status(200).json(RestaurantByLocation);
    }catch(error){
        response.status(500).json({message:error.message});
    }
}

export const getRestaurantByMealId = async(request,response) => {
    try{
      const restaurantByMeals = await Restaurants.find({meal_type:request.params.mealType});
      response.status(200).json(restaurantByMeals);
    }catch(error){
      response.status(500).json({message:error.message});
    }
}

export const filterSearch = async(req, res) => {
    try{
    const queryParams = req.body;   // capturing all the params from request body

    const location_id = queryParams.location_id;
    const cuisine_id = queryParams.cuisine_id;
    const mealtype_id = queryParams.mealtype_id;
    const hcost = queryParams.hcost;
    const lcost = queryParams.lcost;
    const page = queryParams.page ? queryParams.page : 1;    // 1 is default value for page
    const sort = queryParams.sort ? queryParams.sort : 1;    // 1 means ascending order & -1 means descending order
    const perPageCount = queryParams.perPageCount ? queryParams.perPageCount : 5; // number of items per page 

    let start;
    let end;
    start = Number(page * perPageCount) - perPageCount;   // setting the values for start and end params for pagination
    end = Number(page * perPageCount);
    let payload = {};   // Initializing the payload to request

    // Initializing the payload object for quering the DB
    if (mealtype_id) {
        payload = {
            mealtype_id: Number(mealtype_id)
        }
    }
    if (mealtype_id && hcost && lcost) {
        payload = {
            mealtype_id: Number(mealtype_id),
            min_price: { $gt: lcost, $lt: hcost }
        }
    }
    if (mealtype_id && location_id) {
        payload = {
            location_id: Number(location_id),
            mealtype_id: Number(mealtype_id)
        }
    }
    if (mealtype_id && cuisine_id) {
        payload = {
            cuisine_id: Number(cuisine_id),
            mealtype_id: Number(mealtype_id)
        }
    }
    if (location_id && cuisine_id && mealtype_id) {
        payload = {
            location_id: Number(location_id),
            cuisine_id: Number(cuisine_id),
            mealtype_id: Number(mealtype_id)
        }
    }
    if (location_id && cuisine_id && mealtype_id && hcost && lcost) {
        payload = {
            location_id: Number(location_id),
            cuisine_id: Number(cuisine_id),
            mealtype_id: Number(mealtype_id),
            min_price: { $gt: lcost, $lt: hcost }
        }
    }
    if (location_id && mealtype_id && hcost && lcost) {
        payload = {
            location_id: Number(location_id),
            mealtype_id: Number(mealtype_id),
            min_price: { $gt: lcost, $lt: hcost }
        }
    }
     await Restaurants.find(payload).sort({ min_price: sort }).then(result => {
        const count = Math.ceil(result.length / 5);
        const pageCountArr = [];
        const resultValues = result.slice(start, end);  // to return paginated items
        for (var i = 1; i <= count; i++) {
            pageCountArr.push(i);
        }
        res.status(200).json({ message: "Restaurant Fetched Sucessfully", restaurant: resultValues, pageCount: pageCountArr, totalCount: result.length });
    })
}catch(error){
    response.status(500).json({message:error.message});
  }



}
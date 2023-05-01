import CityList from "../model/citylist-schema.js";

export const getCityList = async (request,response) => {
    try{
      const cities = await CityList.find();
       response.status(200).json(cities);
    }catch(error) {
        response.status(500).json({message: error.message});
    }
}

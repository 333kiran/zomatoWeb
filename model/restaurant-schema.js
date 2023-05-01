import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        
    },
    city:{
        type:String,
        required:true,
        
    },
     location_id:{
        type:String,
        required:true,
        
    },
     city_id:{
        type:String,
        required:true,
        
    }, 
    locality:{
        type:String,
        required:true,
        
    },
    aggregate_rating:{
        type:Number,
    },
    rating_text:{
        type:String,
        required:true,
    },
    min_price:{
        type:Number,
        required:true,
    },
    contact_number:{
        type:Number,
        min:10,
    },
    cuisine:String,
    image:String,
    meal_type:{
        type:Number,
        required:true,
    }
});

const Restaurants = mongoose.model('restaurant',restaurantSchema);

export default Restaurants;


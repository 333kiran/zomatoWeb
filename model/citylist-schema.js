import mongoose from 'mongoose';

const citylistSchema = new mongoose.Schema({

   name: {
    type:String,
    required:true
   },
   city_id: {
    type:String,
    required:true,
   },
   location_id: {
    type:String,
    required:true,
   },
   country_name: {
    type:String,
    required:true,
   }

});

const CityList = mongoose.model('citylist',citylistSchema);

export default CityList;
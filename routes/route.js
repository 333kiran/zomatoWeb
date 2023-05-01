import express  from "express";

import { userLogin,userSignup } from "../controller/user-controller.js";
import { getCityList } from "../controller/citylist-controller.js";
import { getAllMeals } from "../controller/meals-controller.js";
import { getAllRestaurants,filterSearch,restaurantByLocationId,getRestaurantByName,restaurantByLocation } from "../controller/restaurant-controller.js";
import { addPaymentGateway,paytmResponse} from '../controller/payment-controller.js';


const router = express.Router();

router.post('/signup',userSignup);
router.post('/login', userLogin);

router.get('/citylist',getCityList);
router.get('/meals',getAllMeals);
router.get('/restaurants',getAllRestaurants);
router.get('/restaurant/:name',getRestaurantByName);
router.post('/filter', filterSearch);
router.get('/restaurantByLocationId/:locationId',restaurantByLocationId);
router.get('/restaurants/:location',restaurantByLocation);
router.post('/payment', addPaymentGateway);
router.post('/callback', paytmResponse);

export default router;

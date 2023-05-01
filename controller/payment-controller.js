import Paytmchecksum from "../paytm/PaytmChecksum.js";
import { paytmParams,paytmMerchantKey } from "../server.js";
import formidable from "formidable";
import https from 'https';

export const addPaymentGateway = async (request,response) => {
    try{
      let PaytmChecksum = await  Paytmchecksum.generateSignature(paytmParams, paytmMerchantKey);
      let params = {
        ...paytmParams, 'CHECKSUMHASH':PaytmChecksum
      }
       
      response.status(200).json(params);

    } catch(error){
      response.status(500).json({error: error.message});
    }
}



export const paytmResponse = async (request,response) => {
    const form = await new formidable.IncomingForm();
    let PaytmChecksum = request.body.CHECKSUMHASH;
    delete request.body.CHECKSUMHASH;
   
    let isVerifySignature = Paytmchecksum.verifySignature(request.body,paytmMerchantKey,PaytmChecksum)

    if(isVerifySignature){
        let paytmParams = {};
        paytmParams['MID'] = request.body.MID;
        paytmParams['ORDER_ID'] = request.body.ORDER_ID;

        Paytmchecksum.generateSignature(paytmParams,paytmMerchantKey).then(function(checksum){
               paytmParams['CHECKSUMHASH'] = checksum;

               let post_data = JSON.stringify(paytmParams);

               let options  = {
                hostname: 'securegw-stage.paytm.in',
                port:443,
                path:'/order/status',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': post_data.length
                }
               }

               let res = "";
          let post_req = https.request(options,function(post_res) {
            post_res.on('data', function(chunk){
                res += chunk;
            });

            post_res.on('end', function(){
               
            let result =   JSON.parse(res)
              
                response.redirect('localhost:3000/');
            })
          });



          post_req.write(post_data);
          post_req.end();

          
        })
        console.log('checksum matched');
        

    } else {
        console.log('checksum mismatched');

    }


}
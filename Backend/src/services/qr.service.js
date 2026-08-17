import { Jimp } from "jimp";
import QrCode from "qrcode-reader";

import { ApiError } from "../utiles/ApiError.js";
import { scanText } from "../services/text.service.js";
import { scanUrl } from "../services/url.service.js";
import { otherDataScanner } from "./qrAI.js";


const isValidImageUrl = (imageUrl) => {
    try {
        const url = new URL(imageUrl);

        return (
            url.protocol === "http:" ||
            url.protocol === "https:"
        );

    } catch {
        return false;
    }
};

const qrDecoder = (imageUrl) => {

    return new Promise((resolve, reject) => {

        Jimp.read(imageUrl, (error, image) => {

            if (error) {
                return reject(
                    new ApiError(
                        500,
                        "Something went wrong while reading the image"
                    )
                );
            }


            const qr = new QrCode();


            qr.callback = (error, value) => {

                if (error) {
                    return reject(
                        new ApiError(
                            400,
                            "Could not decode QR code"
                        )
                    );
                }


                if (!value || !value.result) {
                    return reject(
                        new ApiError(
                            400,
                            "QR code contains no readable data"
                        )
                    );
                }


                resolve(value);
            };


            try {
                qr.decode(image.bitmap);
            } catch (error) {

                reject(
                    new ApiError(
                        500,
                        "QR decoding failed"
                    )
                );
            }

        });

    });
};



const classifyQRData = (data) => {

    if (
        typeof data !== "string" ||
        !data.trim()
    ) {
        return {
            type: "invalid",
            value: data
        };
    }


    const value = data.trim();


    try {

        const url = new URL(value);

        if (
            url.protocol === "http:" ||
            url.protocol === "https:"
        ) {
            return {
                type: "url",
                value
            };
        }

    } catch {
        // Not an HTTP/HTTPS URL
    }



    if (value.startsWith("WIFI:")) {

        return {
            type: "wifi",
            value
        };

    }


 

    if (value.startsWith("BEGIN:VCARD")) {

        return {
            type: "vcard",
            value
        };

    }


    

    if (value.startsWith("mailto:")) {

        return {
            type: "email",
            value
        };

    }


  

    if (value.startsWith("tel:")) {

        return {
            type: "phone",
            value
        };

    }


   

    if (value.startsWith("geo:")) {

        return {
            type: "location",
            value
        };

    }


   
    try {

        JSON.parse(value);

        return {
            type: "json",
            value
        };

    } catch {
        // Not JSON
    }



    return {
        type: "text",
        value
    };
};




const qrScan = async (imageUrl) => {

   

    if (!imageUrl) {

        throw new ApiError(
            400,
            "Image URL is required"
        );

    }


    if (!isValidImageUrl(imageUrl)) {

        throw new ApiError(
            400,
            "Invalid image URL"
        );

    }


    try {


        const decodedData =
            await qrDecoder(imageUrl);


       

        const qrData =
            decodedData?.result;


        if (
            typeof qrData !== "string" ||
            !qrData.trim()
        ) {

            throw new ApiError(
                400,
                "QR code contains no readable data"
            );

        }



        const classifiedQR =
            classifyQRData(qrData);


        if (classifiedQR.type === "invalid") {

            throw new ApiError(
                400,
                "Invalid QR data"
            );

        }


        console.log(
            "Classified QR:",
            classifiedQR
        );


        let aiResponse;


        switch (classifiedQR.type) {

            case "url":

                aiResponse =
                    await scanUrl(
                        classifiedQR.value
                    );

                break;


            case "text":

                aiResponse =
                    await scanText(
                        classifiedQR.value
                    );

                break;


            default:

                aiResponse =
                    await otherDataScanner(
                        classifiedQR
                    );

                break;
        }


        if (!aiResponse) {

            throw new ApiError(
                500,
                "AI scanner returned an empty response"
            );

        }

        return aiResponse;


    } catch (error) {

      
        if (error instanceof ApiError) {
            throw error;
        }


        console.error(
            "QR scanning error:",
            error
        );


        throw new ApiError(
            500,
            "QR scanning failed"
        );

    }
};






export {
    qrDecoder,
    classifyQRData,
    qrScan
};
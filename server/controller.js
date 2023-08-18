import { User, Campground, Campsite} from './db/model.js'
import bcrypt from 'bcryptjs';

import NodeGeocoder from 'node-geocoder'

import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
//import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// const clientParams = '';
// const getObjectParams = '';
// const client = new S3Client(clientParams);
// const command = new GetObjectCommand(getObjectParams);


import dotenv from 'dotenv'

dotenv.config()

const bucketName = process.env.AWS_BUCKET_NAME
const bucketRegion = process.env.AWS_BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    },
    region: bucketRegion
})



// const { geocode } = NodeGeocoder({
//     provider: 'google',
//     apiKey: process.env.GOOGLE_API_KEY
// })

//const url = await getSignedUrl(s3, command, { expiresIn: 3600 });




const routeFunctions = {
    createUser: async (req, res) => {
        const {firstName, lastName, email, password} = req.body;
        const salt = bcrypt.genSaltSync(10);
        const registerUser = await User.create({
            firstName, 
            lastName, 
            email, 
            password: bcrypt.hashSync(password, salt)
        })


        res.json('Registration Successful!')
    },
    loginUser: async (req, res) => {

        const {email, password} = req.body;
        const user = await User.findOne({where : { email: email }});
        
        const isMatch = bcrypt.compareSync(password, user.password)

        
        if(isMatch){
            req.session.user = user
            res.json(user)
        } else {
            res.json('Incorrect Password')
        }


    },

    logoutUser: async (req, res) => {
        req.session.destroy
        res.json('Session Ended...')
    },
    createCampground:  async (req, res) => {
        const {campName, campAddress, campCity, campState, campZip, campPhone, campWebsite, campAmenities: asdf, userId} = req.body;
        const {campImages, campLogo} = req.files

        console.log('req.body', req.body)

        // const location = await geocode(`${campAddress}, ${campCity}, ${campState} ${campZip}`)
        // console.log('location', location)


        const params = {
            Bucket: bucketName,
            Key: campLogo.name, 
            Body: campLogo.data,
            ContentType: campLogo.mimetype
        }

        const params2 = {
            Bucket: bucketName,
            Key: campImages.name, 
            Body: campImages.data,
            ContentType: campImages.mimetype
        }

        const command = new PutObjectCommand(params)
        const command2 = new PutObjectCommand(params2)

        await s3.send(command)
        await s3.send(command2)

        const logoUrl = `https://campware.s3.us-west-2.amazonaws.com/${campLogo.name}`
        const campgroundImageUrl = `https://campware.s3.us-west-2.amazonaws.com/${campImages.name}`

            // await Campground.create({
            //     campName, 
            //     campAddress,
            //     campCity, 
            //     campState,
            //     campZip,
            //     campPhone,
            //     campWebsite,
            //     campAmenities,
            //     campLogo: logoUrl,
            //     campImages: campgroundImageUrl,
            //     userId
            // })

        const campgrounds = await Campground.findAll({where : { userId: req.session.user.userId}});
        res.json(campgrounds)
    },

    createCampsite: async (req, res) => {
        const {siteNumber, siteDescription, siteType, rvMaxLength, siteImages, siteAmenities, campId} = req.body;




        const createSite = await Campsite.create({
            siteNumber, 
            siteDescription, 
            siteType, 
            rvMaxLength,
            siteImages,
            siteAmenities, 
            campId
        })

        const campsites = await Campsite.findAll({where: {campId: campId }})
        res.json(campsites)
    },

    deleteCampground: async (req, res) => {

        const campId   = req.params['campId']

        await Campground.destroy({
            where: {
                campId: campId
            }
        })
        const campgrounds = await Campground.findAll({where : { userId: req.session.user.userId}});
        res.json(campgrounds)
    },

    getAdminCampgrounds: async (req, res) => {
        const campgrounds = await Campground.findAll({
            where : { userId: req.session.user.userId}, 
            include: { model: Campsite }
        });

        res.json(campgrounds)
    }, 

    getAllCampFeed: async (req, res) => {
        const campGroundSites = await Campground.findAll({ 
            attributes: { exclude: ['user']}, 
            include: { model: Campsite }
        })
        const campsites = await Campsite.findAll()

        const feed = {
            campgrounds: campGroundSites, 
            campsites: campsites
        }

        res.json(feed)
    }

}

export default routeFunctions;
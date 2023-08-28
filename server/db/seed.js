import { User, Campground, db, Campsite } from "./model.js";
import bcrypt from 'bcryptjs'

console.log("Syncing database ...")

await db.sync({ force: true })

console.log("Seeding database ...")

const salt = bcrypt.genSaltSync(10);

const password = "password"

const password2 = "campware"

const newUser = await User.create({
    email: 'test@test.com',
    password: bcrypt.hashSync(password, salt),
    firstName: 'Nick',
    lastName: 'Mac', 
    isAdmin: true,
    campsiteFavorites: [2],
    userId: 1
})

const newUser2 = await User.create({
    email: 'camp@camp.com',
    password: bcrypt.hashSync(password2, salt),
    firstName: 'Nicholas',
    lastName: 'McArthur', 
    isAdmin: false,
    campsiteFavorites: [],
    campgroundFavorites: [1],
    userId: 2
})

const newCampground = await Campground.create({
    campName: 'St. George RV Park',
    campLong: '37.12203',
    campgLat: '-113.53832',
    campAddress: '2100 East Middleton Drive',
    campCity: 'St. George', 
    campState: 'UT',
    campZip: 84737,
    campPhone: '435-673-2970',
    campLogo: 'https://www.stgeorgervpark.com/file/60a2321b-5945-4775-a336-c329f43a4526',
    campWebsite: 'https://www.stgeorgervpark.com/',
    campImages: ['https://www.roverpass.com/system/pictures/images/000/043/481/full/1195.png?1495135830', 'https://www.roverpass.com/system/pictures/images/000/043/482/full/1195-1.png?1495135794'],
    campAmenities: ['Swimming pool', 'Fire pits', 'Pet Friendly'],
    userId: 1
})

const newCampground2 = await Campground.create({
    campName: 'Sand Hollow Campground',
    campLong: '37.12203',
    campgLat: '-113.53832',
    campAddress: '398 Sand Hollow Dr.',
    campCity: 'Hurricane', 
    campState: 'UT',
    campZip: 84737,
    campPhone: '435-673-2970',
    campLogo: 'https://cdn.dribbble.com/users/8849931/screenshots/17386720/logo_bagde_1_4x.jpg',
    campWebsite: 'https://www.sandhollow.com/',
    campImages: ['https://images.unsplash.com/photo-1642552194382-530952cf04ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=689&q=80', 'https://www.roverpass.com/system/pictures/images/000/043/482/full/1195-1.png?1495135794'],
    campAmenities: ['Swimming pool', 'Fire pits', 'Pet Friendly'],
    userId: 1
})

const newCampsite= await Campsite.create({
    siteNumber: 23,
    siteDescription: 'Tucked in the back corner, this is a perfect campspot of RVs that are less than 25 ft. Fire pit is available in this campsite and has good shade from trees overhead',
    siteType: 'RV',
    rvMaxLength: 26,
    siteImages: ['https://togorv.com/wp-content/uploads/2021/02/shutterstock_1066771271.jpg'],
    siteAmenities: ['Fire pit', 'Very Shady'],
    sitePrice: 200,
    campId: 1
})

const anotherCampsite= await Campsite.create({
    siteNumber: 3,
    siteDescription: 'One of the first spots when you come into the park, it might get a little busy at times, but its very close to the showers, bathroom and the dog park.',
    siteType: 'RV',
    rvMaxLength: 50,
    siteImages: ['https://togorv.com/wp-content/uploads/2021/02/shutterstock_1066771271.jpg'],
    siteAmenities: ['Fire pit', 'Not Shaded', 'Close to dog park'],
    sitePrice: 55,
    campId: 1
})

const anotherCampsite2 = await Campsite.create({
    siteNumber: 32,
    siteDescription: 'Best camping spot ever!.',
    siteType: 'RV',
    rvMaxLength: 50,
    siteImages: ['https://togorv.com/wp-content/uploads/2021/02/shutterstock_1066771271.jpg'],
    siteAmenities: ['Fire pit', 'Not Shaded', 'Close to dog park'],
    sitePrice: 65,
    campId: 2
})

const anotherCampsite3 = await Campsite.create({
    siteNumber: 2,
    siteDescription: 'Dont stay here!.',
    siteType: 'RV',
    rvMaxLength: 5,
    siteImages: ['https://togorv.com/wp-content/uploads/2021/02/shutterstock_1066771271.jpg'],
    siteAmenities: ['Not Shaded', 'Close to dog park'],
    sitePrice: 45,
    campId: 2
})


console.log('Finished seeding database')

await db.close()
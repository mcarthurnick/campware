import { User, Campground, db, Campsite } from "./model.js";
import bcrypt from 'bcryptjs'

console.log("Syncing database ...")

await db.sync({ force: true })

console.log("Seeding database ...")

const salt = bcrypt.genSaltSync(10);

const password = "password"

const newUser = await User.create({
    email: 'test@test.com',
    password: bcrypt.hashSync(password, salt),
    firstName: 'Nick',
    lastName: 'Mac', 
    isAdmin: true, 
    userId: 1
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

const newCampsite= await Campsite.create({
    siteNumber: 23,
    siteDescription: 'Tucked in the back corner, this is a perfect campspot of RVs that are less than 25 ft. Fire pit is available in this campsite and has good shade from trees overhead',
    siteType: 'RV',
    rvMaxLength: 26,
    siteImages: ['https://togorv.com/wp-content/uploads/2021/02/shutterstock_1066771271.jpg'],
    siteAmenities: ['Fire pit', 'Very Shady'],
    campId: 1
})

const anotherCampsite= await Campsite.create({
    siteNumber: 3,
    siteDescription: 'One of the first spots when you come into the park, it might get a little busy at times, but its very close to the showers, bathroom and the dog park.',
    siteType: 'RV',
    rvMaxLength: 50,
    siteImages: ['https://togorv.com/wp-content/uploads/2021/02/shutterstock_1066771271.jpg'],
    siteAmenities: ['Fire pit', 'Not Shaded', 'Close to dog park'],
    campId: 1
})

console.log('Finished seeding database')

await db.close()
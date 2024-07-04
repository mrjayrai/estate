const express = require('express');
const cors = require('cors');
const PORT = 5000;
const jwt = require('jsonwebtoken');
const db = require('./db');
const hash = require('crypto-js');
const cookieparser = require('cookie-parser');
const imagedownloader = require('image-downloader');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
db();
const user = require('./models/User');
const Place = require('./models/Place');
const Booking = require('./models/Booking');
const app = express();
const moment = require('moment');
app.use(cors({
    origin:"https://estate-seven-nu.vercel.app",
    credentials:true,
}));
app.use(express.json());
app.use(cookieparser());
app.use('/uploads',express.static(__dirname+'/uploads'));
require('dotenv').config();


app.get('/test',(req,res)=>{
    res.send("Running Backend");
});

app.post('/register', async (req,res) =>{
    const {name,email,password} = req.body;
    const hashpass = hash.MD5(password).toString(); 
    const existingUser = await user.findOne({ email:  email  });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
    const usercreated = await user.create({
        name,
        email,
        password:hashpass,
    });

    res.json(usercreated);

});

app.post('/login', async (req,res) =>{
    const {email,password} = req.body;
    const hashpass = hash.MD5(password).toString();
    const userarr = await user.findOne({email:email});
    if(userarr){
        
        if(userarr.password === hashpass){
            jwt.sign({email:userarr.email,id:userarr._id},process.env.jwtsecret,{},(err,token)=>{
            if(err) throw err;
            return res.status(200).cookie('token', token, {
                        httpOnly: true,
                        secure:"https://estate-seven-nu.vercel.app",
                        sameSite: 'None'
                    }).json(userarr);
            });
            
        }else{
            return res.status(422).json("Invalid Password");
        }
    }else{
        return res.status(422).json("User Not Found");
    }
});

app.get('/profile',(req,res)=>{
    const {token} = req.cookies;
    if(token){
        jwt.verify(token,process.env.jwtsecret,{}, async (err,tokendata) =>{
            if(err) throw err;
            const {name,email,_id} = await user.findById(tokendata.id);
            res.json({name,email,_id});
        })
    }else{
        res.json(null);
    }
    // res.json({token});
});

app.post('/logout',(req,res)=>{
    res.cookie('token', '', {
                        httpOnly: true,
                        secure:"https://estate-seven-nu.vercel.app",
                        sameSite: 'None'
                    }).json(true);
});

console.log(__dirname);

app.post('/upload-by-link',async (req,res)=>{
    const { link } = req.body;
    const name = Date.now()+ '.jpg';
    await imagedownloader.image({
        url:link,
        dest:__dirname + '/uploads/'+name,
    });

    res.json(name);
});

const photomd = multer({dest:'uploads'})
app.post('/upload',photomd.array('photos',100),(req,res)=>{
    const uploadedFiles = [];
    for(let i = 0;i<req.files.length;i++){
        const { path,originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length-1];
        const newpath = path+'.'+ext;
        fs.renameSync(path,newpath);
        uploadedFiles.push(newpath.replace('uploads\\',''));
    }
    res.json(uploadedFiles);
});

app.post('/places',(req,res)=>{
    const {token} = req.cookies;
    const {title, address, addedphotos, desc, perks, extrainf, checkin, checkout, max_guest,price} = req.body;
    // const checkInTime = moment(checkin, "HH:mm").toDate();
    // const checkOutTime = moment(checkout, "HH:mm").toDate();
    jwt.verify(token,process.env.jwtsecret,{}, async (err,tokendata) =>{
        if(err) throw err;
       const PlaceDoc = await Place.create({
        owner:tokendata.id,
    title:title,
    address:address,
    photos:addedphotos,
    description:desc,
    perks:perks,
    extraInfo:extrainf,
    checkIn:checkin,
    checkOut:checkout,
    maxGuests:max_guest,
    price,
        });
        res.json(PlaceDoc)
    })

});

app.get('/allplaces',(req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token,process.env.jwtsecret,{}, async (err,tokendata) =>{
        if(err) throw err;
       const {id} = tokendata;
       res.json( await Place.find({owner:id}));
    })
});

app.get('/places/:id', async (req,res)=>{
    const { id } = req.params;
    res.json(await Place.findById(id));
});

app.put('/places/edit/:id',async (req,res)=>{
    const { id } = req.params;
    const { token } = req.cookies;
    const {title, address, addedphotos, desc, perks, extrainf, checkin, checkout, max_guest,price} = req.body;
    if(token){
    jwt.verify(token,process.env.jwtsecret,{}, async (err,tokendata) =>{
        if(err) throw err;
        const data = await Place.findById(id);
       if(String(data.owner) === String(tokendata.id)){
        data.set({
            title:title,
    address:address,
    photos:addedphotos,
    description:desc,
    perks:perks,
    extraInfo:extrainf,
    checkIn:checkin,
    checkOut:checkout,
    maxGuests:max_guest,
    price,
        });
        await data.save();
        res.json("ok")
       }
    })
}else{
    res.status(402).json("unauthorized");
}
});

app.get('/placelist', async (req,res)=>{
    res.json(await Place.find());
})

app.post('/bookings',async(req,res)=>{
    const {place,checkIn,checkOut,maxGuests,name,phone,price} = req.body;
    const { token } = req.cookies;
    if(token){
        jwt.verify(token,process.env.jwtsecret,{}, async (err,tokendata) =>{
            if(err) throw err;
            const BookingData = await Booking.create({
                place,checkIn,checkOut,maxGuests,name,phone:phone,price,user:tokendata.id
            });
        
            res.json(BookingData);
        })
    }else{
        res.status(402).json("unauthorized");
    }
    
});

app.get('/getbookings',async(req,res)=>{
    const { token } = req.cookies;
    if(token){
        jwt.verify(token,process.env.jwtsecret,{}, async (err,tokendata) =>{
            if(err) throw err;
            const BookingData = await Booking.find({user:tokendata.id}).populate('place');
        
            res.json(BookingData);
        })
    }else{
        res.status(402).json("unauthorized");
    }
})

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
});

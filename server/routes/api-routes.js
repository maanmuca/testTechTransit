const router = require('express').Router();
const {courses} = require('../models/course');
const config = require('../config/keys');
const axios = require('axios');




////////////////////////////////////////COURSES API///////////////////////////////////////////////////////

router.get('/courses',(req,res)=>{
    let termToSearch = '/'+req.query.name+'/';
    console.log(termToSearch);
    courses.find({name:termToSearch},function(err,allCourses){
        if(err)console.status(400).send(err);
        res.status(200).send(allCourses);
    });
});

router.post('/courses',(req,res)=>{
    let myUrl ="https://test.mytablemesa.com/api/courses?orderBy=popularity+desc&expand=provider&limit=1000&profession=&subjectAreaCode=&state=&provider=&name=";

    axios.get(myUrl)
    .then(function (response) {
        // handle success
        console.log(response);
        courses.insertMany(response.data, function(error, docs) {
            if(error) console.log(error);
            console.log(JSON.stringify(docs));
        });
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
});

////////////////////////////////////////TECHTRANSIT API///////////////////////////////////////////////////////

router.get('/tech-courses',(req,res)=>{
   
    let termToSearch = req.query.name;
    let myUrl =`https://test.mytablemesa.com/api/courses?orderBy=popularity+desc&expand=provider&limit=24&profession=&subjectAreaCode=&state=&provider=&name=${termToSearch}`;

    axios.get(myUrl)
    .then(function (response) {
        res.send(response.data);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
});

router.post('/tech-courses-next',(req,res)=>{
   
    let nextUrl = "https://test.mytablemesa.com/"+req.body.nextUrl;
    console.log(nextUrl);

    axios.get(nextUrl)
    .then(function (response) {
        res.send(response.data);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
});




module.exports =router;
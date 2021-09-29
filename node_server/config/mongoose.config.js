const mongoose = require("mongoose");

module.exports.init = ()=> {
    
mongoose.connect("mongodb://localhost:27017/blog",{ 

    useNewUrlParser:true,
    useUnifiedTopology:true,   

})
.then(()=>{
    console.log("base de datos conectada");
}).catch((err)=>{
    console.log(err);
});

}
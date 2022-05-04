const express = require('express');
const cors = require('cors');
const app=express();
const { MongoClient, ServerApiVersion , ObjectId } = require('mongodb');

require('dotenv').config()
const port =process.env.PORT || 5000 ;

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gdyfp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

  try {
    await client.connect();
    const carCollection = client.db("royal-cars").collection("cars");


   app.get('/products',async(req, res) => {
    const query = {};
    const cursor = carCollection.find(query);
    const product=await cursor.toArray();
    res.send(product);
   })

   app.get("/products/:id", async (req, res) => {
    const id = req.params.id;
    const query={_id: ObjectId(id)};
    const result = await carCollection.findOne(query);
    console.log(result)
    res.send(result);

   })
   app.put('/products/:id', async (req, res) => {
    //  console.log(req)
     const id = req.params.id;
     const filter={_id: ObjectId(id)};
     const options = { upsert: true };
     const updatedQuantity = req.body;
     console.log(updatedQuantity)
    //  res.send(updatedUser)

     const updatedDoc = {
         $set: {
          quantity: updatedQuantity.updateQuantity2
         }
     };
     const result = await carCollection.updateOne(filter, updatedDoc, options);
     res.send(result);
   })


  
  }

finally{}
}
run().catch(console.dir);

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log('mongo db is connect')
//   client.close();
// });



app.get('/',(req,res)=>{

    res.send('start project')
})
app.listen(port ,()=>{
    console.log('listening on port' , port)
})

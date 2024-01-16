const express = require("express")
const salesModel= require('../model/sales')
const carModel= require('../model/cars')
const router= express.Router()



router.post('/commander',async (req,res)=>{
	const idVoiture = req.query.id;
	const idVendeur = req.body.idVendeur;
	const idClient = req.body.storedId;	
		
	const newSale = await salesModel.create({     
	  idVoiture: idVoiture,                     
      idClient: idClient,
      idVendeur: idVendeur,
      purchaseDate: new Date(),
    });
    
    await carModel.updateOne({ _id: newSale.idVoiture }, { $set: { isCommanded: true } });
	
	res.status(201).json(newSale);
    
})

router.get('/all-sales', async (req, res) => {
  try {
    const allSales = await salesModel.find()
      .populate('idVoiture') // populate car data
      .populate('idClient', 'name') // populate client data with only the 'name' field
      .populate('idVendeur', 'name'); // populate vendeur data with only the 'name' field

    res.json(allSales);
  } catch (error) {
    console.error('Error fetching all sales:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/sales-PerSalesmen', async (req, res) => {
  try {
	const idVendeur = req.query.id;
    const Sales = await salesModel.find({idVendeur:idVendeur})
      .populate('idVoiture') // populate car data
      .populate('idClient', 'name') // populate client data with only the 'name' field      

    res.json(Sales);
  } catch (error) {
    console.error('Error fetching all sales:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports= router

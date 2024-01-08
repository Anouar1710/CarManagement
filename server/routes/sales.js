const express = require("express")
const salesModel= require('../model/sales')
const router= express.Router()



router.post('/commander',async (req,res)=>{
	const { idVoiture } = req.query;
	const idVendeur = req.body.idVendeur;
	const idClient = req.body.storedId;
	
	
	
	const newSale = await salesModel.create({     
	  idVoiture: idVoiture,                     
      idClient: idClient,
      idVendeur: idVendeur,
    });
	
	res.status(201).json(newSale);
    
})

module.exports= router

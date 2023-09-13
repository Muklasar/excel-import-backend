// const Tray = require("../models/tray");
const Product = require("../models/product");


exports.create = async (req, res) => {
	try {
		const data = req.body
		if(data.length > 0){
			for(let i=0; i<data.length; i++){
				await new Product(data[i]).save();
			}
		}
		res.status(200).json("Product Created");
	} catch (err) {
		res.status(400).send("Create product faild" + err);
	}
};


exports.read = async (req, res) => {
	try {
	  let product = await Product.findOne({ uic: req.params.uic }).exec();
	  res.json(product);
	} catch {
	  res.status(400).send("Product read faild");
	}
  };


  exports.update = async (req, res) => {
	try {
	  const updated = await Product.findOneAndUpdate(
		{ uid: req.params.uid },
		req.body,
		{ new: true }
	  ).exec();
	  res.json(updated);
	} catch (err) {
	  console.log("update err", err);
	  res.status(400).json("Update faild");
	}
  };

// const Tray = require("../models/tray");
const Grad = require("../models/grad");
const slugify = require("slugify");

exports.create = async (req, res) => {
	try {
		const { name, descriptions } = req.body;
		console.log("name", name);

		const newGrad = await new Grad({
			name,
			slug: slugify(name),
      descriptions
		}).save();

		res.status(200).json(newGrad);
	} catch (err) {
		res.status(400).send("Create grad faild" + err);
	}
};

exports.list = async (req, res) => {
	try {
		const newGrad = await Grad.find({}).sort({ createdAt: -1 });
		res.status(200).json(newGrad);
	} catch {
		res.status(400).send("Grad list not found");
	}
};

exports.update = async (req, res) => {
	try {
		const { slug } = req.params;
		const { name, descriptions } = req.body;

		const newGrad = await Grad.findOneAndUpdate(
			{ slug: slug },
			{ name: name, slug: slugify(name), descriptions },
			{ new: true }
		);

		res.status(200).json(newGrad);
	} catch (err) {
		res.status(400).send("Update category failed" + err);
	}
};

exports.read = async (req, res) => {
	try {
		const { slug } = req.params;

		const grad = await Grad.findOne({ slug }).exec();
		// console.log('category', category)

		// const trays = await Tray.find({ grad })
		// 	.populate("grad")
		// 	.exec();

		res.status(200).json({ grad });
	} catch {
		res.status(400).send("Find grad failed");
	}
};

exports.remove = async (req, res) => {
	try {
		const { slug } = req.params;

		const category = await Grad.findOneAndDelete({ slug: slug }).exec();

		res.status(200).json(category);
	} catch {
		res.status(400).send("Delete category failed");
	}
};


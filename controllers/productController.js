const fs = require("fs");
const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  
  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: products.length,
    data: {
      products,
    },
  });
};

exports.addProduct = async(req, res) => {
  const newProduct = await Product.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      products: newProduct ,
    },
  });
};

exports.getProductById = async(req, res) => {
  const foundProduct = await Product.findById(req.params.id);
  if (foundProduct) {
    return res.status(200).json({
      status: "success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
};


exports.deleteProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );  
  /*  fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products)); */
  const deleted = products.find((p) => p.id == req.params.id);
/*   products.filter((p) => p.id != req.params.id); */
  products.filter(req.body);
 /* fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products)); */

 if (deleted) {
  return res.status(200).json({
    status: "product was deleted",
    data: {
      products,
    },
  });
} else {
  res.status(404).json({
    status: "not found",
  });
}
};



 
exports.updateProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );
  products.push(req.body);
  fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));

  const put = products.find((p) => p.id == req.params.id);
  if (put) {
    return res.status(200).json({
      status: "success",
      data: {products
        }

    });
    
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
};
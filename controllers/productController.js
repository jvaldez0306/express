const fs = require("fs");

exports.getAllProducts = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: products.length,
    data: {
      products,
    },
  });
};

exports.addProduct = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );
  products.push(req.body);
  fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));

  res.status(200).json({
    status: "success",
    data: {
      products,
    },
  });
};

exports.getProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );
  const foundProduct = products.find((p) => p.id == req.params.id);
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
  const deleted = products.find((p) => p.id == req.params.id);
  if (deleted) {
      return res.status(200).json({
      data: {
       products : products.filter((p) => p.id != req.params.id)}
      
    });

  } else {
    res.status(404).json({
      status: "not found",
    });
  }
};

exports.putProductById = (req, res) => {
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
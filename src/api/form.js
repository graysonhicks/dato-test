const form = (req, res) => {
  console.log(req.body);
  return res.json(req.body);
};

export default form;

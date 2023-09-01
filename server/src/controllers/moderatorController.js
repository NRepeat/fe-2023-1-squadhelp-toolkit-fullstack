module.exports.test = async (req, res, next) => {
 
  try {
    res.send({data:'dasdsd'})
  } catch (err) {
    next(new TokenError());
  }
};
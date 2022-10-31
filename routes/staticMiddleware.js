module.exports = (req, res) => {
  console.log(req.path);
  if(req.path.startsWith('/api')) {
    next()
  } else {
    // if(文件资源存在) {
    //   res.send("静态资源");
    // } else {
    //   next()
    // }
  }
}

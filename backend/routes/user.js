// const router = require("express").Router();
// const User = require("../models/user");
// const bcrypt=require("bcrypt")
// const jwt=require("jsonwebtoken")
// const {authentificationToken}=require("./userAuth")
// router.post('/sign-up', async (req, res) => {
//     try {
//         const { username, email, password, address } = req.body;

//         if (username.length < 4) {
//             return res.status(400).json({ message: "Username length should be greater than 3" });
//         }

//         const exist = await User.findOne({ username: username });
//         if (exist) {
//             return res.status(400).json({ message: "Username already exists" });
//         }

//         const existemail = await User.findOne({ email: email });
//         if (existemail) {
//             return res.status(400).json({ message: "Email already exists" });
//         }

//         if (password.length <= 5) {
//             return res.status(400).json({ message: "Password length should be greater than 5" });
//         }
//          const hassPass =await bcrypt.hash(password,10)
//         const newUser = new User({ username: username, email: email, password: hassPass, address: address });
//         await newUser.save();
//         return res.status(200).json({ message: "Sign up success" });
//     } catch (error) {
//         res.status(500).json({ message: "Internal error" });
//         console.error(error)
//     }
// });
// router.post('/sign-in', async (req, res) => {
//     try {
//       const { email, password } = req.body;
      
      
//       const existu = await User.findOne({ email });
//       if (!existu) {
//         return res.status(400).json({ message: "Invalid credentials" });
//       }
  
     
//       bcrypt.compare(password, existu.password, (err, data) => {
//         if (data) {
//           const authClaims = [{ name: existu.email }, { role: existu.role }];
//           const token = jwt.sign({ authClaims }, 'bookstore', { expiresIn: '1h' });
//           return res.status(200).json({ id: existu._id, role: existu.role, token });
//         } else {
//           return res.status(400).json({ message: "Invalid credentials" });
//         }
//       });
  
//     } catch (error) {
//       res.status(500).json({ message: "Internal error" });
//       console.error(error);
//     }
//   });
  
// router.get("/get-use-information",authentificationToken,async(req,res)=>{
//     try{
//       const {id}=req.headers;
//       const data=await User.findById(id).select('-password');
//       res.status(200).json(data)

//     }catch(error){
//         res.status(500).json({ message: "Internal error" });
//         console.error(error)
//     }
// })


// router.put("/update-address",authentificationToken,async(req,res)=>{
//     try{
//         const {id}=req.headers;
//         const {address}=req.body;
//         await User.findByIdAndUpdate(id,{address:address})
//         res.status(200).json({message:"Address updated"})

//     }catch(error){
//         res.status(500).json({ message: "Internal error" });
//     }
// })
// module.exports = router;
const router = require("express").Router();
const { signUp, signIn, getUserInformation, updateAddress } = require("../controllers/userController");
const { authentificationToken } = require("./userAuth");

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.get('/get-use-information', authentificationToken, getUserInformation);
router.put('/update-address', authentificationToken, updateAddress);

module.exports = router;

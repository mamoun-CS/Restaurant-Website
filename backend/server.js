import express from 'express';
import path from 'path';
import cors from'cors';
import { fileURLToPath } from 'url';
import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import pg from "pg";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import session from "express-session";
import multer from "multer";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",  
    credentials: true 
}));

app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "public", "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

app.use("/img", express.static("img"));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "img/"); // Save files inside the 'img/' directory
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname)); // Rename file
    },
  });
  
  const upload = multer({ storage: storage });
  

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS
    }
  });

  const sendVerificationEmail = async (toEmail, verificationCode) => {
    try {
      const info = await transporter.sendMail({
        from: '"JALTAH" ', 
        to: toEmail,
        subject: 'Email Verification', 
        text: `Your verification code is: ${verificationCode}`, 
      });
  
      console.log('Email sent: %s', info.messageId);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  };

  
  app.use(
    session({
        order:'0',
        verify:'0',
        id_q:'0',
        sec:'0',
        mid_final:'0',
        numberq :'0',
        user :"name , email,state ",
        cuser :"fname,lname , email,id_student,hash,cv_doc",
        listdata:"",
        avg:'0',
        flag :'0',
        data_Ai:"Q , imgq ",
        lis:"",
        counter: '0' ,
        data3:"",nameArray:[],
secret: process.env.BOSS_CLICK,
resave: false , 
saveUninitialized: true,
 cookie: {  maxAge: 1000 * 60 * 60, },
}));

app.use(
    session({
        secret: process.env.BOSS_CLICK,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 60 },
        name: "sessionId", 
    })
);


app.use((req, res, next) => {
    if (!req.session.counter) req.session.counter = 0;
    if (!req.session.idArray) req.session.idArray = [];
    if (!req.session.nameArray) req.session.nameArray = [];
    if (!req.session.sessionData) req.session.sessionData = {};
    next();
});
const sendInvoice = async (invoice, order) => {
    console.log("Invoice Data:", invoice);
    console.log("Order Details:", order);
    const orderDetails = Object.entries(order)
    .map(([item, quantity]) => {  
        return `${item} (x${quantity}) - ${quantity}₪`;
    })
    .join("\n");
    try {
        const info = await transporter.sendMail({
            from: '"JALTAH Invoice" <' + process.env.EMAIL_USER + '>',
            to: process.env.EMAIL_USER, 
            subject: 'Invoice',
            text: `Invoice Order: 
            \n Name: ${invoice.fullname}
            \n Location: ${invoice.location}
            \n Phone: ${invoice.phone}
            \n Note: ${invoice.Note}
            \n Order Details:
            \n${orderDetails}
            \n totalOrder:
            \n${invoice.totalSum}₪
            `,
        });

        console.log('Invoice Email sent: %s', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending invoice email:', error);
        return false;
    }
};



export { sendVerificationEmail, sendInvoice };


const db = new pg.Client({
    user: process.env.PG_USER, 
    host: process.env.PG_HOST,
    database: process.env.PG_DB, 
    password: process.env.PG_PD,
    port: process.env.PG_PORT,
  });
  
db.connect()

const saltRound = 3;


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views','home', 'home.html'));

});

app.get("/sing-in", (req, res) => {
    res.render(path.join(__dirname, 'public', 'views','home', 'sing-in.ejs'));
 
});

app.post("/sing-in", (req, res, next) => {
    console.log("Login attempt:", req.body);

    passport.authenticate("local", (err, user, info) => {
        if (err) {
            console.error("Error:", err);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }

        if (!user) {
            return res.status(401).json({ success: false, message: info.message });
        }

        req.login(user, (loginErr) => {
            if (loginErr) {
                console.error("Login Error:", loginErr);
                return res.status(500).json({ success: false, message: "Login failed" });
            }
                console.log(info.role);
            
            req.session.user = { 
                fname: user.fname.trimEnd(), 
                lname: user.lname.trimEnd(), 
                email: user.email,
                role: info.role // Store user role (C = Customer, M = Manager, ver = Awaiting Verification)
            };

            console.log("Session User:", req.session.user);
            return res.json({ success: true, role: req.session.user.role });
        });
    })(req, res, next);
});

app.get("/change-password", (req,res)=>{
    //console.log(req.session.user.email);
    const email = req.query.email;
    const load = req.query.load ||0;
    console.log(email);
    res.render(path.join(__dirname, 'public', 'views','home', 'changeps.ejs'), { email ,load:load});

});
app.post("/change-password", async(req,res)=> {
     try {
    const [passwordpre, passwordnew, passwordnew2 ]= req.body.password;
    console.log(req.body.password);  
    console.log(passwordpre, passwordnew, passwordnew2  );
    const email = req.session?.user?.email || req.query.email; // Get email from session or query
    console.log(email);
    if (!email || !passwordpre || !passwordnew || !passwordnew2) {
        return res.render("home/changeps.ejs", { valid: "All fields are required." ,email:email });
    }

    if (passwordnew !== passwordnew2) {
        return res.render("home/changeps.ejs", { valid: "Passwords do not match. Please try again." ,email:email });
    }

    // Fetch user data
    const [customer, manger, customer_ver] = await Promise.all([
        db.query("SELECT * FROM customer WHERE email = $1", [email]),
        db.query("SELECT * FROM manger WHERE email = $1", [email]),
        db.query("SELECT * FROM customer_ver WHERE email = $1", [email])
    ]);

    let user = null;
    let userType = '';

    if (customer.rows.length > 0) {
        user = customer.rows[0];
        userType = 'customer';
    } else if (manger.rows.length > 0) {
        user = manger.rows[0];
        userType = 'manger';
    } else if (customer_ver.rows.length > 0) {
        user = customer_ver.rows[0];
        userType = 'customer_ver';
    } else {
        return res.render("home/changeps.ejs", { valid: "Invalid email. User not found." ,email:email });
    }
    
    // Compare old password 
    const isMatch = await bcrypt.compare(passwordpre, user.password);
    if (!isMatch) {
        return res.render("home/changeps.ejs", { valid: "Incorrect current password. Please try again." ,email:email });
    }

    // Hash new password
    const newHashedPassword = await bcrypt.hash(passwordnew, saltRound);

    // Update password in the correct table
    if (userType === 'customer') {
        await db.query("UPDATE customer SET password_hash = $1 WHERE email = $2", [newHashedPassword, email]);
    } else if (userType === 'manger') {
        await db.query("UPDATE manger SET password_hash = $1 WHERE email = $2", [newHashedPassword, email]);
    } else if (userType === 'customer_ver') {
        await db.query("UPDATE customer_ver SET password_hash = $1 WHERE email = $2", [newHashedPassword, email]);
    }

    res.redirect('/sing-in'); 
} catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "Internal server error" });
}
});

app.post("/change-passwordr", async(req,res)=>{
    const [passwordnew, passwordnew2 ]= req.body.password;
    const email = req.session.email ; 
    let user ='';let userType ='';
    console.log(passwordnew, passwordnew2)
    if (passwordnew !== passwordnew2) {
        return res.render("home/changeps.ejs", { valid: "Passwords do not match. Please try again." ,email:email ,load:1});
    }
    try{
        const [customer, manger, customer_ver] = await Promise.all([
            db.query("SELECT * FROM customer WHERE email = $1", [email]),
            db.query("SELECT * FROM manger WHERE email = $1", [email]),
            db.query("SELECT * FROM customer_ver WHERE email = $1", [email])
        ]);

        if (customer.rows.length > 0) {
            user = customer.rows[0];
            userType = 'customer';
        } else if (manger.rows.length > 0) {
            user = manger.rows[0];
            userType = 'manger';
        } else if (customer_ver.rows.length > 0) {
            user = customer_ver.rows[0];
            userType = 'customer_ver';
        } else  {
            return res.render("home/changeps.ejs", { valid: "Invalid email. User not found." ,email:email,load:1 });
        }
        const newHashedPassword = await bcrypt.hash(passwordnew, saltRound);
        if (userType === 'customer') {
            await db.query("UPDATE customer SET password_hash = $1 WHERE email = $2", [newHashedPassword, email]);
        } else if (userType === 'manger') {
            await db.query("UPDATE manger SET password_hash = $1 WHERE email = $2", [newHashedPassword, email]);
        } else if (userType === 'customer_ver') {
            await db.query("UPDATE customer_ver SET password_hash = $1 WHERE email = $2", [newHashedPassword, email]);
        }
       
        res.redirect('/sing-in'); 
    }catch(error){
      console.error("Error changing password:", error);
    res.status(500).json({ error: "Internal server error" });
    }

});

app.get('/forget-password',(req,res)=>{
    res.render(path.join(__dirname, 'public', 'views','home','forgetpass.ejs' ));
})

app.post('/forget-password' , async (req,res) => { 
     let email = req.body.email; 

     if (!email) {
        return res.render('home/forgetpass.ejs', { valid: "Please enter your email." });
    }
try{      
     const [student, teacher, teacher_ver] = await Promise.all([
        db.query("SELECT * FROM customer WHERE email = $1", [email]),
        db.query("SELECT * FROM manger WHERE email = $1", [email]),
        db.query("SELECT * FROM customer_ver WHERE email = $1", [email])
    ]); 
    if( student.rows.length > 0 || teacher.rows.length  > 0  || teacher_ver.rows.length > 0)
        {
            const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
            req.session.verify = verificationCode;
          const emailSent = await sendVerificationEmail(email, verificationCode);
          req.session.email= email;
          res.render('home/forgetpass.ejs',{load: 1});
        }
    else {
        res.render('home/forgetpass.ejs',{ valid : "Email not found "});
    }
} catch (error) {
    console.error("Error in forget-password:", error);
    return res.status(500).send("Internal Server Error");
}

});

app.post('/verforget-password' , (req,res)=>{
    const code = req.body.code;
    const email = req.session.email;
    let codev = req.session.verify;
    if (code === codev)
    {
   res.redirect(`/change-password?email=${email}&&load=${1}`);
    }
    else{
        res.render('start/forgetpass.ejs',{valid:"error in code verfiy",load :1 });
    }

});

app.get("/sing-up", (req, res) => {
    res.render(path.join(__dirname, 'public', 'views','home', 'sing-up.ejs'));
});

app.post("/sing-up",async (req, res) => {
    const {fname ,lname,email,phone,password,cpassword } = req.body;  
     if(password != cpassword)
     {
        res.render("home/sing-up.ejs", { 
        validpas: "Invalid password Please try again." 
    });
     }
     else
     {
         bcrypt.hash(password , saltRound , async (err,hash) =>
        { 
            if(err)
                { console.log("error in password \n ");}
           else
           {
            const [checkresultstu, checkresulttea, checkresulttea_ver] = await Promise.all([
                db.query("SELECT * FROM customer WHERE email = $1", [email]),
                db.query("SELECT * FROM manger WHERE email = $1", [email]),
                db.query("SELECT * FROM customer_ver WHERE email = $1", [email])
            ]);

             if ( checkresultstu.rows.length > 0   || checkresulttea.rows.length > 0 || checkresulttea_ver.rows.length > 0 )
                {
                    res.render("home/sing-up.ejs", { 
                        validpas: "invaled Email please change Email." 
                    });
                }
          else{
                    const ver = Math.floor(100000 + Math.random() * 900000).toString();
              
                    const checkresulttea = await db.query("SELECT * FROM customer WHERE email = $1",[email],); 
                    const checkresulttea_ver = await db.query("SELECT * FROM customer_ver WHERE email = $1",[email],); 


                   const result = await db.query(
                    "INSERT INTO customer_ver(fname, lname, email,  password_hash ,phone,ver) VALUES ($1, $2, $3, $4,$5,$6)",
                    [fname, lname, email, hash,phone,ver]
                 );
                 const verificationCode =  "/n email =" + email + "/n verify code : " + ver ;
                 const emailSent = await sendVerificationEmail(email, verificationCode);
                 console.log(emailSent);
                res.redirect("/sing-in");   
        }

          }
        });
    
     
     }
});
app.get("/verify",(req,res)=>
    {
        const  valid  = req.query.valid ;
        res.render(path.join(__dirname, 'public', 'views','home', 'verify-code.ejs'), {
          valid,
        });
    });
app.post("/verify",async(req,res)=>
    {
       const state = req.session.user.state ||0 ; 
       const email = req.session.user.email ||0 ; 
       console.log(state , email );
       const code = req.body.code; 
            const result_ver = await db.query("SELECT * FROM customer_ver WHERE email = $1",[email]);
            console.log(code);
            const codeStr = String(code);
            const rr = String(result_ver.rows[0].ver);
            if (rr === codeStr ){
            const result = await db.query(
                "INSERT INTO manger(fname, lname, email,phone, password_hash ) VALUES ($1, $2, $3, $4, $5)",
                [result_ver.rows[0].fname, result_ver.rows[0].lname, result_ver.rows[0].email, result_ver.rows[0].phone ,result_ver.rows[0].password_hash]
              );
              const result_delete_ver = await db.query("DELETE FROM customer_ver WHERE email= $1",[email]);
            
              req.session.user.fname= result_ver.rows[0].fname;
              req.session.user.lname= result_ver.rows[0].lname;
              req.session.user.email= result_ver.rows[0].email;
              res.redirect("/");
            }
            else {
                let s = state ; 
                let email = result_ver.rows[0].email; 
                return res.redirect(`/verify?email=${email}&state=${s}&valid=code+is+not+correct+please+try+again`);
             }
            
             
    });   
//start website React
app.get('/startorder',(req,res)=>{
  return res.json( {message: "Hello from the Node.js backend!"} );
  });

app.post("/set-session", (req, res) => {
    console.log("Connected to React");
    req.session.sec = req.body.name;
    res.json({ message: `Session set successfully! ${req.session.sec}` });
});

app.post("/read-session", (req, res) => {
    console.log("Connected to session");
  
    const idArray = req.session.idArray;
    const newArr = [...new Set(idArray)].sort((a, b) => a - b);
    const sort = newArr.map((num) => idArray.filter((x) => x === num).length);
  
    const itemCounts = newArr.map((id) => req.session.sessionData[id] || 0);
  
    res.json({ message: [req.session.sec || "", req.session.nameArray.length, newArr, itemCounts] });
  });
  

app.post("/set-note-session", (req, res) => {
    
     console.log(`counter ${req.session.counter}`);
    
    if (!req.session.idArray) req.session.idArray = [];
    if (!req.session.nameArray) req.session.nameArray = [];
    
    
   
   
    if (!req.body.name || req.body.name.length < 2) {
        return res.status(400).json({ message: "Invalid name format" });
    }

    let id = req.body.number;  
    let name = req.body.name;   

    
    req.session.idArray.push(id);
    req.session.nameArray.push(name);

    console.log("Stored IDs:", req.session.idArray);
    console.log("Stored Names:", req.session.nameArray);
    console.log("Counter:", req.session.nameArray.length   );

    res.json({
        message: `User: ${req.session.cuser || "Guest"}, 
                  IDs: ${req.session.idArray.join(", ")}, 
                  Names: ${req.session.nameArray.join(", ")}, 
                  Count: ${req.session.nameArray.length}`
    });
});

           
app.post("/increment", (req, res) => {
    if (!req.session.counter) req.session.counter = 0;
    req.session.counter++; 
    res.json({ message: req.session.counter });
});

app.post("/update-session", (req, res) => {
    console.log("Entered update-session API", req.body.name);

    if (!req.session.counter) req.session.counter = 0;
    if (!req.session.idArray) req.session.idArray = [];
    if (!req.session.nameArray) req.session.nameArray = [];
    if (!req.session.sessionData) req.session.sessionData = {};

    let nameToRemove = req.body.name ? req.body.name.trim() : ""; 

    if (!nameToRemove) {
        req.session.counter = Math.max(0, req.session.counter - 1);
        return res.json({ message: `Counter decreased. New count: ${req.session.counter}` });
    }

    const index = req.session.nameArray.indexOf(nameToRemove);

    if (index !== -1) {
        let removedItemId = req.session.idArray[index];

        req.session.idArray.splice(index, 1);
        req.session.nameArray.splice(index, 1);
        req.session.counter = Math.max(0, req.session.counter - 1);

        if (removedItemId in req.session.sessionData) {
            req.session.sessionData[removedItemId] = Math.max(0, req.session.sessionData[removedItemId] - 1);
        }

        return res.json({
            message: `Removed 1 occurrence of '${nameToRemove}'. New count: ${req.session.counter}`,
            totalItems: req.session.counter
        });
    } else {
        return res.status(404).json({ message: "Item not found in session." });
    }
});


app.post("/senddata", async (req, res) => {
    try {
        console.log("Received Data:", req.body);

        const { location, phone, fullname,Note, sum } = req.body;
        if (!location || !phone) {
            return res.status(400).json({ message: "Location and Phone are required!" });
        }

        console.log("Session Data:", req.session.nameArray, req.session.sessionData);
        const sessionData = req.session.sessionData || {};

        // Filter items with quantity > 0
        const filteredSessionData = Object.entries(sessionData)
            .filter(([key, value]) => value > 0)
            .reduce((obj, [key, value]) => {
                obj[key] = value;
                return obj;
            }, {});

        if (Object.keys(filteredSessionData).length === 0) {
            return res.status(400).json({ message: "No items in the order!" });
        }

        const totalSum = Number(sum) || 0;

        // Insert Order into `orders` table
        const orderResult = await db.query(
            "INSERT INTO orders (customer_name, location, phone,Note, total_price) VALUES ($1, $2, $3, $4) RETURNING id",
            [fullname, location, phone, Note, totalSum]
        );
        const orderId = orderResult.rows[0].id;

        // Insert Order Items into `order_items` table
        const orderQueries = Object.entries(filteredSessionData).map(([item, quantity]) => {
            const match = item.match(/^(L|M|S)\s(.+?)(\d+)$/); // Extracts size, item name, and possible trailing number
        
            if (!match) {
                console.error("Invalid format:", item);
                return Promise.reject(new Error("Invalid order item format"));
            }
        
            const [, size, itemName, itemNumber] = match; // Destructure extracted values
            const cleanedItemName = `${itemName}${itemNumber}`.trim(); // Ensure name is correct
        
            return db.query(
                "INSERT INTO order_items (order_id, item_name, size, quantity, price) VALUES ($1, $2, $3, $4, $5)",
                [orderId, cleanedItemName, size, quantity, totalSum] // Ensure correct price
            );
        });
        
        // Function to fetch the price for an item
       
        

        await Promise.all(orderQueries);

        console.log("Final Order Details:\n", filteredSessionData, "\nTotal Sum:", totalSum);

        sendInvoice({ fullname, location, phone,Note, totalSum }, filteredSessionData);

        res.json({
            message: `Order received! Location: ${location}, Phone: ${phone}, Full Name: ${fullname}. Total items ordered: ${Object.keys(filteredSessionData).length}`,
        });

        // Clear session after order submission
        req.session.destroy((err) => {
            if (err) console.error("Error destroying session:", err);
        });

    } catch (error) {
        console.error("Error processing order:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.get("/get-orders", async (req, res) => {
    try {
        
        const ordersResult = await db.query("SELECT * FROM orders");
        if (ordersResult.rows.length === 0) {
            return res.status(404).json({ error: "No orders found" });
        }

        const orders = ordersResult.rows;
        const cou = ordersResult.rowCount; 
        
        const itemsResult = await db.query("SELECT * FROM order_items");
        
       
        const ordersWithItems = orders.map(order => ({
            orderId: order.id,
            customer_name: order.customer_name,
            location: order.location,
            phone: order.phone,
            totalOrder: order.total_price,
            orderDetails: itemsResult.rows.filter(item => item.order_id === order.id)
        }));

        console.log("Orders Count:", cou, "\nOrders Data:", ordersWithItems);

        
        res.json({ orders: ordersWithItems, count: cou });

    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


    


    
app.get("/check-role", (req, res) => {
    if (req.session.user && req.session.user.role) {
      res.json({ role: req.session.user.role });
    } else {
      res.json({ role: "user" }); // Default role
    }
});


  
app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Logout failed" });
        }
        res.json({ message: "Logged out successfully" });
    });
});


app.get("/order", (req, res) => {
    const id = req.query.id;
    if (!id) return res.status(400).json({ error: "Missing item ID" });

    // Initialize if not existing
    if (!(id in req.session.sessionData)) {
        req.session.sessionData[id] = 0;
    }

    res.json({ message: req.session.sessionData[id] });
});


app.post("/order", (req, res) => {
    const { id, count } = req.body;
    if (!id || typeof count !== "number") {
        return res.status(400).json({ error: "Invalid ID or count" });
    }

    if (!(id in req.session.sessionData)) {
        req.session.sessionData[id] = 0;
    }

   
    req.session.sessionData[id] = count;
    res.json({ message: count });
});


// Manger data 
//  Add Note to Database
app.post("/add-note", async (req, res) => {
    const { title, content, img, priceOne, priceTwo, priceThree } = req.body;

    if (!title || !content || (!priceOne && !priceTwo && !priceThree)) {
        return res.status(400).json({ message: "Please fill in all required fields and at least one price!" });
    }

    try {
        const result = await db.query(
            "INSERT INTO notes (title, content, img, price_one, price_two, price_three) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [title, content, img || "/img/default-placeholder.png", priceOne, priceTwo, priceThree]
        );

        res.status(201).json({ message: "Note added successfully!", note: result.rows[0] });
    } catch (error) {
        console.error("Error adding note:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//  Get Notes from Database
app.get("/get-notes", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM notes");
        res.json({ notes: result.rows });
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


app.put("/update-note", upload.single("image"), async (req, res) => {
    console.log("Received Data:", req.body);
    console.log("Received File:", req.file ? req.file.filename : "No image uploaded");

    const { id, title, content, price_one, price_two, price_three } = req.body;
    
    // Validate numeric fields
    const priceOne = Number(price_one) || 0;
    const priceTwo = Number(price_two) || 0;
    const priceThree = Number(price_three) || 0;
    
    // Validate ID
    const noteId = Number(id);
    if (isNaN(noteId)) {
        return res.status(400).json({ message: "Invalid note ID!" });
    }

    if (!title || !content) {
        return res.status(400).json({ message: "Missing required fields!" });
    }

    const img = req.file?.filename ? `http://localhost:5000/img/${req.file.filename}` : null;

    try {
        const query = `
            UPDATE notes
            SET title = $1, content = $2, price_one = $3, price_two = $4, price_three = $5 ${img ? ", img = $6" : ""}
            WHERE id = $${img ? 7 : 6}
        `;

        const values = img
            ? [title, content, priceOne, priceTwo, priceThree, img, noteId]
            : [title, content, priceOne, priceTwo, priceThree, noteId];

        const updatedNote = await db.query(query, values);

        if (updatedNote.rowCount > 0) {
            return res.json({ success: true, message: "Note updated successfully!", imagePath: img });
        } else {
            return res.status(404).json({ success: false, message: "Note not found" });
        }
    } catch (error) {
        console.error("Database Error:", error);
        return res.status(500).json({ success: false, message: "Database error" });
    }
});

app.delete("/delete-note", async (req, res) => {
    console.log("Received Data:", req.body);

    const  id  = req.body.id;

    // Validate ID
    const noteId = Number(id);
    if (isNaN(noteId)) {
        return res.status(400).json({ message: "Invalid note ID!" });
    }

if (req.body.fase === 2)
    {
    try {
        const query = `DELETE FROM notes WHERE id = $1`;
        const result = await db.query(query, [noteId]);

        if (result.rowCount > 0) {
            return res.json({ success: true, message: "Note deleted successfully!" });
        } else {
            return res.status(404).json({ success: false, message: "Note not found" });
        }
    } catch (error) {
        console.error("Database Error:", error);
        return res.status(500).json({ success: false, message: "Database error" });
    }
    }else{

         try {
        const query = `DELETE FROM orders WHERE id = $1`;
        const querylis = `DELETE FROM order_items WHERE order_id = $1`;
        const result = await db.query(query, [noteId]);
         console.log("Done!!");
        if (result.rowCount > 0) {
            return res.json({ success: true, message: "Note deleted successfully!" });
        } else {
            return res.status(404).json({ success: false, message: "Note not found" });
        }
    } catch (error) {
        console.error("Database Error:", error);
        return res.status(500).json({ success: false, message: "Database error" });
    }

}


});



   passport.use(
        new Strategy(
            { usernameField: "email", passwordField: "password" }, 
            async function verify(email, password, done) {
                try {
                    const [customer, manager, customer_ver] = await Promise.all([
                        db.query("SELECT * FROM customer WHERE email = $1", [email]),
                        db.query("SELECT * FROM manger WHERE email = $1", [email]),
                        db.query("SELECT * FROM customer_ver WHERE email = $1", [email])
                    ]);
    
                    let user = null;
                    let userRole = '';
    
                    if (customer.rows.length > 0) {
                        user = customer.rows[0];
                        userRole = "user";
                    } else if (manager.rows.length > 0) {
                        user = manager.rows[0];
                        userRole = "manager";
                    } else if (customer_ver.rows.length > 0) {
                        user = customer_ver.rows[0];
                        userRole = "verification_pending";
                    } else {
                        return done(null, false, { message: "Email not found" });
                    }
    
                    // Compare hashed password
                    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
                    if (!isPasswordValid) {
                        return done(null, false, { message: "Invalid password" });
                    }
    
                    return done(null, { ...user, role: userRole }, { role: userRole });
                } catch (err) {
                    console.error("Error in authentication:", err);
                    return done(err);
                }
            }
        )
    );
    
    passport.serializeUser((user, cb) => {
        cb(null, user.email); // Serialize email only
    });
    
    passport.deserializeUser(async (email, cb) => {
        try {
            const resultstu = await db.query("SELECT * FROM customer WHERE email = $1", [email]);
            if (resultstu.rows.length > 0) {
                return cb(null, resultstu.rows[0]);
            }
    
            const resulttea = await db.query("SELECT * FROM manger WHERE email = $1", [email]);
            if (resulttea.rows.length > 0) {
                return cb(null, resulttea.rows[0]);
            }
    
            return cb(null, false); 
        } catch (err) {
            return cb(err);
        }
    });
    
// Start server
app.listen(5000, () => {
    console.log("Server running at http://localhost:5000/");
});

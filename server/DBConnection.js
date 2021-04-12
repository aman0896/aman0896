const express = require('express');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const bodyparser = require('body-parser');
const cors = require('cors');
const fileUPload = require('express-fileUpload');
const path = require('path');
const { Console } = require('console');
const bcrypt = require('bcrypt');
const app = express();
const saltRound = 10;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var fs = require('fs');

app.use(express.json());
app.use(
    cors({
        origin: ['http://localhost:3000'],
        method: ['GET', 'POST'],
        credentials: true,
    })
);
app.use(fileUPload());
app.use(cookieParser());
app.use(
    session({
        key: 'userId',
        secret: 'subscribe',
        resave: false,
        saveUninitialized: false,
        //cookie: { expires: 60 * 60 * 24 },
    })
);

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const localIpUrl = require('local-ip-url');
const { DataUsageSharp, DataUsage } = require('@material-ui/icons');
const { response } = require('express');
const ipAddress = localIpUrl('public');
console.log(ipAddress);

//#region variable define
var otp = null;
var email = null;
var fabricationProcess = '';

const projectPath = path.dirname(process.cwd());
//#endregion

//#region databaseConnection
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '123456what@',
    database: 'fabhubsdb',
});

db.connect((err) => {
    if (!err) console.log('DB connection Succedded');
    else console.log('failed \n Error:' + JSON.stringify(err));
});
//#endregion

// #region Generate Random OTP
const GenerateOTP = () => {
    var otp = Math.random();
    otp = otp * 1000000;
    otp = parseInt(otp);
    console.log(otp);
    return otp;
};
//#endregion

//#region initializing transporter to send mail
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: 'Gmail',

    auth: {
        user: 'fabhubsnepal1@gmail.com',
        pass: 'fabhubsnepal123',
    },
    // tls:{rejectUnauthorized: false}
});
//#endregion

//#region Registration process
app.post('/register', (req, res) => {
    //requesting value(firstname, lastname, password, email, phonenumber from registrarion page input)
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;

    otp = GenerateOTP();

    //#region Reading Database to check existing email id
    db.query(
        'SELECT * FROM customer WHERE email = ?',
        [email],
        (err, result) => {
            if (result && result.length > 0) {
                res.send({ message: 'Email already exist' });
            } else {
                bcrypt.hash(password, saltRound, (err, hash) => {
                    db.query(
                        'INSERT INTO customer (First_Name, Last_Name, Password, Email, Phone_Number, Verified) VALUES (?,?,?,?,?,?)',
                        [firstName, lastName, hash, email, phoneNumber, 0],
                        (err, result) => {
                            console.log(err);
                            console.log(result);
                            if (!err) {
                                var mailOptions = {
                                    to: email,
                                    subject: 'Otp for registration is: ',
                                    html:
                                        '<h3>OTP for account verification is </h3>' +
                                        "<h1 style ='font-weight:bold;'>" +
                                        otp +
                                        '</h1>',
                                };

                                transporter.sendMail(
                                    mailOptions,
                                    (error, info) => {
                                        if (error) {
                                            return console.log(error);
                                        }
                                        console.log(
                                            'Message Sent: %s',
                                            info.messageId
                                        );
                                        console.log(
                                            'Preview URL: %s',
                                            nodemailer.getTestMessageUrl(info)
                                        );
                                        res.send({ msg: 'OTP has been sent' });
                                    }
                                );
                            }
                        }
                    );
                });
            }
        }
    );
    //#endregion
});
//#endregion

//#region manufacturer Registration process
app.post('/manufacturer-signup', (req, res) => {
    //requesting value(firstname, lastname, password, email, phonenumber from registrarion page input)

    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const contactPerson = req.body.contactPerson;
    const phoneNumber = req.body.phoneNumber;
    const documentPath = req.body.documentPath;
    const website = req.body.website;
    const companyType = req.body.manufacturerType.type;
    const ward = req.body.ward;
    const city = req.body.city;
    const state = req.body.state;
    const country = req.body.country;
    const logo = req.body.logo;
    const address = req.body.address;
    const serviceList = JSON.parse(req.body.serviceList);
    const briefDescription = req.body.briefDescription;
    const otherServices = req.body.otherServices;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const additionalDetail = req.body.additionalDetail;

    console.log('data', req.body);
    otp = GenerateOTP();

    db.query(
        'SELECT * FROM manufacturer WHERE Email = ?',
        [email],
        (err, result) => {
            if (result && result.length > 0) {
                res.send({ message: 'Email already exist' });
            } else {
                // Inserting manufacturer Information in database
                bcrypt.hash(password, saltRound, (err, hash) => {
                    db.query(
                        'INSERT INTO manufacturer (Email, Company_Name, Password, Contact_Person, Phone_Number, Document_Path, Website, Company_Type, Ward, Address, State, Country,Logo, Brief_Description, Other_Services,Additional_Details) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                        [
                            email,
                            name,
                            hash,
                            contactPerson,
                            phoneNumber,
                            documentPath,
                            website,
                            companyType,
                            ward,
                            address,
                            state,
                            country,
                            logo,
                            briefDescription,
                            otherServices,
                            additionalDetail,
                        ],
                        (err, result) => {
                            console.log(err, result);
                            if (result) {
                                let manufacturerID = '';
                                //#region Get Manufactuerer Info from DB
                                db.query(
                                    'SELECT * FROM manufacturer WHERE email = ?',
                                    [email],
                                    (err, manufacturerInfo) => {
                                        manufacturerID =
                                            manufacturerInfo[0].Manufacturer_ID;
                                        //#region Insert Manufacturer services in DB
                                        if (serviceList.length > 0) {
                                            console.log(serviceList);
                                            serviceList.map((service) => {
                                                const serviceID =
                                                    service.selectedFabrication
                                                        .Service_ID;
                                                const materialNames = JSON.stringify(
                                                    service.materialDetails
                                                );
                                                const costUnit = '1';
                                                const unitRate = '1';
                                                db.query(
                                                    'INSERT INTO services (Service_ID, Manufacturer_ID, Material_Name, Cost_Unit, Unit_Rate) VALUES (?, ?, ?, ?, ?)',
                                                    [
                                                        serviceID,
                                                        manufacturerID,
                                                        materialNames,
                                                        costUnit,
                                                        unitRate,
                                                    ],
                                                    (err, result) => {
                                                        console.log(err);
                                                        if (!err) {
                                                            var mailOptions = {
                                                                to: email,
                                                                subject:
                                                                    'Otp for registration is: ',
                                                                html:
                                                                    '<h3>OTP for account verification is </h3>' +
                                                                    "<h1 style ='font-weight:bold;'>" +
                                                                    otp +
                                                                    '</h1>',
                                                            };

                                                            transporter.sendMail(
                                                                mailOptions,
                                                                (
                                                                    error,
                                                                    info
                                                                ) => {
                                                                    if (error) {
                                                                        return console.log(
                                                                            error
                                                                        );
                                                                    }
                                                                    console.log(
                                                                        'Message Sent: %s',
                                                                        info.messageId
                                                                    );
                                                                    console.log(
                                                                        'Preview URL: %s',
                                                                        nodemailer.getTestMessageUrl(
                                                                            info
                                                                        )
                                                                    );
                                                                    res.send({
                                                                        msg:
                                                                            'OTP has been sent',
                                                                    });
                                                                }
                                                            );
                                                        } else {
                                                            console.log(err);
                                                        }
                                                    }
                                                );
                                            });
                                        }
                                        //#region add latitude and longitude of manufacturer
                                        const sql =
                                            'INSERT INTO location (Manufacturer_ID, Longitude, Latitude) VALUES (?, ?, ?)';
                                        db.query(
                                            sql,
                                            [
                                                manufacturerID,
                                                latitude,
                                                longitude,
                                            ],
                                            (err, result) => {
                                                if (err) {
                                                    console.log(err);
                                                    return res.send(err);
                                                }
                                            }
                                        );
                                        //#endregion
                                    }
                                );
                                //#endregion
                            }
                        }
                    );
                });
            }
        }
    );
});
//#endregion

app.post('/feature-project', (req, res) => {
    const id = req.body.id;
    const process = req.body.process;
    const material = req.body.material;
    const userinfo = req.body.userinfo;
    const date = req.body.date;
    const title = req.body.title;
    const summary = req.body.summary;
    const data = req.body.data;
    const fileName = req.body.fileName;
    const url = req.body.fileURL;
    const description = req.body.description;
    const fileList = req.body.files;
    const image = req.body.image;

    console.log('feature-project', fileList);

    db.query(
        'INSERT INTO feature_project (Email,Customer_ID, Fabrication_Process, Material, Date, Title, Summary, Description, Files, Image) VALUES (?,?,?,?,?,?,?,?,?,?)',
        [
            userinfo,
            id,
            process,
            material,
            date,
            title,
            summary,
            description,
            fileList,
            image,
        ],
        (err, result) => {
            console.log(err, id);
        }
    );

    //#endregion
});

app.post('/update-project', (req, res) => {
    const id = req.body.customerID;
    const process = req.body.process;
    const material = req.body.material;
    const userinfo = req.body.userinfo;
    const date = req.body.date;
    const title = req.body.title;
    const summary = req.body.summary;
    const data = req.body.data;
    const fileName = req.body.fileName;
    const url = req.body.fileURL;
    const description = req.body.description;
    //const fileList = req.body.files;
    const projectID = req.body.projectID;

    db.query(
        'UPDATE feature_project SET Email=?,Customer_ID=?, Fabrication_Process=?, Material=?, Date=?, Title=?, Summary=?, Description=? WHERE Project_ID = ?',
        [
            userinfo,
            id,
            process,
            material,
            date,
            title,
            summary,
            description,
            // fileList,
            projectID,
        ],
        (err, result) => {
            console.log(err, id);
        }
    );

    //#endregion
});

app.get('/feature-project', (req, res) => {
    //requesting value(firstname, lastname, password, email, phonenumber from registrarion page input)
    /*   const process = req.body.process;
  const material = req.body.material;
  const userinfo = req.body.userinfo;
  const date = req.body.date;
  const title = req.body.title;
  const summary = req.body.summary;
  console.log("feature-project", process, material); */

    db.query('SELECT * FROM feature_project', (err, result) => {
        if (err) {
            res.send({ err: err });
        }
        //console.log(result);
        if (result.length > 0) {
            res.send(result);
        }
    });

    //#endregion
});

app.post('/edit-project', (req, res) => {
    //requesting value(firstname, lastname, password, email, phonenumber from registrarion page input)
    /*   const process = req.body.process;
  const material = req.body.material;
  const userinfo = req.body.userinfo;
  const date = req.body.date;
  const title = req.body.title;
  const summary = req.body.summary;
  console.log("feature-project", process, material); */
    const id = req.body.id;
    console.log('id', id);

    db.query(
        'SELECT * FROM feature_project WHERE Project_ID=?',
        [id],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            //console.log(result);
            if (result.length > 0) {
                res.send(result);
            }
        }
    );

    //#endregion
});

app.post('/project/:id', (req, res) => {
    //requesting value(firstname, lastname, password, email, phonenumber from registrarion page input)
    /*   const process = req.body.process;
  const material = req.body.material;
  const userinfo = req.body.userinfo;
  const date = req.body.date;
  const title = req.body.title;
  const summary = req.body.summary;
  console.log("feature-project", process, material); */
    const id = req.params.id;
    console.log('id', id);

    db.query(
        'SELECT * FROM feature_project WHERE Project_ID=?',
        [id],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            //console.log(result);
            if (result.length > 0) {
                res.send(result);
            }
        }
    );

    //#endregion
});

app.post('/delete-project', (req, res) => {
    //requesting value(firstname, lastname, password, email, phonenumber from registrarion page input)
    /*   const process = req.body.process;
  const material = req.body.material;
  const userinfo = req.body.userinfo;
  const date = req.body.date;
  const title = req.body.title;
  const summary = req.body.summary;
  console.log("feature-project", process, material); */
    id = req.body.id;

    db.query(
        'DELETE FROM feature_project WHERE Project_ID=?',
        [id],
        (err, result) => {
            console.log(err);

            console.log(result, 'delete');
        }
    );

    //#endregion
});

//#region verifying OTP And Updating Current User information by adding otp
app.post('/verify', (req, res) => {
    const inputOtp = req.body.otp;
    const email = req.body.email;
    console.log('user', email,otp);
    if (inputOtp != null && inputOtp == otp) {
        db.query(
            'UPDATE customer SET Verified =? WHERE email = ?',
            [1, email],
            (err, result) => {
                console.log(err);
                if (result.length > 0) {
                    console.log(result);
                }
            }
        );

        res.send({
            msg: 'You has been successfully registered',
            isVerified: true,
        });
    } else {
        res.send({ msg: 'Incorrect Code', isVerified: false });
    }
});
//#endregion

//#region change password
app.post('/new-password', (req, res) => {
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;
    const id = req.body.id;
    console.log(email);
    bcrypt.hash(password, saltRound, (err, hash) => {
        db.query(
            'SELECT * FROM customer  WHERE Customer_ID = ?',
            [id],
            (err, result) => {
                console.log(err);
                console.log('pass', result.length);
                if (result.length === 0) {
                    console.log('manufacturer');
                    db.query(
                        'UPDATE manufacturer SET Password =? WHERE Manufacturer_ID = ?',
                        [hash, id]
                    );
                } else {
                    console.log('customer');
                    db.query(
                        'UPDATE customer SET Password =? WHERE Customer_ID = ?',
                        [hash, id]
                    );
                }
            }
        );
    });

    res.send({ msg: 'Password updated' });
});
//#endregion

//#region Login Process Check
app.post('/login', (req, res) => {
    email = req.body.email;
    const password = req.body.password;
    console.log('email', email);

    db.query(
        'SELECT * FROM customer WHERE Email =?',
        [email],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }

            if (result.length > 0) {
                var userinfo = JSON.stringify(result);
                userinfo = userinfo.replace(/[\[\]]/g, '');
                userinfoJson = JSON.parse(userinfo);
                if (userinfoJson.Verified == 0) {
                    res.send({
                        message: 'verify account first',
                        verified: userinfoJson.Verified,
                    });
                } else {
                    // res.send(result);
                    bcrypt.compare(
                        password,
                        result[0].Password,
                        (error, response) => {
                            console.log('match', response);
                            if (response) {
                                let userInfo = result;
                                // if (userInfo) {
                                //   var date = new Date();
                                //   date.setFullYear(date.getFullYear() + 1);
                                //   document.cookie = `userInfo = ${JSON.stringify(
                                //     userInfo
                                //   )}; expires= ${date.toUTCString()}; path=/`; //Storing login info value in Cookie
                                //}
                                res.send({
                                    userInfo,
                                    loggedIn: true,
                                    userStatus: 'client',
                                });
                            } else {
                                res.send({
                                    message: 'email or password did not match',
                                });
                            }
                        }
                    );
                    console.log(result);
                }
            } else if (result.length === 0) {
                db.query(
                    'SELECT * FROM manufacturer WHERE Email =?',
                    [email],
                    (err, result) => {
                        console.log('maker', result);
                        if (err) {
                            res.send({ err: err });
                        } else if (result.length > 0) {
                            var userinfo = JSON.stringify(result);
                            userinfo = userinfo.replace(/[\[\]]/g, '');
                            userinfoJson = JSON.parse(userinfo);
                            if (userinfoJson.Verified == 0) {
                                res.send({
                                    message: 'verify account first',
                                    verified: userinfoJson.Verified,
                                });
                            } else {
                                // res.send(result);
                                bcrypt.compare(
                                    password,
                                    result[0].Password,
                                    (error, response) => {
                                        if (response) {
                                            userInfo = result;
                                            res.send({
                                                userInfo,
                                                loggedIn: true,
                                                userStatus: 'maker',
                                            });
                                        } else {
                                            res.send({
                                                message:
                                                    'email or password did not match',
                                            });
                                        }
                                    }
                                );

                                //console.log(result);
                            }
                        } else {
                            res.send({ message: 'user doesnot exist' });
                        }
                    }
                );
            }
        }
    );
});
// app.get("/login", (req, res) => {
//   req.session.user = loginInfo;
//   if (req.session.user) {
//     res.send({
//       loggedIn: true,
//       user: req.session.user,
//       username: req.session.user[0].firstname,
//     });
//   } else {
//     res.send({ loggedIn: false });
//   }
// });

app.post('/validation-page', (req, res) => {
    const sql = 'SELECT * FROM cadfiles WHERE uploadedby = ?';
    db.query(sql, [email], (err, result) => {
        if (err) {
            return err;
        }
        //console.log(result);
        if (result.length > 0) {
            fileinfo = {
                filename: result[0].filename,
                filepath: `/uploads/${result[0].filename}`,
                email: email,
            };
            //console.log(fileinfo);
            res.send({ fileinfo });
        }
    });
});

app.post('/verify-login', (req, res) => {
    const email = req.body.email;
    console.log('fff', email);
    otp = GenerateOTP();
    var mailOptions = {
        to: email,
        subject: 'Otp for registration is: ',
        html:
            '<h3>OTP for account verification is </h3>' +
            "<h1 style ='font-weight:bold;'>" +
            otp +
            '</h1>',
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message Sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.send({ message: 'otp has been sent' });
    });
});
//#endregion
var location = null;

//#region Check email if exsit when reset password
app.post('/reset-password', (req, res) => {
    const email = req.body.email;
    location = req.body.path;
    console.log('fff', email);
    otp = GenerateOTP();
    console.log(location);
    db.query(
        'SELECT * FROM customer WHERE Email = ?',
        [email],
        (err, result) => {
            if (result.length === 0) {
                db.query(
                    'SELECT * FROM manufacturer WHERE Email =?',
                    [email],
                    (err, result) => {
                        if (!(result && result.length > 0)) {
                            console.log("doesn't exiss");
                            res.send({ message: "Email doesn't exist" });
                        } else {
                            console.log(result);
                            var mailOptions = {
                                to: email,
                                subject: 'Otp for registration is: ',
                                html:
                                    '<h3>OTP for account verification is </h3>' +
                                    "<h1 style ='font-weight:bold;'>" +
                                    otp +
                                    '</h1>',
                            };

                            transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    return console.log(error);
                                }
                                console.log('Message Sent: %s', info.messageId);
                                console.log(
                                    'Preview URL: %s',
                                    nodemailer.getTestMessageUrl(info)
                                );
                            });

                            res.send(result[0].Manufacturer_ID.toString());
                        }
                    }
                );
            } else {
                const id = result[0].Customer_ID;
                var mailOptions = {
                    to: email,
                    subject: 'Otp for registration is: ',
                    html:
                        '<h3>OTP for account verification is </h3>' +
                        "<h1 style ='font-weight:bold;'>" +
                        otp +
                        '</h1>',
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message Sent: %s', info.messageId);
                    console.log(
                        'Preview URL: %s',
                        nodemailer.getTestMessageUrl(info)
                    );
                });
                res.send(id.toString());
            }
        }
    );
});
//#endregion

console.log(location);
app.post('/verify-password', (req, res) => {
    console.log(location);
    res.send({ locate: location });
});

//#region Importing fabrication services from database
app.post('/fabricationservice', (req, res) => {
    db.query('SELECT * FROM fabrication_services', (err, result) => {
        if (err) {
            res.send({ err: err });
        }
        if (result.length > 0) {
            res.send(result);
        }
    });
});
//#endregion

//#region get material from db
app.post('/materials', (req, res) => {
    const fabricationID = req.body.fabricationID;
    db.query(
        'SELECT * FROM materials WHERE Service_ID = ?',
        [fabricationID],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }

            if (result.length > 0) {
                res.send(result);
                console.log(result);
            }
        }
    );
});
//#endregion

//#region  fileUpload
app.post('/upload', (req, res) => {
    if (req.files.file === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    //#region create new folder directory
    //const email = req.body.user;
    // path = `${projectPath}/public/uploads/models/${email}`;

    // fs.mkdir(path, (err) => {
    //   if (err) {
    //     console.log("error");
    //   } else {
    //     console.log("created");
    //   }
    // });
    //#endregion

    //#region for multiple files
    // if (req.files.file.length > 0) {
    //   var files = req.files.file;
    // } else {

    //}
    // var uploadedFiles = [];
    // if (files != null && files.length > 0) {
    //   files.forEach((file) => {
    //     const uploadPath = `${projectPath}/public/uploads/${file.name}`;
    //     if (!fs.existsSync(uploadPath)) {
    //       file.mv(uploadPath, (err) => {
    //         if (err) {
    //           console.error(err);
    //           return res.status(500).send(err);
    //         }
    //       });
    //       uploadedFiles = uploadedFiles.concat({
    //         fileName: file.name,
    //         filePath: `/uploads/${file.name}`,
    //       });
    //     } //else res.send({ msg: "duplicate file" });
    //   });
    //   res.send(uploadedFiles);
    // }
    //#endregion
    var file = req.files.file;
    if (file != null) {
        const uploadPath = `${projectPath}/public/uploads/models/${file.name}`;
        if (!fs.existsSync(uploadPath)) {
            file.mv(uploadPath, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send(err);
                }
                res.json({
                    fileName: file.name,
                    filePath: `/uploads/models/${file.name}`,
                });
            });
        } else
            res.send({
                msg: 'File Already Exist. Click x below to remove file first',
                fileName: file.name,
                filePath: `/uploads/models/${file.name}`,
            });
    }
});
//#endregion

//#region delete uploadedfile
app.post('/delete', (req, res) => {
    const filePath = req.body.filePath;
    const uploadedPath = `${projectPath}/public${filePath}`;
    if (fs.existsSync(uploadedPath)) {
        fs.unlink(uploadedPath, (err) => {
            if (err) return res.send({ msg: 'fileNotDeleted', removed: false });
            res.send({ msg: 'File Removed Successfully!!!', removed: true });
        });
    }
});
//#endregion

//#region order_specificaton
app.post('/order-specification', (req, res) => {
    try {
        const modelName = req.body.modelName;
        const fabricationService = req.body.fabricationService;
        const material = req.body.material;
        const thickness = req.body.thickness;
        const quantity = req.body.quantity;
        const modelPath = req.body.modelPath;
        const customerID = req.body.customerID;
        const manufacturerID = req.body.manufacturerID;
        const orderType = req.body.orderType;
        const status = 'pending';
        const amount = req.body.amount;
        const date = '';
        // const id = req.body.id;
        // const fabricationProcess = req.body.fabricationprocess;
        // const material = req.body.material;
        // const thickness = req.body.thickness;
        // const quanity = req.body.quantity;
        // const filename = req.body.filename;
        // const url = req.body.fileurl;
        const validationPagePath = req.body.validationPagePath;
        console.log(validationPagePath);
        console.log(req.body);

        if (
            modelName != null &&
            fabricationService != null &&
            material != null &&
            thickness != null &&
            quantity != null &&
            modelPath != null &&
            customerID != null
        ) {
            db.query(
                'INSERT INTO order_specification (Model_Name, Fabrication_Service, Material, Thickness, Quantity, Model_Path, Customer_ID) VALUES (?,?,?,?,?,?,?)',
                [
                    modelName,
                    fabricationService,
                    material,
                    thickness,
                    quantity,
                    modelPath,
                    customerID,
                ],
                (err, result) => {
                    console.log('result', result);
                    console.log('result', err);
                    if (!err) {
                        var mailOptions = {
                            to: 'fabhubsnepal1@gmail.com',
                            subject: 'Design For Validation',
                            html:
                                '<h3>Click the link below to validate the design</h3>' +
                                "<h1 style ='font-weight:bold;'>" +
                                validationPagePath +
                                '</h1>',
                        };

                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                return console.log(error);
                            }
                            console.log('Message Sent: %s', info.messageId);
                            console.log(
                                'Preview URL: %s',
                                nodemailer.getTestMessageUrl(info)
                            );
                            res.send({
                                message:
                                    'Your Design is sent for Validation it may take up to 24 hr',
                            });
                        });
                    } else return err;
                }
            );
        }
    } catch {}
});
//#endregion

//#region get hublist from fabricationService
app.post('/hublist', (req, res) => {
    try {
        const fabricationService = req.body.fabricationService;
        db.query(
            'SELECT m.Manufacturer_ID, m.Company_Name, m.Email, m.Contact_Person, m.Website, s.Material_Name, m.Phone_Number, m.Logo, m.Brief_Description, m.Address, fs.Name FROM manufacturer m INNER JOIN services s ON m.Manufacturer_ID = s.Manufacturer_ID INNER JOIN fabrication_services fs ON fs.Service_ID = s.Service_ID WHERE fs.Name = ?',
            [fabricationService],
            (err, result) => {
                if (!err && result.length > 0) {
                    console.log(result);
                    res.send(result);
                } else {
                    res.send();
                }
            }
        );
    } catch {}
});
//#endregion

//#region get page info(validation page)
app.post('/validation/:id', (req, res) => {
    try {
        var CryptoJS = require('crypto-js');
        const SECRET_KEY = 'FabHubs@promech';

        const id = req.params.id;
        //decryption
        var dataString = id.replace(/slash/g, '/');
        console.log(dataString);
        var decrypted = CryptoJS.AES.decrypt(dataString, SECRET_KEY);
        const userID = decrypted.toString(CryptoJS.enc.Utf8);
        console.log(userID);
        //decryption
        db.query(
            'SELECT * FROM customer WHERE Email = ?',
            [userID],
            (err, result) => {
                console.log('userid', result[0].Customer_ID);
                if (!err && result.length > 0) {
                    db.query(
                        'SELECT * FROM order_specification WHERE Customer_ID =?',
                        [result[0].Customer_ID],
                        (err, orderSpecification) => {
                            if (orderSpecification.length > 0) {
                                res.json({
                                    orderSpecification,
                                    userInfo: result,
                                });
                            }
                        }
                    );
                }
                //res.json(result);
                //console.log(result);
            }
        );
    } catch (err) {
        console.log(err);
    }
});
//#endregion

app.post('/imageupload', function (req, res) {
    if (req.file === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    const files = req.files.file;
    const path = req.body.document;
    console.log('path', path);
    let uploadedFiles = [];

    if (files != null && files.length > 0) {
        files.forEach((file) => {
            const uploadPath = `${projectPath}/public/${path}/${file.name}`;
            if (!fs.existsSync(uploadPath)) {
                file.mv(uploadPath, (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send(err);
                    }
                });
                uploadedFiles = uploadedFiles.concat({
                    fileName: file.name,
                    filePath: `/projectUploads/${file.name}`,
                });
            } else {
                fs.unlink(uploadPath, async (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('delete');
                    }
                });
                console.log('deletecomplete');
                if (!fs.existsSync(uploadPath)) {
                    file.mv(uploadPath, (err) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).send(err);
                        }
                    });
                }
                uploadedFiles = uploadedFiles.concat({
                    fileName: file.name,
                    filePath: `/projectUploads/${file.name}`,
                });
                console.log('file', uploadedFiles);
            }
        });
        console.log('file', uploadedFiles);
        res.send(uploadedFiles);
    } else {
        const file = files;
        const uploadPath = `${projectPath}/public/${path}/${file.name}`;
        console.log('image');
        if (!fs.existsSync(uploadPath)) {
            file.mv(uploadPath, (err) => {
                if (err) {
                    console.error('existerror', err);
                    return res.status(500).send(err);
                }
            });
            res.send({
                fileName: file.name,
                filePath: `/${path}/${file.name}`,
            });
        } else {
            fs.unlink(uploadPath, async (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('delete');
                }
            });
            file.mv(uploadPath, (err) => {
                if (err) {
                    console.error(err);
                    //return res.status(500).send(err);
                }
            });
            res.send({
                fileName: file.name,
                filePath: `/${path}/${file.name}`,
            });
        }
    }
});

app.post('/changeimage', (req, res) => {
    const id = req.body.id;
    const image = req.body.image;
    const userStatus = req.body.userStatus;
    if (userStatus == 'client') {
        db.query(
            'UPDATE customer SET Profile_Image =? WHERE Customer_ID = ?',
            [image, id],
            (err, result) => {
                console.log(err);
                if (result) {
                    db.query(
                        'SELECT * FROM customer WHERE Customer_ID  = ?',
                        [id],
                        (err, result) => {
                            console.log(result);
                            let userInfo = result;
                            // res.send({
                            //     userInfo,
                            //     loggedIn: true,
                            //     userStatus: 'client',
                            // });
                        }
                    );
                }
            }
        );
    } else if (userStatus == 'maker') {
        db.query(
            'UPDATE manufacturer SET Logo =? WHERE Manufacturer_ID = ?',
            [image, id],
            (err, result) => {
                console.log(err);
                if (result) {
                    db.query(
                        'SELECT * FROM customer WHERE Manufacturer_ID  = ?',
                        [id],
                        (err, result) => {
                            console.log(result);
                            let userInfo = result;
                            // res.send({
                            //     userInfo,
                            //     loggedIn: true,
                            //     userStatus: 'client',
                            // });
                        }
                    );
                }
            }
        );
    } else {
        db.query(
            'UPDATE feature_project SET Image =? WHERE Project_ID = ?',
            [image, id],
            (err, result) => {
                console.log(err);
                if (result) {
                    db.query(
                        'SELECT * FROM feature_project WHERE Project_ID  = ?',
                        [id],
                        (err, result) => {
                            console.log(result);
                            let userInfo = result;
                            // res.send({
                            //     userInfo,
                            //     loggedIn: true,
                            //     userStatus: 'client',
                            // });
                        }
                    );
                }
            }
        );
    }
});

//#region Get List of all Registered Hub
app.post('/registeredhubs', (req, res) => {
    try {
        db.query('SELECT * FROM manufacturer', (err, manufacturerList) => {
            if (!err && manufacturerList.length > 0) {
                sql =
                    'SELECT fs.Name, s.Material_Name, s.Manufacturer_ID, s.Unit_Rate, s.Cost_Unit' +
                    ' ' +
                    'FROM services s' +
                    ' ' +
                    'INNER JOIN fabrication_services fs' +
                    ' ' +
                    'ON fs.Service_ID = s.Service_ID';
                db.query(sql, (err, serviceList) => {
                    console.log(err);
                    if (!err && serviceList.length > 0) {
                        res.send({ manufacturerList, serviceList });
                    }
                });
            }
        });
    } catch {}
});
//#endregion

//#region get specific hubs from hubID from db
app.post('/manufacturer/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    db.query(
        'SELECT * FROM manufacturer WHERE Manufacturer_ID = ?',
        [id],
        (err, currentHub) => {
            if (currentHub) {
                db.query(
                    'SELECT fs.Name, fs.Service_ID, s.Material_Name, s.Manufacturer_ID, s.Unit_Rate, s.Cost_Unit ' +
                        'FROM services s ' +
                        'INNER JOIN fabrication_services fs ' +
                        'ON fs.Service_ID = s.Service_ID WHERE s.Manufacturer_ID = ? ',
                    [id],
                    (err, hubServices) => {
                        res.send({ hub: currentHub, services: hubServices });
                    }
                );
            }
        }
    );
});
//#endregion

//#region get hub services form hubID
app.post('/get-hub-services', (req, res) => {
    const hubID = req.body.hubID;
    console.log(hubID);
    const sql =
        'SELECT fs.Name, s.Manufacturer_ID FROM services s INNER JOIN fabrication_services fs ON fs.Service_ID = s.Service_ID WHERE s.Manufacturer_ID = ?';
    db.query(sql, [hubID], (err, hubService) => {
        console.log('error', err);
        if (hubService) {
            res.send(hubService);
            console.log('result', hubService);
        }
    });
});
//#endregion

app.get('/date', (req, res) => {
    var date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    res.send(date.toUTCString());
});

app.post('/editProfile', (req, res) => {
    //requesting value(firstname, lastname, password, email, phonenumber from registrarion page input)
    const id = req.body.id;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const phonenumber = req.body.phonenumber;

    otp = GenerateOTP();

    db.query(
        'UPDATE customer SET First_Name =?,Last_Name=?,Email=?,Phone_Number=? WHERE Customer_ID = ?',
        [firstname, lastname, email, phonenumber, id],
        (err, result) => {
            console.log(err);
            if (result) {
                db.query(
                    'SELECT * FROM customer WHERE Customer_ID  = ?',
                    [id],
                    (err, result) => {
                        console.log(result);
                        let userInfo = result;
                        res.send({
                            userInfo,
                            loggedIn: true,
                            userStatus: 'client',
                        });
                    }
                );
            }
        }
    );

    //#region Reading Database to check existing email id

    // db.query("SELECT * FROM customer WHERE Email = ?", [email], (err, result) => {
    //   console.log(result);
    //   var mailOptions = {
    //     to: email,
    //     subject: "Otp for registration is: ",
    //     html:
    //       "<h3>OTP for account verification is </h3>" +
    //       "<h1 style ='font-weight:bold;'>" +
    //       otp +
    //       "</h1>",
    //   };

    //   transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //       return console.log(error);
    //     }

    //     // console.log("Message Sent: %s", info.messageId);
    //     // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    //     // res.send({ msg: "OTP has been sent" });
    //   });
    // });
    //#endregion
});

//#region get specific customer from customerID from db
app.post('/customer/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    db.query(
        'SELECT * FROM customer WHERE Customer_ID = ?',
        [id],
        (err, response) => {
            if (response) {
                console.log(response);
                res.send(response);
            }
        }
    );
});
//#endregion

//#region get orderStatus page
app.post(`/:id/order-status`, (req, res) => {
    try {
        const id = req.params.id;
        db.query(
            'SELECT * FROM order_specification WHERE Customer_ID =?',
            [id],
            (err, orderList) => {
                if (!err && orderList.length > 0) {
                    console.log(orderList);
                    res.send(orderList);
                } else {
                    db.query(
                        'SELECT * FROM order_specification WHERE Manufacturer_ID =?',
                        [id],
                        (err, orderList) => {
                            if (!err && orderList.length > 0) {
                                console.log(orderList);
                                res.send(orderList);
                            }
                        }
                    );
                }
                //res.send({ orderSpec, hubs });
                //res.json(result);
                //console.log(result);
            }
        );
    } catch (err) {
        console.log(err);
    }
});
//#endregion

//#region Update OrderStatusPage
app.post('/update-order-status', (req, res) => {
    const updatedStatus = req.body.updatedStatus;
    const orderID = req.body.orderID;
    const sql = 'UPDATE order_specification SET Status = ? WHERE Order_ID = ?';
    db.query(sql, [updatedStatus, orderID], (err, result) => {
        if (err) {
            console.log(err);
        }
    });
});
//#endregion

app.post('/editManufacturerProfile', (req, res) => {
    //requesting value(firstname, lastname, password, email, phonenumber from registrarion page input)
    const id = req.body.id;
    //const firstname = req.body.firstname;
    const contactPerson = req.body.contactPerson;
    const email = req.body.email;
    const phonenumber = req.body.phonenumber;

    otp = GenerateOTP();

    db.query(
        'UPDATE manufacturer SET Contact_Person=?,Email=?,Phone_Number=? WHERE Manufacturer_ID = ?',
        [contactPerson, email, phonenumber, id],
        (err, result) => {
            console.log(err);
            if (result) {
                db.query(
                    'SELECT * FROM manufacturer WHERE Manufacturer_ID  = ?',
                    [id],
                    (err, result) => {
                        console.log(result);
                        let userInfo = result;
                        res.send({
                            userInfo,
                            loggedIn: true,
                            userStatus: 'maker',
                        });
                    }
                );
            }
        }
    );
});

app.post('/change-password', (req, res) => {
    //requesting value(firstname, lastname, password, email, phonenumber from registrarion page input)
    const id = req.body.id;
    const old_password = req.body.old_password;
    const new_password = req.body.new_password;
    const userStatus = req.body.userStatus;

    otp = GenerateOTP();

    if (userStatus === 'client') {
        db.query(
            'SELECT * FROM customer WHERE Customer_ID  = ?',
            [id],
            (err, result) => {
                if (result) {
                    bcrypt.compare(
                        old_password,
                        result[0].Password,
                        (error, response) => {
                            if (response) {
                                console.log('match', response);
                                bcrypt.hash(
                                    new_password,
                                    saltRound,
                                    (err, hash) => {
                                        db.query(
                                            'UPDATE customer SET Password =? WHERE Customer_ID = ?',
                                            [hash, id],
                                            (err, result) => {
                                                if (result) {
                                                    res.send({
                                                        msg:
                                                            'OTP has been sent',
                                                    });
                                                }
                                            }
                                        );
                                    }
                                );
                            } else {
                                res.send({
                                    message: 'Old password did not match',
                                });
                            }
                        }
                    );
                }
            }
        );
    } else {
        db.query(
            'SELECT * FROM manufacturer WHERE Manufacturer_ID  = ?',
            [id],
            (err, result) => {
                if (result) {
                    bcrypt.compare(
                        old_password,
                        result[0].Password,
                        (error, response) => {
                            if (response) {
                                console.log('matchmanufacturer', response);
                                bcrypt.hash(
                                    new_password,
                                    saltRound,
                                    (err, hash) => {
                                        db.query(
                                            'UPDATE manufacturer SET Password =? WHERE Manufacturer_ID = ?',
                                            [hash, id],
                                            (err, result) => {
                                                console.log(err);
                                                if (result) {
                                                    console.log(
                                                        'maker',
                                                        result
                                                    );
                                                    res.send({
                                                        msg:
                                                            'OTP has been sent',
                                                    });
                                                }
                                            }
                                        );
                                    }
                                );
                            } else {
                                res.send({
                                    message: 'Old password did not match',
                                });
                            }
                        }
                    );
                }
            }
        );
    }
});

//#region services_db
app.post('/update-services/:id', (req, res) => {
    const m_id = req.params.id;
    const hubServices = req.body.hubService;
    console.log(hubServices);
    let message = '';
    if (m_id && hubServices && hubServices.length > 0) {
        const sql = 'DELETE FROM services WHERE Manufacturer_ID = ?';
        db.query(sql, [m_id], async (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                hubServices.map((hubService) => {
                    const serviceID = hubService.fabricationService.value;
                    const materialDetails = JSON.stringify(
                        hubService.materialDetails
                    );
                    console.log(materialDetails, serviceID);
                    const sql =
                        'INSERT INTO services (Service_ID, Manufacturer_ID, Material_Name) VALUES (?, ?, ?)';
                    db.query(
                        sql,
                        [serviceID, m_id, materialDetails],
                        (err, result) => {
                            if (err) {
                                console.log('err', err);
                                message = 'Update failed';
                            } else {
                                console.log('result', result);
                                message = 'Updated Successfully';
                            }
                        }
                    );
                });
            }
        });
        console.log('message', message);
        res.send({ message: message });
    } else {
        res.send({ message: 'Atleast One service must be added' });
    }
});

//#endregion

app.listen(3001, '127.0.0.1', () => {
    console.log('running server');
});
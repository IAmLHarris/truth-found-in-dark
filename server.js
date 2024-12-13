const express = require("express");
const app = express();
const mongodb = require("./helpers/database");
const bodyParser = require("body-parser");

const passport = require("passport");
const session = require("express-session");
const githubStrat = require("passport-github2").Strategy;
const cors = require("cors");

const port = process.env.PORT || 4000;

process.on("uncaughtException", (err, origin) => {
  console.log(
    process.stderr.id,
    `Exception found! ${err}\n` + `Exception origin: ${origin}`
  );
});

// Swagger stuff
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Loads the API stuff + Password auth
app
  .use(bodyParser.json())
  .use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
    })
  )
  // Basic Express Session init
  .use(passport.initialize())
  // init passport on route call
  .use(passport.session())
  // allow passport to use express session pacakge
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
  })

  .use(cors({ methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"] }))
  .use(cors({ origin: "*" }))
  .use("/", require("./routes/index.js"));

passport.use(
  new githubStrat(
    {
      clientID: process.env.github_client_id,
      clientSecret: process.env.github_client_secret,
      callbackURL: process.env.callback_url,
    },
    function (accessToken, refreshToken, profile, done) {
      //User.findOrCreate({githubId: profile.id}, function(err, user){
      return done(null, profile);
      // })
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get("/", (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName}`
      : "Logged out"
  );
});

app.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);
// Atempts to run database
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    // When successful, outputs to a HTML page
    app.listen(port, () => {
      console.log(`Database + Node is running on port ${port}`);
    });
  }
});

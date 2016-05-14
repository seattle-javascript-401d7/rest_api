
## Express REST API with Mongo DB
Two Mongoose Schema models are created (resources) to route and manipulate through an express server.

###Dependencies
   * Body-Parser
   * Express
   * Gulp
   * Mongo
   * Mongoose

##Dev dependencies
   * Chai
   * Chai-Http  
   * Gulp-Eslint
   * Gulp-Mocha
   * Mocha

The databases can be
located at ```localhost:4020```

```/api/rabbits``` and ```api/slugs```

#### Authorization
Uses jsonwebtoken and bcrypt to build a token and store it for user sign in and sign up.

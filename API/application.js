var url = require('./main.js').config.url;
var request = require('./main.js').config.req;

class Application {
  constructor() { }

  /*
    Returns a list containing all project applications or a specific application
  */
  getApplication(index) {
    var searchString = "/application";
    if (index != null) searchString = "/application/" + index;
    describe("GET", function () {
      it("Return project applications", function (done) {
        request(url)
          .get(searchString)
          .auth("ninja@caldas.ipt", "123qwe")
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            done();
            console.log(res.body);
          });
      });
    });
  }

  /*
    Creates a application to a project
    {
      "groupid":"1",
      "projectid":"1"
    }
  */
  createApplication(application) {
    describe("POST", function () {
      it("Create a project application", function (done) {
        request(url)
          .post("/application")
          .auth("ninja@caldas.ipt", "123qwe")
          .send(application)
          .expect(200, done)
      });
    });
  };

  /*
    Accepts a user application
  */
  acceptApplication(application) {
    describe("POST", function () {
      it("Accept a project application", function (done) {
        request(url)
          .post("/application/accept")
          .auth("ninja@caldas.ipt", "123qwe")
          .send(application)
          .expect(200, done)
      });
    });
  }

  /*
    Returns assigned or unassigned applications depending on state
    state = 1 --> unassigned
    state != 1 --> assigned 
  */
  nAssigned(state) {
    describe("GET", function () {
      it("Return applications depending on state", function (done) {
        request(url)
          .get("/application/nassigned/" + state)
          .auth("ninja@caldas.ipt", "123qwe")
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            done();
            console.log(res.body);
          });
      });
    });
  }
}

module.exports = Application;

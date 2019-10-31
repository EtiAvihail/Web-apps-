const http = require("http");
const uuid = require("uuid");

function testLoginFail() {
  const data = JSON.stringify({
    username: "admin",
    password: "aaaaaaaa",
    rememberMe: true
  });
  const options = {
    hostname: "localhost",
    port: 8000,
    path: "/login",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length
    }
  };

  const req = http.request(options, res => {
    console.log("Testing Login Fail");
    console.log("----------------------------------------");
    console.log("status code should be 400 - " + (res.statusCode == 400));
  });

  req.write(data);
  req.end();
}

function testLoginSuccess() {
  const data = JSON.stringify({
    username: "admin",
    password: "admin",
    rememberMe: true
  });
  const options = {
    hostname: "localhost",
    port: 8000,
    path: "/login",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length
    }
  };

  const req = http.request(options, res => {
    console.log("Testing Login Success");
    console.log("----------------------------------------");
    console.log("status code should be 200 - " + (res.statusCode == 201));

    // res.on("data", d => {
    //   process.stdout.write(d);
    // });
  });

  req.write(data);
  req.end();
}

function testRegisterFail() {
  const data = JSON.stringify({
    username: "admin",
    password: "qwerty"
  });
  const options = {
    hostname: "localhost",
    port: 8000,
    path: "/register",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length
    }
  };

  const req = http.request(options, res => {
    console.log("Testing Register Fail");
    console.log("----------------------------------------");
    console.log("status code should be 401 - " + (res.statusCode == 401));
  });

  req.write(data);
  req.end();
}

function testLogsFail() {
  const options = {
    hostname: "localhost",
    port: 8000,
    path: "/logs",
    method: "GET"
  };

  const req = http.request(options, res => {
    console.log("Testing Logs Fail");
    console.log("----------------------------------------");
    console.log("status code should be 404 - " + (res.statusCode == 404));
  });

  req.end();
}

function testRegisterSuccess() {
  user = uuid.v4();
  pass = uuid.v4();
  const data = JSON.stringify({
    username: "aaaaaaaaaaaaaaaaaaaa",
    password: "aaaaaaaaaaaaaaaaaaaa"
  });
  const options = {
    hostname: "localhost",
    port: 8000,
    path: "/regiser",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length
    }
  };

  const req = http.request(options, res => {
    console.log("Testing Register Success");
    console.log("----------------------------------------");
    console.log("status code should be 200 - " + (res.statusCode == 404));
  });

  req.write(data);
  req.end();
}

testLoginFail();
testLoginSuccess();
testRegisterFail();
testLogsFail();
testRegisterSuccess();

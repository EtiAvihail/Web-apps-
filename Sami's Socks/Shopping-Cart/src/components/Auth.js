import Cookies from 'js-cookie';

const Auth = {
  currentUser: "",
  authenticate(uuid, user, isAdmin=false, rememberMe=false) {
    var inFiveMinutes = new Date(new Date().getTime() + 5 * 60 * 1000);
    var never = new Date(new Date().getTime() + Number.MAX_VALUE);
    Cookies.set("sessID", uuid, {
      expires: rememberMe ? never : inFiveMinutes
  })
    Cookies.set("user", user, {
      expires: rememberMe ? never : inFiveMinutes
  })
  ;
  this.currentUser = user;
  if (isAdmin) {
    Cookies.set("admin", true, {
      expires: rememberMe ? never : inFiveMinutes
    })
  }
  },
  signout() {
    Cookies.remove("sessID");
    Cookies.remove("user");
    Cookies.remove("admin");
    this.currentUser = "";
  },
  getAuth() {
    var sess = Cookies.get("sessID");
    if (!this.currentUser) {
      this.currentUser = Cookies.get("user");
    }
    return sess;
  },
  getCurrentUser() {
    return this.currentUser;
  },
  isAdmin(){
    return Cookies.get("admin");
  }

};
export default Auth;

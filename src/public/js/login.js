function formatPrice(p) {
  p = p.toString();
  let n = 0;
  let tmp = "";
  let rs = p[0];
  for (let i = p.length - 1; i > 0; i--) {
    n++;
    tmp += p[i];
    if (n % 3 === 0) {
      tmp += ".";
    }
  }
  for (let i = tmp.length - 1; i >= 0; i--) {
    rs += tmp[i];
  }
  console.log(rs);
  return rs;
}
if (localStorage.getItem("user")) {
  document.getElementById("loginBtn").style.display = "none";
  document.getElementById("signupBtn").style.display = "none";
  document.getElementById("coinBtn").style.display = "block";
  document.getElementById("signoutBtn").style.display = "block";
  let coin = JSON.parse(localStorage.getItem("user")).balance;
  document.getElementById("coinDisplay").innerHTML =
    "Số dư: " + formatPrice(coin) + "đ";
}
document.getElementById("loginBtn").onclick = () => {
  document.getElementById("loginPopup").classList.add("show");
  document.getElementById("signupForm").classList.remove("show");
  document.getElementById("loginForm").classList.add("show");
};
document.getElementById("close-login-btn").onclick = () => {
  document.getElementById("loginPopup").classList.remove("show");
  document.getElementById("loginForm").classList.remove("show");
};
document.getElementById("signupBtn").onclick = () => {
  document.getElementById("loginPopup").classList.add("show");
  document.getElementById("loginForm").classList.remove("show");
  document.getElementById("signupForm").classList.add("show");
};
document.getElementById("close-login-btn").onclick = () => {
  document.getElementById("loginPopup").classList.remove("show");
  document.getElementById("signupForm").classList.remove("show");
};
document.getElementById("loginSubmit").onclick = async () => {
  let loginInfo = {};
  loginInfo.email = document.getElementById("login_email").value;
  loginInfo.password = document.getElementById("login_password").value;
  fetch("http://localhost:3000/api/user/login", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginInfo),
  })
    .then((res) => res.json())
    .then((resjson) => {
      if (resjson.status === "success") {
        document.getElementById("login_msg").innerHTML =
          "Đăng nhập thành công !";
        setTimeout(() => {
          document.getElementById("loginPopup").classList.remove("show");
          document.getElementById("loginForm").classList.remove("show");
          localStorage.setItem("user", JSON.stringify(resjson));
          location.reload();
        }, 800);
      } else {
        document.getElementById("login_msg").innerHTML =
          "Đăng nhập thất bại vui lòng kiểm tra lại thông tin !";
      }
    });
};
document.getElementById("signupSubmit").onclick = async () => {
  let signupInfo = {};
  signupInfo.name = document.getElementById("name").value;
  signupInfo.email = document.getElementById("email").value;
  signupInfo.phone = document.getElementById("phone").value;
  signupInfo.password = document.getElementById("password").value;
  fetch("http://localhost:3000/api/user/signup", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signupInfo),
  })
    .then((res) => res.json())
    .then((resjson) => {
      if (resjson.status === "success") {
        document.getElementById("signup_msg").innerHTML =
          "Đăng ký thành công !";
        setTimeout(() => {
          document.getElementById("loginPopup").classList.remove("show");
          document.getElementById("signupForm").classList.remove("show");
          location.reload();
        }, 800);
      } else {
        document.getElementById("login_msg").innerHTML =
          "Đăng ký thất bại vui lòng kiểm tra lại thông tin !";
      }
      localStorage.setItem("user", JSON.stringify(resjson));
    });
};
document.getElementById("signoutBtn").onclick = () => {
  localStorage.removeItem("user");
  location.reload();
};

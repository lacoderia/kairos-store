const openpayService = {};
const openpayLoadTimer = setInterval(() => {
    if (window.OpenPay && window.OpenPay.deviceData) {
      window.OpenPay.setSandboxMode(true);

      openpayService.OpenPay = window.OpenPay;
      openpayService.OpenPay.setId('mtsnsojytnuaknrm0xef');
      openpayService.OpenPay.setApiKey('pk_caf6ac462c124dabbca57ad513ba7e3c');
      openpayService.deviceSessionId = window.OpenPay.deviceData.setup();

      clearInterval(openpayLoadTimer);
    }
}, 100);

export default openpayService;

// openpay prana:
// ID: myk45yivhnolufzfskjz
// Llave Pública: pk_f1a3792bc94744bea9d04df669e7e8cc

// openpay omein: 
// ID: mtsnsojytnuaknrm0xef
// Llave Pública: pk_caf6ac462c124dabbca57ad513ba7e3c
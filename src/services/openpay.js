const openpayService = {};

openpayService.setStore = (store) => {
  const openpayLoadTimer = setInterval(() => {
    if (window.OpenPay && window.OpenPay.deviceData) {
      window.OpenPay.setSandboxMode(true);
  
      openpayService.OpenPay = window.OpenPay;

      switch(store){
        case 'omein':
          openpayService.OpenPay.setId('mtsnsojytnuaknrm0xef');
          openpayService.OpenPay.setApiKey('pk_caf6ac462c124dabbca57ad513ba7e3c');
          break;
        case 'prana':
          openpayService.OpenPay.setId('myk45yivhnolufzfskjz');
          openpayService.OpenPay.setApiKey('pk_f1a3792bc94744bea9d04df669e7e8cc');
          break;
        default:
          break;
      }
      
      openpayService.deviceSessionId = window.OpenPay.deviceData.setup();
  
      clearInterval(openpayLoadTimer);
    }
  }, 1000);
}

export default openpayService;
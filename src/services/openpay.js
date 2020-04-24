const openpayService = {};

openpayService.setStore = (store) => {
  const openpayLoadTimer = setInterval(() => {
    if (window.OpenPay && window.OpenPay.deviceData) {
      // Sandbox
      window.OpenPay.setSandboxMode(true);
  
      openpayService.OpenPay = window.OpenPay;

      switch(store){
        case 'omein':
          // Production
          // openpayService.OpenPay.setId('mvzhv9zfjlnbecprgrxv');
          // openpayService.OpenPay.setApiKey('pk_cf3b9927d7bb4075ba9d9e6687f8181f');

          // Sandbox
          openpayService.OpenPay.setId('mtsnsojytnuaknrm0xef');
          openpayService.OpenPay.setApiKey('pk_caf6ac462c124dabbca57ad513ba7e3c');
          break;
        case 'prana':
          // Production
          // openpayService.OpenPay.setId('mri5keffrffrqj9ciyko');
          // openpayService.OpenPay.setApiKey('pk_dd11aa2d70814efca6a1124aff70a9fe');
          
          // Sandbox
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
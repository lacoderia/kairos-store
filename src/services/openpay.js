const openpayService = {};

openpayService.setStore = (store) => {
  const openpayLoadTimer = setInterval(() => {
    if (window.OpenPay && window.OpenPay.deviceData) {
      
      // Activate Sandbox for testing
      if (process.env.OPENPAY_SANDBOX_MODE == 1) {
        window.OpenPay.setSandboxMode(true);
      }

      openpayService.OpenPay = window.OpenPay;

      switch(store){
        case 'omein':
          openpayService.OpenPay.setId(process.env.OMEIN_OPENPAY_MERCHANT_ID);
          openpayService.OpenPay.setApiKey(process.env.OMEIN_OPENPAY_PUBLIC_API_KEY);
          break;
        case 'prana':
          openpayService.OpenPay.setId(process.env.PRANA_OPENPAY_MERCHANT_ID);
          openpayService.OpenPay.setApiKey(process.env.PRANA_OPENPAY_PUBLIC_API_KEY);
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
const openpayService = {};
const openpayLoadTimer = setInterval(() => {
    if (window.OpenPay && window.OpenPay.deviceData) {
      window.OpenPay.setSandboxMode(true);

      openpayService.OpenPay = window.OpenPay;
      openpayService.OpenPay.setId('myh3bzjhmp4oiti7vja6');
      openpayService.OpenPay.setApiKey('pk_1e508c7925d6474fb9ca88d472249631');
      openpayService.deviceSessionId = window.OpenPay.deviceData.setup();

      clearInterval(openpayLoadTimer);
    }
}, 100);

// Customise the Stripe object here if needed

export default openpayService;
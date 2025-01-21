// Data Generator for Subscription and Billing Information

// Helper function to generate random MSISDN (mobile number)
function generateMsisdn() {
  // Generate a random 10-digit number
  const number = Math.floor(Math.random() * 9000000000) + 1000000000;
  return `234${number}`; // Prefixing with Nigeria country code (234)
}

// Helper function to mask MSISDN
function maskMsisdn(msisdn) {
  return msisdn.replace(/(\d{3})(\d{7})(\d{3})/, "$1*******$3");
}

// Helper function to generate random subscription status
function getRandomSubscriptionStatus() {
  const statuses = ["ACTIVE", "SUSPENDED", "CANCELLED", "PENDING", "EXPIRED"];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

// Helper function to generate random billing status
function getRandomBillingStatus() {
  const statuses = ["PAID", "UNPAID", "OVERDUE", "PROCESSING", "FAILED"];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

// Helper function to generate random amount (in kobo)
function generateAmount() {
  // Generate amount between 100 and 10000 (₦1 to ₦100)
  return Math.floor(Math.random() * 9900) + 100;
}

// Helper function to generate promo ID
function generatePromoId() {
  const prefix = "PROMO";
  const randomNum = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `${prefix}${randomNum}`;
}

// Helper function to generate request ID
function generateRequestId() {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `REQ_${timestamp}_${randomStr}`.toUpperCase();
}

// Helper function to generate customer ID
function generateCustomerId() {
  const prefix = "CUST";
  const timestamp = Date.now().toString(36).substring(-6);
  const random = Math.random().toString(36).substring(2, 6);
  return `${prefix}_${timestamp}${random}`.toUpperCase();
}

// Main function to generate a complete record
module.exports = function generateRecord() {
  //   const msisdn = generateMsisdn();

  return {
    subscriptionStatus: getRandomSubscriptionStatus(),
    billingStatus: getRandomBillingStatus(),
    amountCharged: generateAmount(),
    promoId: generatePromoId(),
    userId: `913e87e3-457d-5a06-b1f3-cbdac21f7ad1`,
    customerId: generateCustomerId(),
    requestId: generateRequestId(),
  };
};

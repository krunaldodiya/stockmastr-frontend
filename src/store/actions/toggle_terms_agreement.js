const TOGGLE_TERMS_AGREEMENT = "TOGGLE_TERMS_AGREEMENT";

const toggleTermsAgreement = payload => {
  return {
    type: TOGGLE_TERMS_AGREEMENT,
    payload
  };
};

export { TOGGLE_TERMS_AGREEMENT, toggleTermsAgreement };


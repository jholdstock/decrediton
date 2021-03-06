import { FormattedMessage as T } from "react-intl";
import { PassphraseModalButton, KeyBlueButton } from "buttons";
import { Balance } from "shared";
import { TextInput } from "inputs";
import { useDex } from "../hooks";
import { useDexRegisterPage } from "./hooks";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
  const {
    onRegisterDex,
    registerDexAttempt,
    onGetConfig,
    dexConfig,
    dexAddr,
    defaultServerAddress,
    dexRegisterError
  } = useDex();

  const {
    isValid,
    error,
    onGetConfigDex,
    addr,
    setAddress
  } = useDexRegisterPage({
    onGetConfig,
    defaultServerAddress
  });

  if (dexConfig && dexAddr) {
    return (
      <div>
        <T
          id="dex.payRegistration.Fee"
          m="Please enter your DEX passphrase to pay the following fee:"
        />
        <Balance amount={dexConfig.feeAsset.amount} />
        <T
          id="dex.payRegistration.Address"
          m="DEX Server registering to:"
        />{" "}
        {dexAddr}
        <PassphraseModalButton
          disabled={registerDexAttempt}
          modalTitle={
            <T id="dex.payDexFeeModalTitle" m="Confirm Registration" />
          }
          modalDescription={
            <T
              id="dex.payDexFeeModalDescription"
              m="Enter your DEX passphrase to pay the registration fee of {fee} to register at the DEX of {address}.  ** Note ** The DCR lot size for this DEX is {lotsize}.  All trades are in multiples of this lot size.  This is the minimum possible trade amount in DCR."
              values={{
                fee: (
                  <Balance
                    noSmallAmount
                    bold
                    amount={dexConfig.feeAsset.amount}
                  />
                ),
                address: dexAddr,
                lotsize: (
                  <Balance
                    noSmallAmount
                    bold
                    amount={dexConfig.assets["42"].lotSize}
                  />
                )
              }}
            />
          }
          passphraseLabel={
            <T id="dex.payDexFeeAppPassphrase" m="DEX Passphrase" />
          }
          loading={registerDexAttempt}
          onSubmit={onRegisterDex}
          buttonLabel={<T id="dex.payDexFeeButton" m="Register" />}
        />
        {dexRegisterError && (
          <div className={styles.error}>{String(dexRegisterError)}</div>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <TextInput
          required
          value={addr}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="DEX Server"
        />
        {error && <div className="error">{error}</div>}
        <KeyBlueButton
          disabled={!isValid || registerDexAttempt}
          loading={registerDexAttempt}
          onClick={onGetConfigDex}>
          <T id="dex.getFeeButton" m="Get Fee to Pay" />
        </KeyBlueButton>
      </div>
    );
  }
};

export default RegisterPage;

import React, { useState } from "react";
import { canisterId, createActor } from "../../../declarations/token";
import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";

function Transfer() {

  const [toId, setId] = useState("");
  const [toAmount, setAmount] = useState("");
  const [isDisabled, setDisable] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [idHidden, setHidden] = useState(true);
  
  async function handleClick() {
    setHidden(true);
    setDisable(true);
    const toAccount = Principal.fromText(toId);
    const addAmount = Number(toAmount);

    const authClient = await AuthClient.create();
    const identity= await authClient.getIdentity();

    const authCannister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });
    const result = await authCannister.transferTo(toAccount, addAmount);
    setFeedback(result);
    setHidden(false);
    setDisable(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={toId}
                onChange={(e) => setId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={toAmount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled = {isDisabled}>
            Transfer
          </button>
        </p>
        <p hidden={idHidden}>{feedback}</p>
      </div>
    </div>
  );
}

export default Transfer;

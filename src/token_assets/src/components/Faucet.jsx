import React, { useState } from "react";
import { canisterId, createActor } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";

function Faucet(props) {
  
  const [isDiabled, setDisable] = useState(false);
  const [showButton, setButton] = useState("Gimme gimme");

  async function handleClick(event) {
    setDisable(true);

    const authClient = await AuthClient.create();
    const identity= await authClient.getIdentity();

    const authCannister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    const result = await authCannister.payOut();
    setButton(result);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free LAMEIx tokens here! Claim 10,000 LAMEI coins to {props.userPrincipal}.</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled = {isDiabled}>
          {showButton}
        </button>
      </p>
    </div>
  );
}

export default Faucet;

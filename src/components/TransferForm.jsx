import { useEffect, useState } from "react";

const TransferForm = ({ transfer, handleTransfer }) => {
    const [transferAmount, setTransferAmount] = useState(0);

    // useEffect(() => {
    //     console.log(transferAmount);
    // }, [transferAmount]);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleTransfer(transferAmount);
            }}
        >
            <h3>{transfer}</h3>

            <label htmlFor="">
                Enter amout to {transfer}
                <input
                    type="number"
                    value={transferAmount !== 0 ? transferAmount : ""}
                    onChange={(e) => setTransferAmount(e.target.value)}
                />
            </label>
            <button>{transfer}</button>
        </form>
    );
};

export default TransferForm;

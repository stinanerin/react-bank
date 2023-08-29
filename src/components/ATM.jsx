import { useEffect, useState } from "react";

import TransferForm from "./TransferForm";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ATM = () => {
    const [balance, setBalance] = useState(10000);
    const [currency, setCurrency] = useState("SEK");
    const [transfer, setTransfer] = useState("");

    const [hasMounted, setHasMounted] = useState(false);

    // useEffect(() => {
    //     console.log("balance", balance);
    // }, [balance]);
    // useEffect(() => {
    //     console.log("transfer", transfer);
    // }, [transfer]);

    // useEffect(() => {
    //     setHasMounted(true);
    //     console.log("currency changed ueseffect ran", currency);
    //     console.log("hasMounted", hasMounted);

    //     // If currency changes - recalculate balance
    //     return () => {
    //         console.log("inside cleanup - before change", currency);
    //         if (hasMounted) {
    //             if (currency === "SEK") {
    //                 console.log("hej");
    //                 // todo bug - this happens on first mount?
    //                 setBalance((prevState) => prevState / 10);
    //             } else {
    //                 console.log("hejdå");

    //                 setBalance((prevState) => prevState * 10);
    //             }
    //         }
    //     };
    // }, [currency]);

    useEffect(() => {
        console.log("hasMounted", hasMounted);
        if (hasMounted) {
            if (currency === "SEK") {
                setBalance((prevState) => prevState * 10);
            } else {
                setBalance((prevState) => prevState / 10);
            }
        } else {
            setHasMounted(true);
        }
        // brandon fråga ett problem?
    }, [currency]);

    const toggleCurrency = () => {
        setCurrency((prevCurrency) => (prevCurrency === "SEK" ? "EUR" : "SEK"));
    };

    const handleTransfer = (amount) => {
        // console.log("transfer", transfer, amount);

        if (transfer === "deposit") {
            setBalance((prevState) => {
                return parseInt(prevState) + parseInt(amount);
            });
        } else {
            setBalance((prevState) => {
                if (parseInt(prevState) - parseInt(amount) < 0) {
                    toast.error("Insufficient balance for this transaction.");
                    return prevState;
                } else {
                    return parseInt(prevState) - parseInt(amount);
                }
            });
        }
    };

    return (
        <div>
            <ToastContainer />

            <h2>ATM</h2>

            <button onClick={toggleCurrency}>Toggle currency</button>

            <p>Current currency {currency} </p>
            <p>Current balance {balance} </p>
            <p>Transfer balance </p>

            {
                //todo make a form?
            }

            <label htmlFor="withdrawl">
                Withdrawl
                <input
                    type="radio"
                    id="withdrawl"
                    name="transfer"
                    onChange={(e) => setTransfer(e.target.id)}
                />
            </label>
            <label htmlFor="deposit">
                Deposit
                <input
                    type="radio"
                    id="deposit"
                    name="transfer"
                    onChange={(e) => setTransfer(e.target.id)}
                />
            </label>

            {transfer && (
                <>
                    <TransferForm
                        transfer={transfer}
                        handleTransfer={handleTransfer}
                    />
                </>
            )}
        </div>
    );
};

export default ATM;

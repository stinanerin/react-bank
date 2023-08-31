import { useEffect, useState, useRef } from "react";

import TransferForm from "./TransferForm";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ATM = () => {
    const [balance, setBalance] = useState(9999);
    const [currency, setCurrency] = useState("SEK");
    const [transfer, setTransfer] = useState("");

    // const [hasMounted, setHasMounted] = useState(false);

    const hasMountedRef = useRef(false);

    useEffect(() => {
        console.log("Booting up ATM...ATM is ready!");
        return () => {
            console.log("ATM shutting down…");
        };
    }, []);

    useEffect(() => {
        if (hasMountedRef.current) {
            if (currency === "SEK") {
                setBalance((prevState) => prevState * 10);
            } else {
                setBalance((prevState) => prevState / 10);
            }
        } else {
            hasMountedRef.current = true;
        }
    }, [currency]);

    const toggleCurrency = () => {
        setCurrency((prevCurrency) => (prevCurrency === "SEK" ? "EUR" : "SEK"));
    };

    const handleTransfer = (amount) => {
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

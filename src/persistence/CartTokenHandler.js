import { useEffect, useState } from 'react';
import { SHOPURL } from '../Constants'

export default function useCartToken() {
    const [cartToken, setCartToken, clearCartToken] = useSessionStorage();

    useEffect( () => {
        if (cartToken === undefined) {
            fetch(SHOPURL + "carts/", {
                method: "POST",
                headers: { "Content-Type": "application/json; charset=utf-8" }
            })
            .then(response => response.json())
            .then(receivedToken => {
                console.log(receivedToken.id);
                setCartToken(receivedToken.id);

            })
            .catch(error => console.log(error))
        }
    }, [cartToken]);

    return [ cartToken, clearCartToken ]
}


function useSessionStorage() {
    const MYCARTOKEN = "mycarttoken";
    const [token, setToken] = useState(sessionStorage.getItem(MYCARTOKEN) || undefined);

    useEffect(() => {
        sessionStorage.setItem(MYCARTOKEN, token)
    }, [token]);

    function clearToken() {
        setToken('');
    }
    return [ token, setToken, clearToken ];
}



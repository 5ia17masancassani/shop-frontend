import React, {useEffect, useState} from "react";
import {SHOPURL} from "../Constants";
import useCartToken from "./CartTokenHandler";

export function useCart() {
    const [cartToken] = useCartToken();
    const [cart, setCart] = useState({cartEntries: []});

    useEffect(() => {
        if (cartToken) {
            fetch(SHOPURL + "carts/" + cartToken)
                .then(response => response.json())
                .then(c => setCart(c))
        }
    }, [cartToken]);

    const addArticle = (article, size) => {

        article.size = size;

        fetch(SHOPURL + "carts/" + article.id + "/" + article.size + "/" + cartToken, {
            method: "POST",
            headers: {"Content-Type": "application/json; charset=utf-8"},
            body: JSON.stringify(article)
        })
            .then(response => response.json())
            .then(c => {
                setCart(c)
            })
            .catch(error => console.log(error))

    }

    const delArticle = (article) => {
        fetch(SHOPURL + "carts/" + article.id + "/" + cartToken, {
            method: "DELETE",
            headers: {"Content-Type": "application/json; charset=utf-8"},
            body: JSON.stringify(article)
        })
            .then(response => response.json())
            .then(c => setCart(c))
            .catch(error => console.log(error))
    }
    const removeEntry = (article) => {

        fetch(SHOPURL + "carts/all/" + article.id + "/" + cartToken, {
            method: "DELETE",
            headers: {"Content-Type": "application/json; charset=utf-8"},
            body: JSON.stringify(article)
        })
            .then(response => response.json())
            .then(c => setCart(c))
            .catch(error => console.log(error))

    }
    return [cart, addArticle, delArticle, removeEntry]

}

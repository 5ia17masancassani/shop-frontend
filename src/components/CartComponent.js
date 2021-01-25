import React, {useContext} from 'react'

export default function CartContent(props) {
    const cart = props.cart.cart;
    const addArticle = props.cart.addArticle;
    const delArticle = props.cart.delArticle;
    const removeEntry = props.cart.removeEntry;

    if (!cart.cartEntries) {
        return (
            <React.Fragment>
                <p>Cart entries</p>
                <p>Cart is empty</p>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <h2>My Cart</h2>
                {console.log(cart)}
                {cart.cartEntries.map((ce, idx) =>
                    <div className="row" key={idx}>
                        <div className="col-1">{ce.count}</div>
                        <div className="col-8">{ce.article.text}</div>
                        <div className="col-8">{ce.article.size}</div>
                        <div className="col-8">{ce.article.price}</div>
                        <div className="col-1">
                            <button onClick={() => addArticle(ce.article, ce.article.size)}>+</button>
                        </div>
                        <div className="col-1">
                            <button onClick={() => delArticle(ce.article)}>-</button>
                        </div>
                        <div className="col-1">
                            <button onClick={() => removeEntry(ce.article)}>Delete</button>
                        </div>
                    </div>
                )}

                <p style={{"marginTop": "10px"}}>
                    Total Price {cart.totalPrice}
                </p>
                <p style={{"marginTop": "10px"}}>
                    Cart contains {cart.count} {cart.count === 1 ? 'entry' : 'entries'}
                </p>


            </React.Fragment>
        );
    }
}




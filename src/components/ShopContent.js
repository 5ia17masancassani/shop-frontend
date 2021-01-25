import React, {useState, useEffect} from 'react'
import {SHOPURL, HOSTURL} from '../Constants'
import {useCart} from "../persistence/Cart";
import CartComponent from "./CartComponent";
import Dropdown from 'react-dropdown';

export default function ShopContent() {
    const [articles, setArticles] = useState([]);
    const [tShirt, setTShirt] = useState("XS");
    const [bean, setBean] = useState("250g");
    const [cart, addArticle, delArticle, removeEntry] = useCart();

    useEffect(() => {
        fetch(SHOPURL + "articles")
            .then(response => response.json())
            .then(articles => setArticles(articles))
            .catch(error => console.log(error))
    }, []);

    const handleAddArticleToCart = (article, size) => addArticle(article, size)

    const handleChangeTShirts = (e) => {
        setTShirt(e.value)

    }

    const handleChangeBeans = (e) => {
        setBean(e.value)
    }


    const articleCards = articles.map(a => (
        <div className="card" key={a.id}>
            <img className="card-img-top" src={HOSTURL + a.image} alt=""/>
            <div className="card-body">
                <h5 className="card-title">{a.text}</h5>
                <p className="card-text">{a.description}</p>
                {a.sizegroup && a.sizegroup.id == 1 &&

                <Dropdown options={a.sizegroup.sizes} onChange={handleChangeTShirts} value={a.sizegroup.sizes[0]}
                          placeholder="Select an option"/>
                }

                {a.sizegroup && a.sizegroup.id == 2 &&

                <Dropdown options={a.sizegroup.sizes} onChange={handleChangeBeans} value={a.sizegroup.sizes[0]}
                          placeholder="Select an option"/>
                }
                {a.sizegroup && a.sizegroup.id == 1 &&
                <button onClick={() => handleAddArticleToCart(a, tShirt)} className="btn btn-primary">
                    add to cart
                </button>
                }

                {a.sizegroup && a.sizegroup.id == 2 &&
                <button onClick={() => handleAddArticleToCart(a, bean)} className="btn btn-primary">
                    add to cart
                </button>
                }

                {a.sizegroup == null &&
                <button onClick={() => handleAddArticleToCart(a, "noSize")} className="btn btn-primary">
                    add to cart
                </button>
                }


            </div>
        </div>
    ));

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>BBW Shop</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-8">
                    <h2>articles</h2>
                    <p>list of available articles</p>
                    <div className="card-columns">
                        {articleCards}
                    </div>
                </div>
                <div className="col-md-4">
                    <CartComponent cart={{cart, addArticle, delArticle, removeEntry}}/>
                </div>
            </div>
        </div>
    )
}

import { UserContext } from "../../contexts/user.context";
import { ProductsContext } from "../../contexts/products.context";
import { useContext } from "react";
import ProductCard from "../../components/product-card/product-card.component";
import './shop.styles.scss'
const Shop = () => {
  const { products } = useContext(ProductsContext);
  return (
    <div className="products-container">
    {products && products.length > 0 ? (
      products.map((product) =>
        product ? (
          <ProductCard key={product.id} product={product}></ProductCard>
        ) : null
      )
    ) : (
      <p>No products available</p>
    )}
  </div>
  )
}

export default Shop;
import React from "react";
import "./Product.css";

const products = [
  {
    id: 1,
    name: "[바디사랑공식] 가볍고 편안한 바른 자세 밴드, L, 1개",
    price: "25,900원",
    image: "https://via.placeholder.com/150", // 이미지 URL
    link: "https://example.com/product1", // 쇼핑몰 링크
  },
  {
    id: 2,
    name: "[바디사랑공식] 가볍고 편안한 바른 자세 밴드, L, 1개",
    price: "25,900원",
    image: "https://via.placeholder.com/150",
    link: "https://example.com/product2",
  },
  {
    id: 3,
    name: "[바디사랑공식] 가볍고 편안한 바른 자세 밴드, L, 1개",
    price: "25,900원",
    image: "https://via.placeholder.com/150",
    link: "https://example.com/product3",
  },
];

function Product() {
  return (
    <div className="container product-container">
      <h1>나의 상태에 맞는 제품</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <h2>{product.name}</h2>
              <p className="product-price">{product.price}</p>
              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-buy"
              >
                구매하러 가기
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;

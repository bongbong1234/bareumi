import React from "react";
import "./product.css";

const products = [
  {
    id: 1,
    name: "[바디사랑공식] 가볍고 편안한 바른 자세 밴드, L, 1개",
    price: "29,900원",
    image: "https://shop-phinf.pstatic.net/20241201_132/1733057049337zPcGo_PNG/35015456302528269_1968038606.png?type=f296_296", // 이미지 URL
    link: "https://smartstore.naver.com/ywlh/products/9403739674?nl-query=%EA%B0%80%EB%B3%8D%EA%B3%A0+%ED%8E%B8%EC%95%88%ED%95%9C+%EB%B0%94%EB%A5%B8%EC%9E%90%EC%84%B8+%EB%B0%B4%EB%93%9C&nl-ts-pid=i2vbgdqpts0ssn1rFjdsssssseo-200428&NaPm=ct%3Dm4rqa9fc%7Cci%3D1742da4370dda52a235cc72ce3b56125e19eba97%7Ctr%3Dsls%7Csn%3D9604594%7Chk%3D84f73021e6018b3364601435e303a04455017add", // 쇼핑몰 링크
  },
  {
    id: 2,
    name: "[발란쓰] 바른 자세교정밴드 굽은 어깨 등 목 허리 척추 체형교정기",
    price: "34,900원",
    image: "https://shopping-phinf.pstatic.net/main_8746472/87464720841.2.jpg?type=f300",
    link: "https://smartstore.naver.com/horlawns/products/9920218568?nl-query=%ED%97%88%EB%A6%AC%EA%B5%90%EC%A0%95%EA%B8%B0&nl-ts-pid=i2vbxdqo1LVssuFW6EKssssssYl-233977&NaPm=ct%3Dm4rqd41s%7Cci%3Dd708f813e3d206d86667ebdbf874b146031cca69%7Ctr%3Dsls%7Csn%3D1222316%7Chk%3D56846758360dc7c566825af27ade2483d5df3eca",
  },
  {
    id: 3,
    name: "[WI-ON]와이온 마이핏프로 밴드 1EA",
    price: "63,900원",
    image: "https://shopping-phinf.pstatic.net/main_8716669/87166694993.jpg?type=f300",
    link: "https://smartstore.naver.com/wi-on/products/9622192723?nl-query=%ED%97%88%EB%A6%AC%EA%B5%90%EC%A0%95%EA%B8%B0+%EC%99%80%EC%9D%B4%EC%98%A8&nl-ts-pid=i2v4Ldqo1SossRP44s4sssssssR-383463&NaPm=ct%3Dm4rqlgz4%7Cci%3D65b357c0c932675b5f9845cff41d4bab3e5aff96%7Ctr%3Dsls%7Csn%3D4450192%7Chk%3Dce233871f1818f33dd06dbb63e94513bc2ee5931",
  },
  {
    id: 4,
    name: "자세교정밴드 벨트 등 교정기 라운드숄더 어깨 바른자세 목 척추 말린 굽은 체형 허리",
    price: "21,900원",
    image: "https://shopping-phinf.pstatic.net/main_8280912/82809128540.14.jpg?type=f300",
    link: "https://smartstore.naver.com/pickhere1/products/5264605978?n_keyword=&n_rank=2&n_query=%ED%97%88%EB%A6%AC%EA%B5%90%EC%A0%95%EA%B8%B0&n_campaign_type=2&n_media=27758&n_campaign=cmp-a001-02-000000003630610&n_ad_group=grp-a001-02-000000018811153&n_ad=nad-a001-02-000000116013806&n_match=3&n_network=search&n_mall_id=ncp_1o2tfj_01&n_mall_pid=5264605978&n_ad_group_type=2&n_keyword_id=&n_ad_extension=&NaPm=ct%3Dm4rqh2so%7Cci%3D0D00002fLQ1BHHH3yvjE%7Ctr%3Dpla%7Chk%3D93433f6b2eef7aaf3310119af03508a632cf0d31%7Cnacn%3DpzisBQg1xtyJ",
  },
  {
    id: 5,
    name: "일감생활 자세교정밴드 굽은어깨밴드 라운드숄더",
    price: "19,800원",
    image: "https://shopping-phinf.pstatic.net/main_8700402/87004028296.3.jpg?type=f300",
    link: "https://smartstore.naver.com/ilseng/products/9459527887?nl-query=%EC%B2%99%EC%B6%94%20%EA%B5%90%EC%A0%95&frm=NVSCPSI&pageid=i2v69dqVOsVss6ogxP4ssssstnd-479176&NaPm=ci%3Di2v69dqVOsVss6ogxP4ssssstnd-479176%7Cct%3Dm4rqzpmx%7Ctr%3Dnsls%7Csn%3D5681635%7Chk%3Df957c9dc08b7e92c8a6d1ac944593f6a99aef323",
  },
  {
    id: 6,
    name: "[멜킨]리얼핏 바른자세 밴드]",
    price: "19,700원",
    image: "https://shopping-phinf.pstatic.net/main_8218984/82189840435.16.jpg?type=f300",
    link: "https://brand.naver.com/melkin/products/4645319961?nl-query=%ED%97%88%EB%A6%AC%EA%B5%90%EC%A0%95%EA%B8%B0&nl-ts-pid=i2vn9lqo1fsssUlzhbZssssst6R-496281&NaPm=ct%3Dm4rrre8g%7Cci%3Dbc8c0633da7ea339339d073511306492affde92b%7Ctr%3Dsls%7Csn%3D447572%7Chk%3D0ccb4bc68347ccee0b785cf5a01f6e1bb95850a3",
  }
];

function Product() {
  return (
    <div className="product-container container">
      <h1>나만의 맞춤 제품</h1>
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

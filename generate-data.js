import { fa, faker } from "@faker-js/faker";
import fs from "fs";

faker.location = { country: "Vietnam" };

// console.log(faker.string.uuid());
// console.log(faker.commerce.productName());
// console.log(faker.commerce.price());
// console.log(faker.commerce.department());
// console.log(faker.person.fullName());

const randomCategories = (n) => {
  if (n <= 0) return [];

  const categoryList = [];
  for (let index = 0; index < n; index++) {
    const category = {
      id: faker.string.uuid(),
      name: faker.commerce.department(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    categoryList.push(category);
  }

  return categoryList;
};

const randomProductList = (categories, n) => {
  if (categories.length === 0) return [];

  const productList = [];

  categories.forEach((category) => {
    for (let index = 0; index < n; index++) {
      const product = {
        categoryID: category.id,
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        color: faker.color.rgb,
        price: parseFloat(faker.commerce.price(1, 100)),
        description: faker.lorem.paragraph(),
        image: faker.image.urlPicsumPhotos(400, 400),
        quantity: faker.number.int({ min: 1, max: 100 }),
        sold: faker.number.int({ min: 0, max: 100 }),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      productList.push(product);
    }
  });

  return productList;
};

const main = () => {
  const categories = randomCategories(9);
  const productList = randomProductList(categories, 2);
  console.log(categories);

  const db = {
    categories: categories,
    products: productList,
    users: [],
    carts: [],
  };

  fs.writeFile("db.json", JSON.stringify(db), () => {
    console.log("lưu file thành công");
  });
};

main();

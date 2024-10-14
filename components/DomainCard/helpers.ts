import axios from "axios";

/**
 * The onDeleteHandler function fetches user data, filters out a specific item from the cart based on
 * domainName, and updates the user's cart data.
 * @param {string} domainName - The `onDeleteHandler` function is an asynchronous function that takes a
 * `domainName` parameter of type string. It fetches user data from "http://localhost:3001/users/1",
 * filters out an item from the user's cart based on the provided `domainName`, and then updates the
 * @returns The `onDeleteHandler` function is returning a Promise that resolves to the result of a PUT
 * request made using Axios to update user data at "http://localhost:3001/users/1". The updated user
 * data includes the cart data with the item matching the provided `domainName` removed.
 */
export async function onDeleteHandler(domainName: string) {
  const data = await axios.get("http://localhost:3001/users/1");
  const filteredData = data.data.cart.filter(
    (item: { domainName: string; isAvailable: boolean; price: number }) =>
      item.domainName !== domainName
  );
  return axios.put("http://localhost:3001/users/1", {
    ...data.data,
    cart: filteredData,
  });
}

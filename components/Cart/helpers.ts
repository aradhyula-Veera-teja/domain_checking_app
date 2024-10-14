import axios from "axios";

/**
 * The function `removeItems` asynchronously retrieves user data, filters out unavailable items from
 * the cart based on the `all` parameter, and updates the user's cart data.
 * @param {boolean} all - The `all` parameter in the `removeItems` function is a boolean value that
 * determines whether to remove all items from the cart that are not available (isAvailable === false).
 * If `all` is true, the function filters out the unavailable items from the cart data fetched from the
 * server and updates
 * @returns The `removeItems` function is returning a PUT request to update the user's cart data with
 * the filtered items based on the condition that `item.isAvailable === false`.
 */
export async function removeItems(all: boolean) {
  const data = await axios.get("http://localhost:3001/users/1");
  let filteredData = [];
  if (!all) {
    filteredData = data.data.cart.filter(
      (item: { domainName: string; isAvailable: boolean; price: number }) =>
        item.isAvailable === false
    );
  }
  return axios.put("http://localhost:3001/users/1", {
    ...data.data,
    cart: filteredData,
  });
}

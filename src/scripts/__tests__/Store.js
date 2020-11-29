import Store from "../Store";
import mockData from "../../../public/db.json";

describe("filter", () => {
  let store;
  beforeEach(() => {
    store = new Store();
    store.setDeals(mockData.deals);
  });

  it("Should return all deals when no filters applied", () => {
    expect(store.deals).toEqual(mockData.deals);
    expect(store.deals).toHaveLength(11)
  });

  it("Should return 4 products when 'Broadband' product is selected", () => {
    store.setProductFilter("Broadband");
    const products = [6158, 4359, 4371, 5459];

    products.forEach(productId => expect(store.deals.find(p => p.id == productId)).toMatchObject({ id: productId }));

    expect(store.deals).toHaveLength(4);
  });

  it("Should return 0 products when TV is selected", () => {
    store.setProductFilter("TV");

    expect(store.deals).toHaveLength(0);
  });

  it("Should return 4 products when 'TV' and 'Broadband' are selected", () => {
    store.setProductFilter("Broadband");
    store.setProductFilter("TV");
    const products = [6074, 5738, 6165, 6468];

    products.forEach(productId => expect(store.deals.find(p => p.id == productId)).toMatchObject({ id: productId }));
    expect(store.deals).toHaveLength(4);
  });

  it("Should return 1 product when 'Mobile' and 'Broaband' are selected ", () => {
    const productId = 4276;
    store.setProductFilter("Broadband");
    store.setProductFilter("Mobile");

    expect(store.deals.find(p => p.id == productId)).toMatchObject({ id: productId });
    expect(store.deals).toHaveLength(1);
  });

  it("Should return 2 products when 'Broadband' , 'TV' and 'BT'", () => {
    store.setProviderFilter(3);
    store.setProductFilter("Broadband");
    store.setProductFilter("Tv");

    const products = [6074, 5738];
    products.forEach(productId => expect(store.deals.find(p => p.id == productId)).toMatchObject({ id: productId }));
    expect(store.deals).toHaveLength(2);
  });

  it("Should return 1 product when 'SKY'", () => {
    const productId = 6468;
    store.setProviderFilter(1);
    expect(store.deals.find(p => p.id == productId)).toMatchObject({ id: productId });
    expect(store.deals).toHaveLength(1);
  });
});

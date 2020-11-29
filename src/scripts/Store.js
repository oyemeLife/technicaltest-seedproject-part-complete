import Observable from "./Observable";

class Store extends Observable {
  constructor() {
    super();
    this.state = {
      deals: [],
      productFilters: [],
      providerFilter: null
    };
  }

  get deals() {
    return this.filter();
  }

  filter() {
    var deals = this.state.deals;
    if (this.state.productFilters && this.state.productFilters.length > 0) {
      deals = deals.filter(e => {
          var products = e.productTypes.filter(pr => pr.toLowerCase() !== "phone");
          return products.every(pr => this.state.productFilters.some(f => pr.toLowerCase().includes(f))) &&
            this.state.productFilters.every(f => products.some(pr => pr.toLowerCase().includes(f)));
      });
    }

    if (this.state.providerFilter) {
      deals = deals.filter(e => e.provider.id == this.state.providerFilter);
    }
    return deals;
  }

  setDeals(data) {
    this.state.deals = data;
    this.notify(this.state);
  }

  setProductFilter(value) {
    const filter = value.trim().toLowerCase();
    const index = this.state.productFilters.indexOf(filter);
    if (index === -1) {
      this.state.productFilters.push(filter);
    } else {
      this.state.productFilters.splice(index, 1);
    }
    this.notify(this.state);
  }

  setProviderFilter(value = null) {
    this.state.providerFilter = value;
    this.notify(this.state);
  }
}

export default Store;

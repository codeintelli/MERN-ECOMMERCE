class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            // case insensitive
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryCopy = { ...this.queryStr };
    // Removing some field for category
    const removeField = ["keyword", "page", "limit"];
    removeField.forEach((key) => delete queryCopy[key]);

    // * filter for price and rating
    // * we can got this in queryCopy now we want to put $ before gt and lt price: { gt: '1000', lt: '20000' }
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|lt|lte|gte)\b/g, (key) => `$${key}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  pagination(resultPerPage) {
    const current_page = Number(this.queryStr.page) || 1;
    const skipRecord = resultPerPage * (current_page - 1);
    // for example skip = 5 * (1 - 1) means skip 0
    // for example skip = 5 * (2 - 1) means skip 5
    // for example skip = 5 * (3 - 1) means skip 10
    this.query = this.query.limit(resultPerPage).skip(skipRecord);
    return this;
  }
}
export default APIFeatures;
